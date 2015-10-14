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
		// login:false
		// query:"defqon1 power hour"
	},
	handlers: {
    	onLoadMore: "loadMore",
    	onStartVideo: "startVideo",
    	onSearchEvent:"searchEvent",
    	onShowMainMenu: "showMainMenu",
    	onBackToList: "backToList",
    	onShowMenuOption: "showMenuOption",
    	// onLogin: "youtubeLogin"
	},
	components:[
		{kind: 'Panels',name:"mainPanel", fit: true, classes: 'panels-sliding-menu', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, draggable:false, components: [
			{name:"menuPanel", components:[
					{classes:"header", style:"text-align:right",components:[
		            	{name:"aboutAPP", content:"", classes:"header-loc"},
		            	{kind: "Image", src: "assets/menu.png", ontap:"showMenuOption", style:"width: 25px;vertical-align: middle;"},
		        	]},
		        	{name:"menuOption",classes:"menu-option", components: [
	                	{content: "Home", ontap:"homeRequest"},
	                	{content: "Playlist"},
	                    {content: "Favorites"},
	                    {name:"status", content: "No logado"},
	                    {classes: "onyx-menu-divider"},
	                    {content: "Login", ontap:"youtubeLogin", popup: "loginPopup"}
	                ]}
			]},
			{fit:true,classes:"enyo-fit", components:[
				{kind: 'Panels',name:"panel", fit: true, style:"height:100%", classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, components: [
					{layoutKind: "FittableRowsLayout", components: [
						{kind: "Menu", name:"menu"},
						{name: 'content_list',fit: true, layoutKind: "FittableRowsLayout", components: [
							{kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
								{kind:"VideoList", name:"videoList"},
							]}
						]}
					]},
					{name: 'content_player',fit: true, components: [
							{kind: "Player", name:"player"}
					]},
				]}
			]}
		]},
		{name: "loginPopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
			{kind: "onyx.InputDecorator", components: [
				{content:"paste the token", name:"token_message"},
				
				// login
				{kind: "Preview", name:"iframe"},


				{tag:"br"},
				{tag:"br"},
				{kind: "onyx.Input", name:"token", style:"background-color:white"}
			]},
			{tag: "br"},
			{tag:"br"},
			{kind: "onyx.Button", content: "Cancel", ontap: "cancelLogin"},
			{kind: "onyx.Button", content: "Confirm Login", ontap: "confirmLogin"}
		]},
		{kind:"YoutubeApi", name: "youtube"},
		{kind:"YoutubeVideo", name: "yt"}
	],
	videos:[],
	numberOfTries:0,
	create:function() {
        this.inherited(arguments);
        this.$.mainPanel.setIndex(1);
        var cookie = document.cookie;
		cookie = cookie.split("=");
		if(cookie[0] === "session_youtube"){
			if(cookie[1]){
				var token = JSON.parse(cookie[1]);

				myApiKey.access_token = token.access_token;
				myApiKey.refresh_token = token.refresh_token;

				console.log("Existen tokens");
				console.log(myApiKey.access_token);
				console.log(myApiKey.refresh_token);
				myApiKey.login = true;
				this.$.status.setContent("Estas Logado");
			}
		}
		if(myApiKey.login){
			this.loadHomeFeeds();
		}else{
			this.queryChanged();
		}
    },

    loadHomeFeeds: function(){
    	this.$.youtube.getActivities().response(this, "receiveResults");
    },

    search: function(q) {
    	if(myApiKey.login){
    		this.$.youtube.searchAuth(q).response(this, "receiveResults");
    	}else{
    		this.$.youtube.search(q).response(this, "receiveResults");
    	}
	},

	receiveResults: function(inRequest, inResponse){
		if(!inResponse) return;
		
		if(this.getQuery() !== this.query_history){
			this.query_history = this.getQuery();
			this.videos = inResponse;
		}else{
			this.videos = this.videos.concat(inResponse);
		}

		this.$.videoList.setVideoList(this.videos);
		this.$.panel.setIndex(0);
		this.$.menu.setSearching(false);
		this.$.videoList.setSearching(false);
	},

	loadMore: function(inSender, inEvent){
		this.$.youtube.searchNext(this.query).response(this, "receiveResults");
		return true;
	},

	startVideo: function(inSender, video_id){
		this.numberOfTries++;
		this.$.yt.startVideo(video_id).response(this, "startPlayVideo");
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

	showMenuOption: function(inSender, inEvent){
		// this.$.menuOption.show();
		if(this.$.mainPanel.getIndex() === 0){
			this.$.menuPanel.removeClass("menu-panel");
			this.$.mainPanel.setIndex(1);
			this.$.aboutAPP.setContent("");
		}else{
			this.$.menuPanel.addClass("menu-panel");
			this.$.mainPanel.setIndex(0);
			this.$.aboutAPP.setContent("LuneTube");
		}
		return true;
	},

	backToList: function(inSender, inEvent){
		this.$.panel.setIndex(0);
		return true;
	},

	/*Youtube Login*/
	youtubeLogin: function(inSender, inEvent){
		console.log("Inicia el Login con el siguiente data");
		// console.log(myApiKey);
		var url = myApiKey.url_base + "?client_id=" + myApiKey.client_id + "&redirect_uri=" + myApiKey.redirect_uri + "&scope=" + myApiKey.scope + "&response_type=" + myApiKey.response_type;
		// this.$.iframe.setAttribute("src", "assets/login.html");
		// window.open(url, '_blank');
		// this.$.iframe.setUrl("http://forums.enyojs.com");
		this.$.iframe.setUrl("http://forums.enyojs.com");
		this.$.iframe.render();
		this.$.iframe.reload();
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},

	popupHidden: function(inSender, inEvent){
		this.$.token_message.setContent("Paste the token");
		this.$.token.setValue("");
	},

	cancelLogin: function(inSender, inEvent){
		this.$.modalPopup.hide();
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
		var formData = new FormData();

		formData.append("code", this.$.token.getValue());
		formData.append("client_id", myApiKey.client_id);
		formData.append("client_secret", myApiKey.client_secret);
		formData.append("redirect_uri", myApiKey.redirect_uri);
		formData.append("grant_type", myApiKey.grant_type);

		var ajax = new enyo.Ajax({
            url: "https://accounts.google.com/o/oauth2/token",
            method: "POST",
            postBody: formData
        });

        ajax.response(enyo.bind(this, "authorizationTokenResponse"));
		ajax.go();
	},

	authorizationTokenResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inResponse);
		
		var ck = {
			access_token: inResponse.access_token,
			token_type: inResponse.token_type,
			expires_in: inResponse.expires_in,
			refresh_token: inResponse.refresh_token
		};

		//guardamos en las cookies
		document.cookie="session_youtube=" + JSON.stringify(ck);
		myApiKey.access_token = ck.access_token;
		myApiKey.refresh_token = ck.refresh_token;
		myApiKey.login = true;
		console.log("cookie almacenada");
		this.$.status.setContent("Estas Logado");
		this.showMenuOption();
		this.loadHomeFeeds();
	},

	homeRequest: function(inSender, inEvent){
		this.$.youtube.getActivities().response(this, "receiveResults");
	},

	homeResults: function(inRequest, inResponse){
		console.log(inRequest);
		console.log(inResponse);
	}
});
