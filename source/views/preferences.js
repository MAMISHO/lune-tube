enyo.kind({
    name: "LunetubePreferences",
    kind: "FittableRows",
    fit: true,
	classes:"enyo-fit",
    published: {
        
    },
    events: {
        
    },
    components: [
    	{kind: "Control", name: "preferencesTitle", content: "Preferences"},
        //no se ven
        {kind: "DataPreference", onPreferencesUpdate: "preferencesUpdated", onPreferencesLoaded: "preferencesLoaded"}
    ],
    create:function() {
        this.inherited(arguments);
    },

    preferencesUpdated: function(inSender, inEvent){
    	console.log("Preferences -> preferencesUpdated : ");
    	console.log(inSender);
    	console.log(inEvent);
    	return true;
    },
    
	preferencesLoaded: function(inSender, inEvent){
		console.log("Preferences -> preferencesLoaded : ");
		console.log(inSender);
		console.log(inEvent);
		return true;
	}
});