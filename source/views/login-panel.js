enyo.kind({
	name: "LoginPanel",
	kind: "enyo.Slideable",
	axis: "v",
	overMoving: false,
	draggable: false,
	events: {},
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: 'Scroller', touchOverscroll: false, style: "height: 150%", components: [
                {kind: "Control", name: "webViewContent"}//, fit: true}
            ]},
            {name: "badge", kind: "mochi.Badge", background: "red", classes: "login-panel-closebutton",  content: "X", ontap: "toggle"}
		]}
	],
	max: 100,
	// min: -98,
	value: 100,
	unit: "%",
	gotToken: false,
	token:"",

	toggle: function(inPanelName) {
	  if(this.isAtMin()){
		  this.animateToMax();
	  }else{
		  this.animateToMin();
	  }
	},

	valueChanged: function() {
		this.inherited(arguments);
		if(this.value === 0) {
			this.youtubeLogin();
		}
	},

	hide: function(inSender, inEvent){
		this.min = -110;
		this.animateToMin();
	},

	show: function(inSender, inEve){
		this.min = -98;
		this.animateToMin();
	},

	createWebView: function(url){
		if (enyo.platform.webos < 4){

			if(!this.$.webView){

				this.$.webViewContent.destroyClientControls();
				this.createComponent({
					container: this.$.webViewContent,
					kind: "WebView",
					url: "",
					onPageTitleChanged: "pageTitleChanged"
				});

				this.$.webViewContent.setStyle("height", "100%");
				this.$.webViewContent.show();
				this.$.webViewContent.render();
				this.$.webView.setUrl(url);
			}else{
				this.$.webViewContent.show();
				this.$.webView.setUrl(url);
			}
		}
	},

	youtubeLogin: function(inSender, inEvent){

		if( !myApiKey.login ){

			var url = myApiKey.url_base + "?client_id=" + myApiKey.client_id + "&redirect_uri=" + myApiKey.redirect_uri + "&scope=" + myApiKey.scope + "&response_type=" + myApiKey.response_type;

			if(enyo.platform.webos < 4){ //webOS

				console.log("Se envia webos");
				this.createWebView(url);
			}

		}
	},

	pageTitleChanged: function(sender, title, url) {
		
		var ind = title.inTitle.indexOf("code=");

		if (ind != -1) {

			var code = title.inTitle.substr(ind + 5);
			
			if ( !this.gotToken){
				this.gotToken = true;
				this.token = code;
				this.bubble("onLoginSuccess", this);
				this.toggle();
			}
			return true;
		}
	},
});