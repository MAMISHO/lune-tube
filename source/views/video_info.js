enyo.kind({
    name: "videoInfo",
    kind: "FittableRows",
    classes:"main-info",
    // fit:true,
    published: {
        videoDetails: {},
        videoDescription: ""
    },
    events: {
        
    },
    components: [

            {content: "title", name:"title", classes:"info-title"},            
            {kind: "FittableColumns", components:[
                {content: "channel", name:"channel", classes:"info-channel", fit:true},
                {content: "", name:"views", classes:"info-views"}
            ]},
            {kind: 'Scroller',fit:true, horizontal:"hidden",
                touchOverscroll: false,
                layoutKind: enyo.FittableRowsLayout, components: [
                    {name:"description", allowHtml:true, fit:true, content: "Lorem", classes:"info-description-text"},
            ]},
            {kind: "FittableColumns", classes:"statistics-content", components:[
                {tag:"div", components:[
                    {kind: "Image", src: "assets/icon-like.png", ontap: "iconTapped"},
                    {tag:"br"},
                    {content: "", name: "likes", classes:"info-likes"}
                ]},
                {tag:"div", components:[
                    {kind: "Image", src: "assets/icon-unlike.png", ontap: "iconTapped"},
                    {tag:"br"},
                    {content: "", name: "dislikes", classes:"info-dislikes"}
                ]}     
            ]}
            
        // ]}
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
                this.$.views.setContent("Views " + this.videoDetails.statistics.viewCount);
            }
            this.render();
		}
	},

    videoDescriptionChanged: function(){
        this.$.description.setContent("");
        var myRegexp      = /youtube.com\S+&amp;t=((\d+h)?(\d+m)?(\d+s)?)/g;
        var match         = myRegexp.exec(this.getVideoDescription());
        var glabalMatch = this.getVideoDescription().match(myRegexp);
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
        var comment = this.getVideoDescription().split(/<a\b[^>]*>(.*?)<\/a>/i);
        
        this.$.description.setContent("");
        this.$.description.destroyClientControls();
        this.$.description.destroyComponents();
        for (var j = 0; j < comment.length; j++) {
            if(j%2 === 0){
                this.createComponent({
                    tag: "span",
                    container: this.$.description,
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
                        container: this.$.description,
                        // classes:"comment-text",
                        ontap: "updateTime",
                        content: tl
                    });    
                }else{
                    this.createComponent({
                        tag: "span",
                        container: this.$.description,
                        allowHtml:true,
                        // classes:"comment-text",
                        style:"color: blue; font-size: 0.8em",
                        content: comment[j]
                    });
                }
                
            }
        }

        // this.$.description.setContent(this.videoDescription);
        this.$.description.render();
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
    }

});