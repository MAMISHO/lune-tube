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
    	onShowMenuOption: "showMenuOption",
    	onLoadPlaylist: "loadPlaylist",
    	onRefreshTokenFinish:"refreshTokenFinish",
    	onRefreshTokenError: "refreshTokenError"
	},
	components:[
		{kind: 'Panels',name:"mainPanel", fit: true, classes: 'panels-sliding-menu', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, draggable:true, onTransitionFinish:"draggableMenu", components: [
			{name:"menuPanel", components:[
				{kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
					{classes:"header", style:"text-align:right",components:[
		            	{name:"aboutAPP", content:"", classes:"header-loc", style:"vertical-align: middle"},		            	
		            	{kind: "Image", src: "assets/menu.png", ontap:"showMenuOption", style:"vertical-align: middle"},
		        	]},
		        	{name:"menuOption",classes:"menu-option", components: [
		        		{ontap:"aboutTap", classes:"menu-option-item", components:[
	                		// {kind:"Image", src:"assets/home-icon.png"},
	                		{content: "About", style:"display: inline-block"}
	                	]},
	                	{ontap:"homeRequest", classes:"menu-option-item", components:[
	                		{kind:"Image", src:"assets/home-icon.png"},
	                		{content: "Home", style:"display: inline-block"}
	                	]},
	                	{classes:"menu-option-item", ontap: "expand", components:[
	                		{kind:"Image", src:"assets/playlist-icon.png"},
	                		{name: "playlistUser",kind: "Playlist", style:"display: inline-block;width: 85%"}
	                	]},
	                    {classes:"menu-option-item", ontap:"loadHistory", components:[
	                    	{kind:"Image", src:"assets/history-icon.png"},
	                		{content: "History", style:"display: inline-block"}
	                    ]},
	                    {classes:"menu-option-item", ontap:"loadFavorites", components:[
	                    	{kind:"Image", src:"assets/favorites-icon.png"},
	                		{content: "Favorites", style:"display: inline-block"}
	                    ]},
	                    {classes:"menu-option-item",ontap:"loadLikes", components:[
	                    	{kind:"Image", src:"assets/likes-icon.png"},
	                		{content: "Likes", style:"display: inline-block"}
	                    ]},
	                    {classes:"menu-option-item", ontap:"loadWatchLater", components:[
	                    	{kind:"Image", src:"assets/later-icon.png"},
	                		{content: "Watch Later", style:"display: inline-block"}
	                    ]},
	                    {name:"status", content: "", classes:"menu-option-item"},
	                    {classes: "onyx-menu-divider"},
	                    {kind: "onyx.Icon", name:"imageUser", src: "", style:"width:48px; height:48px", classes:"menu-login-img"},
	                    {ontap:"youtubeLogin", popup: "loginPopup", classes:"menu-option-item menu-login", components:[
	                    	{name:"loginIcon",kind:"Image", src:"assets/login-icon.png"},
	                    	{name:"loginButton", content: "Login", style:"display: inline-block"}
	                    ]}
	                ]}
	            ]}
			]},
			{fit:true,classes:"enyo-fit", components:[
				{kind: 'Panels',name:"panel", fit: true, style:"height:100%", classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, components: [
					{layoutKind: "FittableRowsLayout", components: [
						{kind: "Menu", name:"menu"},
						{name: 'content_list',fit: true, layoutKind: "FittableRowsLayout", components: [
							// {kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
								// {kind:"VideoList", name:"videoList"},
							{name:"videoDetailGroup", kind: "onyx.RadioGroup", onActivate:"tabActivated", controlClasses: "onyx-tabbutton", ontap:"radioGroupTap", components: [
								{content: "Results", active: true, index:1},
								{content: "Related", index:2},
								{content: "Comments", index:3}
							],
							style:"height:32px"
							},
							{kind: "Panels", name:"listPanels", fit:true, realtimeFit: false,draggable:false, components: [
								// {kind:"VideoGridList", name:"videoList"},
								{kind:"VideoList", name:"videoList"},
								{kind:"VideoList", name:"videoListRelated"},
								{kind:"CommentList", name:"commentList"}
							]}	
							// ]}
						]}
					]},
					{name: 'content_player',fit: true, doubleTapEnabled: true, ondoubletap: "doubleTap", components: [
							{kind: "Player", name:"player"}
					]},
				]}
			]}
		]},
		{name: "loginPopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
			{content:"paste the token", name:"token_message"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", name:"token", style:"background-color:white"}
			]},
			{tag: "br"},
			{tag:"br"},
			{kind: "onyx.Button", content: "Cancel", ontap: "cancelLogin"},
			{kind: "onyx.Button", content: "Confirm Login", ontap: "confirmLogin"}
		]},
		{name: "messagePopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
			{name:"boxNotification", content:"", allowHtml:true}
		]},

		// Componentes que no se ven
		{kind:"YoutubeApi", name: "youtube"},
		{kind:"YoutubeVideo", name: "yt"},
		{
		     name: "launchBrowserCall",
		     kind: "LunaService",
		     service: "palm://com.palm.applicationManager/",
		     method: "launch",
		     onSuccess: "launchFinished",
		     onFailure: "launchFail",
		     onResponse: "gotResponse",
		     subscribe: true
		},
	],
	videos:[],
	numberOfTries:0,
	_myChannel:null,
	_videoIdCurrent:null,
	create:function() {
        this.inherited(arguments);
        this.$.mainPanel.setIndex(1);
        this.$.listPanels.setIndex(0);
		var cookie = enyo.getCookie("session_youtube");

		var youtube_token = enyo.getCookie("youtube_token");
		var youtube_refresh = enyo.getCookie("youtube_refresh");
		console.log(cookie);
		console.log(youtube_token);
		console.log(youtube_refresh);


		if(youtube_token && youtube_refresh){
			console.log("token vigente");
			var token = JSON.parse(cookie);
				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;

				myApiKey.login = true;
				this.$.status.setContent("Estas Logado");

			if(myApiKey.login){
				this.loadHomeFeeds();
				this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
				this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
			}

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
		}
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
    	this.$.videoDetailGroup.hide();
    	this.$.listPanels.setIndex(0);
    	this.$.videoDetailGroup.setActive(false);

    	this.queryType = "home";
    	this.$.youtube.getActivities().response(this, "receiveResults");
    },

    search: function(q) {
    	this.$.videoDetailGroup.hide();
    	this.$.listPanels.setIndex(0);
    	this.$.videoDetailGroup.setActive(false);

    	this.queryType = "keyword";
    	if(myApiKey.login){
    		this.$.youtube.searchAuth(q).response(this, "receiveResults");
    	}else{
    		this.$.youtube.search(q).response(this, "receiveResults");
    	}
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
			// console.log(inResponse);
			this.videos = this.videos.concat(inResponse);
		}

		this.$.videoList.setVideoList(this.videos);
		this.$.panel.setIndex(0);
		this.$.menu.setSearching(false);
		this.$.videoList.setSearching(false);
	},

	receiveResultsRelated: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inResponse);
		this.$.videoListRelated.setShowMore(false);
		this.$.videoListRelated.setVideoList(inResponse);
	},

	receiveComments: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inResponse);
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
			this.numberOfTries++;//numero de intentos de reproducir
			this.$.yt.startVideo(video_id).response(this, "startPlayVideo");
			this.$.youtube.search("", video_id).response(this, "receiveResultsRelated");
			this.$.youtube.getComments(video_id).response(this, "receiveComments");
			this.$.videoDetailGroup.show();
		}
		return true;
	},

	startPlayVideo: function(inResponse, video){
		if(video.status === "fail" && this.numberOfTries > 0){
			// second try
			console.log("seccond try");
			this.numberOfTries=0,
			this.$.yt.getVideoRestricted().response(this, "startPlayVideo");
		}
		this.$.player.setVideoId(video);
		this.$.panel.setIndex(1);
	},

	searchEvent: function(inSender, q){
		this.setQuery(q);
		return true;
	},

	queryChanged: function(){
		this.search(this.query);
	},

	draggableMenu: function(inSender, inEvent){
		if(this.$.mainPanel.getIndex() === 1){
			this.$.menuPanel.removeClass("menu-panel");
			this.$.aboutAPP.setContent("");
		}
	},

	showMenuOption: function(inSender, inEvent){
		// this.$.menuOption.show();
		if(this.$.mainPanel.getIndex() === 0){	//cerrar
			this.$.menuPanel.removeClass("menu-panel");
			this.$.mainPanel.setIndex(1);
			this.$.aboutAPP.setContent("");
		}else{									//abrir
			this.$.menuPanel.addClass("menu-panel");
			this.$.mainPanel.setIndex(0);
			this.$.aboutAPP.setContent("LuneTube");
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
	youtubeLogin: function(inSender, inEvent){
		if(!myApiKey.login){
			var url = myApiKey.url_base + "?client_id=" + myApiKey.client_id + "&redirect_uri=" + myApiKey.redirect_uri + "&scope=" + myApiKey.scope + "&response_type=" + myApiKey.response_type;
			
			/*Start hack*/
				var platform = navigator.userAgent.split("(")[1].split(";")[0];
		        if(platform === "LuneOS"){
		            this.$.launchBrowserCall.send({"id": "org.webosports.app.browser", "params":{"target": url}});

		        }else{
		            window.open(url, '_blank');
		        }
			/*End Hack*/
			var p = this.$[inSender.popup];
			if (p) {
				this.$.mainPanel.setIndex(1);
				p.show();
			}
		}else{
			this.logout();
		}
	},

	popupHidden: function(inSender, inEvent){
		this.$.token_message.setContent("Paste the token");
		this.$.token.setValue("");
	},

	cancelLogin: function(inSender, inEvent){
		this.$.loginPopup.hide();
		this.$.token_message.setContent("Paste the token");
	},

	confirmLogin: function(inSender, inEvent){
		if(this.$.token.getValue() !== ""){
			this.$.token_message.setContent("Confirmando Login");
			this.authorizationToken();
			console.log("tiene cosas");
		}else{
			console.log("no tiene cosas");
			this.$.token_message.setContent("Deben indicar un token");
		}
	},

	authorizationToken: function(){
		var formData = new enyo.FormData();

		formData.append("code", this.$.token.getValue());
		formData.append("client_id", myApiKey.client_id);
		formData.append("client_secret", myApiKey.client_secret);
		formData.append("redirect_uri", myApiKey.redirect_uri);
		formData.append("grant_type", myApiKey.grant_type);

		var ajax = new enyo.Ajax({
            url: "https://accounts.google.com/o/oauth2/token",
            method: "POST",
            postBody: formData,
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        ajax.response(enyo.bind(this, "authorizationTokenResponse"));
        ajax.error(enyo.bind(this, "authorizationTokenError"));
        // console.log("envia la peticion");
        // console.log(ajax);
        // console.log(JSON.stringify(ajax));
		ajax.go();
	},

	authorizationTokenResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		var ck = {
			access_token: inResponse.access_token,
			token_type: inResponse.token_type,
			expires_in: inResponse.expires_in,
			refresh_token: inResponse.refresh_token
		};

		enyo.setCookie("youtube_token", ck.access_token, {"Max-Age":ck.expires_in});
		enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":60});
		enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":60});
		myApiKey.access_token = ck.access_token;
		myApiKey.refresh_token = ck.refresh_token;
		myApiKey.login = true;
		console.log("cookie almacenada");
		
		if(myApiKey.login){
			this.$.menu.setSearching(true);
			this.$.loginPopup.hide();
			this.showMenuOption();
			this.query_history = "home";
			this.loadHomeFeeds();
			this.$.youtube.getMyChannelInfo().response(this, "getMychannelresults");
			this.$.youtube.getMyPlaylist().response(this, "getMyPlaylistResults").error(this, "getMyPlaylistResults");
		}
	},

	authorizationTokenError: function(inRequest, inResponse){
		console.log("error");
		console.log(JSON.stringify(inRequest));
		console.log(JSON.stringify(inResponse));
		this.$.token_message.setContent("error, try one more time");
		this.$.token.setValue("");
		// this.showMenuOption();
		// this.$.loginPopup.hide();
	},

	homeRequest: function(inSender, inEvent){
		if(myApiKey.login){
			this.$.menu.setSearching(true);
			this.query_history = "home";
			this.$.youtube.setNextPage(null);
			this.loadHomeFeeds();
			this.showMenuOption();
		}
	},

	logout: function(inSender, inEvent){
		if(myApiKey.login){
			enyo.setCookie("youtube_token", "", {"Max-Age":0});
			enyo.setCookie("youtube_refresh","", {"Max-Age":0});
			enyo.setCookie("session_youtube", "", {"Max-Age":0});
			myApiKey.access_token = "";
			myApiKey.refresh_token = "";
			myApiKey.login = false;
			this.$.loginButton.setContent("Login");
			this.$.imageUser.setSrc("");
			this.$.status.setContent("No User");
			this.search(this.query);
			this.showMenuOption();
		}
	},

	getMychannelresults: function(inRequest, inResponse){
		if(!inResponse) return;
		this._myChannel = inResponse.items[0].contentDetails;
		var dataChannel = inResponse.items[0].snippet;
		this.$.imageUser.setSrc(dataChannel.thumbnails.default.url);
		this.$.status.setContent(dataChannel.title);
		this.$.loginButton.setContent("Logout");
	},

	getMyPlaylistResults: function(inRequest, inResponse){
		if(!inResponse) return;
		this.$.playlistUser.setData(inResponse);
		return;
	},

	loadPlaylist:function(inSender, playlistInfo){
		this.$.videoDetailGroup.hide();
		this.$.listPanels.setIndex(0);
		this.$.videoDetailGroup.setActive(false);

		this.queryType = "playlist";
		this.$.menu.setSearching(true);
		this.query_history = playlistInfo.id;
		this.$.youtube.getPlaylistFromId(playlistInfo.id).response(this, "receiveResults");
		this.showMenuOption();
		return true;
	},

	loadAllPlaylist: function(){
		
	},

	loadHistory: function(inSender, inevent){
		this.loadPlaylistById(this._myChannel.relatedPlaylists.watchHistory);
	},
	loadFavorites: function(inSender, inevent){
		this.loadPlaylistById(this._myChannel.relatedPlaylists.favorites);
	},
	loadLikes: function(inSender, inevent){
		this.loadPlaylistById(this._myChannel.relatedPlaylists.likes);
	},
	loadWatchLater: function(inSender, inevent){
		this.loadPlaylistById(this._myChannel.relatedPlaylists.watchLater);
	},

	loadPlaylistById: function(playlist_id){
		this.$.videoDetailGroup.hide();
		this.$.listPanels.setIndex(0);
		this.$.videoDetailGroup.setActive(false);

		this.queryType = "playlist";
		if(myApiKey.login){
			this.$.menu.setSearching(true);
			this.query_history = playlist_id;
			this.$.youtube.getPlaylistFromId(playlist_id).response(this, "receiveResults").error(this, "receiveResults");
			this.showMenuOption();
			return true;
		}
	},

	aboutTap: function(inSender, inEvent){

		this.$.messagePopup.show();
		this.$.boxNotification.setContent("LuneTube v0.0.9<br/>This is a alpha version <a href='http://forums.webosnation.com/luneos/330640-lunetube-luneos-youtube-client-app.html' target='_blank'>more info</a> all versions <a href='https://app.box.com/lunetube-latest' target='_blank'>LuneTube for LuneOS and webOS</a>");
		this.showMenuOption();
	},

	radioGroupTap: function(inSender, inEvent){
		// console.log(inSender);
		// console.log(inEvent);
		if(inSender.active){
			if(inSender.active.index){
				this.$.listPanels.setIndex(inSender.active.index-1);
			}
		}
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
	}
});
