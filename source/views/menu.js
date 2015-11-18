enyo.kind({
    name:"LuneTube.Menu",
    kind: "Control",
    published: {
        status:"",
        imageUser:"assets/icon_user.png",
        playlistUser:[],
        loginButton: "Login",
        login:false,
        token:""
    },
    events: {
        
    },
    components: [
				{kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
					
					{classes:"header", style:"text-align:right",components:[
		            	{name:"aboutAPP", content:"LuneTube", classes:"header-loc", style:"vertical-align: middle"},		            	
		            	{kind: "Image", src: "assets/menu.png", ontap:"showMenuOption", style:"vertical-align: middle"},
		        	]},

		        	{name:"loginGroup", kind: "onyx.Groupbox", style:"margin: 10px 5px", components: [
		        		{kind: "onyx.GroupboxHeader", content:"paste the token", name:"token_message"},
						{classes:"", components:[
							{kind: "onyx.InputDecorator", components: [
								{kind: "onyx.Input", name:"token"},//, style:"background-color:white"}
							]},

							{tag:"br"},
							{kind: "onyx.Button", ontap: "cancelLogin", components:[
								{kind: "onyx.Icon", src: "assets/icon_cancel.png"}
							]},
							{kind: "onyx.Button", ontap: "doPasteText", components:[
								{kind: "onyx.Icon", src: "assets/icon_paste.png"}
							]},
							{kind: "onyx.Button", ontap: "confirmLogin", components:[
								{kind: "onyx.Icon", src: "assets/icon_confirm.png"}
							]},
							// {kind: "onyx.Button", content: "Paste", ontap: "doPasteText"},
							// {kind: "onyx.Button", content: "Confirm", ontap: "confirmLogin"}
						]}
		        	]},

	                {name:"listChannel", kind: "onyx.Groupbox", style:"margin: 10px 5px", components: [
	                	{kind: "onyx.GroupboxHeader", name:"status", content: "Channel"},
	                	
	                	{ontap:"homeRequest", classes:"menu-option-item", components:[
	                		{kind:"Image", src:"assets/home-icon.png"},
	                		{content: "Home", style:"display: inline-block"}
	                	]},

	                	{ontap: "expand", classes:"menu-option-item", components:[
	                		{kind:"Image", src:"assets/playlist-icon.png"},
	                		{name: "playlistUser", kind: "Playlist", style:"display: inline-block;width: 85%"}
	                	]},

	                    {ontap:"loadHistory", classes:"menu-option-item", components:[
	                    	{kind:"Image", src:"assets/history-icon.png"},
	                		{content: "History", style:"display: inline-block"}
	                    ]},

	                    {ontap:"loadFavorites", classes:"menu-option-item", components:[
	                    	{kind:"Image", src:"assets/favorites-icon.png"},
	                		{content: "Favorites", style:"display: inline-block"}
	                    ]},

	                    {ontap:"loadLikes", classes:"menu-option-item", components:[
	                    	{kind:"Image", src:"assets/likes-icon.png"},
	                		{content: "Likes", style:"display: inline-block"}
	                    ]},

	                    {ontap:"loadWatchLater", classes:"menu-option-item", components:[
	                    	{kind:"Image", src:"assets/later-icon.png"},
	                		{content: "Watch Later", style:"display: inline-block"}
	                    ]}
	                ]},

	                {name:"menuOption",classes:"menu-option-default", components: [
	                	
	                    // {name:"status", content: "", classes:"menu-option-item"},

	                    {kind: "onyx.Icon", name:"imageUser", src: "", style:"width:48px; height:48px", classes:"menu-login-img"},
	                    
	                    {ontap:"youtubeLogin", popup: "loginPopup", classes:"menu-login", components:[
	                    	{name:"loginIcon",kind:"Image", src:"assets/login-icon.png"},
	                    	{name:"loginButton", content: "Login", style:"display: inline-block"}
	                    ]},

	                    {classes: "onyx-menu-divider"},
	                    {ontap:"aboutTap", classes:"menu-option-item", components:[
	                		// {kind:"Image", src:"assets/home-icon.png"},
	                		{name:"info", kind: "onyx.Groupbox", style:"margin: 0 5px", showing:false, components: [
			                	{allowHtml:true, content:"<b>LuneTube v0.1.2<br/>This is a Beta version.</b><br/><hr> Your feedback is very important!, please comment and  <a href='http://forums.webosnation.com/luneos/330640-lunetube-luneos-youtube-client-app.html' target='_blank'>more info here.</a><br/>All versions <a href='https://app.box.com/lunetube-latest' target='_blank'>LuneTube for LuneOS and webOS</a><br/><br/> @Mamisho1 On twitter"}
			                ]},
	                		{content: "About APP", style:"display: inline-block"}
	                	]},
	                ]},
	            ]}
    ],
    create:function() {
        this.inherited(arguments);
        this.statusChanged();
        this.imageUserChanged();
        this.playlistUserChanged();
        this.$.info.hide();
        this.$.listChannel.hide();
        this.$.loginGroup.hide();
    },

    statusChanged: function(){
    	this.$.status.setContent(this.status);
    },

    imageUserChanged: function(){
    	this.$.imageUser.setSrc(this.imageUser);
    },

    playlistUserChanged: function(){
    	this.$.playlistUser.setData(this.playlistUser);
    },

    loginButtonChanged: function(){
    	this.$.loginButton.setContent(this.loginButton);
    },

    showMenuOption: function(){

    	this.bubble("onShowMenuOption",this);
    },

    aboutTap: function(inSender, inEvent){
    	if(this.$.info.getShowing()){
    		this.$.info.show();
    	}else{
    		this.$.info.hide();
    	}
    	this.$.info.setShowing(!this.$.info.getShowing());
    	// this.bubble("onAboutTap",this);	
    },

    homeRequest: function(inSender, inEvent){

    	this.bubble("onHomeRequest", this);
    },

    loadHistory: function(inSender, inEvent){

    	this.bubble("onLoadHistory", "history");
    },

	loadFavorites: function(inSender, inEvent){

		this.bubble("onLoadFavorites", "favorites");
	},

	loadLikes: function(inSender, inEvent){

		this.bubble("onLoadLikes", "likes");
	},

	loadWatchLater: function(inSender, inEvent){

		this.bubble("onLoadWatchLater", "watchLater");
	},
	tokenChanged: function(){
		this.$.token.setValue(this.token);
	},

	doPasteText: function(inSender, inEvent){
		webos.getClipboard(enyo.bind(this, "pasteToken"));
	},

	pasteToken: function(text){
		this.$.token.setValue(text);
		// this.$.menuPanel.setToken(text);
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

	/*youtubeLogin: function(inSender, inEvent){
		this.bubble("onYoutubeLogin", this);
	},*/

	loginChanged: function(){
		if(this.login){
			console.log("esta logado");
			this.$.listChannel.show();
			this.$.loginGroup.hide();
		}else{
			this.$.listChannel.hide();
		}
	},

	/*Login functions*/
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
		    this.$.loginGroup.show();
		    this.$.token.focus();
			/*End Hack*/

		}else{
			this.logout();
		}
	},

	confirmLogin: function(inSender, inEvent){
		if(this.$.token.getValue() !== ""){
			this.$.token_message.setContent("Login...");
			this.authorizationToken();
		}else{
			this.$.token_message.setContent("Please, put a valid token");
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
		enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":360});
		enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":360});
		myApiKey.access_token = ck.access_token;
		myApiKey.refresh_token = ck.refresh_token;
		myApiKey.login = true;
		console.log("cookie almacenada");
		
		if(myApiKey.login){
			this.homeRequest();
			this.bubble("onLoadMyChannel", this);
			this.setLogin(myApiKey.login);
			this.$.loginButton.setContent("Logout");
		}
	},

	authorizationTokenError: function(inRequest, inResponse){
		this.$.token_message.setContent("error, try one more time");
		this.$.token.setValue("");
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
			this.setImageUser("assets/icon_user.png");
			this.setStatus("No User");
			this.bubble("onSearchEvent", "");
			this.setLogin(myApiKey.login);
			this.bubble("onShowMenuOption", this);
		}
	},
});