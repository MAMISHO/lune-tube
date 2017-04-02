enyo.kind({
	name: "Player",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	handlers: {
    	// onRequestTimeChange: "testTime"
    	onStart:"startVideo",
    	onPlay:"statusPlay",
    	onPause: "pauseVideo"
    	// onloadedmetadata:"loadedMetaData",
    	// onloadeddata: "loadedData"
	},
	published: {
        videoId: "",
        quality: "",
        hd: null,
        sd: null,
        currentTime:0,
        posterTmp:""
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
			onFullScreen:"fullScreen",
			onLoadHD: 'loadHD',
			onLoadSD: 'loadSD',
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
					// {content:"SD", name:"sdButton", classes:"quality-option-selected", ontap:"loadSD"},
					// {content:"HD", name:"hdButton", ontap:"loadHD"},
					/*{name:"fullScreen",kind: "moon.IconButton", classes:"", ontap:"fullScreen", components:[
						{kind:"Image", src:"assets/video-player/icon_fullscreen.png"}
					]},*/
					{name:"showInfo",kind: "moon.IconButton", classes:"", ontap:"showVideoInfo", components:[
						// {content: "i", style:"color: #fff"}
						{name:"info",kind:"Image", src:"assets/icon-info.png"}
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
	_isFullScreen : false,
	controlsTapped: function() {
		// this.$.tapDialog.show();
	},
	dismissTapDialog: function() {
		this.$.tapDialog.hide();
	},
	unload: function() {
		this.$.player.unload();
	},
	posterTmpChanged: function(){
		this.$.player.setPoster(this.posterTmp);
	},

	startVideoPlay: function(){
		this.$.player.startVideoPlaying();
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
		// this.$.player.setPoster("");
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

				this.$.videoInfoHeader.setSubSubTitle(this.videoId[i].title + " " + this.videoId[i].restricted);
				this.$.player.showFSControls();
				this.startJob("videoRestricted", function() { this.bubble("onVideoFinished",this); }, 3000);
				return;
			}
			
			
			if(this.videoId[i].resolution === "SD-MP4"){
				this.sd = {src: this.videoId[i].url, type: this.videoId[i].type};
			}
			if(this.videoId[i].resolution === "HD-MP4"){
				this.hd = {src: this.videoId[i].url, type: this.videoId[i].type};
			}
			if(this.videoId[i].title != this.$.videoInfoHeader.getSubSubTitle()){
				this.$.videoInfoHeader.setSubSubTitle(this.videoId[0].title);
			}
		}
		console.log(this.videoId);

		this.$.player.setAutoplay(true);

		if(this.sd){
			this.sources.push(this.sd);
			this.quality = "SD-MP4";			
		}else{
			if(this.hd){
				this.sources.push(this.hd);
				this.quality = "HD-MP4";	
			}
		}
		// this.$.player.unload();
		// console.log(this.$.player.$.slider);
		this.$.player.$.slider.setQuality(this.quality);
		this.$.player.setSources(this.sources);
	},
	
	showControlsPlayer: function(inSender, inEvent){
		// console.log(this.$.player.$.slider);
		var control = inEvent.originator.name;
		// console.log(control);
		if(control != "tapArea" && control != "sdButton" && control != "hdButton" && control != "commentItem" && control != "info" && control != "image" && control !="videoInfo"){
			if(this.$.player.isOverlayShowing()){
				this.$.player.playPause();
				return;
			}
		}
		this.$.player.showFSControls();
	},

	loadHD: function(inSender, inEvent){
		
		if((this.quality === "SD-MP4") && this.hd){
			if(enyo.platform.webos < 4){
				this.$.player.setPoster("");	
			}
			
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.sources = [];
			this.sources.push(this.hd);
			this.quality = "HD-MP4";

			if(enyo.platform.webos < 4){
				this.$.player.unload();//comementar para dispositivos mas potentes	
			}
			
			this.$.player.setSources(this.sources);
		}
		return true;
	},

	loadSD: function(inSender, inEvent){

		if(this.sd && this.quality === "HD-MP4"){
			if(enyo.platform.webos < 4){
				this.$.player.setPoster("");	
			}
			this.currentTime = this.$.player.getVideo().getCurrentTime();
			this.sources = [];
			this.sources.push(this.sd);
			this.quality = "SD-MP4";
			
			if(enyo.platform.webos < 4){
				this.$.player.unload();//comementar para dispositivos mas potentes	
			}
			
			this.$.player.setSources(this.sources);
		}
		return true;
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


	// at firtsly we need to see if android platform is running
	// and make some optimization for backgrund mode.

	playVideo: function(inSender, inEvent){
		console.log("playVideo : " + this.status);
		

		if(this.status){
			console.log("dentro del status");
			// this.$.player.setPoster("");
			this.$.player.play();
		}
	},

	pauseVideo: function(inSender, inEvent){
		// this.$.player.setPoster("");
		console.log("se pausa desde el player");
		this.status = !this.$.player.getVideo().isPaused();
		this.$.player.pause();
	},

	statusPlay: function(inSender, inEvent){
		this.log("******************************************");
		this.log(inSender);
		this.log("******************************************");
		this.log(inEvent);
		this.log("******************************************");
		this.log();
		console.log("MAndan a cambiar el estado del player");
		this.status = true;
		if(enyo.platform.webos < 4){
			this.$.player.setPoster("");
		}
		return true;
		
	},

	getVideoStatus: function(){
		return !this.$.player.getVideo().isPaused();
	},


    /*
        Documentation for android
        the next function is implemented using the follows plugins
        cordova-plugin-fullscreen -> https://www.npmjs.com/package/cordova-plugin-fullscreen
        cordova-plugin-screen-orientation  -> https://www.npmjs.com/package/cordova-plugin-screen-orientation
    */
	fullScreen: function(inSender, inEvent){
        if(currentOsPlatform){ // webos or luneos
            this._isFullScreen = inEvent.$.imageFullscreen.fullscreen;
            webos.setFullScreen(inEvent.$.imageFullscreen.fullscreen);
            
        }
        if(cordova){
        console.log("Is full screen?" + this._isFullScreen);
            if(this._isFullScreen === false){
            	screen.lockOrientation('landscape');
                AndroidFullScreen.immersiveMode(function(){
                    
                    console.log("Landscape success");
                },
                function(error){console.log(error);});
                this._isFullScreen = true;
            }else{

                AndroidFullScreen.showSystemUI(function(){
                    //screen.lockOrientation('portrait');
                    screen.unlockOrientation();
                    console.log("Portrait sudcess");
                },
                function(error){console.log(error);});
                this._isFullScreen = false;
            }
        }
		return true;
	},

	showVideoInfo: function(inSender, inEvent){
		// console.log("Mostrar la info");
		inEvent.preventDefault();
		this.bubble("onShowVideoInfo",this);
	},

	currentTimeChanged: function(){
		
		var hms = this.currentTime;   	// your input string
		var a = hms.split(':'); 		// split it at the colons
		var seconds = 0;

		if(a.length === 2){
			seconds = (+a[0]) * 60 + (+a[1]); 	
		}
		if(a.length === 3){
			seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
		}

		this.$.player.getVideo().setCurrentTime(seconds);
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