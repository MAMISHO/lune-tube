enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        searching: false
    },
    handlers: {
    },
    components: [
        {kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"VideoListItem", name:"videoItem"}    
            ]},
            {name: "more", style:"width:100%;background-color:#333;position: relative",ontap: "loadMore", components: [
                {kind:"onyx.Button", content:"Load More +", classes:"list-load-more", components:[
                    {content:"Load More + "},
                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;bottom: 0"}
                ]},
            ]}
        ]}
    ],
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

        // this.platformStyle = "list-item"; //comentar esta linea antes de desplegar
        
        // this.videoListChanged();
    },

    videoListChanged: function(){
        this.selected = null;
    	/*this.$.list_container.destroyClientControls();
    	enyo.forEach(this.videoList, this.addVideoItem, this);
        this.createComponent({
            container: this.$.list_container,
            style:"width:100%;background-color:#333;position: relative",
            ontap: "loadMore",
            components:[
                {content:"Load More +", classes:"list-load-more"},
                {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false, style:"display: inline-block; position: absolute;bottom: 0"}
            ]
        });
    	this.$.list_container.render();*/
        this.$.searchSpinner.hide();
        this.$.list.setCount(this.videoList.length);
        // this.$.list.reset();
        this.$.list.refresh();
    },

    addVideoItem: function(item, index){
    	this.createComponent({
            kind: "VideoListItem",
            container: this.$.list_container,
            classes: this.platformStyle,
            videoId : item.video_id,
            channelId : item.channel_id,
            image: item.image,
            title: item.title,
            chanel: item.chanel,
			views: item.views,
			time: item.time,
            ontap: "selectedVideo"
        });
    },

    selectedVideo: function(inSender, inEvent){
        console.log(inSender);
        console.log(inEvent);
        var item = this.videoList[inEvent.index];
        console.log(item);
        if (this.selected) {
            this.selected.removeClass("item-selected");
        }
        inSender.addClass("item-selected");
        this.selected = inSender;
        this.bubble("onStartVideo",item.video_id);
    },

    loadMore: function(inSender, inEvent){
        // this.setSearching(true);
        this.$.searchSpinner.show();
        this.bubble("onLoadMore",this);
    },

    searchingChanged: function(){
        /*console.log(this.searching);
        console.log(this.$.searchSpinner);
        if(this.searching){
            console.log("se activa el control");
            this.$.searchSpinner.setShowing(false);
        }else{
            console.log("se desactiva el control");
            this.$.searchSpinner.setShowing(true);

        }*/
        // this.$.searchSpinner.setShowing(this.searching);
        // this.$.searchSpinner.setShowing(false);
        this.$.searchSpinner.hide();
    },

    setupItem: function(inSender, inEvent) {
        var i = inEvent.index;
        var item = this.videoList[i];
        // this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));
        this.$.videoItem.addClass(this.platformStyle);
        this.$.videoItem.setVideoId(item.video_id);
        this.$.videoItem.setChannelId(item.channel_id);
        this.$.videoItem.setImage(item.image);
        this.$.videoItem.setTitle(item.title);
        // this.$.videoItem.setChannel(item.chanel);
        this.$.videoItem.setViews(item.views);
        this.$.videoItem.setTime(item.time);
        // this.$.it.setContent("hola <br/> adios <br/> ya nada" + i);
        this.$.more.canGenerate = !this.videoList[i+1];
        return true;
    },
     /*dragstart: function(inSender, inEvent){
        console.log("inicia el drag");

     }*/
});