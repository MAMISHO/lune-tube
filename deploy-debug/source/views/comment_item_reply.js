enyo.kind({
    name: "commentReply",
    kind: "Control",
    published: {
        image: "",
        comment:"",
        user:"",
    },
    events: {
        
    },
    components: [
        {kind:"FittableColumns", classes:"comment-text", components:[
            {tag:"img",name:"image", attributes:{src:""}, draggable:false},
            {tag:"p", name:"user", classes:"comment-user", content:""},
        ]},
        {tag:"p", name:"comment",classes:"comment-text", content:"", style:"padding: 0;margin: 0;width:100%", components:[

        ]},
    ],
    create:function() {
        this.inherited(arguments);
        this.imageChanged();
        this.commentChanged();
        this.userChanged();
    },

    imageChanged: function(){
		this.$.image.setAttribute("src", this.image);
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
    }
});