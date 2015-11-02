enyo.kind({
	name: "Player",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	handlers: {
    	// onRequestTimeChange: "testTime"
	},
	published: {
        videoId: "",
        quality: "",
        hd: null,
        sd: null,
        currentTime:0
    },
	components: [
		{
			name: "player",
			kind: "moon.VideoPlayer",
			ontap:"showControlsPlayer",
			pauseIcon: "icon_pause.png",
			jumpBackIcon: "icon_skipbackward.png",
			playIcon:"icon_play.png",
			jumpForwardIcon: "icon_skipforward.png",
			sources: [
				{src: "http://media.w3.org/2010/05/bunny/movie.mp4", type: "video/mp4"},
			],
			poster: "assets/video-poster.png",
			// autoplay:true,
			onPlaybackControlsTapped: "controlsTapped",
			infoComponents: [
				{kind: "moon.VideoInfoBackground", orient: "left", background: true, fit: true, components: [
					{kind: "moon.VideoInfoHeader",subSubTitle: "Lunetube >>"}
				]},
				/*{kind: "moon.VideoInfoBackground", orient: "right", background: true, components: [
					{kind:"moon.Clock"}
				]}*/
				{tag:"div", classes:"quality-option", components:[
				{name:"backButton",kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style", ontap:"backtoList", components:[
					{kind:"Image", src:"assets/back-icon.png"}
				]},
					{content:"SD", name:"sdButton", classes:"quality-option-selected", ontap:"loadSD"},
					{content:"HD", name:"hdButton", ontap:"loadHD"}
				]}
			],
			components: [
				/*{name:"backButton",kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style", ontap:"backtoList", components:[
					{kind:"Image", src:"assets/back-icon.png"}
				]}*/
			]
		},
		{kind:"moon.Dialog", name:"tapDialog", title:"The controls were tapped.", message:"Press OK to dismiss", components: [
			{kind:"moon.Button", content:"OK", ontap:"dismissTapDialog"}
		]}
	],
	bindings: [
		{from:".$.player.disablePlaybackControls", to:".$.controlsToggleButton.value", oneWay:false},
		{from:".$.player.showFFRewindControls", to:".$.ffrewToggleButton.value", oneWay:false}
	],
	controlsTapped: function() {
		// this.$.tapDialog.show();
	},
	dismissTapDialog: function() {
		this.$.tapDialog.hide();
	},
	unload: function() {
		this.$.player.unload();
	},
	/*load: function() {
		this.$.player.unload();
		// We can set source by sources array
		this.sources = [
			{src: "http://media.w3.org/2010/05/bunny/movie.mp4", type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/bunny/movie.ogg", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/bunny/movie.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
	},
*/	videoIdChanged: function(inSender, inEvent) {
	
		// this.$.player.unload();
		// Set source by sources array
		// console.log(this.videoId);
		this.sources = [];
		this.sd = null;
		this.hd = null;
		this.currentTime=0;

		for (var i = 0; i < this.videoId.length; i++) {
			var poster = this.videoId[i].poster.split("default");
			if(poster[0]){
				this.$.player.setPoster(poster[0] + "hqdefault" + poster[1]);
			}else{
				this.$.player.setPoster("assets/video-poster.png");
			}

			if(this.videoId[i].restricted){
				this.$.videoInfoHeader.setSubSubTitle(this.videoId[i].title + " " + this.videoId[i].restricted);
				this.$.player.showFSControls();
				// enyo.job('nexVideo', this.bubble("onVideoFinished",this), 4000);
				// enyo.job('nexVideo', this.noPlayVideoRestrcited(), 4000);
				this.startJob("cargarPagina", function() { this.bubble("onVideoFinished",this); }, 3000);
				// break;
				return;
			}
			
			
			if(this.videoId[i].resolution === "SD-MP4"){
				// this.sources.push({src: this.videoId[i].url, type: this.videoId[i].type});
				// this.quality = this.videoId[i].resolution;
				this.sd = {src: this.videoId[i].url, type: this.videoId[i].type};
				// break;
			}
			if(this.videoId[i].resolution === "HD-MP4"){
				// this.quality = this.videoId[i].resolution;
				this.hd = {src: this.videoId[i].url, type: this.videoId[i].type};
			}
			if(this.videoId[i].title != this.$.videoInfoHeader.getSubSubTitle()){
				this.$.videoInfoHeader.setSubSubTitle(this.videoId[0].title);
			}
		}

		this.$.player.setAutoplay(true);

		if(this.sd){
			// console.log("load SD");
			this.sources.push(this.sd);
			this.$.hdButton.removeClass("quality-option-selected");
			this.$.sdButton.addClass("quality-option-selected");
			this.quality = "SD-MP4";			
		}else{
			if(this.hd){
				// console.log("load HD");
				this.sources.push(this.hd);
				this.$.sdButton.removeClass("quality-option-selected");
				this.$.hdButton.addClass("quality-option-selected");
				this.quality = "HD-MP4";	
			}
		}
		this.$.player.unload();
		this.$.player.setSources(this.sources);
		
	},
	
	showControlsPlayer: function(inSender, inEvent){

		var control = inEvent.originator.name;
		if(control != "tapArea" && control != "sdButton" && control != "hdButton"){
			if(this.$.player.isOverlayShowing()){
				this.$.player.playPause();
				return;
			}
		}
		this.$.player.showFSControls();
	},

	loadHD: function(inSender, inEvent){
		
		if((this.quality === "SD-MP4") && this.hd){
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.$.player.unload();
			this.sources = [];
			this.sources.push(this.hd);
			this.quality = "HD-MP4";
			this.$.player.setSources(this.sources);
			this.$.sdButton.removeClass("quality-option-selected");
			this.$.hdButton.addClass("quality-option-selected");
			this.$.player.setCurrentTime(this.currentTime);
		}
	},

	loadSD: function(inSender, inEvent){

		if(this.sd && this.quality === "HD-MP4"){
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.$.player.unload();
			this.sources = [];
			this.sources.push(this.sd);
			this.quality = "SD-MP4";
			this.$.player.setSources(this.sources);
			this.$.hdButton.removeClass("quality-option-selected");
			this.$.sdButton.addClass("quality-option-selected");
			this.$.player.setCurrentTime(this.currentTime);
		}
	},

	backtoList: function(inSender, inEvent){
		inEvent.preventDefault();
		this.bubble("onBackToList",this);
	},

	noPlayVideoRestrcited: function(inSender, inEvent){
		console.log("no de puede reprodcucir");
	}
});