enyo.kind({
    name: "CommentItem",
    kind: "FittableRows",
    classes:"comment",
    fit:true,
    published: {
        image: "",
        comment:"",
        user:"",
        replies:[]
        // last: false
    },
    events: {
        onOpenReplies: ""
    },
    handlers:{
        // ontap:"tap"
    },
    components: [
        {kind:"FittableColumns", classes:"comment-text", components:[
            {tag:"img",name:"image", attributes:{src:""}, draggable:false},
            {tag:"p", name:"user", classes:"comment-user", content:""},
        ]},
        {tag:"p", name:"comment",classes:"comment-text", content:"", style:"padding: 0;padding-left: 5px;margin: 0;width:100%", components:[

        ]},
        /*{name:"myComment",kind: "mochi.InputDecorator", style:"vertical-align: bottom; width: 94%;position: relative", components: [
            {name:"commentText", kind: "onyx.RichText", classes:"mochi-animated", style: "width: 89%", fit:true, allowHtml:false, placeholder: "Enter your comment", onchange:"inputChanged", attributes:{"onfocus":enyo.bubbler}},
                {kind: "onyx.IconButton", src: "assets/send-comment.png", ontap:"sendTapped", style:"height: 24px;width:24px;vertical-align: bottom; position: absolute;right: 3px;bottom: 3px"
                }
        ]}*/
    ],
    create:function() {
        this.inherited(arguments);
        // this.$.myComment.hide();
        /*this.imageChanged();
        this.commentChanged();
        this.userChanged();*/
    },

    imageChanged: function(){
        var imgTmp = this.getImage().replace("/s28-", "/s88-"); //get image with more resolution
        
        if(imgTmp){
            this.$.image.setAttribute("src", imgTmp);
        }else{
            this.$.image.setAttribute("src", this.image);
        }
	},

	commentChanged: function(){

        var myRegexp      = /youtube.com\S+&amp;t=((\d+h)?(\d+m)?(\d+s)?)/g;
        var match         = myRegexp.exec(this.getComment());
        var glabalMatch = this.getComment().match(myRegexp);
        var finals = [];
        if(glabalMatch){
            
            for (var i = 0; i < glabalMatch.length; i++) {
                
                var str = glabalMatch[i].toString();
                var t = myRegexp.exec(str);
                if(t){
                    finals.push("PT" + t[1].toUpperCase());
                }else{
                    var s = glabalMatch[i].split("t=");
                    finals.push("PT" + s[1].toUpperCase());
                }
            }

        }
        var comment = this.getComment().split(/<a\b[^>]*>(.*?)<\/a>/i);

        this.$.comment.destroyClientControls();
        for (var j = 0; j < comment.length; j++) {
            if(j%2 === 0){
                this.createComponent({
                    tag: "span",
                    container: this.$.comment,
                    allowHtml:true,
                    // classes:"comment-text",
                    content: comment[j]
                });
            }else{
                var st = finals.pop();
                if(typeof 'undefined'){
                    st = comment[j];
                }
                var tl = this.convertTimeFormat(st);
                if(st.substr(0,1) !== "#" && st.substr(0,4) !== "http" && tl){
                // if(tl){
                    
                    this.createComponent({
                        kind: "mochi.Button",
                        container: this.$.comment,
                        // classes:"comment-text",
                        ontap: "updateTime",
                        content: tl
                    });    
                }else{
                    this.createComponent({
                        tag: "span",
                        container: this.$.comment,
                        allowHtml:true,
                        // classes:"comment-text",
                        style:"color: blue; font-size: 0.8em",
                        content: comment[j]
                    });
                }
                
            }
        }
        this.$.comment.render();


        // this.$.comment.setContent(this.comment);
        // console.log(this.getComment());
	},

    userChanged: function(){
        this.$.user.setContent(this.user);
    },

    repliesChanged: function(){
        // console.log(this.replies);
        /*this.$.drawer.destroyClientControls();
        enyo.forEach(this.replies.comments, this.addItems, this);
        this.$.drawer.render();*/
    },

    addItems: function(item, index){
        var comment = this.replies.comments[index].snippet;
        this.createComponent({
            kind: "commentReply",
            container: this.$.drawer,
            image: comment.authorProfileImageUrl,
            comment: comment.textDisplay,
            // comment: comment.textOriginal,
            user: comment.authorDisplayName,
        });
    },

    convertTimeFormat: function (duration) {
        // if(duration){


        var a = duration.match(/\d+/g);
        // console.log(a);
        if(!a){
            return a;
        }
        if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
            a = [0, a[0], 0];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
            a = [a[0], 0, a[1]];
        }
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
            a = [a[0], 0, 0];
        }
        
        var videoTime = "";
        // console.log(a);
        // console.log(a.length);
        if (a.length == 3) {
            videoTime += parseInt(a[0]);
            if(parseInt(a[1])<10){
                videoTime += ":0" + parseInt(a[1]);
            }else{
                videoTime += ":" + parseInt(a[1]);
            }

            if(parseInt(a[2])<10){
                videoTime += ":0" + parseInt(a[2]);
            }else{
                videoTime += ":" + parseInt(a[2]);
            }
        }

        if (a.length == 2) {
            videoTime += parseInt(a[0]);
            if(parseInt(a[1])<10){
                videoTime += ":0" + parseInt(a[1]);
            }else{
                videoTime += ":" + parseInt(a[1]);
            }
        }

        if (a.length == 1) {
            videoTime += "0:";
            if(parseInt(a[0])<10){
                videoTime += "0" + parseInt(a[0]);
            }else{
                videoTime +=  parseInt(a[0]);
            }
        }
        return videoTime;
        // }
        // return "0:00";
    },

    updateTime: function(inSender, inEvent){
        this.bubble("onUpdateTime",{time: inSender.getContent()});
    },


    toggleDrawer: function(inSender, inEvent) {
        this.doOpenReplies({index: inEvent.index});
        return true;
    },

    sendTapped: function(inSender, inEvent){
        
        var comment = this.$.commentText.getValue();

        // Hack to plain text from Rich text
        var div = document.createElement("div");
        div.innerHTML = comment;
        comment = div.textContent || div.innerText;
        
        if(comment){
            comment = comment.trim();
        }

        if(comment.length > 0){
            var myComment = {
                snippet:{
                        snippet:{
                            parentId: "",
                            textOriginal: comment
                        }
                },
                index:inEvent.index
            };
            this.$.commentText.setValue("");
            this.bubble("onSetReply", {comment: myComment});
        }
    },

    showTextBox: function(inSender, inEvent){
        this.$.commentText.setValue("");
        this.$.myComment.show();
    },

    hideTextBox: function(inSender, inEvent){
        this.$.commentText.setValue("");
        this.$.myComment.hide();
    }

});