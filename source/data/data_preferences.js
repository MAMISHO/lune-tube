enyo.kind({
    name: "DataPreference",
    kind: "Component",
    source: "localstorage",
    published: {
        preferences:{}
    },
    events: {
        onPreferencesUpdate:""
    },
    components: [
        //{kind: "enyo.LocalStorageSource", name: "storage"},
    ],
    storageName: "LuneTubePreferences",
    create:function() {
        this.inherited(arguments);
        //this.loadDefaultPreferences();
        this.loadPreferences();
    },

    loadPreferences: function(){
    	var storage = new enyo.LocalStorageSource();
    	var pref = storage.get(this.storageName);
    	
    	if(pref){

    		this.setPreferences(pref);
    		console.log("Ya existen las preferencias");
    	}else{

    		this.loadDefaultPreferences();
    		console.log("Se cargan las preferencias por defecto");
    	}
    },

    loadDefaultPreferences: function(){
    	var ajax = new enyo.Ajax({
    		url: "./preferences.json",
    	});

    	ajax.response(this, "loadDefaultPreferencesResponse");
        ajax.error(this, "loadDefaultPreferencesError");
		return ajax.go();
    },

    loadDefaultPreferencesResponse: function(inRequest, inResponse){
    	if(!inResponse) return;
    	console.log(inResponse);
    	this.createPreferences(inResponse.preferences);
    },

	loadDefaultPreferencesError: function(inRequest, inResponse){
		if(!inResponse) return;
		console.log(inResponse);

	},

	createPreferences: function(pref) {
	    //if(pref && pref typeof Object){
	    var storage = new enyo.LocalStorageSource();
	    if(pref){

	    	storage.set(this.storageName, pref);
	    	this.bubble("onPreferencesUpdate", pref);
	    }else{
	    	console.log("No se han creado las preferencias");
	    	console.log(pref);
	    }
	},
});