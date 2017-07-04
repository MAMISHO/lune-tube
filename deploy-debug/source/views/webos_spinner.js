enyo.kind({
	name: "WebosSpinner",
	kind: "Image",
	src: "assets/spinner.gif",
	classes: "spinner-webos",
	create: function() {
		this.inherited(arguments);
	},
	stop: function() {
		this.setShowing(false);
	},
	start: function() {
		this.setShowing(true);
	}
});