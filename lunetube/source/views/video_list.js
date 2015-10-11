enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[]
    },
    components: [
        {tag:"div", name:"list_container",classes:"list-container", components:[
        	{kind:"VideoListItem"}
        ]}
    ],
    create:function() {
        this.inherited(arguments);
        this.videoListChanged();
    },

    videoListChanged: function(){
    	this.$.list_container.destroyClientControls();
    	enyo.forEach(this.videoList, this.addVideoItem, this);
        this.createComponent({
            container: this.$.list_container,
            content:"Cargar Más",
            classes:"list-load-more",
            ontap: "loadMore"
        });
    	this.$.list_container.render();
    },

    addVideoItem: function(item, index){
    	this.createComponent({
            kind: "VideoListItem",
            container: this.$.list_container,
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
        this.bubble("onStartVideo",inEvent.originator.owner.getVideoId());
    },

    loadMore: function(inSender, inEvent){
        this.bubble("onLoadMore",this);
    }
});