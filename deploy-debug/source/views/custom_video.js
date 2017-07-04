enyo.kind({
	name: "CustomVideo",
	kind: "enyo.Video",
	published: {

	},
	events: {

	},
	components: [

	],
	handlers: {
		oncanplaythrough: 'canplaythrough',
		onended: "stopBufering"
	},
	checkInterval: 50.0,
	lastPlayPos: 0,
	currentPlayPos: 0,
	bufferingDetected: false,
	intervalId: null,
	// player = document.getElementById('videoPlayer')
	create: function() {
		this.inherited(arguments);

	},

	rendered: function() {
		this.inherited(arguments);
		/*if (this.hasNode()) {
			console.log("CustomVideo -> Rendered:  hay nodo");
			// setInterval(this.checkBuffering, this.checkInterval);
		}*/

	},

	stopBufering: function() {
		window.clearInterval(this.intervalId);
	},

	canplaythrough: function() {
		/*if (this.$.mediaSource) {
			if (this.$.mediaSource.src) {
				// this.intervalId = setInterval(enyo.bind(this, "checkBuffering"), this.checkInterval);
			}
		}*/
	},

	checkBuffering: function() {
		console.log("customPlayer -> checkBuffering: chequea");
		this.currentPlayPos = this.hasNode().currentTime;

		// checking offset, e.g. 1 / 50ms = 0.02
		var offset = 1 / this.checkInterval;

		// if no buffering is currently detected,
		// and the position does not seem to increase
		// and the player isn't manually paused...
		// console.log(this.bufferingDetected + " - " + this.currentPlayPos + " - (" + this.lastPlayPos + " " + offset + " - )" + this.hasNode().paused);
		if (!this.bufferingDetected && this.currentPlayPos < (this.lastPlayPos + offset) && !this.hasNode().paused) {

			console.log("buffering");
			this.bufferingDetected = true;

		}

		// if we were buffering but the player has advanced,
		// then there is no buffering
		if (this.bufferingDetected && this.currentPlayPos > (this.lastPlayPos + offset) && !this.hasNode().paused) {

			console.log("not buffering anymore");
			this.bufferingDetected = false;

		}

		this.lastPlayPos = this.currentPlayPos;
	}

});