enyo.kind({
    name: "CommentList",
    kind: "Control",
    published: {
      comments:[]  
    },
    components: [
        /*{name: "filter", kind: "Control", title: "Playlist", icon: "filter", ontap: "toggleDrawer", components: [
			{content: "Playlist", style:"font-size: 20px"}
		]},
		{name: "drawer", kind: onyx.Drawer, open: false, components: [
			// {content: "Item", classes:"playlist-item", ontap: "tapItemPlaylist"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"},
			{kind:"CommentItem", image:this._image, comment:"Este es un comentario de prueba"}
		]}*/
		{kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"CommentItem", name:"commentItem"}    
            ]}
        ]}
    ],
    _image: "https://yt3.ggpht.com/-TdKjRigYjl8/AAAAAAAAAAI/AAAAAAAAAAA/4_ygBS08lNQ/s88-c-k-no/photo.jpg",
    create:function() {
        this.inherited(arguments);
        // this.commentsChanged();
    },
    setupItem: function(inSender, inEvent) {
        var i = inEvent.index;
        var item = this.comments[i].snippet.topLevelComment.snippet;
        // this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));
        
        this.$.commentItem.setImage(item.authorProfileImageUrl);
        this.$.commentItem.setComment(item.textDisplay);
        // this.$.more.canGenerate = !this.videoList[i+1] && this.showMore;
        return true;
    },
    commentsChanged: function(){
    	this.$.list.setCount(this.comments.length);
    	this.$.list.reset();
    }
    /*toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},*/
});