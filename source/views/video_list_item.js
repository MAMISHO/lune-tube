enyo.kind({
    name: "VideoListItem",
    kind: "FittableColumns",
    // classes:"list-item-webos",
    // classes: "list-item",
    style:"height:103px",
    handlers:{
        // ontap:"itemTap"
    },
    published: {
        videoId:"",
        channelId:"",
      	image: "",
      	title: "",
      	channel:"",
      	views:"",
        statistics: {},
      	time:""
    },
    components: [
        // {tag:"img",name:"image", attributes:{src:""}},
        {tag:"div",name:"image", classes:"list-item-img", components:[
            {tag: "p", name: "duration", classes:"list-item-duration"},
        ]},
        {tag:"span", classes:"list-description", components:[
        	{tag:"h3", name:"title", classes:"", content:""},
        	{kind:"FittableRows",
            style:"position: absolute;bottom: 5px",
            components:[
                {tag:"p", name:"channel", content:""},
                // {tag:"p", name:"views", content:""},
                {tag:"p", name:"viewsTime", content:"", classes:"list-item-view-time", allowHtml: true}
            ]}
        ]}

    ],
    create:function() {
        this.inherited(arguments);
		    this.imageChanged();
		    this.titleChanged();
		    this.channelChanged();
		    // this.viewsChanged();
		    this.timeChanged();
    },

	imageChanged: function(){
		// this.$.image.setAttribute("src", this.image);
        this.$.image.setStyle("background-image:url(" + this.image + ");margin-top: 5px !important;");   // 
	},
	titleChanged: function(){
		this.$.title.setContent(this.title);
	},
	channelChanged: function(){
		this.$.channel.setContent(this.channel);
	},
	// viewsChanged: function(){
	// 	this.$.views.setContent(this.views);
	// },
	timeChanged: function(){
		this.$.viewsTime.setContent(this.time);
	},
    itemTap: function(inSender, inEvent){
        console.log("me tap");
        console.log(inSender);
        console.log(inEvent);
    },
    statisticsChanged: function(){
        // console.log("item list -> actualiza la lista");
        // console.log(this.statistics);
        // this.$.views.setContent(this.statistics.statistics.viewCount + " views");
        var aux = this.convertTimeFormat(this.statistics.contentDetails.duration);
        this.$.duration.setContent(aux);

        this.$.viewsTime.setContent(this.statistics.statistics.viewCount + " views" + " <span style='font-size: 1.4em'>&middot;</span> " + this.time);
    },
    
    convertTimeFormat: function (duration) {
        var a = duration.match(/\d+/g);

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
    }
});