enyo.kind({
    name: "VideoListItem",
    kind: "FittableColumns",
    // classes:"list-item-webos",
    // classes: "list-item",
    style:"height:103px",
    handlers:{
        ontap:"itemTap"
    },
    published: {
        videoId:"",
        channelId:"",
      	image: "",
      	title: "",
      	channel:"",
      	views:"",
      	time:""  
    },
    components: [
        {tag:"img",name:"image", attributes:{src:""}},
        {tag:"span", classes:"list-description", components:[
        	{tag:"h3", name:"title", classes:"", content:""},
        	{tag:"p", name:"channel", content:""},
        	{tag:"p", name:"views", content:""},
        	{tag:"p", name:"time", content:""}
        ]}

    ],
    create:function() {
        this.inherited(arguments);
		    this.imageChanged();
		    this.titleChanged();
		    this.channelChanged();
		    this.viewsChanged();
		    this.timeChanged();
    },

	imageChanged: function(){
		this.$.image.setAttribute("src", this.image);
	},
	titleChanged: function(){
		this.$.title.setContent(this.title);
	},
	channelChanged: function(){
		this.$.channel.setContent(this.channel);
	},
	viewsChanged: function(){
		this.$.views.setContent(this.views);
	},
	timeChanged: function(){
		this.$.time.setContent(this.time);
	},
    itemTap: function(inSender, inEvent){
        console.log("me tap");
        console.log(inSender);
        console.log(inEvent);
    }
});