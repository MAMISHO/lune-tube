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
				{kind:"VideoListItem", name:"videoItem", ontap:"itemTap"},
				/*{name: "more", style:"width:100%;background-color:#333;position: relative",ontap: "loadMore", components: [
	                {kind:"onyx.Button", content:"Load More +", classes:"list-load-more", components:[
	                    {content:"Load More + "},
	                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;bottom: 0"}
	                ]},
	            ]}*/
	            {kind:"onyx.Button",name:"more", content:"more"}
			], bindings: [
				{from: ".model.video_id", 	to: ".$.videoItem.videoId"},
				{from: ".model.channel_id", to: ".$.videoItem.channelId"},
				{from: ".model.image", 		to: ".$.videoItem.image"},
				{from: ".model.title", 		to: ".$.videoItem.title"},
				{from: ".model.views", 		to: ".$.videoItem.views"},
				{from: ".model.time", 		to: ".$.videoItem.time"},
				
				{from: ".model.video_id", to: ".$.more.canGenerate", transform: function(euid, refferer, binding) {
                    var collection = this.container.collection;
                    // console.log(euid);
                    // console.log(refferer);
                    // console.log(binding._source.index);
                    // console.log(binding);
                    // console.log(binding._source.index);
                    // console.log(collection.length - 1);
                    // return collection.indexOf(binding._source.index) === collection.length - 1;
                    return binding._source.index === collection.length - 1;
                } }
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