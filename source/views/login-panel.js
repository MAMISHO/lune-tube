enyo.kind({
	name: "LoginPanel",
	kind: "enyo.Slideable",
	axis: "v",
	overMoving: false,
	draggable: false,
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: 'Scroller', touchOverscroll: false, style: "height: 150%", components: [
                {kind: "Control", name: "webViewContent"}//, fit: true}
            ]},
            {name: "badge", kind: "mochi.Badge", background: "red", classes: "login-panel-closebutton",  content: "X", ontap: "toggle"}
		]}
	],
	max: 100,
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
		if (this.value === 0) {
			this.youtubeLogin();
		}
	},

	createWebView: function(url){

        if (enyo.platform.webos < 4){

            if(!this.$.webView){

                this.$.webViewContent.destroyClientControls();
                this.createComponent({
                    container: this.$.webViewContent,
                    kind: "WebView",
                    url: url,
                    style: "height: 100%",
                    onPageTitleChanged: "pageTitleChanged",
                    cacheAdapter: false,
                    headerHeight: 10
                });
                
                // this.$.webView.clearCache();
                // this.$.webView.clearCookies();
                // this.$.webView.clearHistory();
                this.$.webView.setUrl(url);

                this.$.webViewContent.show();
                this.$.webViewContent.render();

            }else{

                this.$.webView.clearCache();
                this.$.webView.clearCookies();
                this.$.webView.clearHistory();
                
                this.$.webViewContent.show();
                this.$.webView.render();
                this.$.webView.setUrl(url);
                this.$.webView.reloadPage();
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
                this.sendAuthorizationToken(code);
            }
            return true;
        }
    },

    sendAuthorizationToken: function(code){
        this.bubble("onGotAutorizationToken", code);
    }
});