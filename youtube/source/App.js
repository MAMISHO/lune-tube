enyo.kind({
	name: "App",
	kind: "FittableRows",
	published:{
		url_base: "https://accounts.google.com/o/oauth2/auth",
    	client_id : "588965728760-7v9hac1gcppmkqcnktesvvj6qt079296.apps.googleusercontent.com",
    	client_secret : "ylXYTO5pxK--WuCtFIFroxLs",
    	redirect_uri : "urn:ietf:wg:oauth:2.0:oob",
    	scope : "https://www.googleapis.com/auth/youtube",
    	response_type : "code",
    	access_type : "offline",
    	grant_type: "authorization_code",
    	access_token:"",
    	refresh_token: ""
	},
	components: [
		{kind: "Viewer", classes: "enyo-fit", searchQuery:"webos 3.05 review", onSearch: "search", onSelect: "select", components: [
			{kind: "YouTube",name:"youTube", classes: "enyo-fit", showing: false},
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Grabber"},
				{kind: "onyx.Button", content: "Login", ontap:"youtubeLogin", name:"loginButton"},
				{kind: "onyx.Button", content: "Logout", ontap: "youtubeLogout"},
				{kind: "onyx.Button", content: "get", ontap: "getVideos"},
				{kind: "onyx.Button", content: "refresh", ontap: "refreshToken"},
				{kind: "onyx.Button", content: "Iniciar session", ontap: "showPopup", popup: "modalPopup"},
					{name: "modalPopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
						{kind: "onyx.InputDecorator", components: [
							{content:"pegar el token", name:"token_message"},
							{tag:"br"},
							{tag:"br"},
							{kind: "onyx.Input", name:"token", style:"background-color:white"}
						]},
						{tag: "br"},
						{tag:"br"},
						{kind: "onyx.Button", content: "Cancelar", ontap: "cancelLogin"},
						{kind: "onyx.Button", content: "Confirmar Login", ontap: "confirmLogin"}
					]},
			]}
		]},
	],
	create:function(){
		this.inherited(arguments);
		enyo.loader.loadScript("https://apis.google.com/js/client.js");
		enyo.loader.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js");
		var cookie = document.cookie;
		cookie = cookie.split("=");
		console.log(cookie[0]);
		console.log(cookie[1]);
		if(cookie[0] === "session_youtube"){
			if(cookie[1]){
				var token = JSON.parse(cookie[1]);

				this.access_token = token.access_token;
				this.refresh_token = token.refresh_token;

				console.log("Existen tokens");
				console.log(this.access_token);
				console.log(this.refresh_token);
			}
		}
	},

	search: function(inSender, inEvent) {
		enyo.YouTube.search(inEvent.query).response(this, "receiveResults");
	},
	receiveResults: function(inSender, inResults) {
		this.$.viewer.showResults(inResults);
	},
	select: function(inSender, inEvent) {
		console.log("enviamos a ver el sieguinet eid");
		console.log(inEvent.data.id);
		var id = inEvent.data.id;
		this.$.youTube.setShowing(true);
		this.$.youTube.setVideoId(id);
		console.log(this.$.youTube);
		if (!inEvent.related) {
			enyo.YouTube.search(id, true).response(this, "receiveRelatedResults");
		}
	},
	receiveRelatedResults: function(inSender, inResults) {
		this.$.viewer.showRelatedResults(inResults);
	},

	youtubeLogin: function(inSender, inEvent){
		
	},

	youtubeLogout: function(inSender, inEvent){

	},

	showPopup: function(inSender, inEvent){
		var url = this.url_base + "?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&scope=" + this.scope + "&response_type=" + this.response_type;
		// this.$.my_iframe.setAttribute("src", url + "&output=embed");
		window.open(url, '_blank');
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},

	popupHidden: function(inSender, inEvent){
		this.$.token_message.setContent("Pegar el token");
		this.$.token.setValue("");
	},

	cancelLogin: function(inSender, inEvent){
		this.$.modalPopup.hide();
		this.$.token_message.setContent("Pegar el token");
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
		formData.append("client_id", this.client_id);
		formData.append("client_secret", this.client_secret);
		formData.append("redirect_uri", this.redirect_uri);
		formData.append("grant_type", this.grant_type);

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
		}

		//guardamos en las cookies
		document.cookie="session_youtube=" + JSON.stringify(ck);
		console.log("cookie almacenada");
	},

	getVideos: function(inSender, inEvent){
		if(this.access_token !== "" && this.refresh_token !== ""){
			console.log("Inicia un consulta");
			this.getData();
		}else{
			console.log("Es necesario iniciar session");
		}
	},

	getData: function(){
		var params={};
		var my_uri = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video";
		var request = new enyo.Ajax({
            url: my_uri,
            method: "GET",
            headers:{"Authorization": "Bearer " + this.access_token}
        });

        request.response(enyo.bind(this, "getDataResponse"));
        request.go();
	},

	getDataResponse: function(inRequest, inResponse){
		console.log(inRequest);
		console.log(inResponse);
		if(!inResponse) return;
		console.log("Hay datos");
	},

	refreshToken: function(){
		var formData = new FormData();

		formData.append("client_id", this.client_id);
		formData.append("client_secret", this.client_secret);
		formData.append("refresh_token", this.refresh_token);
		formData.append("grant_type", "refresh_token");


		var request = new enyo.Ajax({
			url: "https://accounts.google.com/o/oauth2/token",
			method: "POST",
			postBody: formData
		});
		request.response(enyo.bind(this, "refreshTokenResponse"));
		request.go();
	},

	refreshTokenResponse: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inResponse);
		if(inResponse.access_token){
			this.access_token = inResponse.access_token;
		}
	}

});