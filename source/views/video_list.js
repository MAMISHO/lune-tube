enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        searching: false
    },
    components: [
        {tag:"div", name:"list_container",classes:"list-container", components:[
        	{kind:"VideoListItem"}
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
        this.videoListChanged();
    },

    videoListChanged: function(){
        this.selected = null;
    	this.$.list_container.destroyClientControls();
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
    	this.$.list_container.render();
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
        if (this.selected) {
            this.selected.removeClass("item-selected");
        }
        inSender.addClass("item-selected");
        this.selected = inSender;
        this.bubble("onStartVideo",inEvent.originator.owner.getVideoId());
    },

    loadMore: function(inSender, inEvent){
        this.setSearching(true);
        this.bubble("onLoadMore",this);
    },

    searchingChanged: function(){
        if(this.searching){
            this.setSearching(true);
            this.$.searchSpinner.setShowing(true);
        }else{
            this.$.searchSpinner.setShowing(false);
        }
    },
});