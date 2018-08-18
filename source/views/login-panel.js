enyo.kind({name:"IFrameWebView",published:{url:""},events:{onPageTitleChanged:"",onCancelAuth:""},useWebView:!1,useIFrame:!1,useWebViewEnc:!1,useInAppBrowser:!1,components:[{kind:"enyo.Scroller",touch:!0,thumb:!0,classes:"enyo-fill",horizontal:"scroll",vertical:"scroll",components:[{name:"iframe",tag:"iframe",classes:"enyo-fill",touch:!0,attributes:{sandbox:"allow-same-origin allow-forms",onload:enyo.bubbler},showing:!1,onload:"pageLoaded"},{name:"webViewContainer",classes:"enyo-fill",
	style:"min-width: 320px; min-height: 420px;",
	showing:!1,
	//onPageTitleChanged:"webviewLoaded",
	components:[{name:"target"}]},{name:"webView",kind:"WebView",classes:"enyo-fill",
	//onPageTitleChanged:"webviewLoaded",
	showing:!1}]}],create:function(){if(this.inherited(arguments),window.PalmSystem&&PalmSystem.deviceInfo){var t=JSON.parse(PalmSystem.deviceInfo);"Lune OS Device"===t.modelName?(this.log("LuneOS device"),this.useInAppBrowser=!0):3===t.platformVersionMajor?(this.log("webOS 3"),this.useWebView=!0,this.$.webView.show(),this.webView=this.$.webView):(this.useWebViewEnc=!0,this.$.webViewContainer.show(),this.webView=this.$.webViewContainer.createComponent({name:"webViewInner",kind:"WebView",classes:"enyo-fill",
		//onPageTitleChanged:"webviewLoaded"
	}),this.webView.renderInto(this.$.target),this.webView.resize(),this.webView.focus(),this.webView.clearCookies())}else this.log("No webOS device, use iFrame"),this.$.iframe.attributes.sandbox="allow-scripts allow-forms",this.$.iframe.show(),this.useIFrame=!0},pageLoaded:function(t,e){this.log("Page loaded: ",e);var i;this.$.iframe.hasNode()&&this.$.iframe.node.contentDocument?(this.title=this.$.iframe.node.contentDocument.title,"object"==typeof this.title&&(this.title=""+this.title),i=""+this.$.iframe.node.contentDocument.location,this.log("URL: "+i+" with title "+this.title," type of title: ",typeof this.title),this.title!==this.oldTitle&&(this.doPageTitleChanged({title:this.title,url:i}),this.oldTitle=this.title)):(this.log("No contentDocument, yet."),this.log("Adding enyo event handler to content window"),this.$.iframe.node.contentWindow.onload=enyo.blubbler)},
	webviewLoaded:function(t,e){
		this.log("On webviewLoaded, title: ",e.inTitle),
		console.log("title loaded");
		this.doPageTitleChanged({title:e.inTitle,url:e.inUrl})},
		urlChanged:function(){if(this.oldTitle=null,this.useIFrame)this.$.iframe.hasNode().src=this.url;else if(this.useWebView||this.useWebViewEnc)this.webView.setUrl(this.url);else{if(!this.useInAppBrowser)throw"Unknown mode...??";navigator.InAppBrowser.close(),navigator.InAppBrowser.open(this.url),navigator.InAppBrowser.ontitlechanged=function(t){this.log("Title changed: ",t),this.doPageTitleChanged({title:t,url:navigator.InAppBrowser.url})}.bind(this),navigator.InAppBrowser.ondoneclicked=function(){this.doCancelAuth({})}.bind(this)}},hideAll:function(){this.hide(),this.useInAppBrowser&&navigator.InAppBrowser.close()},pasteIntoWebview:function(){this.useIFrame?this.$.iframe.focus():(this.useWebView||this.useWebViewEnc)&&(this.webView.focus(),this.webView.callBrowserAdapter("paste")),window.PalmSystem?window.PalmSystem.paste():document.execCommand("paste")}});
enyo.kind({
	name: "LoginPanel",
	kind: "enyo.Slideable",
	axis: "v",
	overMoving: false,
	draggable: false,
	events: {},
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			/*{kind: 'Scroller', touchOverscroll: false,
			 // style: "height: 150%",
			 classes:"enyo-fill",horizontal:"scroll",vertical:"scroll", 
			  components: [
                {kind: "Control", name: "webViewContent", fit: true, classes: "enyo-fill",
                style:"width: 1000px; height: 1000px;"}
            ]},*/
            // {kind: "IFrameWebView", name: "webView", style: "height: 100%", onPageTitleChanged: "pageTitleChanged"},
            {name: "badge", kind: "mochi.Badge", background: "red", classes: "login-panel-closebutton",  content: "X", ontap: "toggle"},
            {kind: "Control", name: "webViewContent", fit: true, classes: "enyo-fill", style:"width: 100%; height: 100%;"}
            // {kind: "IFrameWebView", name: "webView", style: "height: 100%", onPageTitleChanged: "pageTitleChanged"}
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
		/*if (enyo.platform.webos < 4){

			if(!this.$.webView){

				this.$.webViewContent.destroyClientControls();
				this.createComponent({
					container: this.$.webViewContent,
					kind: "WebView",
					url: "",
					fit: true,
					touch: true,
					classes: "enyo-fill",
					// style: "background: white;border-radius: 15px;margin-left: 2%;margin-top: 6%;margin-right: 2%;width:96%;height:89%",
					onPageTitleChanged: "pageTitleChanged"
				});

				// this.$.webViewContent.setStyle("height", "100%");
				this.$.webViewContent.show();
				this.$.webViewContent.render();
				this.$.webView.setUrl(url);
				this.webView.resize();
			}else{
				this.$.webViewContent.show();
				this.$.webView.setUrl(url);
			}
		} else {
			if(!this.$.webView){

				this.$.webViewContent.destroyClientControls();
				this.createComponent({
					container: this.$.webViewContent,
					// kind: "WebView",
					name:"webView",
					tag: "iframe",
					fit: true,
					src: "https://www.w3schools.com",
					onload: "frameload", 
					attributes:{sandbox:"allow-same-origin allow-forms",onload:enyo.bubbler},
					classes: "enyo-fill",
					style: "border: none"
				});
				this.$.webViewContent.setStyle("height", "100%");
				this.$.webView.setAttribute("src", "https://www.w3schools.com");
				this.$.webView.render();
				this.$.webViewContent.show();
				this.$.webViewContent.render();
				
			}else{
				this.$.webViewContent.setStyle("height", "100%");
				this.$.webView.setAttribute("src", url);
				this.$.webViewContent.show();
				this.$.webViewContent.render();
			}
			// {tag: "iframe", src: "http://cnn.com", classes: "enyo-fill", style: "border: none;"}
		}*/
		if (enyo.platform.webos < 4){

			this.$.webViewContent.destroyClientControls();
			this.createComponent({
				container: this.$.webViewContent,
				kind: "IFrameWebView", name: "webView", style: "height: 100%", onPageTitleChanged: "pageTitleChanged"
			});
			this.$.webView.render();
			this.$.webViewContent.show();
			this.$.webViewContent.render();
			this.$.webView.setUrl(url);
			
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
				this.bubble("onLoginSuccess", this.token);
				this.toggle();
			}
			return true;
		}
	},
});