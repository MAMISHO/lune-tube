enyo.kind({
	name: "enyo.YouTube",
	kind: "Control",
	published: {
		videoId: "",
		nextPage: "",
		playerVersion: null,
	},
	statics: {
		isApiReady: false,
		apiReady: function() {
			enyo.YouTube.isApiReady = true;
			enyo.Signals.send("onApiReady");
		},
		url: "https://content.googleapis.com/youtube/v3/search?",
		search: function(inSearchText, inRelated) {
			var params={
				maxResults: 15,
				order: "relevance",
				part: "snippet",
				type: "video",
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
			};

			if(inRelated == null){		// sin videos relacionados				
				params.q = inSearchText;
			}else{						//peticion de videos relacionados
				params.relatedToVideoId = inSearchText;
			}

			var url_base = "https://content.googleapis.com/youtube/v3/";
			var method = "search";

			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponse");
		},

		processResponse: function(inSender, inResponse) {
			// console.log(inResponse);
			this.nextPage = inResponse.nextPageToken;
			// console.log("nextPage" + this.nextPage);
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				var v = {};
				v.id = data[i].id.videoId;
				v.title = data[i].snippet.title;
				v.thumbnail = data[i].snippet.thumbnails.default.url;
				videos.push(v);
			}
			return videos;
		},

		searchNext: function(inSearchText){
			console.log("searchNext");
			var url_base = "https://content.googleapis.com/youtube/v3/";
			var method = "search";
			var params={
				// maxResults: 15,
				order: "relevance",
				part: "snippet",
				type: "video",
				pageToken: this.nextPage,
				q: inSearchText,
				key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
			};
			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponse");
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
			/*console.log("enyo.Youtube --> createPlayer");
			console.log(this.$.video.id);*/
			this.player = new YT.Player(this.$.video.id, {
				height: '100%',
				width: '100%',
				videoId: this.videoId,
				events: {
					onReady: enyo.bind(this, "playerReady"),
					onStateChange: enyo.bind(this, "playerStateChange")
				}
			});
			// console.log(this.$.video);
			// console.log(this.player);
			// positioning hack
			var iframe = this.$.video.hasNode().firstChild;
			var ifr = this.$.video.hasNode();
			// console.log(ifr);
		
			if (iframe) {
				iframe.style.position = "absolute";
				this.reflow();
				console.log(iframe);
			}
		}
	},
	playerReady: function(inEvent) {
		/*var data = document.getElementById('app_youTube_video').contentWindow.document.body.innerHTML;
		var aux = JSON.stringify(data).split("data-version=");
		var aux1 = aux[1].split(".js");
		console.log(aux1[0]);*/
		var d = document.getElementById('app_youTube_video').contentWindow.document;
		var s = d.getElementsByTagName('script');
		var url = null;
		for (var i = 0; i < s.length; i++) {
			var aux = s[i];
			if(aux.src.match("html5player")){
				console.log("encontrado");
				url = aux.src;
			}
		}
		this.setPlayerVersion(url);
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
	},
	
	playerVersionChanged: function(){
		console.log("cambió");
		console.log(this.playerVersion);
		var ajax = new enyo.Ajax({
				url: this.playerVersion
			}).go().response(this, "getPlayerVersion");
	},

	getPlayerVersion: function(inRequest, inResponse){
		
		if(!inResponse) return;
		console.log("llega");
		console.log(inResponse);
		var aux = inResponse.match("\.sig\|\|([a-zA-Z0-9$]+)\(");
		console.log(aux);
	}
});

// global callback called when script is processed
// onYouTubePlayerAPIReady = enyo.YouTube.apiReady;
onYouTubeIframeAPIReady = enyo.YouTube.apiReady;
