enyo.kind({
    name: "CommentList",
    kind: "FittableRows",
    style: "height:100%;",
    fit:true,
    handlers:{
        // onfocus:"focused",
        // onblur:"blurred"
    },
    published: {
      comments:[],
      imageUser: "assets/icon_user.png",
      userName: "",
      showMore: true
    },
    components: [
        {name:"commentUser1", kind:"FittableColumns", classes:"comment-text my-comment-box", components:[
                {tag:"img", name:"imageUser1", attributes:{src:""}, draggable:false, style:"vertical-align: top"},
                {name:"myComment1",kind: "mochi.InputDecorator", style:"vertical-align: bottom; width: 76%;position: relative", components: [
                    {name:"comment", kind: "onyx.RichText",
                        classes:"mochi-animated",
                        style: "width: 89%",
                        fit:true,
                        allowHtml:false,
                        placeholder: "Enter your comment", onchange:"inputChanged",
                        ontap: "tapText",
                        selectOnFocus:true,
                        attributes:{"onfocus":enyo.bubbler, "onBlur": enyo.bubbler}
                    },
                    {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped",
                    style:"height: 24px;width:24px;vertical-align: bottom; position: absolute;right: 3px;bottom: 3px"
                    },

                ]},
                // {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped", style:"height: 24px;vertical-align: bottom"}
            ]},
		{kind: "List", name:"list", fit: true,
        // touch: true,
        touchOverscroll: false,
        onSetupItem: "setupItem", 
        // classes:"enyo-fit", 
        components: [
            /*{name:"commentUser", kind:"FittableColumns", classes:"comment-text my-comment-box", components:[
                {tag:"img", name:"imageUser", attributes:{src:""}, draggable:false, style:"vertical-align: top"},
                {name:"myComment",kind: "mochi.InputDecorator", style:"vertical-align: bottom; width: 76%", components: [
                    {name:"comment", kind: "onyx.RichText",
                        // classes:"mochi-animated",
                        style: "width: 89%",
                        fit:true,
                        allowHtml:false,
                        placeholder: "Enter your comment", onchange:"inputChanged",
                        ontap: "tapText",
                        attributes:{"onfocus":enyo.bubbler, "onBlur": enyo.bubbler}
                    },
                    {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped",
                    style:"height: 24px;width:24px;vertical-align: bottom; position: absolute;right: 3px;bottom: 3px"
                    },

                ]},
                // {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped", style:"height: 24px;vertical-align: bottom"}
            ]},*/

            {kind:"CommentItem", name:"commentItem", onOpenReplies: "openReplies", onSetReply:"sendReply"},
            {kind:"FittableColumns", name:"acttionButtons", style:"text-align: right;padding-right: 15px", components:[
                {name:"likeCount",content:"",style:"font-size: 11px;vertical-align: bottom"},
                {kind: "Image", src: "assets/icon-like.png", ontap: "iconTapped", classes:"like-comment"},
                {kind: "Image", src: "assets/icon-unlike.png", ontap: "iconTapped", classes: "like-comment"},
                {name:"replyButton", kind: "Image", src: "assets/icon-reply.png", ontap: "replyComment", classes: "like-comment"},
                {name:"cancelReplyButton",kind: "Image", src: "assets/icon_cancel.png", ontap: "cancelReplyComment", classes: "like-comment"},
            ]},
            {name: "repliesList", kind: "moon.Accordion", content: "Replies", ontap: "openCloseDrawer",open: false,components: [
            ]},
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
        this.$.cancelReplyButton.hide();
        this.isReply = false;
        // this.userNameChanged();
        // this.commentsChanged();
    },
    openCloseDrawer: function(inSender, inEvent) {
        var index = inEvent.index;
        this.comments[index].open = (this.comments[index].open === undefined) ? true : !this.comments[index].open;
        // this.$.theList.renderRow(index);
        // this.$.listDrawer.setOpen(true);
        // this.$.list.prepareRow(index);
        // this.$.repliesList.setOpen(!this.comments[index].open);

        // this.$.commentItem.hideTextBox();
        this.$.cancelReplyButton.hide();
        this.$.replyButton.show();
        
        this.$.list.renderRow(index);
        // console.log(!this.comments[index].open);

        // this.$.list.lockRow();
        this.$.list.resize();
        // this.startJob("resize", function() { this.$.list.resize(); }, 500);
        return true;
    },
    setupItem: function(inSender, inEvent) {
        // console.log(inEvent.index);
        // console.log(this.comments[inEvent.index]);

        var index = inEvent.index;
        if (this.comments[index].open === undefined) {
          this.comments[index].open = true;
        }

        if(this.comments[inEvent.index].empty){
            // this.$.commentUser.canGenerate = true;
            this.$.commentItem.canGenerate = false;
            this.$.acttionButtons.canGenerate = false;
            this.$.repliesList.canGenerate = false;
            this.$.more.canGenerate = false;
        }else{
            // console.log("else");
            var i = inEvent.index;
            var item = this.comments[i].snippet.topLevelComment.snippet;
            this.$.commentItem.setImage(item.authorProfileImageUrl);
            this.$.commentItem.setComment(item.textDisplay);
            this.$.commentItem.setUser(item.authorDisplayName);
            this.$.replyButton.canGenerate = myApiKey.login;

            if(item.likeCount > 0){
                this.$.likeCount.setContent(item.likeCount);
            }else{
                this.$.likeCount.setContent("");
            }

            this.$.repliesList.canGenerate = !!this.comments[i].replies;
            if(this.comments[i].replies){
                // this.$.commentItem.setReplies(this.comments[i].replies);
                this.$.repliesList.destroyClientControls();
                // console.log(this.comments[index]);
                enyo.forEach(this.comments[index].replies.comments, this.addItems, this);
                this.$.repliesList.setOpen(!this.comments[index].open);
                this.$.repliesList.render();
            }

            // this.$.myComment.canGenerate = !this.comments[i-1];
            // this.$.commentUser.canGenerate = !this.comments[i-1];
            this.$.more.canGenerate = !this.comments[i+1] && this.showMore;
        }
        return true;
    },
    commentsChanged: function(){
        // console.log(this.comments);
        if(!myApiKey.login){
            this.$.commentUser1.hide();
        }else{
            this.$.commentUser1.show();
        }
        this.isReply = false;
        this.$.loadMoreSpinner.hide();
        this.$.loadMoreButton.show();
        /*if(this.comments.length === 0){
            var flag = {empty:true};
            this.comments = [];
            this.comments.push(flag);
        }*/
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
    /*focused:function() {
        enyo.log("focused");
        // this.$.comment.focus();
        // this.$.myComment.addRemoveClass("mochi-focused", true);
    },
    blurred:function() {
        enyo.log("blurred");
        // this.$.comment.focus();
        // this.$.myComment.removeClass("mochi-focused");
    },*/
    imageUserChanged: function(){
        // this.$.imageUser.setSrc(this.imageUser);
        // this.$.imageUser.setAttribute("src", this.imageUser);
        this.$.imageUser1.setAttribute("src", this.imageUser);
    },
    sendTapped: function(inSender, inEvent){


        var comment = this.$.comment.getValue();

        // Hack to plain text from Rich text
        var div = document.createElement("div");
        div.innerHTML = comment;
        comment = div.textContent || div.innerText;
        //end hack

        if(comment){
            comment = comment.trim();
        }

        if(this.isReply){
            this.sendReply(this.lastReply, comment);
            this.$.comment.setValue("");
            return true;
        }

        if(comment.length > 0){


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
            this.$.comment.setValue("");
            if(this.comments[0].empty){
                this.comments.shift();
            }
            this.comments.unshift(myComment);
            this.commentsChanged();
            this.bubble("onSetComment", {comment: myComment});
        }
    },

    sendReply: function(index, comment){
        console.log("Se va a enviar una respuesta");
        // console.log(inSender);
        // console.log(inEvent);

        // var c = inEvent.comment;
        var c = {
                snippet:{
                        snippet:{
                            parentId: "",
                            textOriginal: comment
                        }
                }
            };
        c.snippet.snippet.parentId = this.comments[index].id;
        // console.log(c);
        this.bubble("onSetReply",c);
        if(this.comments[index].replies){
            var newReply = {
                snippet: 
                {
                    authorProfileImageUrl: this.getImageUser(),
                    textDisplay: c.snippet.snippet.textOriginal,
                    authorDisplayName: this.getUserName()
                }
            };
            this.comments[index].replies.comments.unshift(newReply);
        }

        // this.$.commentItem.hideTextBox();
        this.$.cancelReplyButton.hide();
        this.$.replyButton.show();
        this.$.list.renderRow(index);
        this.commentsChanged();
        return true;
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
    },
    addItems: function(item, index){
        // console.log(item);
        var comment = item.snippet;
        this.createComponent({
            kind: "commentReply",
            container: this.$.repliesList,
            classes:"comment-reply",
            // components:[
                // {kind: "CommentItem",
                // style:"rgba(134, 164, 190, 0.53)",
                image: comment.authorProfileImageUrl,
                comment: comment.textDisplay,
                user: comment.authorDisplayName,
                // }
            // ]
        });
    },

    replyComment: function(inSender, inEvent){
        
        // this.$.list.prepareRow(inEvent.index);
        // this.$.commentItem.showTextBox();
        // console.log(inEvent.index);
        this.isReply = true;
        if(this.lastReply){
            // this.$.list.prepareRow(this.lastReply);
            this.$.cancelReplyButton.hide();
            this.$.replyButton.show();
            this.$.list.renderRow(this.lastReply);
            this.$.comment.setValue("");
        }
        this.lastReply = inEvent.index;
        this.$.comment.setValue("+" + this.comments[inEvent.index].snippet.topLevelComment.snippet.authorDisplayName + "  ");
        this.$.comment.focus();
        this.$.comment.moveCursorToEnd();
        this.$.replyButton.hide();
        this.$.cancelReplyButton.show();
        this.$.comment.selectAll();
        this.$.list.renderRow(inEvent.index);
        return true;
        // this.$.list.resize();
    },

    cancelReplyComment: function(inSender, inEvent){
        
        // this.$.list.prepareRow(inEvent.index);
        // this.$.commentItem.hideTextBox();
        this.isReply = false;
        this.$.comment.setValue("");
        this.$.cancelReplyButton.hide();
        this.$.replyButton.show();
        this.$.list.renderRow(inEvent.index);
        return true;
        
        // this.$.list.resize();
    },

    tapText: function(inSender, inEvent){
        /*console.log("tapText");
        this.$.comment.focus();
        return true;*/
    }
    /*toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},*/
});