enyo.kind({
	name: "Player",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	handlers: {
    	// onRequestTimeChange: "testTime"
    	onStart:"startVideo",
    	onPlay:"statusPlay"
    	// onloadedmetadata:"loadedMetaData",
    	// onloadeddata: "loadedData"
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
			preload: "auto",
			fitToWindow:true,
			ontap:"showControlsPlayer",
			pauseIcon: "icon_pause.png",
			jumpBackIcon: "icon_skipbackward.png",
			playIcon:"icon_play.png",
			jumpForwardIcon: "icon_skipforward.png",
			// sources: [
			// 	{src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4", type: "video/mp4"},
			// ],
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
					{content:"HD", name:"hdButton", ontap:"loadHD"},
					{name:"fullScreen",kind: "moon.IconButton", classes:"", ontap:"fullScreen", components:[
						{kind:"Image", src:"assets/video-player/icon_fullscreen.png"}
					]},
					{name:"showInfo",kind: "moon.IconButton", classes:"", ontap:"showVideoInfo", components:[
						{content: "i"}
					]}
				]},
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
	status:false, //false when is paused | true when is playing
	isFullScreen:false,
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
	
		this.$.player.unload();
		// Set source by sources array
		// console.log(this.videoId);
		// this.$.player.setPoster("assets/video-poster.png");
		this.$.player.setPoster("");
		this.sources = [];
		this.sd = null;
		this.hd = null;
		this.currentTime=0;

		for (var i = 0; i < this.videoId.length; i++) {

			if(this.videoId[i].restricted){
				var poster = this.videoId[i].poster.split("default");
			
				if(poster[0]){
					this.$.player.setPoster(poster[0] + "hqdefault" + poster[1]);
				}
				// else{
					
				// }

				this.$.videoInfoHeader.setSubSubTitle(this.videoId[i].title + " " + this.videoId[i].restricted);
				this.$.player.showFSControls();
				// enyo.job('nexVideo', this.bubble("onVideoFinished",this), 4000);
				// enyo.job('nexVideo', this.noPlayVideoRestrcited(), 4000);
				this.startJob("videoRestricted", function() { this.bubble("onVideoFinished",this); }, 3000);
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
		// this.$.player.unload();
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
			this.$.player.setPoster("");
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.sources = [];
			this.sources.push(this.hd);
			this.quality = "HD-MP4";
			this.$.sdButton.removeClass("quality-option-selected");
			this.$.hdButton.addClass("quality-option-selected");
			this.$.player.unload();//comementar para dispositivos mas potentes
			this.$.player.setSources(this.sources);
		}
	},

	loadSD: function(inSender, inEvent){

		if(this.sd && this.quality === "HD-MP4"){
			this.$.player.setPoster("");
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.sources = [];
			this.sources.push(this.sd);
			this.quality = "SD-MP4";
			this.$.hdButton.removeClass("quality-option-selected");
			this.$.sdButton.addClass("quality-option-selected");
			this.$.player.unload();//comementar para dispositivos mas potentes
			this.$.player.setSources(this.sources);
		}
	},

	backtoList: function(inSender, inEvent){
		inEvent.preventDefault();
		this.bubble("onBackToList",this);
	},

	noPlayVideoRestrcited: function(inSender, inEvent){
		console.log("no de puede reproducir");
	},

	/*Cuando el video esta cargado y ha sido llamado al cambio de resolución de un
	mismo recurso se ejecuta el siguiente método*/
	startVideo: function(inSender, inEvent){
		if(this.currentTime > 0){
			this.$.player.setCurrentTime(this.currentTime);
		}
		return true;
	},

	playVideo: function(inSender, inEvent){
		if(this.status){
			// this.$.player.setPoster("");
			this.$.player.play();
		}
	},

	pauseVideo: function(inSender, inEvent){
		// this.$.player.setPoster("");
		this.status = !this.$.player.getVideo().isPaused();
		this.$.player.pause();
	},

	statusPlay: function(inSender, inEvent){
		this.status = true;
		// this.$.player.setPoster("");
	},

	fullScreen: function(inSender, inEvent){
		// inEvent.preventDefault();
		this.isFullScreen = !this.isFullScreen;
		webos.setFullScreen(this.isFullScreen);
		// this.$.player.play();
	},

	showVideoInfo: function(inSender, inEvent){
		// console.log("Mostrar la info");
		inEvent.preventDefault();
		this.bubble("onShowVideoInfo",this);
	}

	// Se lanza cuando los datos informativos del video son cargados
	/*loadedMetaData: function(inSender, inEvent){
		this.$.player.setPoster("");
		return true;
	},

	//se lanza cuando los datos del video son cargados
	loadedData: function(inSender, inEvent){
		this.$.player.setPoster("");
		return true;
	}*/
});