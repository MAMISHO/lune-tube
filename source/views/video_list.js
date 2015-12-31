enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        playlist:[],
        searching: false,
        showMore: true,
        isPlaylist: false,
        relatedPlaylists: ''
    },
    handlers: {
        onShowVideoMenu: "showVideoMenu",
        ontap: "tapHandler"
    },
    events:{
        onAddToPlaylist: '',
        onRemoveFromPlaylist: ''
    },
    components: [
        {kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit",
        // enableSwipe: true,
        // onSetupSwipeItem: "setupSwipeItem",
         components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"VideoListItem", name:"videoItem"}    
            ]},
            {name: "more", style:"width:100%;background-color:#333;position: relative;height: 58px",ontap: "loadMore", components: [
                {kind:"onyx.Button", content:"Load More +", classes:"list-load-more", components:[
                    {content:"Load More + "},
                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;top: 0"}
                ]}
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
            floating:true,
            actionButtons:[
                    {content:"watch later", name:"later_button"},
                    // {content:"New", name: "new_button"},
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
            ]}
    ],
    _isNewList:null,
    platformStyle:"",
    create:function() {
        this.inherited(arguments);
        /*El siguiente código es necesario para la compatibilidad con webos*/
        //descomentar antes de desplegar 

        var platform = navigator.userAgent.split("(")[1].split(";")[0];
        if(platform === "LuneOS"){
            this.platformStyle = "list-item";
        }else{
            this.platformStyle = "list-item-webos";
        }

        this.playlistChanged();
        // this.isPlaylistChanged();
    },

    videoListChanged: function(){
        // console.log(this.videoList);
        // console.log(this._isNewList[0].video_id);
        // console.log(this._isNewList);
        /*if(this._isNewList){
            console.log(this._isNewList.video_id);
        }*/
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
            this.bubble("onStartVideo",this.videoList[inEvent.index]);
        // }
    },

    loadMore: function(inSender, inEvent){
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
            // if(this.selected){
                this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));   
            // }
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
            components:[
                // {kind:"Image", src:"assets/playlist-item-icon.png"},
                {kind:"Image", src:item.snippet.thumbnails.default.url},
                {content:item.snippet.title, style:"display: inline-block"}
            ]
        });
    },

    hidePopup: function(inSender, inEvent){
        this.$.menu.hide();
        this.$.menu_login.hide();
        this.$.menu_video.hide();
        return true;
    },

    tapHandler: function(inSender, inEvent){
        if (inEvent.actionButton) {

            if (inEvent.originator.name == "dismiss_button"){
                inEvent.popup.hide();
            }

            if (inEvent.originator.name == "new_button"  && myApiKey.login){
                console.log("create new playlist");
            }

            if (inEvent.originator.name == "later_button"  && myApiKey.login){
                this._videoToPlaylist.snippet.playlistId = this.getRelatedPlaylists().watchLater;
                this.doAddToPlaylist({snippet:this._videoToPlaylist});
                this.hidePopup();
                return true;
            }

            if (inEvent.originator.name == "delete_button" && myApiKey.login){
                this.videoList.splice(this._videoDeleteIndex , 1);
                this.$.list.setCount(this.videoList.length);

                this.doRemoveFromPlaylist({videoId:this._videoDeleteFromPlaylist});
                this.$.list.refresh();
                this.hidePopup();
                return true;
            }

            if (inEvent.originator.name == "login_button"){
                this.bubble("onShowMenuOption",this);
                this.hidePopup();
            }
        }
    },

    tapItemPlaylist: function(inSender, inEvent){
        this._videoToPlaylist.snippet.playlistId = this.playlist.items[inSender.index].id;
        this.doAddToPlaylist({snippet:this._videoToPlaylist});
        this.hidePopup();
        return true;
    }
});