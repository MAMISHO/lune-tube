enyo.kind({
    name: "videoInfo",
    kind: "Control",
    classes:"main-info",
    published: {
        videoDetails: {},
    },
    events: {
        
    },
    components: [
        {content: "title", name:"title", classes:"info-title"},
        {content: "channel", name:"channel", classes:"info-channel"},
        {content: "description", name:"description", classes:"info-description"},
        {content: "", name: "likes", classes:"info-likes"},
        {content: "", name: "dislikes", classes:"info-dislikes"}
    ],
    create:function() {
        this.inherited(arguments);
		this.videoDetailsChanged();
    },

	videoDetailsChanged: function(){
		if(this.videoDetails.video_id){
			this.$.title.setContent(this.videoDetails.title);
			this.$.channel.setContent(this.videoDetails.chanel);
			this.$.description.setContent(this.videoDetails.description);
			this.$.likes.setContent(this.videoDetails.statistics.likeCount);
			this.$.dislikes.setContent(this.videoDetails.statistics.dislikeCount);
		}
	}

});