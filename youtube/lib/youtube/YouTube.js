enyo.kind({
	name: "enyo.YouTube",
	kind: "Control",
	published: {
		videoId: ""
	},
	statics: {
		isApiReady: false,
		apiReady: function() {
			enyo.YouTube.isApiReady = true;
			enyo.Signals.send("onApiReady");
		},
		// url: "http://gdata.youtube.com/feeds/api/videos/",
		url: "https://content.googleapis.com/youtube/v3/search?",
		search: function(inSearchText, inRelated) {
			// console.log("llega aqui");
			// var url = this.url + (inRelated ? inSearchText + "/related" : "");
			// var params = {q: inRelated ? null : inSearchText, alt: "json-in-script", format: 5};
			var url = "https://content.googleapis.com/youtube/v3/search?maxResults=15&order=relevance&part=snippet&q=" + inSearchText +"&type=video&key=AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE";
			return new enyo.JsonpRequest({url: url})
				.go()
				.response(this, "processResponse");
		},
		processResponse: function(inSender, inResponse) {
			/*console.log("response");
			console.log(inSender);
			console.log(inResponse);*/
			var videos = inResponse && inResponse.feed && inResponse.feed.entry || [];
			/*for (var i=0, l; v=videos[i]; i++) {
				l = v.id.$t;
				v.id = l.substring(l.lastIndexOf("/")+1);
				v.title = v.title.$t;
				v.thumbnail = v.media$group.media$thumbnail[1].url;
				console.log(v);
			}*/
			// El siguinete código es valido para la APIv3
			var data = inResponse.items;
			for (var i = 0; i < data.length; i++) {
				// console.log(data[i]);
				var v = {};
				v.id = data[i].id.videoId;
				v.title = data[i].snippet.title;
				v.thumbnail = data[i].snippet.thumbnails.default.url;
				videos.push(v);
			};
			// console.log(videos);
			return videos;
		}
	},
	components: [
		{kind: "Signals", onApiReady: "apiReadySignal"},
		{name: "video", classes: "enyo-fit"}
	],
	apiReadySignal: function() {
		this.createPlayer();
	},
	createPlayer: function() {
		if (enyo.YouTube.isApiReady) {
			this.setPlayerShowing(true);
			console.log("enyo.Youtube --> createPlayer");
			console.log(this.$.video.id);
			/*var tag = document.createElement('script');
		      tag.src = "https://www.youtube.com/iframe_api";
		      var firstScriptTag = document.getElementsByTagName('script')[0];
		      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);*/
			this.player = new YT.Player(this.$.video.id, {
				height: '100%',
				width: '100%',
				videoId: this.videoId,
				events: {
					onReady: enyo.bind(this, "playerReady"),
					onStateChange: enyo.bind(this, "playerStateChange")
				}
			});
			console.log(this.$.video);
			console.log(this.player);
			// positioning hack
			var iframe = this.$.video.hasNode().firstChild;
			console.log(this.$.video.hasNode());
			console.log(iframe);
			if (iframe) {
				iframe.style.position = "absolute";
				this.reflow();
			}
		}
	},
	playerReady: function(inEvent) {
		this.setPlayerShowing(true);
		this.play();
	},
	playerStateChange: function() {
	},
	getPlayer: function() {
		return this.player;
	},
	videoIdChanged: function() {
		if (this.videoId) {
			if (this.player) {
				this.player.loadVideoById(this.videoId);
				this.setPlayerShowing(true);
			} else {
				this.createPlayer();
			}
		} else {
			this.setPlayerShowing(false);
			this.pause();
		}
	},
	setPlayerShowing: function(inShowing) {
		this.$.video.setShowing(inShowing);
	},
	play: function() {
		if (this.player) {
			this.player.playVideo();
		}
	},
	pause: function() {
		if (this.player) {
			this.player.pauseVideo();
		}
	}
});

// global callback called when script is processed
// onYouTubePlayerAPIReady = enyo.YouTube.apiReady;
onYouTubeIframeAPIReady = enyo.YouTube.apiReady;
