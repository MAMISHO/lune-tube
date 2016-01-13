enyo.kind({
    name: "CommentList",
    kind: "FittableRows",
    // style: "height:50%;",
    fit:true,
    handlers:{
        onfocus:"focused",
        // onblur:"blurred"
    },
    published: {
      comments:[],
      imageUser: "assets/icon_user.png",
      userName: ""
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
            {kind:"CommentItem", name:"commentItem"},
            {name: "more", style:"width:100%;background-color:rgb(211,211,211);position: relative;height: 38px;text-align: center",ontap: "loadMore", components: [
                // {components: [
                    {kind: "mochi.Button", content: "Load More +", ontap:"buttonTapped"},
                    {name: "searchSpinner", kind: "Image", src: "lib/mochi/images/spinner-large-light.gif", style:"display: inline-block; position: absolute;top: 0; height:48px"}
                // ]}
            ]}
        ]},
        /*{name:"myComme",kind: "mochi.InputDecorator", components: [
                    {kind: "mochi.Input", placeholder: "Enter text here", onchange:"inputChanged"}
                ]},*/
    ],
    create:function() {
        this.inherited(arguments);
        this.imageUserChanged();
        // this.userNameChanged();
        // this.commentsChanged();
    },
    setupItem: function(inSender, inEvent) {
        // console.log(inEvent.index);
        // console.log(this.comments[inEvent.index].empty);
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

            // this.$.myComment.canGenerate = !this.comments[i-1];
            this.$.commentUser.canGenerate = !this.comments[i-1];
            this.$.more.canGenerate = !this.comments[i+1];
        }
        return true;
    },
    commentsChanged: function(){
        // console.log(this.comments);
        if(this.comments.length === 0){
            var flag = {empty:true};
            this.comments = [];
            this.comments.push(flag);
        }
        // console.log(this.comments);
        // console.log(this.comments.length);
        this.$.list.setCount(this.comments.length);
    	this.$.list.reset();
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
    }
    /*toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},*/
});