enyo.kind({
    name: "CommentList",
    kind: "Control",
    published: {
      comments:[]  
    },
    components: [
		{kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"CommentItem", name:"commentItem"}    
            ]}
        ]}
    ],
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