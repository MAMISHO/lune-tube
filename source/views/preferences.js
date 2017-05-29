enyo.kind({
    name: "LunetubePreferences",
    kind: "FittableRows",
    //fit: true,
	//classes:"enyo-fit",
    published: {
        
    },
    events: {
        
    },
    components: [
    	{name: "filter", kind: "Control", title: "Playlist", icon: "filter", ontap: "toggleDrawer", components: [
			{kind:"Image", src:"assets/preferences-icon.png", style:"display: inline-block"},
			//{content: "Playlist", style:"font-size: 20px; display: inline-block"}
		]},
		{name: "drawer", kind: onyx.Drawer, open: false, components: [
			 {content: "Item", classes:"playlist-item", ontap: "tapItemPlaylist"},
		]},

        //Hidden Components
        {kind: "DataPreference", onPreferencesUpdate: "preferencesUpdated", onPreferencesLoaded: "preferencesLoaded"}
    ],
    create:function() {
        this.inherited(arguments);
    },

    close: function() {
		this.$.drawer.setOpen(false);
	},
	toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	

    preferencesUpdated: function(inSender, inEvent){
    	console.log("Preferences -> preferencesUpdated : ");
    	console.log(inSender);
    	console.log(inEvent);
    	var storage = new enyo.LocalStorageSource();
    	var pref = storage.get(inEvent.originator.storageName);

    	var preferences = pref.preferences;
    	if(preferences.length > 0){

			this.$.drawer.destroyClientControls();
    		enyo.forEach(preferences, this.createPreferences, this);
    		this.$.drawer.render();
		}
    	return true;
    },
    
	preferencesLoaded: function(inSender, inEvent){
		console.log("Preferences -> preferencesLoaded : ");
		console.log(inSender);
		console.log(inEvent);
		return true;
	},

	createPreferences: function(item, index){
		var kindName = null;
		var kindControl = null;
		switch(item.type){
			case "toggle":
			kindName 	= item.key;
			kindControl = "Preference.Toggle"
			break;
		}
		if(kindName !== null && kindControl !== null){


			this.createComponent({
				kind: kindControl,
				name: kindName,
				container: this.$.drawer,
				classes: "playlist-item"
				//published:{playlistInfo:item},
				//ontap: "tapItemPlaylist",
            });
		}
	},

});
enyo.kind({
    name: "Preference.Toggle",
    kind: "Control",
    published: {
        
    },
    events: {
        
    },
    components: [
        {kind: "FittableColumns", classes: "config-item", components:[
			{kind: "Control", content: "label", fit: true},
			{kind: "mochi.ToggleButton", onChange: "valueChange", colorActive: "#69cdff", colorInactive: "#ff4a4a", style: "width: 80px"},
		]},
    ],
    create:function() {
        this.inherited(arguments);
        
    }
});