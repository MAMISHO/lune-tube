enyo.kind({
	name: "Playlist",
	published: {
		data:{}
	},
	components: [
		{name: "filter", kind: "Control", title: "All Applications", icon: "filter", ontap: "toggleDrawer", components: [
			{content: "Playlist v"}
		]},
		{name: "drawer", kind: onyx.Drawer, open: false, components: [
			{content: "Item", classes:"playlist-item", ontap: "tapItemPlaylist"},
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.dataChanged();
	},
	dataChanged: function(){
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
            content:item.snippet.title,
            published:{playlistInfo:item},
            ontap: "tapItemPlaylist"
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
		this.bubble("onLoadPlaylist",inSender.getPlaylistInfo());
		this.close();
		return true;
	}
});