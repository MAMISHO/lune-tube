enyo.kind({
	name: "YoutubeApi",
	kind: enyo.Component,
	published: {
		nextPage:"",
	},
	components: [

	],
	create:function() {
		this.inherited(arguments);
	},
	search: function(inSearchText, inRelated) {
		var params={
			maxResults: 50,
			order: "relevance",
			part: "snippet",
			type: "video",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
		};

			if(inRelated == null){		// sin videos relacionados				
				params.q = inSearchText;
			}else{						//peticion de videos relacionados
				params.relatedToVideoId = inSearchText;
			}

			var url_base = "https://content.googleapis.com/youtube/v3/";
			var method = "search";

			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponse");
	},

	processResponse: function(inRequest, inResponse) {
			if(!inResponse) return [];
			// return inResponse;
			console.log(inResponse);
			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				var v = {};
				v.video_id = data[i].id.videoId;
				v.channel_id = data[i].snippet.channelId;
				v.image = data[i].snippet.thumbnails.default.url;
				v.title = data[i].snippet.title;
				v.chanel = data[i].snippet.channelTitle;
				v.views = "",
				v.time = data[i].snippet.publishedAt.split("T")[0];
				
				var vevo = v.chanel.search("VEVO");
				if(vevo === -1){
					videos.push(v);
				}
				
				// videos.push(v);
			}
			return videos;
	},

	searchVideosList: function(query){
		var params={
			maxResults: 50,
			chart: "mostPopular",
			q: query,
			part: "snippet",
			// type: "video",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
		};

		var url_base = "https://www.googleapis.com/youtube/v3/";
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
		if(b == 401){
			this.refreshToken();
			// return a.go();
			// this.getActivities();
		}
		return;
	},

	searchNext: function(inSearchText){
			var url_base = "https://content.googleapis.com/youtube/v3/";
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
		console.log("Solicitud enviada con oAuth");
		var url_base = "https://www.googleapis.com/youtube/v3/";
		var method = "search";
		var params={
			maxResults: 50,
			chart: "mostPopular",
			q: inSearchText,
			part: "snippet",
			type: "video",
		};

		if(inRelated == null){		// sin videos relacionados				
				params.q = inSearchText;
		}else{						//peticion de videos relacionados
			params.relatedToVideoId = inSearchText;
		}

		/*return new enyo.JsonpRequest({
				url: url_base + method,
				method: "GET",
            	headers:{"Authorization": "Bearer " + myApiKey.access_token}
			}).go(params).response(this, "processResponse");*/
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

		var url_base = "https://www.googleapis.com/youtube/v3/";
		var method = "activities";
		var params={
			maxResults: 50,
			regionCode: localeInfo.info.locale,
			part: "snippet, contentDetails",
			home: true,
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

			for (var i = 0; i < data.length; i++) {
				var v = {};
				if(inRequest.headers.Authorization){
					var aux = data[i].snippet.type;
					v.video_id = data[i].contentDetails[aux].videoId;
					// console.log(v.video_id);
				}else{
					v.video_id = data[i].id.videoId;
				}
				v.channel_id = data[i].snippet.channelId;
				v.image = data[i].snippet.thumbnails.default.url;
				v.title = data[i].snippet.title;
				v.chanel = data[i].snippet.channelTitle;
				v.views = "",
				v.time = data[i].snippet.publishedAt.split("T")[0];
				
				var vevo = v.chanel.search("VEVO");
				if(vevo === -1){
					videos.push(v);
				}
				
				// videos.push(v);
			}
			return videos;
	},



	/*private*/
	refreshToken: function(){
		var formData = new FormData();

		formData.append("client_id", myApiKey.client_id);
		formData.append("client_secret", myApiKey.client_secret);
		formData.append("refresh_token", myApiKey.refresh_token);
		formData.append("grant_type", "refresh_token");


		var request = new enyo.Ajax({
			url: "https://accounts.google.com/o/oauth2/token",
			method: "POST",
			postBody: formData
		});
		request.response(enyo.bind(this, "refreshTokenResponse"));
		request.error(enyo.bind(this, "processErrorRefreshToken"));
		return request.go();
	},

	refreshTokenResponse: function(inRequest, inResponse){
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
			enyo.setCookie("youtube_token", ck.access_token, {"Max-Age":ck.expires_in});
			enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":60});
			enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":60});
			myApiKey.access_token = ck.access_token;
			myApiKey.refresh_token = ck.refresh_token;
			myApiKey.login = true;
			console.log("cookie refrescada");
			return this.bubble("onRefreshTokenFinish",this);
		}
		return;
	},

	processErrorRefreshToken: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log("no se puede refrescar el token, es necesario logarse otra vez.");
		return this.bubble("onRefreshTokenError",this);
	},

	getMyChannelInfo: function(){
		var url_base = "https://www.googleapis.com/youtube/v3/";
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
		return inResponse;
	},

	getMyPlaylist: function(){
		var url_base = "https://www.googleapis.com/youtube/v3/";
		var method = "playlists";
		var params={
			part: "id,snippet,status",
			mine: true,
			maxResults: 50,
			fields: "etag,eventId,items,kind,nextPageToken,pageInfo,prevPageToken,tokenPagination,visitorId"
		};

		var request = new enyo.Ajax({
            url: "https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&mine=true",
            method: "GET",
            headers:{"Authorization": "Bearer " + myApiKey.access_token},
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "getMyPlaylistResponse"));
        request.error(enyo.bind(this, "getMyPlaylistResponseError"));
        return request.go();
	},

	getMyPlaylistResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		return inResponse;
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
		var url_base = "https://www.googleapis.com/youtube/v3/";
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
			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				if(data[i].snippet.thumbnails){
					var v = {};
					v.video_id = data[i].snippet.resourceId.videoId;
					v.channel_id = data[i].snippet.channelId;
					v.image = data[i].snippet.thumbnails.default.url;
					v.title = data[i].snippet.title;
					v.chanel = data[i].snippet.channelTitle;
					v.views = "",
					v.time = data[i].snippet.publishedAt.split("T")[0];
					
					/*var vevo = v.chanel.search("VEVO");
					if(vevo === -1){
						videos.push(v);
					}*/
					videos.push(v);
				}
			}
			return videos;
			// console.log(videos);
	}

});