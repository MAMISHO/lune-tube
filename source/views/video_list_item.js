enyo.kind({
    name: "VideoListItem",
    kind: "Control",
    // classes:"list-item-webos",
    // classes: "list-item",
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
        {tag:"img",name:"image", attributes:{src:"https://i.ytimg.com/vi/w1oM3kQpXRo/default.jpg"}},
        {tag:"span", classes:"list-description", components:[
        	{tag:"h3", name:"title", classes:"list-titulo", content:"loremPhysical 3D-printed sub-orbital cartel range-rover"},
        	{tag:"p", name:"channel", content:"canal dueño del video"},
        	{tag:"p", name:"views", content:"numero de views"},
        	{tag:"p", name:"time", content:"hace 2 años Tiempo"}
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
	}
});