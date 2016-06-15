enyo.kind({
    name: "videoInfo",
    kind: "FittableRows",
    classes:"main-info",
    fit:true,
    published: {
        videoDetails: {},
    },
    events: {
        
    },
    components: [
        {kind: 'Scroller',fit:true, horizontal:"hidden", touch: true,layoutKind: enyo.FittableRowsLayout, components: [

            {content: "title", name:"title", classes:"info-title"},
            {content: "channel", name:"channel", classes:"info-channel"},
            {name:"description", classes:"info-description", allowHtml:true, fit:true,content: "Lorem"},
            {tag:"div", classes:"statistics-content", components:[
                {kind: "Image", src: "assets/icon-like.png", ontap: "iconTapped", style:"margin-right:5px;"},
                {tag:"br"},
                {content: "", name: "likes", classes:"info-likes"}
            ]},
            {tag:"div", classes:"statistics-content", components:[
                {kind: "Image", src: "assets/icon-unlike.png", ontap: "iconTapped"},
                {tag:"br"},
                {content: "", name: "dislikes", classes:"info-dislikes"}
            ]}
        ]}
    ],
    create:function() {
        this.inherited(arguments);
		this.videoDetailsChanged();
    },

	videoDetailsChanged: function(){
		if(this.videoDetails.video_id){
            // console.log(this.videoDetails);
			this.$.title.setContent(this.videoDetails.title);
			this.$.channel.setContent(this.videoDetails.chanel);
			this.$.description.setContent(this.videoDetails.description);
            if(this.videoDetails.statistics){
                this.$.likes.setContent(this.videoDetails.statistics.likeCount);
                this.$.dislikes.setContent(this.videoDetails.statistics.dislikeCount);
            }
            this.render();
		}
	}

});