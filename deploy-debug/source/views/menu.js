enyo.kind({
    name: "LuneTube.Menu",
    kind: "FittableRows",
    // classes:"enyo-fit",
    // fit:true,
    published : {
        status : "",
        imageUser : "assets/icon_user.png",
        playlistUser : [],
        loginButton : "Login",
        login : false,
        token : "",
        version : "",
        info: "<br/>This is a Beta version.</b><br/><hr> Your feedback is very important!, please comment and  <a href='http://forums.webosnation.com/luneos/330640-lunetube-luneos-youtube-client-app.html' target='_blank'>more info here.</a><br/>All versions <a href='https://app.box.com/lunetube-latest' target='_blank'>LuneTube for LuneOS and webOS</a><br/><br/> @Mamisho1 On twitter"
    },
    events: {
    },
    components: [
        {classes: "header", style: "text-align:right", components: [
            {name: "aboutAPP", content: "LuneTube", classes: "header-loc", style: "vertical-align: middle"},
// {kind: "Image", src: "assets/menu.png", ontap:"showMenuOption", style:"vertical-align: middle"}
        ]},
        {kind: 'Scroller', fit: true,
         // horizontal:"hidden",
         // touch: true,
            touchOverscroll: false, components: [
            {name: "loginGroup", kind: "onyx.Groupbox",
            // style: "margin: 10px 5px",
            classes: "menu-groupbox-container",
            components: [
                {kind: "onyx.GroupboxHeader", classes: "lunetube-groupbox-header", content: "paste the token", name: "token_message"},
                {classes: "menu-login-group", components: [
                    {kind: "onyx.InputDecorator", components: [
                        {kind: "onyx.Input", name: "token"},//, style:"background-color:white"}
                    ]},
                    {tag: "br"},
                    {kind: "onyx.Button", ontap: "cancelLogin", components: [
                        {kind: "onyx.Icon", src: "assets/icon_cancel.png"}
                    ]},
                    {kind: "onyx.Button", ontap: "doPasteText", components: [
                        {kind: "onyx.Icon", src: "assets/icon_paste.png"}
                    ]},
                    {kind: "onyx.Button", ontap: "confirmLogin", components: [
                        {kind: "onyx.Icon", src: "assets/icon_confirm.png"}
                    ]}
                            // {kind: "onyx.Button", content: "Paste", ontap: "doPasteText"},
                            // {kind: "onyx.Button", content: "Confirm", ontap: "confirmLogin"}
                ]}
            ]},
            {name: "listChannel", kind: "onyx.Groupbox",
            // style: "margin: 10px 5px", 
            classes: "menu-groupbox-container",
            components: [
                {kind: "onyx.GroupboxHeader", classes: "lunetube-groupbox-header", name: "status", content: "Channel"},
                {ontap: "homeRequest", classes: "menu-option-item", components: [
                    {kind: "Image", src: "assets/home-icon.png"},
                    {content: "Home", style: "display: inline-block"}
                ]},
                {ontap: "expand", classes: "menu-option-item", components: [
                    // {kind:"Image", src:"assets/playlist-icon.png"},
                    {name: "playlistUser", kind: "Playlist", style: "display: inline-block;width: 100%"}
                ]},
                /*{ontap:"loadHistory", classes:"menu-option-item", components:[
                    {kind:"Image", src:"assets/history-icon.png"},
                    {content: "History", style:"display: inline-block"}
                ]},*/
                {ontap: "loadFavorites", classes: "menu-option-item", components: [
                    {kind: "Image", src: "assets/favorites-icon.png"},
                    {content: "Favorites", style: "display: inline-block"}
                ]},
                {ontap: "loadLikes", classes: "menu-option-item lunetube-option-item-after-bottom", components: [
                    {kind: "Image", src: "assets/likes-icon.png"},
                    {content: "Likes", style: "display: inline-block"}
                ]},
                /*{ontap:"loadWatchLater", classes:"menu-option-item lunetube-option-item-after-bottom", components:[
                    {kind:"Image", src:"assets/later-icon.png"},
                    {content: "Watch Later", style:"display: inline-block"}
                ]},*/
                {classes: "menu-option-item lunetube-option-item-bottom", components: [
                    {kind: "Image", src: "assets/mochi-design/down.png", classes: "lunetube-option-item-down"},
                ]},

            ]},

            
            //{kind: "LunetubePreferences", name: "preferences"},
            //{classes: "onyx-menu-divider"},
            // {content: "( Demo login )", style:"display: inline-block", ontap:"openFullLogin"},
            
            {name: "menuOption",classes: "menu-option-default", components: [
                // {name:"status", content: "", classes:"menu-option-item"},
                {kind: "onyx.Icon", name:"imageUser", src: "", style:"width:48px; height:48px", classes:"menu-login-img"},        
                {ontap:"youtubeLogin", popup: "loginPopup", classes:"menu-login", components:[
                    {name:"loginIcon",kind:"Image", src:"assets/login-icon.png"},
                    {name:"loginButton", content: "Login", style:"display: inline-block"}
                ]},

                //webos browser
                {kind: "mochi.Button", name: "cancelButton", content: "Cancel", ontap:"cancelLogin"},
                {kind: "Control", name: "webViewContent", fit: true},
                // {kind: "LunetubePreferences", name: "preferences"},

                {kind: "Control", name: "aboutContainer", components:[
                    {classes: "onyx-menu-divider"},
                    {ontap:"aboutTap", classes:"menu-option-item", style:"text-align: center", components:[
                        // {kind:"Image", src:"assets/home-icon.png"},
                        {name:"info", kind: "onyx.Groupbox", style:"margin: 0 5px", showing:false, components: [
                            {kind: "Control", name: "textInfo", allowHtml:true, content:""}
                        ]},
                        {content: "( About APP )", style:"display: inline-block"},
                        {content: "( DEMO )", ontap: "openVideoDemo"}
                    ]}, 
                ]},
            ]},
        ]},
        // Componentes que no se ven
        {kind: "LunaService",
             name: "launchBrowserCall",
             service: "palm://com.palm.applicationManager/",
             method: "launch",
             onSuccess: "launchFinished",
             onFailure: "launchFail",
             onResponse: "gotResponse",
             subscribe: true
        }
    ],
    gotToken: false,
    _inAppBrowserRef: null,
    create: function () {
        this.inherited(arguments);
        this.statusChanged();
        this.imageUserChanged();
        this.playlistUserChanged();
        this.$.info.hide();
        this.$.listChannel.hide();
        this.$.loginGroup.hide();
        this.$.cancelButton.hide();
    },

    createWebView: function(url){
        if (enyo.platform.webos < 4){

            if(!this.$.webView){

                this.$.webViewContent.destroyClientControls();
                this.createComponent({
                    container: this.$.webViewContent,
                    kind: "WebView",
                    url: "",
                    style: "height: 400px",
                    onPageTitleChanged: "pageTitleChanged"
                });
                this.$.webViewContent.setStyle("height", "100%");
                this.$.webViewContent.setStyle("padding-bottom", "5%");
                this.$.webViewContent.show();
                this.$.webViewContent.render();
                this.$.webView.setUrl(url);
            }else{
                this.$.webViewContent.show();
                this.$.webView.setUrl(url);
            }
        }
    },

    versionChanged: function(){
        this.$.textInfo.setContent("<b>LuneTube v" + this.version + this.info);
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
        this.gotToken = true;
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

            this.$.listChannel.show();
            this.$.loginGroup.hide();
            this.$.loginButton.setContent("Logout");
        }else{

            this.$.listChannel.hide();
            this.$.loginButton.setContent("Login");
        }
    },

    pageTitleChanged: function(sender, title, url) {
        var ind = title.inTitle.indexOf("code=");

        if (ind != -1) {

            var code = title.inTitle.substr(ind + 5);

            if ( !this.gotToken){
                this.$.token.setValue(code);
                this.gotToken = true;
                this.authorizationToken();
            }
            return true;
        }
    },


    /*Login functions*/
    youtubeLogin: function(inSender, inEvent){
        console.log("Menu -> youtubeLogin : Vemos las versiones de login");

        if( !myApiKey.login ){

            var url = myApiKey.url_base + "?client_id=" + myApiKey.client_id + "&redirect_uri=" + myApiKey.redirect_uri + "&scope=" + myApiKey.scope + "&response_type=" + myApiKey.response_type;
            
            if(enyo.platform.webos >= 4){ //LuneOS

                this.$.launchBrowserCall.send({"id": "org.webosports.app.browser", "params":{"target": url}});
            }else if(enyo.platform.webos < 4){ //webOS

                console.log("Se envia webos");
                // this.createWebView(url);
                // this.$.aboutContainer.hide();
                // // this.$.launchBrowserCall.send({"id": "com.palm.app.browser", "params":{"target": url}});
                this.bubble("onOpenFullLogin", this);
                return;
            }else{

                if(window.cordova){ //android

                    // console.log("Se abre con android");
                    /*se usa el siguiente plugin*/
                    /* 
                     Plugin
                     cordova plugin add cordova-plugin-inappbrowser
                     Info
                     https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/#reference
                    */
                     
                    this._inAppBrowserRef = cordova.InAppBrowser.open(url, '_blank', 'location=no,zoom=no,clearcache=yes,hardwareback=yes');
                    this._inAppBrowserRef.addEventListener('loadstop', this.bindSafely(this.loadStopBrowser));
                    this._inAppBrowserRef.addEventListener('exit', this.bindSafely(this.cancelLogin));

                }else{ //desktop

                    // console.log("Se abre con desktop");
                    window.open(url, '_blank');
                }
            }

            
            if(enyo.platform.webos < 4){

                this.$.loginGroup.hide();
                this.$.webViewContent.show();
                this.$.cancelButton.show();
            }else{

                this.$.loginGroup.show();
                this.$.token.focus();
            }
            

        }else{
            this.logout();
        }
    },
    
    loadStopBrowser: function(inSender, inEvent){

        var long = 5;
        var finalUrl = decodeURIComponent(inSender.url);
        var ind = finalUrl.indexOf("code=");

        if (ind === -1) {
            ind = finalUrl.indexOf("approvalCode=");
            long = 13;            
        }

        if (ind != -1) {
            var code = finalUrl.substr(ind + long);
            
            if ( !this.gotToken){
                this.$.token.setValue(code);
                this.gotToken = true;
                this.authorizationToken();
            }
            return true;
        }

        return true;
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

        var postBody = {
                    code: this.$.token.getValue(),
                    client_id: myApiKey.client_id,  
                    client_secret: myApiKey.client_secret,
                    redirect_uri: myApiKey.redirect_uri,
                    grant_type: myApiKey.grant_type,
                };
        var ajax = new enyo.Ajax({
            url: "https://accounts.google.com/o/oauth2/token",
            method: "POST",
            postBody: postBody,
            contentType: 'application/x-www-form-urlencoded',
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
        
        /*var min = (60*1000*30/(24*60*60*1000));
        enyo.setCookie("youtube_token", ck.access_token, {"Max-Age":min});
        enyo.setCookie("youtube_refresh", ck.refresh_token, {"expires":min});
        enyo.setCookie("session_youtube", JSON.stringify(ck), {"expires":min});*/

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

        this.$.webViewContent.hide();
        this.$.cancelButton.hide();
        this.$.aboutContainer.show();
        if (this._inAppBrowserRef !== null) {
            this._inAppBrowserRef.hide();
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
            this.$.webView.setUrl(url);
            this.cancelLogin();
            this.bubble("onShowMenuOption", this);
        }
    },

    cancelLogin: function(inSender, inEvent){
        this.$.info.hide();
        this.$.listChannel.hide();
        this.$.loginGroup.hide();
        this.$.webViewContent.hide();
        this.$.cancelButton.hide();
        this.$.aboutContainer.show();
    },

    openVideoDemo: function(inSender, inEvent){
        var video = {
                        chanel: "MAMISHO",
                        channel_id: "UCF2KdjvDbpZGm5EOje4xUWA",
                        contentDetails: {
                            caption: false,
                            definition: "720p",
                            dimension: "2d",
                            duration: "PT5M9S",
                            licensedContent: false
                        },
                        description: "This is LuneTube a youtube client APP for #webOS and #LuneOS. LuneTube is Beta.",
                        image: "https://i.ytimg.com/vi/j0t3Ot-4h54/default.jpg",
                        statistics: {
                            commentCount: 2,
                            dislikeCount: 0,
                            favoriteCount: 0,
                            likeCount: 4,
                            viewCount: 51
                        },
                        time: "2016-02-20",
                        title: "LuneTube for webOS and LuneOS - Youtube APP",
                        video_id: "j0t3Ot-4h54",
                        views: ""
                    };
        this.bubble("onStartVideo",video);
        this.bubble("onShowMenuOption", this);
        return;
    },

    /*openFullLogin: function(inSender, inEvent){
        console.log("openFullLogin");
        this.bubble("onOpenFullLogin", this);
        return;
    },*/
});