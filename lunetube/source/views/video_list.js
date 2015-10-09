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
    	this.$.list_container.render();
    },

    addVideoItem: function(item, index){
    	this.createComponent({
            kind: "VideoListItem",
            container: this.$.list_container,
            image: item.image,
            title: item.title,
            chanel: item.chanel,
			views: item.views,
			time: item.time,
            onSelectVideo: "selectedVideo"
        });
    },

    selectedVideo: function(inSender, inEvent){
    	console.log("se ha sleccionado un video");
    }
});