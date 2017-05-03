enyo.kind({
	name: "Poster",
	kind: "Control",
	classes: "poster-container",
	published: {
		poster: ""
	},
	events: {

	},
	components: [
		{tag: "img", name: "poster",
		attributes:{"src": ""},
		classes: "poster"
		}
	],
	handlers: {
		oncanplaythrough: 'canplaythrough',
		onended: "stopBufering"
	},
	create: function() {
		this.inherited(arguments);
		this.posterChanged();
	},

	posterChanged: function(){
		this.$.poster.setAttribute("src", this.poster);
	}

});