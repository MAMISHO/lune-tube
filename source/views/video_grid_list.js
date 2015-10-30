enyo.kind({
	name: "VideoGridList",
	kind:"Control",
	classes: "enyo-fit",
	published: {
        videoList:[],
        searching: false
    },
	components: [
		{name: "list", kind: "enyo.DataGridList",minWidth: 320, minHeight: 103, spacing: 10, components: [
			{components: [
				{kind:"VideoListItem", name:"videoItem", ontap:"itemTap"}
			], bindings: [
				{from: ".model.video_id", to: ".$.videoItem.videoId"},
				{from: ".model.channel_id", to: ".$.videoItem.channelId"},
				{from: ".model.image", to: ".$.videoItem.image"},
				{from: ".model.title", to: ".$.videoItem.title"},
				{from: ".model.views", to: ".$.videoItem.views"},
				{from: ".model.time", to: ".$.videoItem.time"}
				
				/*{from: ".model.firstName", to: ".$.videoItem.title"},
				{from: ".model.lastName", to: ".$.videoItem.chanel"},
				{from: ".model.lastName", to: ".$.videoItem.time", transform: function (v) { return v && v.charAt(0); }},*/
			]}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	],
	create: function(){
		this.inherited(arguments);
    	this.videoListChanged();
	},
	videoListChanged: function(){
        var cl = new enyo.Collection(this.videoList);
        this.set("collection", cl);
        // console.log(cl);
    }
});