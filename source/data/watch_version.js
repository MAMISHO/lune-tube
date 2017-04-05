enyo.kind({
	name: "WatchVersion",
	kind: "Component",
	_currentVersion:null,
	//_repository: "https://raw.githubusercontent.com/MAMISHO/lune-tube/master/appinfo.json",
	_repository: "https://raw.githubusercontent.com/MAMISHO/lune-tube/master/versions.json",
	create: function(){
		this.inherited(arguments);
		this.getCurrentVersion();
	},
	
	getNewVersion: function(){
		return new enyo.Ajax({
				url: this._repository,
				method: "GET",
	            contentType: 'json',
	            cacheBust: false,
	            callbackName: null,
	            overrideCallback: null
			}).go().response(this, "getNewVersionResponse");
	},

	getNewVersionResponse: function(inRequest, inResponse){
		if(!inResponse) return true;
		
		if(this._currentVersion < inResponse.version){
			this.bubble("onThereIsNewVersion",inResponse);
		}else if(this._currentVersion === inResponse.version){
			console.log("Es la última versión");
		}
	},

	getCurrentVersion: function(){
		var request = new enyo.Ajax({
			url: "appinfo.json",
			 contentType: 'json'
		});
		request.response(this, "getCurrentVersionResponse");
		request.go();
	},

	getCurrentVersionResponse: function (inRequest, inResponse) {
		if(!inResponse) return true;
		this._currentVersion = inResponse.version;
	}

});