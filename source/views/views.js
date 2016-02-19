/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	published:{
		query_history: "",
		query: "",
		queryType: "keyword" //[ keyword | playlist | home ]
	},
	handlers: {
    	onLoadMore: "loadMore",
    	onStartVideo: "startVideo",
    	onSearchEvent:"searchEvent",
    	onSearchFromUrl: "searchFromUrl",
    	onShowMainMenu: "showMainMenu",
    	onBackToList: "backToList",
    	onShowVideoInfo: "showVideoInfo",
    	onRefreshTokenFinish:"refreshTokenFinish",
    	onRefreshTokenError: "refreshTokenError",
    	onVideoFinished:"videoFinished",
    	onGetStatistics: "receiveStatistics",
    	// onGetStatisticsFromRelated: "receiveStatisticsFromRelated",
    	// events from menu
    	onShowMenuOption: "showMenuOption",
    	onLoadPlaylist: "loadPlaylist",
    	onHomeRequest: "homeRequest",
    	onLoadHistory: "loadPlaylistById",
    	onLoadFavorites: "loadPlaylistById",
		onLoadLikes: "loadPlaylistById",
		onLoadWatchLater: "loadPlaylistById",
		onLoadMyChannel: "loadMyChannel",
		//events from list
		onUpdateTime: "updateTime",
		//events from comments
		onSetComment: "setComment",
		onSetReply: "setReply",
		onLoadMoreComments: "loadMoreComments"
	},
	components:[
		{kind: 'Panels',name:"mainPanel", fit: true, classes: 'panels-sliding-menu', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, draggable:true, onTransitionFinish:"draggableMenu", components: [
			{kind:"LuneTube.Menu", name:"menuPanel"},
			{fit:true, classes:"enyo-fit", components:[
				{kind: 'Panels',name:"panel", fit: true, style:"height:100%", classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, realtimeFit:true, onTransitionFinish: "panelChanged", components: [
					{layoutKind: "FittableRowsLayout", components: [
						{kind: "LuneTube.Search", name:"search"},
						{name: 'content_list',fit: true, layoutKind: "FittableRowsLayout", components: [
							// {kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
								// {kind:"VideoList", name:"videoList"},
							{kind: "Panels", name:"listPanels", fit:true, realtimeFit: false,draggable:false, components: [
								// {kind:"VideoGridList", name:"videoList"},
								{kind:"VideoList", name:"videoList", onAddToPlaylist: "addVideoToPlaylist", onRemoveFromPlaylist: "removeFromPlaylist", onCreatePlaylist:"createPlaylist"},
								{kind:"VideoList", name:"videoListRelated", onAddToPlaylist: "addVideoToPlaylist", onCreatePlaylist:"createPlaylist"},
								// {tag:"div", components:[
								{layoutKind: "FittableRowsLayout", components: [
									{kind:"mochi.GroupButton", onActiveTab:"groupControlTap", name: "groupButtonVideoInfo"},
									{kind: "Panels", name:"infoCommentPanel", fit:true, draggable: false, style:"height: 100%;", components:[
										{kind:"CommentList", name:"commentList"},
										{kind: "videoInfo", name: "videoInfo"}
									]}
								]}
							]}	
							// ]}
						]},
						{kind: "onyx.Toolbar", classes:"menu", components:[
						// {kind: "onyx.Toolbar", classes:"", components:[
							{kind: "Image", src: "assets/menu.png", ontap:"showMenuOption", style:"margin: 0"},
							{name:"videoDetailGroup", kind: "Group", tag: null, onActivate:"tabActivated__", ontap:"radioGroupTap", defaultKind: "onyx.IconButton", components: [
								// {src: "assets/icon_results.png", ontap:"deactivate"},
								// {src: "assets/icon_related.png", ontap:"activate"},
								{name:"resultsButton", src: "assets/icon_results.png", active: true,index:1, style:"margin: 0 12% 0 0"},
								{name:"relatedButton",src: "assets/icon_related.png", disabled:true, index:2, style:"margin: 0 12%"},
								{name:"commentButton", src: "assets/icon_comments.png", disabled: true, index:3, style:"margin: 0 12%"},
							]}
						]}
					]},
					{name: 'content_player',fit: true, doubleTapEnabled: true, ondoubletap: "doubleTap", components: [
							{kind: "Player", name:"player"}
					]},
				]}
			]}
		]},
		{name: "messagePopup", classes: "onyx-sample-popup", kind: "onyx.Popup", autoDismiss:true, centered: false, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
			{name:"boxNotification", content:"", allowHtml:true}
		]},
		{kind:"AppMenu", onSelect: "appMenuItemSelected", components: [
			{content:"Paste", ontap: "doPasteText"},
			{content:"Copy", ontap: "doCopyText"}
		]},

		// Componentes que no se ven
		{kind:"YoutubeApi", name: "youtube"},
		{kind:"YoutubeVideo", name: "yt"},
		{kind: "enyo.ApplicationEvents", onWindowRotated: "windowRotated", onactivate:"activate", ondeactivate:"deactivate", onWindowParamsChange: "windowParamsChange", onrelaunch: "windowParamsChange", onwebOSRelaunch: "windowParamsChange"},
		{kind: "enyo.Signals", onactivate: "handleActivate", ondeactivate: "handleDeactivate", onmenubutton: "handleMenuButton", onApplicationRelaunch: "windowParamsChange", onlowmemory:"handleLowMemory", onWindowParamsChange: "windowParamsChange"}
		// {kind: "Auth", name:"auth"},
		// {name: "launchApplicationService", kind: "enyo.LunaService", service: "enyo.palmServices.application", method: "open", onFailure: "gotResourceError"},
	],
	videos:[],
	videosRelated:[],
	numberOfTries:0,
	_myChannel:null,
	_videoIdCurrent:null,
	// _platform: "webOS",
	_platform: "",
	create:function() {
        this.inherited(arguments);

        // enyo.load("https://s.ytimg.com/yts/jsbin/html5player-de_DE-vflR89yTY/html5player.js");

        this.$.mainPanel.setIndex(1);
        this.$.listPanels.setIndex(0);
		var cookie = enyo.getCookie("session_youtube");

		var youtube_token = enyo.getCookie("youtube_token");
		var youtube_refresh = enyo.getCookie("youtube_refresh");


		if(youtube_token && youtube_refresh){
			console.log("token vigente");
			var token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;

				myApiKey.login = true;
				// this.$.menuPanel.setStatus("Estas Logado");

		}else if(!youtube_token && youtube_refresh){
			console.log("token expirado, se refresaca el token");
			var token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;
				myApiKey.login = false;

			this.$.youtube.refreshToken();
		}else{
			console.log("no hay token, necesita iniciar sesion");
			this.queryChanged();
			// this.loadHomeFeeds();
		}

		if(myApiKey.login){
				this.loadHomeFeeds();
				this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
				this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
				this.$.menuPanel.setLogin(myApiKey.login);
		}
		
		
		currentOsPlatform = this.getCurrentOsPlatform();
		console.log("Hi " + currentOsPlatform + " --> starting debug");
		webos.setWindowOrientation("free");
		if(currentOsPlatform){
			this.windowParamsChange();
		}
    },

    windowParamsChange: function(inSender, inEvent){

    	if(enyo.webos.launchParams()){
    		console.log(PalmSystem.launchParams);
    		var launchParams = {};
    		if(typeof PalmSystem.launchParams === "string"){
    			if(PalmSystem.launchParams.length>0){
    				launchParams = JSON.parse(PalmSystem.launchParams);
    			}else{
    				return true;
    			}
    		}else{
    			launchParams = JSON.parse(PalmSystem.launchParams);
    		}

    		if(!launchParams.params && !launchParams.target) return true;

    		if(launchParams.target){
    			var video_id = launchParams.target.match("v=([a-zA-Z0-9\_\-]+)&?");
    				if(video_id){
    					
	    				this.startVideo(inSender, {video_id:video_id[1]});
	    				this.$.listPanels.setIndex(1);
    				}
    			return true;
    		}

    		var params = launchParams.params;
    		var newVideo={};


    		if(params.videoId){

    			if(params.videoId.trim().length > 0){
    				newVideo.video_id = params.videoId.trim();
    				this.startVideo(inSender, newVideo);
    				this.$.listPanels.setIndex(1);
    			}
				return true;
			}

    		if(params.url){
    			if(params.url.trim().length > 0){
    				var match = params.url.match("v=([a-zA-Z0-9\_\-]+)&?")[1];
    				if(match){
    					newVideo.video_id = match;
	    				this.startVideo(inSender, newVideo);
	    				this.$.listPanels.setIndex(1);
    				}
    			}
    			return true;
    		}

    		if(params.searchTerm){
    			this.search(params.searchTerm);
    			this.$.search.setSearchTerm(params.searchTerm);
    			return true;
    		}

			if(params.video){
				console.log("Try open Video from other sources!! Next support");
				return true;
			}
    	}
    },

    refreshTokenFinish: function(inSender, inEvent){
    	myApiKey.login =  true;
    	this.loadHomeFeeds();
		this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
		this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
		this.$.menuPanel.setLogin(myApiKey.login);
		return true;
    },

    refreshTokenError: function(inSender, inEvent){
    	this.queryChanged();
    	this.$.boxNotification.setContent("Error <br/><br/>Your session has expired. Please login again");
    	this.$.messagePopup.show();
    	return true;
    },

    loadHomeFeeds: function(){
    	this.$.listPanels.setIndex(0);
    	// this.queryType = "home";
    	this.setQueryType("home");
    	this.$.youtube.getActivities().response(this, "receiveResults");
    	this.videoDetailGroupReset(true);
    },

    search: function(q) {
    	this.$.listPanels.setIndex(0);
    	// this.queryType = "keyword";
    	this.setQueryType("keyword");
    	if(myApiKey.login){
    		this.$.youtube.searchAuth(q).response(this, "receiveResults");
    	}else{
    		this.$.youtube.search(q).response(this, "receiveResults");
    	}
    	this.videoDetailGroupReset(true);
	},

	receiveResults: function(inRequest, inResponse){
		if(!inResponse) return;
		
		// console.log(inResponse);
		
		if(inResponse.error){
			console.log(inResponse.error);
			this.$.videoList.setShowMore(false);
			inResponse = [];
		}else{
			this.$.videoList.setShowMore(true);
		}

		if(this.getQuery() !== this.query_history){
			this.query_history = this.getQuery();
			this.videos = inResponse;
		}else{
			this.videos = this.videos.concat(inResponse);
		}

		// console.log(this.videos);
		this.$.videoList.setVideoList(this.videos);
		this.$.panel.setIndex(0);
		this.$.search.setSearching(false);
		this.$.videoList.setSearching(false);
	},

	receiveResultsRelated: function(inRequest, inResponse){
		if(!inResponse) return;
		this.videosRelated = inResponse;
		// console.log(inResponse);
		this.$.videoListRelated.setShowMore(false);
		this.$.videoListRelated.setVideoList(inResponse);
		this.$.youtube.getStatisticsFromRelated(inResponse).response(this, "receiveStatisticsFromRelated");
	},

	receiveComments: function(inRequest, inResponse){
		if(!inResponse) return;
		// console.log(inResponse);
		if(inResponse.error || inResponse.pageInfo.totalResults < inResponse.pageInfo.resultsPerPage){
			// console.log(inResponse.error);
			this.$.commentList.setShowMore(false);
			// inResponse.items = [];
		}else{
			this.$.commentList.setShowMore(true);
		}
		
		var aux = this.$.commentList.getComments();
		// console.log(aux);
		
		if(aux.length > 0 && aux[0].snippet){
			if(aux[0].snippet.videoId === this._videoIdCurrent){
				aux = aux.concat(inResponse.items);
			}else{
				aux = inResponse.items;
			}
			// inResponse.items = aux;
			// console.log(aux);
			// console.log(inResponse);
		}else{
			aux = inResponse.items;
		}

		this.$.commentList.setComments(aux);
		this.$.commentList.setImageUser(this.$.menuPanel.getImageUser());
		this.$.commentList.setUserName(this.$.menuPanel.getStatus());
	},

	// recive las estadisticas de los videos de la consulta actual y los actualiza en la lista de videos
	receiveStatistics: function(inSender, statistics){
		for (var i = 0; i < statistics.length;  i++) {
			for (var j = 0; j < this.videos.length; j++) {
				if(statistics[i].id === this.videos[j].video_id){
					this.videos[j].statistics = statistics[i].statistics;
					this.videos[j].contentDetails = statistics[i].contentDetails;
					break;
				}
			}
		}
		// console.log(statistics);
		// console.log(this.videos);
		this.$.videoList.setVideoList(JSON.parse(JSON.stringify(this.videos)));
	},

	receiveStatisticsFromRelated: function(inSender, statistics){
		for (var i = 0; i < statistics.length;  i++) {
			for (var j = 0; j < this.videosRelated.length; j++) {
				if(statistics[i].id === this.videosRelated[j].video_id){
					this.videosRelated[j].statistics = statistics[i].statistics;
					this.videosRelated[j].contentDetails = statistics[i].contentDetails;
					break;
				}
			}
		}
		// console.log(this.videosRelated);
		this.$.videoListRelated.setVideoList(JSON.parse(JSON.stringify(this.videosRelated)));
	},

	loadMore: function(inSender, inEvent){
		if(this.getQueryType() === "playlist"){
			this.$.youtube.getPlaylistFromIdNextPage().response(this, "receiveResults");
		}else if(this.getQueryType() === "home"){
			this.$.youtube.getActivities().response(this, "receiveResults");
		}else{
			this.$.youtube.searchNext(this.query).response(this, "receiveResults");
		}
		return true;
	},

	// se alamacena un numero de intentos para hacer una segunda solicitud a la api de youtube
	//Para videos que no con la opcion embebed a false
	startVideo: function(inSender, video){
		console.log("LuneTube -> startVideo: vamos a reproducir el siguiente recurso");
		console.log(video);
		var video_id = video.video_id;
		this.$.videoInfo.setVideoDetails(video);
		if(this._videoIdCurrent !== video_id){
			// console.log("entra");
			this._videoIdCurrent = video_id;
			this.numberOfTries++; //numero de intentos de reproducir
			this.$.yt.startVideo(video_id).response(this, "startPlayVideo");
		}
		return true;
	},

	startPlayVideo: function(inResponse, video){
		if(video.status === "fail" && this.numberOfTries > 0){
			// second try
			// console.log("seccond try");
			this.numberOfTries=0;
			this.$.yt.getVideoRestricted().response(this, "startPlayVideo");
			return;
		}
		// console.log(video);
		if(!video[0].restricted){
			this.$.youtube.search("", this._videoIdCurrent).response(this, "receiveResultsRelated");
			this.$.youtube.getComments(this._videoIdCurrent).response(this, "receiveComments");
			// this.$.videoDetailGroup.show();
			this.videoDetailGroupReset(false);
		}
		this.$.player.setVideoId(video);
		this.$.panel.setIndex(1);
	},

	searchEvent: function(inSender, q){
		if(this.query_history !== q){
			this.setQuery(q);
		}else{
			this.$.search.setSearching(false);
		}
		return true;
	},

	searchFromUrl: function(inSender, url){
		this.$.listPanels.setIndex(1);
    	this.startVideo(inSender, {video_id: url});
		this.$.search.setSearching(false);
		return true;
	},

	queryChanged: function(){
		this.search(this.query);
	},

	queryTypeChanged: function(){
		if(this.getQueryType() === "playlist"){
			this.$.videoList.setIsPlaylist(true);
		}else{
			this.$.videoList.setIsPlaylist(false);
		}
	},

	draggableMenu: function(inSender, inEvent){
		if(this.$.mainPanel.getIndex() === 1){
			this.$.menuPanel.removeClass("menu-panel");
			// this.$.aboutAPP.setContent("");
		}
	},

	showMenuOption: function(inSender, inEvent){
		// this.$.menuOption.show();
		if(this.$.mainPanel.getIndex() === 0){	//cerrar
			this.$.menuPanel.removeClass("menu-panel");
			this.$.mainPanel.setIndex(1);
			// this.$.aboutAPP.setContent("");
		}else{									//abrir
			this.$.menuPanel.addClass("menu-panel");
			this.$.mainPanel.setIndex(0);
			// this.$.aboutAPP.setContent("LuneTube");
		}
		return true;
	},

	backToList: function(inSender, inEvent){
		if(this.$.panel.getIndex() === 0){
			this.$.panel.setIndex(1);
		}else{
			this.$.panel.setIndex(0);
		}
		return true;
	},

	showVideoInfo: function(inSender, inEvent){
		this.$.panel.setIndex(0);
		this.$.videoDetailGroup.setActive(this.$.videoDetailGroup.children[2]);
		this.$.listPanels.setIndex(this.$.videoDetailGroup.active.index-1);
		this.$.infoCommentPanel.setIndex(1);
		this.$.groupButtonVideoInfo.infoSelected();
		return true;
	},

	/*Youtube Login*/
	loadMyChannel: function(){
		this.query_history = "home";
		this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
		this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
		return true;
	},

	homeRequest: function(inSender, inEvent){
		if(myApiKey.login){
			this.$.search.setSearching(true);
			this.query_history = "home";
			this.$.youtube.setNextPage(null);
			this.loadHomeFeeds();
			if(inEvent.name === "menuPanel"){
				this.showMenuOption();
			}
		}
		return true;
	},

	getMychannelresults: function(inRequest, inResponse){
		if(!inResponse) return;
		this._myChannel = inResponse.items[0].contentDetails;
		var dataChannel = inResponse.items[0].snippet;
		this.$.menuPanel.setImageUser(dataChannel.thumbnails.default.url);
		this.$.menuPanel.setStatus(dataChannel.title);
	},

	getMyPlaylistResults: function(inRequest, inResponse){
		if(!inResponse) return;
		this.$.menuPanel.setPlaylistUser(inResponse);
		// this._myPlaylist=in;
		this.$.videoList.setPlaylist(inResponse);
		this.$.videoListRelated.setPlaylist(inResponse);
		this.$.videoList.setRelatedPlaylists(this._myChannel.relatedPlaylists);
		this.$.videoListRelated.setRelatedPlaylists(this._myChannel.relatedPlaylists);
		return;
	},

	loadPlaylist:function(inSender, playlistInfo){
		// this.$.videoDetailGroup.hide();
		this.$.listPanels.setIndex(0);
		// this.$.videoDetailGroup.setActive(false);

		// this.queryType = "playlist";
		this.setQueryType("playlist");
		this.$.search.setSearching(true);
		this.query_history = playlistInfo.id;
		this.$.youtube.getPlaylistFromId(playlistInfo.id).response(this, "receiveResults");
		this.showMenuOption();
		this.videoDetailGroupReset(true);
		return true;
	},


	loadPlaylistById: function(inSender, playlist){
		var playlist_id = null;

		switch(playlist){
			case "history":
				playlist_id = this._myChannel.relatedPlaylists.watchHistory;
			break;
			case "favorites":
				playlist_id = this._myChannel.relatedPlaylists.favorites;
			break;
			case "likes":
				playlist_id = this._myChannel.relatedPlaylists.likes;
			break;
			case "watchLater":
				playlist_id = this._myChannel.relatedPlaylists.watchLater;
			break;

		}
		if(playlist_id){
			this.$.listPanels.setIndex(0);
			// this.$.videoDetailGroup.setActive(false);
			this.videoDetailGroupReset(true);

			// this.queryType = "playlist";
			this.setQueryType("playlist");
			if(myApiKey.login){
				this.$.search.setSearching(true);
				this.query_history = playlist_id;
				this.$.youtube.getPlaylistFromId(playlist_id).response(this, "receiveResults").error(this, "receiveResults");
				this.showMenuOption();
			}
		}
		return true;
	},

	radioGroupTap: function(inSender, inEvent){
		if(inSender.active){
			if(inSender.active.index){
				this.$.listPanels.setIndex(inSender.active.index-1);
			}
		}
	},

	videoFinished: function(inSender, inEvent){
		var nextId = null;
		for (var i = 0; i < this.videos.length; i++) {
			if(this.videos[i].video_id === this._videoIdCurrent){
				if(this.videos[i+1]){
					nextId = this.videos[i+1];
				}
				break;
			}
		}
		// console.log(nextId);
		if(nextId){
			this.startVideo(inSender, nextId);
		}else{
			return true;
		}
	},

	videoDetailGroupReset: function(option){
		this.$.resultsButton.setDisabled(false);
		this.$.relatedButton.setDisabled(option);
		this.$.commentButton.setDisabled(option);
	},

	panelChanged: function(){
		/*if(this.$.panel.getIndex()>0){
			webos.setFullScreen(true);
		}else{
			webos.setFullScreen(false);
		}*/
	},

	//otros items del menu APP de webos
	appMenuItemSelected: function(inSender, inEvent){
		return;
	},

	activate: function(a, b){
		console.log("\n***window Active***");
		// console.log(a);
		// console.log(b);
		if(this._platform === "webOS"){
			this.$.player.playVideo();
		}
		return true;
	},

	deactivate: function(a, b){
		console.log("\n***window Unactive***");
		// console.log(a);
		// console.log(b);
		if(this._platform === "webOS"){
			this.$.player.pauseVideo();
		}
		return true;
	},

	groupControlTap: function(inSender, inEvent){
		this.$.infoCommentPanel.setIndex(inEvent.index);
	},

	addVideoToPlaylist: function(inSender, resource){
		this.$.youtube.setVideoToPlaylist(resource.snippet);
		return true;
	},

	removeFromPlaylist: function(inSender, resource){
		this.$.youtube.deleteVideoFromPlaylist(resource.videoId);
		return true;
	},

	createPlaylist: function(inSender, newPlaylist){
		// console.log(newPlaylist);
		this.$.youtube.createPlaylist(newPlaylist).response(this, "createPlaylistResult");
		return true;
	},

	createPlaylistResult: function(inRequest, inResponse){
		var playlistUpdated = JSON.parse(JSON.stringify(this.$.videoList.getPlaylist()));
		playlistUpdated.items.unshift(inResponse);
		this.$.videoList.setPlaylist(playlistUpdated);
		this.$.videoListRelated.setPlaylist(playlistUpdated);
		this.$.menuPanel.setPlaylistUser(playlistUpdated);
	},

	updateTime: function(inSender, inEvent){
		// console.log("Llega al controller");
		// console.log(inSender);
		// console.log(inEvent.time);
		this.$.player.setCurrentTime(inEvent.time);
		this.$.panel.setIndex(1);
		this.$.player.showControlsPlayer(inSender, inEvent);
		return true;
	},

	setComment: function(inSender, inEvent){
		var snippet = {
			snippet:{
				videoId : this._videoIdCurrent,
				topLevelComment:{
					snippet:{
                        textOriginal: inEvent.comment.snippet.topLevelComment.snippet.textDisplay,
                    }
				}
			}
		};
		this.$.youtube.setComment(snippet);
		return true;
	},

	setReply: function(inSender, inEvent){
		// console.log("Llega al controller");
		// console.log(inEvent);
		this.$.youtube.setReplyComment(inEvent.snippet);
		return true;
	},

	loadMoreComments: function(inSender, inEvent){
		this.$.youtube.getNextComments(this._videoIdCurrent).response(this, "receiveComments");
		return true;
	},

	getCurrentOsPlatform: function(){
		// var userAgent = navigator.userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
		var userAgent = navigator.userAgent.match(/(LuneOS|webOS|hpwOS|Android)/g);
		if(userAgent){
			for (var i = 0; i < userAgent.length; i++) {
				if(userAgent[i] === "LuneOS"){
					this._platform = "LuneOS";
					break;
				}else{
					this._platform = "webOS";
				}
			}
		}
		return this._platform;
	},

	// Experimental
	launchFinished: function(inSender, inResponse) {
		console.log(inSender);
		console.log(inEvent);
	    console.log("Launch browser success, results=" + enyo.json.stringify(inResponse));
	},
	launchFail: function(inSender, inResponse) {
	    console.log("Launch browser failure, results=" + enyo.json.stringify(inResponse));
	},
	launchBrowser: function(inSender, inResponse)
	{
	    this.$.launchBrowserCall.send({"id": "org.webosports.app.browser", "params":{"target": "http://www.google.com"}});
	},

	doubleTap: function(inSender, inEvent){
		console.log("Ha legado el evento doble");
	},


	/*windowRotated: function(inSender, inEvent){
		console.log("se ha rotado el dispositivo");
		return true;
	}*/
});