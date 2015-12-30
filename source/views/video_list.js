enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        playlist:[],
        searching: false,
        showMore: true
    },
    handlers: {
        onShowVideoMenu: "showVideoMenu"
    },
    events:{
        onAddToPlaylist:''
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
        {name:"decorator",kind: "mochi.ContextualPopupDecorator", style:"display:inline-block", components: [
            // {content:"..."},
            {kind: "mochi.ContextualPopup", name:"menu",
            title:"Add To",
            floating:true,
            actionButtons:[
                    {content:"watch later"},
                    {content:"New"},
                    {content:"Cancel", ontap:"hidePopup"}
                ],
            components: [
            ]}
        ]},
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
        this.$.more.canGenerate = !this.videoList[i+1] && this.showMore;
        // this.$.more.canGenerate = !this.videoList[i+1];
        return true;
    },

    /*setupSwipeItem: function(inSender, inEvent) {

        var i = inEvent.index;
        this.$.swipeTitle.setContent("hola" + i);
        return true;
    },*/

    showVideoMenu: function(inSender, inEvent){
        // console.log(this.videoList[inEvent.index]);
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
        this.$.menu.requestShow(inSender, inEvent);
        this.$.menu.show();
        return true;
    },

    playlistChanged: function(){
        if(this.playlist.items){
            this.$.menu.destroyClientControls();
            enyo.forEach(this.playlist.items, this.addItems, this);
            this.$.menu.render();
        }
    },

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
        console.log("hide");
        this.$.menu.hide();
        this.$.menu.requestHide();
    },

    tapItemPlaylist: function(inSender, inEvent){
        // console.log(inEvent);
        // console.log(inSender);
        this._videoToPlaylist.snippet.playlistId = this.playlist.items[inSender.index].id;
        this.doAddToPlaylist({snippet:this._videoToPlaylist});
        // console.log(this._videoToPlaylist);
        this.hidePopup();
        return true;
    }
});