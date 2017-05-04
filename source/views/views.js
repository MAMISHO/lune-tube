enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	classes:"enyo-fit",
	published:{
		query_history: "",
		query: "",
		queryType: "keyword" //[ keyword | playlist | home ]
	},
	handlers: {
    	onLoadMore: "loadMore",
    	onStartVideo: "startVideo",
    	onStartPlayVideo: "startPlayVideo",
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
    	onReciveAllPlaylist: "getMyPlaylistResults",
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
		{fit:true, classes:"enyo-fit", components:[
			{kind: 'Panels',name:"mainPanel", fit: true, classes: 'panels-sliding-menu enyo-fit', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, draggable:true, onTransitionFinish:"draggableMenu", index:1,  components: [
				// {kind:"LuneTube.Menu", name:"menuPanel"},
				{content:""},//old menu
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
							]},

						]},
						{name: 'content_player',fit: true, doubleTapEnabled: true, ondoubletap: "doubleTap", components: [
								{kind: "Player", name:"player"}
						]},
					]}
				]}
			]},
			/*{kind:"Pullout", name:"Pullout", classes:"pullout", components:[
				{kind:"LuneTube.Menu", name:"menuPanel"},
			]},*/
			{kind: "Pullout",
			 fit:true,
			 classes: "pullout enyo-fit", onDropPin: "dropPin", onShowTraffic: "showTraffic", onMapTypeSelect: "mapTypeSelect", onBookmarkSelect: "bookmarkSelect", components: [
				{kind:"LuneTube.Menu", fit:true, name:"menuPanel", style:"height:100%"},
			]}
		]},
		
		{name: "messagePopup", classes: "onyx-sample-popup info-popup", kind: "onyx.Popup", autoDismiss:true, centered: false, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
			{name:"boxNotification", content:"", allowHtml:true, classes:"info-version"}
		]},
		{kind:"AppMenu", onSelect: "appMenuItemSelected", components: [
			{content:"Paste text", ontap: "pasteLink"},
			// {content:"Copy", ontap: "doCopyText"},
			{content:"Lock screen", ontap:"doLockScreen"}
		]},

		// Hiden domponents
		// My api de youtube
		{kind: "YoutubeApi", name: "youtube"},
		{kind: "YoutubeVideo", name: "yt"},
		{kind: "WatchVersion", name: "watchVersion", onThereIsNewVersion: "thereIsNewVersion"},

		/*Aplication events*/
		{kind: "enyo.ApplicationEvents", onWindowRotated: "windowRotated", onactivate:"activate", ondeactivate:"deactivate", onWindowParamsChange: "windowParamsChange", onrelaunch: "windowParamsChange", onwebOSRelaunch: "windowParamsChange"},
		{kind: "enyo.Signals",
			onactivate: "handleActivate",
			ondeactivate: "handleDeactivate",
			onmenubutton: "handleMenuButton",
			onApplicationRelaunch: "windowParamsChange",
			onlowmemory:"handleLowMemory",
			onWindowParamsChange: "windowParamsChange",
			onorientationchange: "orientationChange",
			onbackbutton: "backPanel",
			ondeviceready: "cordovaReady",
			onpause: "onPause",
			onresule: "onResume",
			onvolumedownbutton: "volumeDownButton",
			onvolumeupbutton: "volumeUpButton"

		},

		/*Screen Services*/
		{kind: "LunaService",
			 name: "psDisplay",
		     service: "palm://com.palm.display/control/",
		     method: "status",
		     onSuccess: "requestDisplayStatusSuccess",
		     onFailure: "requestDisplayStatusFailure",
		     onResponse: "gotResponse",
		     subscribe: true
		},

		/*Audio Service*/
		{name: "psMediaStatus", kind: "LunaService", service: "palm://com.palm.audio/", method: "media/status", onSuccess: "onSuccess_RequestMediaStatus", onFailure: "onFailure_RequestMediaStatus", subscribe: true},
		{name: "psAVRCPStatus", kind: "LunaService", service: "palm://com.palm.keys/", method: "media/status", onSuccess: "onSuccess_RequestAVRCPStatus", onFailure: "onFailure_RequestAVRCPStatus", subscribe: true},
		{name: "psHeadsetStatus", kind: "LunaService", service: "palm://com.palm.keys/headset/", method: "status", onSuccess: "onSuccess_RequestHeadsetStatus", onFailure: "onFailure_RequestHeadsetStatus", subscribe: true},
		{name: "psBroadcaster", kind: "LunaService", service: "palm://com.palm.service.mediabroadcast/", method: "registerBroadcaster", onSuccess: "onSuccess_SetBroadcaster", onFailure: "onFailure_SetBroadcaster", subscribe: true},
		{name: "psUpdateBroadcaster", kind: "LunaService", service: "palm://com.palm.service.mediabroadcast/", method: "update", onSuccess: "onSuccess_SetBroadcaster", onFailure: "onFailure_SetBroadcaster"},

		/*Internet Services*/

		{name: "internetStatus", kind: "LunaService", service: "palm://com.palm.connectionmanager/",
			method     : "getStatus",
		    onSuccess  : "internetStatusFinished",
		    onFailure  : "internetStatusFail",
		    onResponse : "internetGotResponse",
    		subscribe  : true
		},
	],
	videos:[],
	videosRelated:[],
	numberOfTries:0,
	_myChannel:null,
	_videoIdCurrent:null,
	// _platform: "webOS",
	_platform: null,
	_volume:null,
	_android_is_ready: false,
	_isInternetConnectionAvailable: false,
	_loadCompleted: false,
	create:function() {
		this.inherited(arguments);
		/*if (enyo.platform.webos < 4){
			this.$.panel.realtimeFit = false;
		}*/
		this.internetGetStatus();
		if(enyo.platform.safari){
			console.log("Es safari");
			// this.internetGetStatus();
			enyo.dispatcher.listen(window, 'orientationchange', this.bindSafely(this.orientationChange));
			enyo.dispatcher.listen(window, 'offline', this.bindSafely(this.onOffline));
			enyo.dispatcher.listen(window, 'online', this.bindSafely(this.onOnline));
		}
	},

	rendered:function() {
        this.inherited(arguments);

        this.$.mainPanel.setIndex(1);
        this.$.listPanels.setIndex(0);

        // this.loginAndLoadData(); //login
		
		/*Start webOS/ luneos config*/
		currentOsPlatform = this.getCurrentOsPlatform();
		console.log("Hi " + currentOsPlatform + " --> starting debug");
		// webos.setWindowOrientation("free");

		if(currentOsPlatform){ //is is webos or luneos platform

			webos.setWindowOrientation("free");
    		regionCode = webos.localeInfo().localeRegion.toUpperCase(); //async, maybe is default at the first time
			this.windowParamsChange();
			
			if(window.PalmSystem){
				console.log("Entra a modo background");
				PalmSystem.keepAlive(true);
				enyo.webos.keyboard.setResizesWindow(false);

				this.RequestHeadsetStatus();
				this.RequestAVRCPStatus();
				// this.internetGetStatus();
				
				this.$.psBroadcaster.send();
				this.$.psMediaStatus.send({});
				this.internetGetStatus();

			}

		}

		// if(enyo.platform.safari){
		// 	this.internetGetStatus();
		// }

		// else{//cordova platforms support. Also see cordovaReady function in this scritp

			// enyo.dispatcher.listen(window, 'orientationchange', this.bindSafely(this.orientationChange));
			// enyo.dispatcher.listen(window, 'offline', this.bindSafely(this.onOffline));
			// enyo.dispatcher.listen(window, 'online', this.bindSafely(this.onOnline));
		// }
		// this.internetGetStatus();

		// this.$.watchVersion.startJob("checkupdates", enyo.bind(this, "checkupdates"),2000, "low");
		// enyo.job("jobName", enyo.bind(this, "checkupdates"), 2000, "low");		
		/*End webOS / luneOS config*/
    },

    loginAndLoadData: function(){

    	if(this._loadCompleted) return true;

    	var cookie = enyo.getCookie("session_youtube");
		var youtube_token = enyo.getCookie("youtube_token");
		var youtube_refresh = enyo.getCookie("youtube_refresh");


		var token = {};
		if(youtube_token && youtube_refresh){
			console.log("token vigente");
			token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;

				myApiKey.login = true;

		}else if(!youtube_token && youtube_refresh){
			console.log("token expirado, se refresaca el token");
			 token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;
				myApiKey.login = false;

			this.$.youtube.refreshToken();
		}else{
			console.log("no hay token, necesita iniciar sesion");
			this.queryChanged();
		}

		if(myApiKey.login){
				this.loadHomeFeeds();
				this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
				this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
				this.$.menuPanel.setLogin(myApiKey.login);
		}


		/*look for update*/
		this.checkupdates();
		this._loadCompleted = true; //data is complete loaded
    },

    windowParamsChange: function(inSender, inEvent){

    	if(enyo.webos.launchParams()){

    		console.log(PalmSystem.launchParams);
    		var launchParams = {};
    		
    		if(typeof PalmSystem.launchParams === "string"){
    			
    			if(PalmSystem.launchParams.length > 0){
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
	    				return true;
    				}

    				video_id = launchParams.target.split("youtu.be/");
    				
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
    			this.playVideoFromUrl(params.url);
    			return true;
    		}

    		if(params.searchTerm){
    			/*this.search(params.searchTerm);
    			this.$.search.setSearchTerm(params.searchTerm);*/
    			this.playVideoFromUrl(params.searchTerm);
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
    	this.query_history = "";
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
    /**
     * @q  {string} palabra de búsqueda
     * @return {[type]}
     */
    search: function(q) {
		// if (/\S/.test(this.query)) {

			this.$.listPanels.setIndex(0);
			// this.queryType = "keyword";
			this.setQueryType("keyword");
			if (myApiKey.login) {
				this.$.youtube.searchAuth(q).response(this, "receiveResults");
			} else {
				this.$.youtube.search(q).response(this, "receiveResults");
			}
			this.videoDetailGroupReset(true);
		// }
	},

	receiveResults: function(inRequest, inResponse){
		if(!inResponse) return;
		
		// console.log(inResponse);
		
		if(inResponse[0].nextPage){
			this.$.videoList.setShowMore(true);
		}else if (inResponse.error){
			
			console.log(inResponse.error);
			this.$.videoList.setShowMore(false);
			inResponse = [];

		}else{
			this.$.videoList.setShowMore(false);
		}

		if(this.getQuery() !== this.query_history){
			this.query_history = this.getQuery();
			this.videos = inResponse;
		}else{
			this.videos = this.videos.concat(inResponse);
		}

		// console.log(this.videos);
		this.$.videoList.setVideoList(this.videos);

		
		this.$.search.setSearching(false);
		this.$.videoList.setSearching(false);

		if(!this.$.player.getVideoStatus()){
			this.$.panel.setIndex(0);	
		}
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

		/*console.log(this.$.commentList.getUserName());
		var userName = this.$.commentList.getUserName();
		if(!userName){
			this.$.commentList.setImageUser(this.$.menuPanel.getImageUser());
			this.$.commentList.setUserName(this.$.menuPanel.getStatus());
		}*/
		this.$.commentList.setImageUser(this.$.menuPanel.getImageUser());
		this.$.commentList.setUserName(this.$.menuPanel.getStatus());
		// this.$.commentList.render();
		// this.$.commentList.$.list.render();
		
	},

	// recive las estadisticas de los videos de la consulta actual y los actualiza en la lista de videos
	receiveStatistics: function(inSender, statistics){

		var videosAUX;

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

		try {
          videosAUX = JSON.parse(this.videos);
        } catch (err) {
          videosAUX = JSON.parse(JSON.stringify(this.videos)); 
        }
		this.$.videoList.setVideoList(videosAUX);
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

		var video_id = video.video_id;
		this.$.videoInfo.setVideoDetails(video);

		if(this._videoIdCurrent !== video_id){

			this.$.player.unload();
			if(video.image_high){
				this.$.player.setPosterTmp(video.image_high);
			}
			// this.$.panel.setIndex(1);
			this.$.panel.next();
			this.$.player.startVideoPlay();

			/*	antes de realizar la peticion revisamos si ya tenemos los datos del
				video en la cache
			*/
			var videoCached = cache.getVideo(video_id);
			this._videoIdCurrent = video_id;
			
			if(videoCached){
				// console.log("sacado de la cache: " + video_id);
				return this.startPlayVideo(this, videoCached);

			}else{ /*En el caso de no tener el video en la cache, lanzamos la petición*/
				
				this.numberOfTries++; //numero de intentos de reproducir
				// return this.$.yt.startVideo(video_id).response(this, "startPlayVideo");
				this.$.yt.youtubeDecryptLocalService(video_id).response(this,"decipherVideo");
			}

		}
		return true;
	},

	startPlayVideo: function(inResponse, video){

		/*after 0.2.5 just we use youtubeDecryptLocal for all transactiosn*/
		/*we need to implement cache version for webos*/

		/*if(video.posterTmp && this.numberOfTries === 1){
			// this.$.player.startVideoPlay();
			this.$.player.setPosterTmp(video.posterTmp);
			// this.$.panel.setIndex(1);
		}*/

		if(video.status === "fail" && this.numberOfTries > 0){// second try
			

			if(this.numberOfTries === 1){ // restricted conutry

				
				/*Youtuebe puede restringir un video en algunos paises pero ser públicos*/
				if (video.errorcode === 150){//video restringido en el pais actual pero publico
					console.log("seccond try");
					this.$.yt.getVideoRestricted().response(this, "startPlayVideo");
					this.numberOfTries++;

				}else{ //video restringido en la primera llamada, no hace falta hacer la segunda
					console.log("third try directo saltando la segunda");
					this.$.yt.youtubeDecryptLocalService().response(this,"decipherVideo");
					this.numberOfTries = 3;
				}
				
				return;

			}else if(this.numberOfTries === 2){

				console.log("third try");
				// this.$.yt.youtubeDecipherService().response(this, "startPlayVideo"); //Service online or local NODE.JS
				this.$.yt.youtubeDecryptLocalService().response(this,"decipherVideo");
				this.numberOfTries++;
				return;

			}else{

				this.numberOfTries=0;
			}
		}

		this.numberOfTries = 0;

		if(!video[0].restricted){
			if(video[0].descriptionHtml){
				this.$.videoInfo.setVideoDescription(video[0].descriptionHtml);
			}
			this.$.youtube.search("", this._videoIdCurrent).response(this, "receiveResultsRelated");
			this.$.commentList.setComments([]);
			this.$.infoCommentPanel.setIndex(1);
			this.$.groupButtonVideoInfo.infoSelected();
			// this.$.youtube.getComments(this._videoIdCurrent).response(this, "receiveComments");
			// this.$.videoDetailGroup.show();
			this.videoDetailGroupReset(false);
		}

		/*If the video has a html description we replaced*/
		// console.log(video);
		// this.$.videoInfo.setVideoDescription(video[0].descriptionHtml);

		// this.$.panel.next();
		this.$.player.setVideoId(video);
		// this.$.panel.setIndex(1);

		/*Si el video no salió de la cache la insertamos*/
		var videoCached = cache.getVideo(this._videoIdCurrent);
		if(!videoCached){
			// console.log("cacheado por primera vez: " + this._videoIdCurrent);
			cache.setVideo(this._videoIdCurrent, video);
		}


		/*actualizamos el video que se esta reproduciendo en la lista*/
		// console.log(this.videos);
		var index = 0;
		/*if(!!Object.assign){ // si el navegador soporta ES6
			index = this.videos.findIndex(x => x.video_id === this._videoIdCurrent);
		}else{
			for (var i = this.videos.length - 1; i >= 0; i--) {
				if(this.videos[i].video_id === this._videoIdCurrent){
					index = i;
					break;
				}
			}
		}*/

		for (var i = this.videos.length - 1; i >= 0; i--) {
				if(this.videos[i].video_id === this._videoIdCurrent){
					index = i;
					break;
				}
			}

		this.$.videoList.updateSelectedVideo(index);

		return true;
	},

	decipherVideo: function(inRequest, inResponse){
		if(!inResponse) return;

		var a = this.$.yt.youtubeDecryptLocalServiceResponse(null, inResponse);
		this.numberOfTries=0;
		return true;
	},

	searchEvent: function(inSender, q){

		if(!this._isInternetConnectionAvailable){
			this.$.videoList.setVideoList([]);
			this.$.search.setSearching(false);
			return true;
		}

		if(this.query_history !== q){
			this.setQuery(q);
		}else{
			this.$.search.setSearching(false);
		}
		return true;
	},

	searchFromUrl: function(inSender, url){
		console.log("llega url");
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
		/*if(this.$.mainPanel.getIndex() === 0){	//cerrar
			this.$.menuPanel.removeClass("menu-panel");
			this.$.mainPanel.setIndex(1);
			// this.$.aboutAPP.setContent("");
		}else{									//abrir
			this.$.menuPanel.addClass("menu-panel");
			this.$.mainPanel.setIndex(0);
			// this.$.aboutAPP.setContent("LuneTube");
		}*/

		this.$.pullout.toggle();
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
		// console.log("1");
		// console.log(inResponse);
		this._myChannel = inResponse.items[0].contentDetails;
		var dataChannel = inResponse.items[0].snippet;
		this.$.menuPanel.setImageUser(dataChannel.thumbnails.default.url);
		this.$.menuPanel.setStatus(dataChannel.title);
		
		/*metemos los datos de ususario para que pueda comentar*/
		this.$.commentList.setImageUser(dataChannel.thumbnails.default.url);
		this.$.commentList.setUserName(dataChannel.title);
	},

	getMyPlaylistResults: function(inRequest, inResponse){
		if(!inResponse) return;
		if(inResponse.items.length < inResponse.pageInfo.totalResults) return;
		// console.log("2");
		// console.log(inResponse);
		// console.log(this._myChannel);
		this.$.menuPanel.setPlaylistUser(inResponse);
		// this._myPlaylist=in;
		this.$.videoList.setPlaylist(inResponse);
		this.$.videoListRelated.setPlaylist(inResponse);
		if(this._myChannel){
			if(this._myChannel.relatedPlaylists){
				this.$.videoList.setRelatedPlaylists(this._myChannel.relatedPlaylists);
				this.$.videoListRelated.setRelatedPlaylists(this._myChannel.relatedPlaylists);
			}
		}
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

	/*
	cargamos los comentarios cuando el panel es mostrado
	Es necesario comprobar que los comentarios no a sido cargados aún, caso contrario no se hace nada
	*/
	loadComments: function(){
		
		var oldComments = this.$.commentList.getComments();

		if(oldComments.length > 0){

			if(oldComments[0].snippet){

				if(oldComments[0].snippet.videoId !== this._videoIdCurrent){

					this.$.youtube.getComments(this._videoIdCurrent).response(this, "receiveComments");

				}
			}
		}else{
			this.$.youtube.getComments(this._videoIdCurrent).response(this, "receiveComments");
		}
	},

	radioGroupTap: function(inSender, inEvent){
		if(inSender.active){
			if(inSender.active.index){
				this.$.listPanels.setIndex(inSender.active.index-1);
			}
		}
	},

	videoFinished: function(inSender, inEvent){
		console.log("Views -> videoFinished: reproduce el sieguinet video ");
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
		}
		return true;
	},

	videoDetailGroupReset: function(option){
		this.$.resultsButton.setDisabled(false);
		this.$.relatedButton.setDisabled(option);
		this.$.commentButton.setDisabled(option);
	},

	panelChanged: function(inSender, inEvent){		
		/*console.log("Cambia el panel");
		console.log(inEvent.originator.name);*/
		switch(inEvent.originator.name) {
		    case "panel":

		        if(this.$.panel.getIndex()>0){
					// webos.setFullScreen(true);
					this.$.pullout.hide();
					// enyo.webos.keyboard.forceHide();
					if(enyo.platform.webos < 4){
						PalmSystem.keyboardHide();
					}
				}else{
					// webos.setFullScreen(false);
					/*if(this._android_is_ready){
						screen.unlockOrientation();
					}*/
					this.$.pullout.show();
				}

		        break;

		    case "listPanels":
		    this.$.videoDetailGroup.setActive(this.$.videoDetailGroup.children[this.$.listPanels.getIndex()]);
		    case "infoCommentPanel":
		        // console.log("llama a comments");
		    	if(this.$.listPanels.getIndex() === 2 && this.$.infoCommentPanel.getIndex() === 0){
		    		
		    		this.loadComments();
		    	}

		        break;
		    default:
		        
		}
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
			console.log("prueba video no se pausa");
			// this.$.player.pauseVideo(); //force background plaing
			this.$.player.playVideo();
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
		/*var userAgent = navigator.userAgent.match(/(LuneOS|webOS|hpwOS)/g);
		if(userAgent){
			for (var i = 0; i < userAgent.length; i++) {
				if(userAgent[i] === "LuneOS"){
					this._platform = "LuneOS";
					break;
				}else{
					this._platform = "webOS";
				}
			}
		}*/
		if(enyo.platform.webos >= 4){
			this._platform = "LuneOS";
		}else if(enyo.platform.webos < 4){
			this._platform = "webOS";
		}else{
			this._platform = null;
		}
		return this._platform;
	},

	pasteLink: function (){
		webos.getClipboard(enyo.bind(this, "pasteText"));
		return true;
	},

	pasteText: function(text){
		console.log("pasteLink - " + text);
		this.playVideoFromUrl(text);

	},

	playVideoFromUrl: function(text){
		
		var newVideo={};

		if(text.trim().length > 0){

    		var match = text.match("v=([a-zA-Z0-9\_\-]+)&?")[1];

    		if(match){

    			newVideo.video_id = match;
	    		this.startVideo(text, newVideo);
	    		this.$.listPanels.setIndex(1);

    		}else{

    			this.search(text);
		    	this.$.search.setSearchTerm(text);
		    	return true;

    		}
    	}
    	return true;
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
	    this.$.launchBrowserCall.send({"id": "org.webosports.app.browser", "params":{"target": "https://www.google.com"}});
	},

	doubleTap: function(inSender, inEvent){
		console.log("Ha llegado el evento doble");
		return true;
	},

	doLockScreen: function(inSender, inEvent){
		console.log("Se solicita bloqueo de pantalla");
		return true;
	},

	/*************************
	*      Android events    *
	**************************/

	orientationChange: function(inSender, inEvent){
        console.log("cambia la orientación");
        // console.log(inSender);
        // console.log(inEvent);
        return true;
    },

    onOffline: function(inSender, inEvent){
    	console.log("Views -> onOffilen : NO esta conectado a internet");
    	this._isInternetConnectionAvailable = false;
    	this.notifyInternetsrtatus();
    	return true;
    },

    onOnline: function(inSender, inEvent){
    	console.log("Views -> onOnline : Esta conectado a internet");
    	this._isInternetConnectionAvailable = true;
    	this.notifyInternetsrtatus();
    	return true;
    },

    /*home button
	se usa cordova plugin add https://github.com/tomloprod/cordova-plugin-appminimize.git
    */

    backPanel: function(inSender, inEvent){
    	console.log("\n--------------------------------------------------------");
        console.log("Presionan el boton Atras");
        /*console.log(inSender);
        console.log(inEvent);*/
        console.log(enyo.json.stringify(enyo.platform));
        console.log(this.$.panel.getIndex());
        if(this.$.player.$.panel.isAtMin()){ //si esta el panel de configuración del video se oculta
        	this.$.player.$.panel.toggle();
        	return true;
        }
        if(this.$.mainPanel.getIndex() === 0){
        	this.$.mainPanel.setIndex(1);
        }else{
        	if(!enyo.platform.webos && this.$.panel.getIndex() === 0){
        		console.log("Es android y se manda a minimizar");
        		window.plugins.appMinimize.minimize();
        	}else{
        		this.$.panel.setIndex(0);
        	}
        }
        return true;
    },

    /*se activa el modo background
    Se hace uso de la libreria
    Cordova Background Plugin -> https://github.com/katzer/cordova-plugin-background-mode
    */

    /*intents
	usa https://www.npmjs.com/package/cordova-plugin-intent
    */

    cordovaReady: function(inSender, inEvent){

    	// Android events
    	console.log("cordova es Ready");
		/*enyo.dispatcher.listen(window, 'orientationchange', this.bindSafely(this.orientationChange));
		enyo.dispatcher.listen(window, 'offline', this.bindSafely(this.onOffline));
		enyo.dispatcher.listen(window, 'online', this.bindSafely(this.onOnline));*/
		// this.internetGetStatus();
    	
    	// enyo.dispatcher.listen(window, 'offline', onOffline);
		// enyo.dispatcher.listen(window, 'online', onOnline);
		this._android_is_ready = true;

		/*Start android intents*/

		window.plugins.intent.getCordovaIntent(function (Intent) {
        	console.log(Intent);
		}, function () {
			console.log('Error');
		
		});

		window.plugins.intent.setNewIntentHandler(function (Intent) {
        	console.log(Intent);
    	});

		//End android intents



  	/*android backgrund mode config*/
    	
		cordova.plugins.backgroundMode.setDefaults({
		    title: "LuneTube",
		    text: "Playing",
		    icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
		    color: "Cf0652", // hex format like 'F14F4D'
		    resume: true,
		    hidden: true,
		    bigText: true
		});


		/*android volume control*/
		this._volume = cordova.plugins.VolumeControl;
		// this.$.menuPanel.setDevice("android");
        return true;
    },

    onPause: function(inSender, inEvent){

   			if(this.$.player.getVideoStatus()){
   				cordova.plugins.backgroundMode.enable();
		        cordova.plugins.backgroundMode.on('activate', function() {
		   			cordova.plugins.backgroundMode.disableWebViewOptimizations();
				});
   			}else{
   				cordova.plugins.backgroundMode.disable();
   			}
		
    	return true;
    },

    onResume: function(inSender, inEvent){

    },


    /*audio con
	https://github.com/manusimpson/Phonegap-Android-VolumeControl
    */
    volumeUpButton: function(inSender, inEvent){
		// console.log("llega el evento de volumeUpButton");
		var sound = enyo.$.app.$.player.$.player.getSources()[0];
		if(this._volume !== null){

    		this._volume.getVolume(
				function getVolSuccess(v){ // usamos el cambio de tipos a number
					v -= 1;
					v += 7;
					var vol = 7;
					vol += v;
					console.log(typeof vol);
					return cordova.plugins.VolumeControl.setVolume(vol);	
				},
				function getVolError(){
					//Manage Error
					console.log("error");
			    }
			);
    	}
		return true;
	},

    volumeDownButton: function(inSender, inEvent){
    	// console.log("llega el evento de volumeDownButton");
    	if(this._volume !== null){
    		this._volume.getVolume(
				function getVolSuccess(v){	// usamos el cambio de tipos a number
					v -= 1;
					var vol = 6;
					vol = v - vol;
					console.log(typeof v);
					return cordova.plugins.VolumeControl.setVolume(v);	
				},
				function getVolError(){
					//Manage Error
					console.log("error");
			    }
			);
    	}
    	return true;
    },

	getSystemVolume: function(callback){
		this._volume.getVolume(
			function getVolumeSuccess(v){
				console.log(v);

				return callback(null, parseInt(v)); //relsolvemos el cambio de tipos
			},
			function getVolumeError(){
				//Manage Error
				console.log("error");
				return callback("there is error", null);
		    }
		);
	},


/*Webos services*/

// Audio

/*	onSuccess_RequestMediaStatus: function(inService, inRespose){
		this.log(inService);
		this.log(inResponse);
	},
*/
	RequestHeadsetStatus: function () // Subscribes to headset status service. Used for AVRCP and headset button controls.
	{
		this.log();
		
		if(window.PalmSystem)
		{
			this.log(this.$.psHeadsetStatus);
			this.$.psHeadsetStatus.send({});
		}
		
	},

	onSuccess_RequestHeadsetStatus: function (sender, response)
	{
		this.log();
		this.log(response);
		//this.log(response.action);
		
		if(response.key === "headset_button" && response.state)
		{
			
			switch (response.state)
			{
				case "single_click":
					this.playPause();
					break;
				
				case "double_click":
					this.onClickNext();
					break;
			}
			
		}
		

	},

	onFailure_RequestHeadsetStatus: function (sender, response)
	{
		this.log(response);
		

	},


	RequestAVRCPStatus: function () // Subscribes to headset status service. Used for AVRCP and headset button controls.
	{
		this.log();
		
		if(window.PalmSystem)
		{
			this.$.psAVRCPStatus.send({});
		}
		
	},
	
	onSuccess_RequestAVRCPStatus: function (sender, response)
	{
		this.log();
		this.log(response);
		
		if(response.state === "down")
		{
				
			switch (response.key)
			{
				case "next":
					this.onClickNext();
					break;
					
				case "prev":
					this.onClickPrev();
					break;
					
				case "pause":
					this.playPause(false);
					break;
					
				case "stop":
					this.log("stop not supported");
					this.playPause(false);
					break;
					
				case "play":
					this.playPause(true);
					break;
	
				case "nextAndPlay":
					this.log("nextAndPlays not supported");
					
					break;			
					
				case "togglePausePlay":
					this.log("togglePausePlay");
					this.playPause();
					break;
					
				case "repeat-all":
					this.$.Playback.setRepeatMode(1);
					break;
				case "repeat-track":
					this.$.Playback.setRepeatMode(2);
					break;
				case "repeat-none":
					this.$.Playback.setRepeatMode(0);
					break;
				case "shuffle-on":
					this.$.Playback.shufflePlaylist(true);

					break;
				case "shuffle-off":
					this.$.Playback.shufflePlaylist(false);

					break;
					
				default:
					this.log("Unknown AVRCP event: " + response.key);
					break;
					
			}
		
		}	
		
		
		
		

	},
	
	onFailure_RequestAVRCPStatus: function (sender, response)
	{
		this.log(response);
		

	},

	RequestMediaStatus: function (sender, callback) // Subscribes to media status service. Currently used for setting volume slider when system media volume is changed with the HW volume rocker.
	{
		this.log();
		//return true;
		
		this.cbMediaStatus = callback;		
		
		if(window.PalmSystem)
		{
			var req = this.$.psMediaStatus.send({});
			req.callback = callback;
		}
		
	},
	
	onSuccess_RequestMediaStatus: function (sender, response, request)
	{
		this.log();
		
		this.log(response.action);
		
		//changed for changing volume
		//enabled for plugging in headphones
		if(response.action === "changed" || response.action === "enabled")
		{
			//this.cbMediaStatus(response.volume);
			request.callback(response.volume);
		}
		

	},

    onFailure_RequestMediaStatus: function (sender, response)
	{
		this.log(response);
		

	},

	//se informa de una nueva versión
	thereIsNewVersion: function(inEvent, inSender){
		// console.log("popup : mostrar nueva version");
		// console.log(inSender);

    	this.createComponent({
					kind: "infoVersion",
					container: this.$.boxNotification,
					info: inSender
		});
    	this.$.messagePopup.show();
    	return true;
	},

	checkupdates: function(){
		// console.log("Prepara para mandar a chequear actualización");
		if(this._isInternetConnectionAvailable){
			// this.log("SE manda a chequear la version");
			this.$.watchVersion.getNewVersion();
		}
	},


// Internet

	internetStatusFinished : function(inSender, inResponse){
		console.log("Views : internetStatusFinished -> llega el evento a internetStatusFinished");
		enyo.log("getStatus success, results=" + enyo.json.stringify(inResponse));
	},

	internetStatusFail : function(inSender, inResponse){
		console.log("Views : internetStatusFail -> llega el evento a internetStatusFail");
		enyo.log("getStatus failure, results=" + enyo.json.stringify(inResponse));
	},

	internetGetStatus : function(inSender, inResponse){

		if (window.PalmSystem){

			console.log("Views : internetGetStatus -> Solicita status de internet");
			this.$.internetStatus.send({ "subscribe": true });

		}else{
			// if(!enyo.platform.android && !enyo.platform.webos){

				this._isInternetConnectionAvailable = navigator.onLine;
				
				if(!navigator.onLine){ //desktop version
					this.$.videoList.setMessage('No network connection');
				}

				// comprobamos que no se ejecuta en android con cordova para usarlo en el escritorio
				if(!window.cordova)
					this.notifyInternetsrtatus();
			// }
		}
		return true;
	},

	internetGotResponse: function(inSender, inResponse){
		if (window.PalmSystem){
			console.log("Is internet available : " + inResponse.isInternetConnectionAvailable);
			this._isInternetConnectionAvailable = inResponse.isInternetConnectionAvailable;
		}
		this.notifyInternetsrtatus();
		return true;
	},

	notifyInternetsrtatus: function(){
		if(!this._isInternetConnectionAvailable){

			this.$.videoList.setMessage("No network connection");

			if(this.$.player.getVideoStatus()){
				this.$.player.internetConnectionHandler(this._isInternetConnectionAvailable);
			}

		}else{
			this.$.videoList.setMessage("");

			if(this.$.player.getVideoStatus()){
				// if(this.videos.length < 1){
				// }
				this.$.player.internetConnectionHandler(this._isInternetConnectionAvailable);
			}
				// this.queryChanged();
				// this.videos = [];
				// this.$.youtube.setNextPage("");
				this.loginAndLoadData();
			
		}
	}
	/*windowRotated: function(inSender, inEvent){
		console.log("se ha rotado el dispositivo");
		return true;
	}*/
});