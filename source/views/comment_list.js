enyo.kind({
    name: "CommentList",
    kind: "FittableRows",
    style: "height:100%;",
    fit:true,
    handlers:{
        onfocus:"focused"
        // onblur:"blurred"
    },
    published: {
      comments:[],
      imageUser: "assets/icon_user.png",
      userName: "",
      showMore: true
    },
    components: [

		{kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
            {name:"commentUser", kind:"FittableColumns", classes:"comment-text my-comment-box", components:[
                {tag:"img", name:"imageUser", attributes:{src:""}, draggable:false, style:"vertical-align: top"},
                {name:"myComment",kind: "mochi.InputDecorator", style:"vertical-align: bottom", components: [
                    {name:"comment", kind: "onyx.RichText", classes:"mochi-animated", style: "width: 100%", placeholder: "Enter your comment", onchange:"inputChanged", attributes:{"onfocus":enyo.bubbler}}
                ]},
                {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped", style:"height: 24px;vertical-align: bottom"}
            ]},

            {kind:"CommentItem", name:"commentItem", onOpenReplies: "openReplies"},
            {name: "more", style:"width:100%;background-color:rgb(211,211,211);position: relative;height: 38px;text-align: center",ontap: "loadMore", components: [
                    {name: "loadMoreSpinner", kind: "Image", src: "lib/mochi/images/spinner-large-light.gif", style:"height:48px"},//, style:"display: inline-block; position: absolute;top: 0; height:48px"},
                    {name: "loadMoreButton", kind: "mochi.Button", content: "Load More +", ontap:"buttonTapped"},
            ]}
        ]}
    ],
    create:function() {
        this.inherited(arguments);
        this.imageUserChanged();
        this.$.loadMoreSpinner.hide();
        // this.userNameChanged();
        // this.commentsChanged();
    },
    setupItem: function(inSender, inEvent) {
        // console.log(inEvent.index);
        // console.log(this.comments[inEvent.index]);

        if(this.comments[inEvent.index].empty){
            // console.log("if");
            this.$.commentUser.canGenerate = true;
            this.$.commentItem.setImage("");
            this.$.commentItem.setComment("");
            this.$.commentItem.setUser("");
            this.$.more.canGenerate = false;
        }else{
            // console.log("else");
            var i = inEvent.index;
            var item = this.comments[i].snippet.topLevelComment.snippet;
            this.$.commentItem.setImage(item.authorProfileImageUrl);
            this.$.commentItem.setComment(item.textDisplay);
            this.$.commentItem.setUser(item.authorDisplayName);

            if(this.comments[i].replies){
                this.$.commentItem.setReplies(this.comments[i].replies);
            }

            // this.$.myComment.canGenerate = !this.comments[i-1];
            this.$.commentUser.canGenerate = !this.comments[i-1];
            this.$.more.canGenerate = !this.comments[i+1] && this.showMore;
        }
        return true;
    },
    commentsChanged: function(){
        // console.log(this.comments);
        this.$.loadMoreSpinner.hide();
        this.$.loadMoreButton.show();
        if(this.comments.length === 0){
            var flag = {empty:true};
            this.comments = [];
            this.comments.push(flag);
        }
        // console.log(this.comments);
        // console.log(this.comments.length);
        // console.log(this.showMore);
        this.$.list.setCount(this.comments.length);
    	this.$.list.refresh();
        // this.render();
    },

    /*userNameChanged: function(){
        this.$
    },*/
    focused:function() {
        // enyo.log("focused");
        // this.$.myComment.addRemoveClass("mochi-focused", true);
    },
    blurred:function() {
        enyo.log("blurred");
        this.$.myComment.removeClass("mochi-focused");
    },
    imageUserChanged: function(){
        // this.$.imageUser.setSrc(this.imageUser);
        this.$.imageUser.setAttribute("src", this.imageUser);
    },
    sendTapped: function(inSender, inEvent){
        // console.log(this.$.comment.getValue());
        var comment = this.$.comment.getValue().trim();
        var myComment = {
            snippet:{
                topLevelComment:{
                    snippet:{
                        authorProfileImageUrl: this.imageUser,
                        textDisplay: comment,
                        authorDisplayName: this.userName
                    }
                }
            }
        };
        // console.log(myComment);
        if(this.comments[0].empty){
            this.comments.shift();
        }
        this.comments.unshift(myComment);
        this.commentsChanged();
        this.$.comment.setValue("");
        this.bubble("onSetComment", {comment: myComment});
    },

    loadMore: function(inSender, inEvent){
        this.$.loadMoreButton.hide();
        this.$.loadMoreSpinner.show();
        this.bubble("onLoadMoreComments",this);
    },

    openReplies: function(inSender, inEvent){
        console.log(inSender);
        console.log(inEvent);
        console.log(this.$.list);
        // this.$.list.controls[4].controls[3].
    }
    /*toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},*/
});