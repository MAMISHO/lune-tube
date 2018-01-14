enyo.kind({
	name: "LoginPanel",
	kind: "enyo.Slideable",
	axis: "v",
	overMoving: false,
	draggable: false,
	events: {
		// onDropPin: "",
		// onShowTraffic: "",
		// onMapTypeSelect: "",
		// onBookmarkSelect: ""
	},
	components: [
		//{name: "shadow", classes: "pullout-shadow"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: 'Scroller',
            touchOverscroll: false, components: [
                {kind: "Control", name: "webViewContent", fit: true}
            ]},
            {name: "badge", kind: "mochi.Badge", background: "red", classes: "login-panel-closebutton",  content: "X", ontap: "toggle"}
		]}
	],
	max: 100,
  	// min: -98,
	value: 100,
	unit: "%", 
	toggle: function(inPanelName) {
		console.log("tap");
		if (this.isAtMin()){
    		this.animateToMax();
	    }else{
	    	this.animateToMin();
	    }
	},
	
	valueChanged: function() {
		this.inherited(arguments);
		console.log(this.value);
		if (this.value === 0) {
			this.youtubeLogin();
			// this.createWebView();
		}
	},

	createWebView: function(url){
		console.log("Procede a crear el web");
        if (enyo.platform.webos < 4){

            if(!this.$.webView){
            	console.log("no hay y crea");

                this.$.webViewContent.destroyClientControls();
                this.createComponent({
                    container: this.$.webViewContent,
                    kind: "WebView",
                    url: url,
                    // style: "height: 400px",
                    onPageTitleChanged: "pageTitleChanged"
                });
                // this.$.webViewContent.setStyle("height", "100%");
                // this.$.webViewContent.setStyle("padding-bottom", "5%");
                this.$.webViewContent.show();
                this.$.webViewContent.render();
                this.$.webView.setUrl(url);
                console.log("ha creado");
            }else{
                this.$.webViewContent.show();
                this.$.webView.setUrl(url);
                this.$.webView.reloadPage();
            }
        }
    },

    youtubeLogin: function(inSender, inEvent){
        console.log("Menu -> youtubeLogin : Vemos las versiones de login");

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
                this.sendAuthorizationToken(code);
            }
            return true;
        }
    },

    sendAuthorizationToken: function(code){
        this.bubble("onGotAutorizationToken", code);
    }
});