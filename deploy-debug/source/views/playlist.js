enyo.kind({
	name: "Playlist",
	published: {
		data:{}
	},
	components: [
		{name: "filter", kind: "Control", title: "Playlist", icon: "filter", ontap: "toggleDrawer", components: [
			{kind:"Image", src:"assets/playlist-icon.png", style:"display: inline-block"},
			{content: "Playlist", style:"font-size: 20px; display: inline-block"}
		]},
		{name: "drawer", kind: onyx.Drawer, open: false, components: [
			// {content: "Item", classes:"playlist-item", ontap: "tapItemPlaylist"},
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.dataChanged();
	},
	dataChanged: function(){
		// console.log(this.data);
		this.selected = null;
		if(this.data.items){
			this.$.drawer.destroyClientControls();
    		enyo.forEach(this.data.items, this.addItems, this);
    		this.$.drawer.render();
		}
	},
	
	addItems: function(item, index){
		this.createComponent({
            kind: "Control",
            container: this.$.drawer,
            classes: "playlist-item",
            published:{playlistInfo:item},
            ontap: "tapItemPlaylist",
            components:[
            	// {kind:"Image", src:"assets/playlist-item-icon.png"},
            	{kind:"Image", src:item.snippet.thumbnails.default.url},
            	{content:item.snippet.title, style:"display: inline-block"}
            ]
        });
	},

	close: function() {
		this.$.drawer.setOpen(false);
	},
	toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	tapItemPlaylist: function(inSender, inEvent) {
		// console.log(inSender.getPlaylistInfo());
		if (this.selected) {
            this.selected.removeClass("item-selected");
        }
        inSender.addClass("item-selected");
        this.selected = inSender;

		this.bubble("onLoadPlaylist",inSender.getPlaylistInfo());
		this.close();
		return true;
	}
});