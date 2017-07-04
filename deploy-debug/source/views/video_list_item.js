enyo.kind({
    name: "VideoListItem",
    kind: "FittableColumns",
    // classes:"list-item-webos",
    // classes: "list-item",
    // style:"height:103px",
    style:"height:83px;padding-left: 5px",
    handlers:{
        ontap:"tap"
    },
    events:{
        // onAddToPlaylist: ''
    },
    published: {
        videoId:"",
        channelId:"",
      	image: "",
      	title: "",
      	channel:"",
      	views:"",
        statistics: {},
      	time:"",
        playlistItemId: ""
    },
    components: [
        {tag:"div",name:"image", classes:"list-item-img", components:[
            {tag: "p", name: "duration", classes:"list-item-duration"},
            {name:"boton", classes: "mochi-sample-tools video-menu-button", ontap:"showVideoMenu", components: [
                    {kind: "mochi.Badge", content: "···", classes:"round"}
            ]},
        ]},
        {tag:"span", classes:"list-description", components:[
        	{tag:"h3", name:"title", classes:"", content:""},
        	{kind:"FittableRows",
            style:"position: absolute;bottom: 5px",
            components:[
                {tag:"p", name:"channel", content:"", classes:"list-item-channel"},
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
		this.timeChanged();

    },

	imageChanged: function(){
        this.$.image.setStyle("background-image:url(" + this.image + ");margin-top: 5px !important;");   // 
	},

	titleChanged: function(){
		this.$.title.setContent(this.title);
	},

	channelChanged: function(){
		this.$.channel.setContent(this.channel);
	},
	
	timeChanged: function(){
		this.$.viewsTime.setContent(this.time);
	},

    statisticsChanged: function(){
        var aux = this.convertTimeFormat(this.statistics.contentDetails.duration);
        this.$.duration.setContent(aux);

        this.$.viewsTime.setContent(this.statistics.statistics.viewCount + " views" + " <span style='font-size: 1.4em'>&middot;</span> " + this.time);
    },
    
    convertTimeFormat: function (duration) {
        // console.log(duration);
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
    },

    showVideoMenu: function(inSender, inEvent){
        inEvent.allowBubble = true;
    },

    tap:function(inSender, inEvent) {
        if(inEvent.allowBubble){
            this.bubble("onShowVideoMenu",inEvent);
            return true;
        }
    }
});