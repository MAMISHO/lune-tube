enyo.kind({
	name: "WatchVersion",
	kind: "Component",
	_currentVersion:null,
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
	            cacheBust: true,
	            callbackName: null,
	            overrideCallback: null
			}).go().response(this, "getNewVersionResponse");
	},

	getNewVersionResponse: function(inRequest, inResponse){
		if(!inResponse) return true;

		var isLatestVersion = this.versionCompare(this._currentVersion, inResponse.version);
		
		if(isLatestVersion < 0){ // hay actualizacion

			this.bubble("onThereIsNewVersion",inResponse);

		}else if( isLatestVersion === 0){

			console.log("Es la última versión");
		}else{

			console.log("version instalada :" + this._currentVersion + " es superior a la remota :" + inResponse.version);
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
	},

	versionCompare: function(v1, v2, options) {
	    var lexicographical = options && options.lexicographical,
	        zeroExtend = options && options.zeroExtend,
	        v1parts = v1.split('.'),
	        v2parts = v2.split('.');

	    function isValidPart(x) {
	        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	    }

	    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
	        return NaN;
	    }

	    if (zeroExtend) {
	        while (v1parts.length < v2parts.length) v1parts.push("0");
	        while (v2parts.length < v1parts.length) v2parts.push("0");
	    }

	    if (!lexicographical) {
	        v1parts = v1parts.map(Number);
	        v2parts = v2parts.map(Number);
	    }

	    for (var i = 0; i < v1parts.length; ++i) {
	        if (v2parts.length == i) {
	            return 1;
	        }

	        if (v1parts[i] == v2parts[i]) {
	            continue;
	        }
	        else if (v1parts[i] > v2parts[i]) {
	            return 1;
	        }
	        else {
	            return -1;
	        }
	    }

	    if (v1parts.length != v2parts.length) {
	        return -1;
	    }

	    return 0;
	}

});