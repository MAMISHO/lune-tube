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
        {name:"commentUser1", kind:"FittableColumns", classes:"comment-text my-comment-box",components:[

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

                    {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped", classes: "send-comment-button"},

                ]},

            ]},
        {kind:"Control", name: "spinnerContent",
        fit:true, classes:"enyo-fit",
        components:[
            {kind: "mochi.Spinner", name:"listSpinner", classes: "mochi-large mochi-light lunetube-center-vertical", center: true, components:[
                    {content:"", name: "listMessage", center: true,
                    style: "text-align: center ;width: 50%;margin-left: 25%"
                }
            ]},
            
        ]},
		{kind: "List", name:"list", fit: true,
        // touch: true,
        touchOverscroll: false,
        onSetupItem: "setupItem", 
        classes:"enyo-fit", 
        style:"margin-top: 57px",
        components: [
            {kind: "FittableRows", components:[
            {kind:"CommentItem", name:"commentItem", onOpenReplies: "openReplies", onSetReply:"sendReply"},

            {kind:"FittableColumns", name:"acttionButtons", classes:"comments-action-buttons", components:[

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
        ]}
    ],
    _oldComment: null,
    create:function() {
        this.inherited(arguments);
        this.imageUserChanged();
        this.$.loadMoreSpinner.hide();
        this.$.cancelReplyButton.hide();
        this.isReply = false;
        this.$.spinnerContent.hide();
        this.$.list.setFit(false);
        this.$.spinnerContent.setFit(true);
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

        if(this.comments.length < 1){
            this.$.list.hide();
            this.$.spinnerContent.show();
            return true;
        }else{
            // this.$.list.setFit(true);
            // this.$.spinnerContent.setFit(false);
            this.$.list.show();
            this.$.spinnerContent.hide();
        }

        this.$.spinnerContent.hide();

        this.isReply = false;
        this.$.loadMoreSpinner.hide();
        this.$.loadMoreButton.show();

        this.$.list.setCount(this.comments.length);

        if(this._oldComment){ // comprueba que hay comentarios anteriores

                if(this._oldComment.snippet.videoId === this.comments[0].snippet.videoId){
                    console.log("refresca");
                    this.$.list.refresh();

                }else{
                    console.log("resetea 1");
                    this.$.list.reset();
                }

            }else{
                console.log("resetea 2");
                this.$.list.reset();    
            }

        this._oldComment = this.comments[0];

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
        this.$.comment.setValue("");
        this.$.comment.render();

        // Hack to plain text from Rich text
        var div = document.createElement("div");
        div.innerHTML = comment;
        comment = div.textContent || div.innerText;
        //end hack

        if(comment){
            comment = comment.trim();
        }

        if(comment.length > 0){

        if(this.isReply){
            this.sendReply(this.lastReply, comment);
            return true;
        }

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

        var newReply = {
                snippet: 
                {
                    authorProfileImageUrl: this.getImageUser(),
                    textDisplay: c.snippet.snippet.textOriginal,
                    authorDisplayName: this.getUserName()
                }
            };

        if(this.comments[index].replies){ // si existen comentarios
            
            this.comments[index].replies.comments.unshift(newReply);
        }else{
            var obj = {comments:[]};
            this.comments[index].replies = obj;
            this.comments[index].replies.comments.push(newReply);
        }

        // this.$.commentItem.hideTextBox();
        this.$.cancelReplyButton.hide();
        this.$.replyButton.show();
        this.$.list.renderRow(index);
        this.commentsChanged();
        this.$.list.render();
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