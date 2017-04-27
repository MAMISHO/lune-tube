enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        playlist:[],
        searching: false,
        showMore: true,
        isPlaylist: false,
        relatedPlaylists: '',
        message:""
    },
    handlers: {
        onShowVideoMenu: "showVideoMenu",
        ontap: "tapHandler"
    },
    events:{
        onAddToPlaylist: '',
        onRemoveFromPlaylist: '',
        onCreatePlaylist: ''
    },
    components: [
        {kind:"Control", name: "spinnerContent", fit:true, classes:"enyo-fit", components:[
            {kind: "mochi.Spinner", name:"listSpinner", classes: "mochi-large mochi-light lunetube-center-vertical", center: true, components:[
                    {content:"", name: "listMessage", center: true,
                    style: "text-align: center ;width: 50%;margin-left: 25%"
                }
            ]},
            
        ]},
        {kind: "List", name:"list",
        // touch: true,
        onSetupItem: "setupItem", classes:"enyo-fit",
        // enableSwipe: true,
        // onSetupSwipeItem: "setupSwipeItem",
        touchOverscroll: false,
         components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"VideoListItem", name:"videoItem"}    
            ]},
            {name: "more", classes:"lunetube-list-load-more",ontap: "loadMore", components: [
                /*{kind:"onyx.Button", content:"Load More +", classes:"list-load-more", components:[
                    {content:"Load More + "},
                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;top: 0"}
                ]}*/
                {kind: "mochi.Button", content: "Load More +", ontap:"buttonTapped", classes:"list-button-more"},
                {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;top: 0;height: 38px"}
            ]}
        ],
        /*swipeableComponents: [
                {name: 'swipeItem', classes: 'enyo-fit swipeGreen', components: [
                    {name: 'swipeTitle', classes: 'swipeTitle', style:"background-color:rgb(0,160,40)"}
                ]}
        ]*/
        },
        {name:"decorator", kind: "mochi.ContextualPopupDecorator", style:"display:inline-block", components: [
            // {content:"..."},
            {kind: "mochi.ContextualPopup", name:"menu",
            title:"Add To",
            style:"left: 60px !important",
            floating:true,
            actionButtons:[
                    {content:"watch later", name:"later_button"},
                    {content:"New", name: "new_button"},
                    {content:"Cancel", name:"dismiss_button"}
                ],
            components: [
            ]}
        ]},

        {kind: "mochi.ContextualPopup", name:"menu_video",
            title:"Options",
            floating:true,
            actionButtons:[
                    {content:"Delete", name:"delete_button"},
                    {content:"Cancel", name:"dismiss_button"}
                ],
            components: [
            ]},
        {kind: "mochi.ContextualPopup", name:"menu_login",
            title:"Please Login",
            floating:true,
            actionButtons:[
                    {content:"Login", name:"login_button"},
                    {content:"Cancel", name:"dismiss_button"}
                ],
            components: [
            ]},

        {kind: "mochi.ContextualPopup", name: "popupNewPlaylist",
            title: "New Playlist",
            floating: true,
            actionButtons:[
                {content: "Create", name: "create_button"},
                // {content: "Back", name:"back_button"},
                {content:"Cancel", name:"dismiss_button"}
            ],
            components: [
                {kind: "mochi.InputDecorator", components: [
                    {kind: "mochi.Input", placeholder: "Enter title", name: "playlistTitle"},
                ]},
                {tag:"br",classes: "onyx-menu-divider"},
                // {classes: "onyx-menu-divider"},
                {kind: "mochi.InputDecorator", components: [
                    {kind: "mochi.Input", placeholder: "Enter Description", name: "playlistDescription"}
                ]},
                {tag:"br",classes: "onyx-menu-divider"},
                {name:"status", kind: "onyx.ToggleButton", onChange: "toggleChanged", onContent: " Public", offContent: "Private", value:true, classes:"mochi-togle-buttom-custom"}
            ]
        }
    ],
    _isNewList:null,
    platformStyle:"",
    create:function() {
        this.inherited(arguments);
        this.$.listSpinner.addClass('middle');
        this.$.list.setFit(false);
        this.$.spinnerContent.setFit(true);
        /*El siguiente código es necesario para la compatibilidad con webos*/
        //descomentar antes de desplegar 

        // var platform = navigator.userAgent.split("(")[1].split(";")[0];
        /*var platform = navigator.userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
        if(platform){
            this._platform = "webOS";
        }
        if(this._platform === "webOS"){
            this.platformStyle = "list-item-webos";
        }else{
            this.platformStyle = "list-item";
        }*/

        /*if(enyo.platform.webos < 4){*/

        
            this.platformStyle = "list-item-webos";
            this.playlistChanged();
            this.messageChanged();
        // this.isPlaylistChanged();
    },

    videoListChanged: function(){
        // console.log(this.videoList);
        // console.log(this._isNewList[0].video_id);
        // console.log(this._isNewList);
        /*if(this._isNewList){
            console.log(this._isNewList.video_id);
        }*/
        if(this.videoList.length < 1){
            this.$.list.hide();
            this.$.spinnerContent.show();
            return true;
        }else{
            this.$.list.setFit(true);
            this.$.spinnerContent.setFit(false);
            this.$.list.show();
            this.$.spinnerContent.hide();
        }
        // return true;
        this.$.searchSpinner.hide();
        this.$.list.setCount(this.videoList.length);
        if(this.videoList[0]){

            if(this._isNewList){ //entra en la segunda petición 
                if(this._isNewList.video_id === this.videoList[0].video_id){
                    this.$.list.refresh();
                }else{
                    this.selected = null;
                    this.$.list.reset();    
                }
            // }
            /*else if(this.videoList[0] === this._isNewList){
                this.$.list.refresh();*/
            }else{
                this.selected = null;
                this.$.list.reset();    
            }
            this._isNewList = this.videoList[0];
        }else{
            this.selected = null;
            this.$.list.reset();
        }

        if(this.selected){ //If was selected before, is selected now
            this.$.list.select(this.selected);
        }
    },


    selectedVideo: function(inSender, inEvent){
        // console.log(inSender);
        // console.log(inEvent.originator);
        this.selected = inEvent.index;
        /*if(inEvent.originator.name === "button"){
            console.log("mostrar menu y quitar estylo");
        }else{*/
            // console.log(this.videoList[inEvent.index]);
            return this.bubble("onStartVideo",this.videoList[inEvent.index]);
        // }
    },

    updateSelectedVideo: function(index){
        
        this.selected = index;
        this.$.list.select(this.selected);
    },

    loadMore: function(inSender, inEvent){
        /*console.log(this.selected);
        console.log(this.$.list.getSelection());
        console.log(inEvent.index);
        if(this.selected === null){
            console.log("entra");
            this.$.list.deselect(inEvent.index);
        }*/
        this.$.searchSpinner.show();
        this.bubble("onLoadMore",this);
    },

    searchingChanged: function(){
        this.$.searchSpinner.hide();
    },

    setupItem: function(inSender, inEvent) {
        var i = inEvent.index;
        var item = this.videoList[i];
        // console.log(item);
        if(item){


            // console.log(item);
            if(this.selected){
                this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));   
            }
            // this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));
            this.$.videoItem.addClass(this.platformStyle);
            this.$.videoItem.setVideoId(item.video_id);
            this.$.videoItem.setChannelId(item.channel_id);
            this.$.videoItem.setChannel(item.chanel);
            this.$.videoItem.setImage(item.image);
            this.$.videoItem.setTitle(item.title);
            this.$.videoItem.setViews(item.views);
            this.$.videoItem.setTime(item.time);
            if(item.statistics){
                // console.log(item.statistics);
                this.$.videoItem.setStatistics(item);
            }

            if(item.playlistItemId){
                this.$.videoItem.setPlaylistItemId(item.playlistItemId);
            }
            this.$.more.canGenerate = !this.videoList[i+1] && this.showMore;
            // this.$.more.canGenerate = !this.videoList[i+1];
        }
        return true;
    },

    /*setupSwipeItem: function(inSender, inEvent) {

        var i = inEvent.index;
        this.$.swipeTitle.setContent("hola" + i);
        return true;
    },*/

    showVideoMenu: function(inSender, inEvent){
        // console.log(this.videoList[inEvent.index]);
        if(this.videoList[inEvent.index].playlistItemId){
            this._videoDeleteFromPlaylist = this.videoList[inEvent.index].playlistItemId;
            this._videoDeleteIndex = inEvent.index;
        }

        this._videoToPlaylist = {
            snippet:{
                playlistId:'',
                resourceId:{
                    videoId: this.videoList[inEvent.index].video_id,
                    kind: "youtube#video"
                }
            }
        };

        this.popupActive = true;
        inEvent.node = inEvent.originator.eventNode;
        inEvent.activator = this.$.decorator;
        inEvent.activator.node = inEvent.originator.eventNode;

        if(myApiKey.login){
            if(!this.getIsPlaylist()){
                this.$.menu.requestShow(inSender, inEvent);
                this._popupPosition = inEvent;
                this.$.menu.show();
            }else{
                this.$.menu_video.requestShow(inSender, inEvent);
                this.$.menu_video.show();
            }
        }else{
            this.$.menu_login.requestShow(inSender, inEvent);
            this.$.menu_login.show();
        }
        return true;
    },

    playlistChanged: function(){
        if(this.playlist.items && myApiKey.login){
            this.$.menu.setTitle("Add To");
            this.$.menu.destroyClientControls();
            enyo.forEach(this.playlist.items, this.addItems, this);
            this.$.menu.render();
        }
        // else{
            // this.$.menu_login.setTitle("Please Login");
            /*this.$.menu.actionButtons = [
                {name:"login_button", content:"Login"},
                {name:"cancel_button", content:"Cancel"}
            ];*/
            // this.$.later_button.hide();
            // this.$.menu.render();
        // }
    },

    /*isPlaylistChanged: function(){
        console.log("es playlist? : " + this.getIsPlaylist());
    },
*/
    addItems: function(item, index){
        this.createComponent({
            kind: "Control",
            container: this.$.menu,
            classes: "playlist-item",
            published:{playlistInfo:item},
            ontap: "tapItemPlaylist",
            index: index,
            // style:"width:150px",
            components:[
                // {kind:"Image", src:"assets/playlist-item-icon.png"},
                {kind:"Image", src:item.snippet.thumbnails.default.url},
                {content:item.snippet.title, style:"display: inline-block; font-size:16px"}
            ]
        });
    },

    hidePopup: function(inSender, inEvent){
        this.$.menu.hide();
        this.$.menu_login.hide();
        this.$.menu_video.hide();
        this.$.popupNewPlaylist.hide();
        return true;
    },

    tapHandler: function(inSender, inEvent){
        if (inEvent.actionButton) {

            if (inEvent.originator.name == "dismiss_button"){
                inEvent.popup.hide();
            }

            if (inEvent.originator.name == "new_button"  && myApiKey.login){ //Form new playlist
                this.$.menu.hide();
                this.$.popupNewPlaylist.requestShow(inSender, this._popupPosition);
                this.$.playlistTitle.setValue("");
                this.$.playlistDescription.setValue("");
                this.$.status.setValue(true);
                this.$.popupNewPlaylist.show();
                this.$.playlistTitle.focus();
            }

            if (inEvent.originator.name == "later_button"  && myApiKey.login){ //add new video to Watch later
                this._videoToPlaylist.snippet.playlistId = this.getRelatedPlaylists().watchLater;
                this.doAddToPlaylist({snippet:this._videoToPlaylist});
                this.hidePopup();
                return true;
            }

            if (inEvent.originator.name == "delete_button" && myApiKey.login){ // remove video from playlist
                this.videoList.splice(this._videoDeleteIndex , 1);
                this.$.list.setCount(this.videoList.length);

                this.doRemoveFromPlaylist({videoId:this._videoDeleteFromPlaylist});
                this.$.list.refresh();
                this.hidePopup();
                return true;
            }

            if (inEvent.originator.name == "login_button"){ // Need Login
                this.bubble("onShowMenuOption",this);
                this.hidePopup();
            }

            if (inEvent.originator.name == "create_button"){ // send request to create new playlist
                // console.log("Solicita crear playlist");
                // console.log(this.$.playlistTitle.getValue());
                // console.log(this.$.playlistDescription.getValue());
                var newPlaylist = {
                    snippet:{
                        title:'',
                        description:''
                    },
                    status:{
                        privacyStatus:''
                    }
                };

                var title = this.$.playlistTitle.getValue();
                var description = this.$.playlistDescription.getValue();
                var status = this.$.status.getValue();
                title = title.trim();
                description = description.trim();

                if(title.length > 0){
                    newPlaylist.snippet.title = title;
                    if(description.length > 0){
                        newPlaylist.snippet.description = description;
                    }

                    if(status){
                        newPlaylist.status.privacyStatus = "public";
                    }else{
                        newPlaylist.status.privacyStatus = "private";
                    }
                    // console.log(newPlaylist);
                    this.doCreatePlaylist({snippet:newPlaylist, video:this._videoToPlaylist});
                    this.hidePopup();
                }else{
                    this.$.playlistTitle.focus();
                }
            }
        }
    },

    tapItemPlaylist: function(inSender, inEvent){
        this._videoToPlaylist.snippet.playlistId = this.playlist.items[inSender.index].id;
        this.doAddToPlaylist({snippet:this._videoToPlaylist});
        this.hidePopup();
        return true;
    },

    messageChanged: function(){
        this.$.listMessage.setContent(this.message);
    }
});