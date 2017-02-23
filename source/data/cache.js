enyo.kind({
	name: "Cache",
	kind: enyo.Component,
	published: {
		/*data:{
			key:"",
			value: ""
		}*/
	},
	events: {

	},
	components: [

	],
	_data: {},
	_video:{},
	create:function() {
		this.inherited(arguments);
		this._data = {};
		this._video = {};
	},

    setKey: function(key, value){
    	this._data[key] = value;
    },

    getKey: function(key){
    	return this._data[key];
    },

    setVideo: function(id, video){
    	this._video[id] = video;
    },

    getVideo: function(id){
    	return this._video[id];
    }

});