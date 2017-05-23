var ii = 0;
enyo.kind({
	name: "YoutubeApi",
	kind: enyo.Component,
	published: {
		prevPage:"",
		nextPage:"",
		currentPlaylist:"",
	},
	components: [

	],
	_tryLogincound:0,
	_nextPageComments:"",
	myPlaylist:[],
	deferred : undefined, //use for implement promises
	create:function() {
		this.inherited(arguments);
	},
	search: function(inSearchText, inRelated) {
		// console.log(regionCode);
		var params={
			maxResults: 15,
			order: "relevance",
			part: "snippet",
			type: "video",
			regionCode: regionCode,
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
		};
		// console.log(localeInfo.info.locale);
			if(typeof inSearchText === "string"){
				if(!inRelated){		// sin videos relacionados				
					params.q = inSearchText;
				}else{						//peticion de videos relacionados
					params.relatedToVideoId = inRelated;
					params.maxResults = 15;
				}
			}

			var url_base = youtube_api_url;
			var method = "search";

			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponse");
	},

	processResponse: function(inRequest, inResponse) {
		// console.log(inRequest);
			if(!inResponse) return [];
			// return inResponse;
			// console.log(inResponse);
			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				var v = {};
				v.video_id = data[i].id.videoId;
				v.channel_id = data[i].snippet.channelId;
				v.image = data[i].snippet.thumbnails.medium.url;
				v.image_high = data[i].snippet.thumbnails.high.url;
				v.title = data[i].snippet.title;
				v.chanel = data[i].snippet.channelTitle;
				v.views = "",
				v.time = data[i].snippet.publishedAt.split("T")[0];
				v.description = data[i].snippet.description;

				if(inResponse.nextPageToken){
					v.nextPage = inResponse.nextPageToken;	
				}
				
				/*var vevo = v.chanel.search("VEVO");
				if(vevo === -1){
					videos.push(v);
				}*/
				
				videos.push(v);
			}
			// console.log(videos);
			this.getStatistics(videos);
			return videos;
	},

	searchVideosList: function(query){
		var params={
			maxResults: 15,
			chart: "mostPopular",
			q: query,
			part: "snippet",
			// type: "video",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
		};

		var url_base = youtube_api_url;
		var method = "videos";

			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponseSearchVideoList");
	},

	processResponseSearchVideoList: function(inSender, inResponse){
		if(!inResponse) return [];
		return inResponse;
	},

	processError: function(a, b){
		console.log(a);
		console.log(b);
		if(b == 401 && this._tryLogincound<2){
		// if(b == 401){
			// this._tryLogincound++;
			this.refreshToken();
			// return a.go();
			// this.getActivities();
		}
		return;
	},

	searchNext: function(inSearchText){
			var url_base = youtube_api_url;
			var method = "search";
			var params={
				maxResults: 15,
				order: "relevance",
				part: "snippet",
				type: "video",
				pageToken: this.nextPage,
				q: inSearchText,
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
			};
			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponse");
	},

	searchAuth: function(inSearchText, inRelated){
		// console.log("Solicitud enviada con oAuth");
		var url_base = youtube_api_url;
		var method = "search";
		var params={
			maxResults: 15,
			chart: "mostPopular",
			q: inSearchText,
			part: "snippet",
			type: "video",
			regionCode: regionCode
		};


		if(!inRelated){			// Petición sin videos relacionados				

				params.q = inSearchText;
		}else{					// Petición con videos relacionados

			params.relatedToVideoId = inSearchText;
		}

		var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token}
        });

        request.response(enyo.bind(this, "processResponse"));
        request.error(enyo.bind(this, "processError"));
		return request.go(params);
        
	},

	getActivities: function(){
		// console.log("Mensaje de prueba");
		// console.log({error:"login", message: myApiErrors.login});
		if(!myApiKey.login){
			return {error:"login", message: myApiErrors.login};
		}

		var url_base = youtube_api_url;
		var method = "activities";
		var params={
			maxResults: 15,
			regionCode: regionCode,
			part: "snippet, contentDetails",
			home: true,
			// mine: true,
			//fields: "etag,eventId,items,kind,nextPageToken,pageInfo,prevPageToken,tokenPagination,visitorId"
		};

		if(this.nextPage){
			params.pageToken = this.nextPage;
			params.maxResults = 15;
		}

		var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token},
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "getActivitiesResponse"));
        request.error(enyo.bind(this, "processError"));
        return request.go(params);

	},

	getActivitiesResponse: function(inRequest, inResponse){
		if(!inResponse) return [];
			// return inResponse;
			// console.log(inRequest);
			// console.log(inResponse);
			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;
			var ant = null;
			for (var i = 0; i < data.length; i++) {
				var v = {};
				if(inRequest.headers.Authorization){
					var aux = data[i].snippet.type;
					// if(aux === "recommendation" || aux === "like" || aux === "bulletin" || "playlistItem"){
					if(data[i].contentDetails[aux].resourceId){
						v.video_id = data[i].contentDetails[aux].resourceId.videoId;
					}else{
						v.video_id = data[i].contentDetails[aux].videoId;
					}
					// console.log(v.video_id);
				}else{
					v.video_id = data[i].id.videoId;
				}
				
				v.channel_id = data[i].snippet.channelId;
				v.title = data[i].snippet.title;
				v.chanel = data[i].snippet.channelTitle;
				v.image_high = data[i].snippet.thumbnails.high.url;
				v.views = "";
				v.time = data[i].snippet.publishedAt.split("T")[0];
				v.description = data[i].snippet.description;
				
				if(data[i].snippet.thumbnails){
					v.image = data[i].snippet.thumbnails.medium.url;
				}

				if(inResponse.nextPageToken){
						v.nextPage = inResponse.nextPageToken;	
				}

				if(data[i].snippet.type !== "subscription" && data[i].snippet.type !== "playlistItem" && ant !== v.video_id && v.image)
					videos.push(v);
				ant = v.video_id;
			}
			// console.log(videos);
			// var aux = this.getStatistics(videos);
			// console.log("aux");
			// console.log(aux);
			this.getStatistics(videos);
			return videos;
	},



	/*private*/
		/*
			Para mejorar la encapsulación de la aplicaición
			se ha implementado el uso de promises. Para mantner
			la conàtibilidad con veriosnes antiguas de webOS se 
			usa promises mediante la libresía when.js Sepodría 
			usar promises directamente con ES6 para las versiones
			modernas, pero despues de pruebas de rendiemiento se
			ha visto que no se perjudica en nada, es más se mejora
			el rendimiento al actual, aunque esta un poco por
			debajo de una implemntación nativa en ES6

			objeto relacionado:
								deferred
			
			Librería:
					https://github.com/cujojs/when

			Se ha hecho uso de browserify para llevar el paquete
			al front-end

			implementación con ENYO:
					http://codebrocken.blogspot.com.es/2012/01/implementing-promises-with-enyo.html
		*/
	refreshToken: function(){
		console.log("Se va a refrescar el token con:");
		// console.log(myApiKey);
		/*var formData = new FormData();

		formData.append("client_id", myApiKey.client_id);
		formData.append("client_secret", myApiKey.client_secret);
		formData.append("refresh_token", myApiKey.refresh_token);
		formData.append("grant_type", "refresh_token");*/


		 this.deferred = when.defer();

		var postBody = {
					client_id: myApiKey.client_id,	
					client_secret: myApiKey.client_secret,
					refresh_token: myApiKey.refresh_token,
					grant_type: "refresh_token",
				};

		var request = new enyo.Ajax({
            url: "https://accounts.google.com/o/oauth2/token",
            method: "POST",
            // postBody: formData,
            postBody: postBody,
            contentType: 'application/x-www-form-urlencoded',
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

		// console.log(formData);
		// console.log(request);
		request.response(enyo.bind(this, "refreshTokenResponse"));
		request.error(enyo.bind(this, "processErrorRefreshToken"));
		//return request.go();
		request.go();

		return this.deferred.promise;
	},

	refreshTokenResponse: function(inRequest, inResponse){
		// console.log(inRequest);
		// console.log(inResponse);
		if(!inResponse) return;
		// console.log(inResponse);
		if(inResponse.access_token){
			myApiKey.access_token = inResponse.access_token;
			var ck = {
				access_token: inResponse.access_token,
				token_type: inResponse.token_type,
				expires_in: inResponse.expires_in,
				refresh_token: myApiKey.refresh_token
			};
			// document.cookie="session_youtube=";
			// document.cookie="session_youtube=" + JSON.stringify(ck);
			// var time = (ck.expires_in) / (24*60*60*1000);
			// var min = (60*1000/(24*60*60*1000));
			enyo.setCookie("youtube_token", ck.access_token, {"Max-Age":ck.expires_in});
			enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":360});
			enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":360});

			/*enyo.setCookie("youtube_token", ck.access_token, {"Max-Age":min});
			enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":min});
			enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":min});*/

			myApiKey.access_token = ck.access_token;
			myApiKey.refresh_token = ck.refresh_token;
			myApiKey.login = true;
			this._tryLogincound=0;
			console.log("cookie refrescada");

			// return this.bubble("onRefreshTokenFinish",this);
			// return true;
		}
		//return;
		this.deferred.resolve(inResponse);
	},

	processErrorRefreshToken: function(inRequest, inResponse){
		if(!inResponse) return;
		this._tryLogincound++;
		console.log(inRequest.xhrResponse.body);
		console.log("no se puede refrescar el token, es necesario logarse otra vez.");
		//return this.bubble("onRefreshTokenError",this);

		this.deferred.reject(inResponse);
	},

	getMyChannelInfo: function(){
		var url_base = youtube_api_url;
		var method = "channels";
		var params={
			part: "id, snippet, contentDetails",
			mine: true,
			fields: "etag,eventId,items,kind,nextPageToken,pageInfo,prevPageToken,tokenPagination,visitorId"
		};

		var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token},
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "getMyChannelInfoResponse"));
        request.error(enyo.bind(this, "processError"));
        return request.go(params);
	},

	getMyChannelInfoResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		this.myChannel = inResponse;
		return inResponse;
	},

	getMyPlaylist: function(nextPage){
		var url_base = youtube_api_url;
		var method = "playlists";
		var params={
			part: "id,snippet,status",
			mine: true,
			maxResults: 50,
			fields: "etag,eventId,items,kind,nextPageToken,pageInfo,prevPageToken,tokenPagination,visitorId"
		};
		// console.log(nextPage);
		if(nextPage){
			params.pageToken = nextPage;
		}

		var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token},
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "getMyPlaylistResponse"));
        request.error(enyo.bind(this, "getMyPlaylistResponseError"));
        return request.go(params);
	},

	/*
		Este método recibe la respuesta de la petición ajax con los playlist del usurios
		Si el playlist tiene mas de 50 elementos, se hará una llamada recursiva hasta recuperar
		todos los elementos del playlis.
	*/
	getMyPlaylistResponse: function(inRequest, inResponse){
		if(!inResponse) return;

		var totalPlaylist = inResponse.pageInfo;
		// if(totalPlaylist.totalResults > totalPlaylist.resultsPerPage && inResponse.items.length === totalPlaylist.resultsPerPage){
		if(inResponse.nextPageToken){			
			this.myPlaylist = this.myPlaylist.concat(inResponse.items);
			this.getMyPlaylist(inResponse.nextPageToken);
		}else{
			var playlist = this.myPlaylist.concat(inResponse.items);
			inResponse.items = playlist;
			return this.bubble("onReciveAllPlaylist", inResponse);
			// return inResponse;
		}
		/*if(inResponse.nextPageToken && ii === 0){

			this.getMyPlaylist(inResponse.nextPageToken);
			ii++;
		}*/
		// return inResponse;
	},

	getMyPlaylistResponseError: function(inRequest, inResponse){
		if(!inResponse) return;
		if(inResponse==404){
			return [];
		}

		if(inResponse == 401){
			this.refreshToken();
			// return a.go();
			return;
		}
	},

	getPlaylistFromId: function(id){
		/*this.totalResults = 0;
		this.resultsItem = 0;*/
		this.currentPlaylist = id;
		var url_base = youtube_api_url;
		var method = "playlistItems";
		var params={
			part: "id,snippet, status",
			playlistId: id,
			maxResults: 50,
		};

		var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token},
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "getPlaylistFromIdResponse"));
        request.error(enyo.bind(this, "getMyPlaylistResponseError"));
        return request.go(params);
	},

	getPlaylistFromIdResponse: function(inRequest, inResponse){
		if(!inResponse) return [];
			// return inResponse;
			// console.log(inResponse);
			// console.log();
			if( typeof inResponse === "string"){
				return {error:"maxResults"};
			}

			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				if(data[i].snippet.thumbnails){
					var v = {};
					v.video_id = data[i].snippet.resourceId.videoId;
					v.channel_id = data[i].snippet.channelId;
					v.image = data[i].snippet.thumbnails.medium.url;
					v.image_high = data[i].snippet.thumbnails.high.url;
					v.title = data[i].snippet.title;
					v.chanel = data[i].snippet.channelTitle;
					v.views = "",
					v.time = data[i].snippet.publishedAt.split("T")[0];
					v.description = data[i].snippet.description;
					v.playlistItemId = data[i].id;

					if(inResponse.nextPageToken){
						v.nextPage = inResponse.nextPageToken;	
					}
					/*var vevo = v.chanel.search("VEVO");
					if(vevo === -1){
						videos.push(v);
					}*/
					videos.push(v);
				}
			}
			/*this.resultsItem += data.length;
			this.totalResults = inResponse.pageInfo.totalResults;
			console.log(this.resultsItem);
			console.log(this.totalResults);
			if(typeof this.nextPage !== "undefined"){
				console.log(this.nextPage);
			}*/
			this.getStatistics(videos);
			return videos;
			// console.log(videos);
	},

	getPlaylistFromIdNextPage: function(){
		if(typeof this.nextPage !== "undefined"){
			var url_base = youtube_api_url;
			var method = "playlistItems";
			var params={
				part: "id,snippet, status",
				playlistId: this.currentPlaylist,
				pageToken: this.nextPage,
				maxResults: 50,
			};

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "GET",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "getPlaylistFromIdResponse"));
	        request.error(enyo.bind(this, "getMyPlaylistResponseError"));
	        return request.go(params);
    	}else{
    		// console.log("va al response");
    		var ajaxMock = new enyo.Ajax({});
    		ajaxMock.response(enyo.bind(this, "getPlaylistFromIdResponse"));
        	ajaxMock.error(enyo.bind(this, "getMyPlaylistResponseError"));
    		return ajaxMock.go();
    	}
	},

	getComments: function(id){
		var url_base = youtube_api_url;
			var method = "commentThreads";
			var params={
				part: "id, replies, snippet",
				// part: "id, snippet",
				// maxResults: 15,
				maxResults: 30,
				order: "relevance",
				videoId: id,
				textFormat: "plainText",
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
				fields: "etag,eventId,items,kind,nextPageToken,pageInfo,tokenPagination,visitorId"
			};

			// if(this.myChannel){
			//	 console.log(this.myChannel);
			// }

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "GET",
	            // headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "getCommentsResults"));
	        // request.error(enyo.bind(this, "getMyPlaylistResponseError"));
	        return request.go(params);
	},

	getNextComments: function(id){
		if(typeof this._nextPageComments !== "undefined"){
			var url_base = youtube_api_url;
				var method = "commentThreads";
				var params={
					part: "id, replies, snippet",
					// part: "id, snippet",
					// maxResults: 15,
					maxResults: 30,
					pageToken : this._nextPageComments,
					order: "relevance",
					videoId: id,
					textFormat: "plainText",
					key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
					fields: "etag,eventId,items,kind,nextPageToken,pageInfo,tokenPagination,visitorId"
				};

				// if(this.myChannel){
				//	 console.log(this.myChannel);
				// }

				var request = new enyo.Ajax({
		            url: url_base + method,
		            method: "GET",
		            // headers:{"Authorization": "Bearer " + myApiKey.access_token},
		            cacheBust: false,
		            callbackName: null,
		            overrideCallback: null
		        });

		        request.response(enyo.bind(this, "getCommentsResults"));
		        // request.error(enyo.bind(this, "getMyPlaylistResponseError"));
		        return request.go(params);
		    }else{
		    	var ajaxMock = new enyo.Ajax({});
	    		ajaxMock.response(enyo.bind(this, "getCommentsResults"));
	        	// ajaxMock.error(enyo.bind(this, "getMyPlaylistResponseError"));
	    		return ajaxMock.go();
		    }
	},

	getCommentsResults: function(inSender, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		// console.log(typeof inResponse);
		if( typeof inResponse === "string"){
			return {error:"maxResults"};
		}
		this._nextPageComments = inResponse.nextPageToken;
		return inResponse;
	},

	setComment: function(resource){
		var url_base = youtube_api_url;
			var method = "commentThreads";
			var params={
				part: "snippet",
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
			};

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "POST",
	           	postBody: resource,
    			contentType: "application/json",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "setCommentsResults"));
	        request.error(enyo.bind(this, "setCommentsResultsResponseError"));
	        return request.go(params);
	},

	setReplyComment: function(resource){
		console.log("llega a la API");
		console.log(resource);
		var url_base = youtube_api_url;
			var method = "comments";
			var params={
				part: "snippet",
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
			};

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "POST",
	           	postBody: resource,
    			contentType: "application/json",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "setReplyCommentResults"));
	        request.error(enyo.bind(this, "setReplyCommentResponseError"));
	        return request.go(params);
	},

	setCommentsResults: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		return inResponse;
	},

	setCommentsResultsResponseError: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inRequest);
		console.log(inRequest.xhrResponse.body);
	},

	setReplyCommentResults: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		return inResponse;
	},

	setReplyCommentResponseError: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inRequest);
		console.log(inRequest.xhrResponse.body);
	},

	getStatistics: function(v){
		var videoIds = v.map(function(o){
			return o.video_id;
		});
		// console.log(videoIds);
		// return videoIds.toString();
		// console.log(v[0].video_id);
		var url_base = youtube_api_url;
			var method = "videos";
			var params={
				// part: "id, replies, snippet",
				part: "snippet, statistics, contentDetails",
				// maxResults: 50,
				// order: "relevance",
				id: videoIds.toString(),
				// id: v[0].video_id,
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
				// fields: "etag,eventId,items,kind,nextPageToken,pageInfo,tokenPagination,visitorId"
			};

			// if(this.myChannel){
			//	 console.log(this.myChannel);
			// }

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "GET",
	            // headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "getStatisticsResults"));
	        // request.error(enyo.bind(this, "getMyPlaylistResponseError"));
	        return request.go(params);
	        // request.go(params);
	},

	getStatisticsResults: function(inRequest, inResponse){
		// console.log(inRequest);
		if(!inResponse) return [];


		// console.log(inResponse);
		/*var aux = inResponse.items[0].contentDetails.duration;
		console.log(aux);
		console.log(this.convert_time(aux));*/
		// console.log(aux.toISOString());
		// return "hola resulyadp";
		return this.bubble("onGetStatistics",inResponse.items);
		// return inResponse;
	},

	getStatisticsFromRelated: function(v){
		var videoIds = v.map(function(o){
			return o.video_id;
		});
		// console.log(videoIds);
		// return videoIds.toString();
		// console.log(v[0].video_id);
		var url_base = youtube_api_url;
			var method = "videos";
			var params={
				// part: "id, replies, snippet",
				part: "snippet, statistics, contentDetails",
				// maxResults: 50,
				// order: "relevance",
				id: videoIds.toString(),
				// id: v[0].video_id,
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
				// fields: "etag,eventId,items,kind,nextPageToken,pageInfo,tokenPagination,visitorId"
			};

			// if(this.myChannel){
			//	 console.log(this.myChannel);
			// }

			var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "GET",
	            // headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "getStatisticsFromRelatedResults"));
	        // request.error(enyo.bind(this, "getMyPlaylistResponseError"));
	        return request.go(params);
	        // request.go(params);
	},

	getStatisticsFromRelatedResults: function(inRequest, inResponse){
		if(!inResponse) return [];
		// return this.bubble("onGetStatisticsFromRelated",inResponse.items);
		return inResponse.items;
	},

	setVideoToPlaylist: function(resource){
		// console.log("Se envia la peticion");
		var url_base = youtube_api_url;
		var method = "playlistItems";
		var params={
			part: "snippet",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
		};

		var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "POST",
	           	postBody: resource,
    			contentType: "application/json",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "setVideoToPlaylistResponse"));
	        request.error(enyo.bind(this, "setVideoToPlaylistError"));
	        return request.go(params);
	},

	setVideoToPlaylistResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
	},

	setVideoToPlaylistError: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		console.log(inRequest.xhrResponse.body);
		// console.log(inRequest);
	},

	deleteVideoFromPlaylist: function(videoId){
		var url_base = youtube_api_url;
		var method = "playlistItems";
		var params={
			// part: "snippet",
			id: videoId,
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
		};

		var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "DELETE",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "deleteVideoFromPlaylistResponse"));
	        request.error(enyo.bind(this, "deleteVideoFromPlaylistError"));
	        return request.go(params);
	},

	deleteVideoFromPlaylistResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
	},

	deleteVideoFromPlaylistError: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		console.log(inRequest.xhrResponse.body);
		// console.log(inRequest);
	},

	createPlaylist: function(newPlaylist){
		this._videoToNewPlaylist = newPlaylist.video;
		// console.log(newPlaylist);
		var url_base = youtube_api_url;
		var method = "playlists";
		var params={
			part: "snippet, status",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE",
		};

		var request = new enyo.Ajax({
	            url: url_base + method,
	            method: "POST",
	           	postBody: newPlaylist.snippet,
    			contentType: "application/json",
	            headers:{"Authorization": "Bearer " + myApiKey.access_token},
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
	        });

	        request.response(enyo.bind(this, "createPlaylistResponse"));
	        request.error(enyo.bind(this, "createPlaylistError"));
	        return request.go(params);
	},

	createPlaylistResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		this._videoToNewPlaylist.snippet.playlistId = inResponse.id;
		// console.log(this._videoToNewPlaylist);
		this.setVideoToPlaylist(this._videoToNewPlaylist);
		return inResponse;
	},

	createPlaylistError: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		console.log(inRequest.xhrResponse.body);
		// console.log(inRequest);
	}

});