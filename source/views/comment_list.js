enyo.kind({
    name: "CommentList",
    kind: "FittableRows",
    style: "height:50%;",
    fit:true,
    published: {
      comments:[]  
    },
    components: [
		{kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
                {kind:"CommentItem", name:"commentItem"}    
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
        this.$.commentItem.setUser(item.authorDisplayName);
        /*if(typeof this.comments[i+1]==="undefined"){
            console.log(this.comments[i+1]);
            this.$.commentItem.setLast(true);
        }*/
        // this.$.more.canGenerate = !this.videoList[i+1] && this.showMore;
        return true;
    },
    commentsChanged: function(){
        // console.log(this.comments);
    	this.$.list.setCount(this.comments.length);
    	this.$.list.reset();
    }
    /*toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},*/
});