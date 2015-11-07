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
		query:"",
		queryType:"keyword" //[ keyword | playlist | home ]
	},
	handlers: {
    	onLoadMore: "loadMore",
    	onStartVideo: "startVideo",
    	onSearchEvent:"searchEvent",
    	onShowMainMenu: "showMainMenu",
    	onBackToList: "backToList",
    	onRefreshTokenFinish:"refreshTokenFinish",
    	onRefreshTokenError: "refreshTokenError",
    	onVideoFinished:"videoFinished",
    	// events from menu
    	onShowMenuOption: "showMenuOption",
    	onLoadPlaylist: "loadPlaylist",
    	onHomeRequest: "homeRequest",
    	onLoadHistory: "loadPlaylistById",
    	onLoadFavorites: "loadPlaylistById",
		onLoadLikes: "loadPlaylistById",
		onLoadWatchLater: "loadPlaylistById",
		onLoadMyChannel: "loadMyChannel"
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
								{kind:"VideoList", name:"videoList"},
								// {kind:"VideoList", name:"videoListRelated"},
								// {kind:"CommentList", name:"commentList"}
							]}	
							// ]}
						]},
						{kind: "onyx.Toolbar", classes:"menu", components:[
						// {kind: "onyx.Toolbar", classes:"", components:[
							{name:"videoDetailGroup", kind: "Group", tag: null, onActivate:"tabActivated__", ontap:"radioGroupTap", defaultKind: "onyx.IconButton", components: [
								// {src: "assets/icon_results.png", ontap:"deactivate"},
								// {src: "assets/icon_related.png", ontap:"activate"},
								{name:"resultsButton", src: "assets/icon_results.png", active: true,index:1, style:"margin: 0 12%"},
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
		{kind: "LunaService",
			 name: "launchBrowserCall",
		     service: "palm://com.palm.applicationManager/",
		     method: "launch",
		     onSuccess: "launchFinished",
		     onFailure: "launchFail",
		     onResponse: "gotResponse",
		     subscribe: true
		},

		{kind: "enyo.ApplicationEvents", onWindowRotated: "windowRotated", onactivate:"activate", ondeactivate:"deactivate"}
	],
	videos:[],
	numberOfTries:0,
	_myChannel:null,
	_videoIdCurrent:null,
	_platform: "WebOS",
	create:function() {
        this.inherited(arguments);
        this.$.mainPanel.setIndex(1);
        this.$.listPanels.setIndex(0);
		var cookie = enyo.getCookie("session_youtube");

		var youtube_token = enyo.getCookie("youtube_token");
		var youtube_refresh = enyo.getCookie("youtube_refresh");
		// console.log(cookie);
		// console.log(youtube_token);
		// console.log(youtube_refresh);


		if(youtube_token && youtube_refresh){
			// console.log("token vigente");
			var token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;

				myApiKey.login = true;
				this.$.menuPanel.setStatus("Estas Logado");

			if(myApiKey.login){
				this.loadHomeFeeds();
				this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
				this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
				this.$.menuPanel.setLogin(myApiKey.login);
			}

		}else if(!youtube_token && youtube_refresh){
			// console.log("token expirado, se refresaca el token");
			var token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;
				myApiKey.login = false;

			this.$.youtube.refreshToken();
		}else{
			// console.log("no hay token, necesita iniciar sesion");
			this.queryChanged();
		}
		console.log("Hi LuneOS & webOS --> starting debug");
		this._platform = navigator.userAgent.split("(")[1].split(";")[0]; // default webos
		webos.setWindowOrientation("free");
    },

    refreshTokenFinish: function(inSender, inEvent){
    	this.loadHomeFeeds();
		this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
		this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
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
    	this.queryType = "home";
    	this.$.youtube.getActivities().response(this, "receiveResults");
    	this.videoDetailGroupReset(true);
    },

    search: function(q) {
    	this.$.listPanels.setIndex(0);
    	this.queryType = "keyword";
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

		this.$.videoList.setVideoList(this.videos);
		this.$.panel.setIndex(0);
		this.$.search.setSearching(false);
		this.$.videoList.setSearching(false);
	},

	receiveResultsRelated: function(inRequest, inResponse){
		if(!inResponse) return;
		this.$.videoListRelated.setShowMore(false);
		this.$.videoListRelated.setVideoList(inResponse);
	},

	receiveComments: function(inRequest, inResponse){
		if(!inResponse) return;
		this.$.commentList.setComments(inResponse.items);
	},

	loadMore: function(inSender, inEvent){
		if(this.queryType === "playlist"){
			this.$.youtube.getPlaylistFromIdNextPage().response(this, "receiveResults");
		}else if(this.queryType === "home"){
			this.$.youtube.getActivities().response(this, "receiveResults");
		}else{
			this.$.youtube.searchNext(this.query).response(this, "receiveResults");
		}
		return true;
	},

	// se alamacena un numero de intentos para hacer una segunda solicitud a la api de youtube
	//Para videos que no con la opcion embebed a false
	startVideo: function(inSender, video_id){
		if(this._videoIdCurrent !== video_id){
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
			this.numberOfTries=0,
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

	queryChanged: function(){
		this.search(this.query);
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
			this.showMenuOption();
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
		return;
	},

	loadPlaylist:function(inSender, playlistInfo){
		// this.$.videoDetailGroup.hide();
		this.$.listPanels.setIndex(0);
		// this.$.videoDetailGroup.setActive(false);

		this.queryType = "playlist";
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

			this.queryType = "playlist";
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
		if(nextId){
			this.startVideo(inSender, nextId.video_id);
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

	doPasteText: function(inSender, inEvent){
		webos.getClipboard(enyo.bind(this, "pasteToken"));
	},

	pasteToken: function(text){
		this.$.token.setValue(text);
		return;
	},

	doCopyText: function(inSender, inEvet){
		// console.log("doCopyText -> ");
		// var c = document.getElementsByName("code");
		// console.log(c);
		// console.log(c.value);

		// webos.setClipboard(c.value);
		return;
	},

	activate: function(a, b){
		console.log("\n***window Active***");
		// console.log(a);
		// console.log(b);
		if(this._platform !== "LuneOS"){
			this.$.player.playVideo();
		}
		return true;
	},

	deactivate: function(a, b){
		console.log("\n***window Anactive***");
		// console.log(a);
		// console.log(b);
		if(this._platform !== "LuneOS"){
			this.$.player.pauseVideo();
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