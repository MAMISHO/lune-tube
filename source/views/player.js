enyo.kind({
	name: "Player",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	handlers: {
    	// onRequestTimeChange: "testTime"
    	onStart:"startVideo",
    	onPlay:"statusPlay",
    	onPause: "pauseVideo",
    	onVideoFinished: "videoFinished",
    	onHideControlsComplete: "HideInfoControls"
    	// onloadedmetadata:"loadedMetaData",
    	// onloadeddata: "loadedData"
	},
	published: {
        videoId: "",
        quality: "360p", //calidad por defecto. Se modificará cuando se añada la posibilidad de guardar configuraciones
        hd: null,
        sd: null,
        currentTime:0,
        posterTmp:""
    },
	components: [
		{
			name: "player",
			kind: "LuneTubePlayer",
			preload: "auto",
			fitToWindow:true,
			autoCloseTimeout: 5000,
			ontap:"showControlsPlayer",
			showPlaybackControls:false, //si este es true los demás show deberían ser true
			showPlayPauseControl: false,
			showFFRewindControls: false,
			showJumpControls: false,
			pauseIcon: "icon_pause.png",
			jumpBackIcon: "icon_skipbackward.png",
			playIcon:"icon_play.png",
			jumpForwardIcon: "icon_skipforward.png",
			// disablePlaybackControls: false,
			// sources: [
			// 	{src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4", type: "video/mp4"},
			// ],
			poster: "assets/video-poster.png",
			// autoplay:true,
			onPlaybackControlsTapped: "controlsTapped",
			onFullScreen:"fullScreen",
			onLoadHD: 'loadHD',
			onLoadSD: 'loadSD',
			onChangeResolution: 'changeResolution',
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
		]},

		{kind: "PlayerPanel", name: "panel", classes:"player-panel-config",
		onAnimateFinish:"menuDraggin",
		ondrag: "menuDrag",
		components:[

			{kind: "FittableRows",
			style: "background-color: rgba(0, 0, 0, 0.5);height: 100%",
			components:[
				{kind: "Control", content:"Options", classes: "player-panel-title"},
				{kind: "PlayerConfig", name: "configControl",
					onSpeedChange: "speedChange", 
					onLoopChanged: "loopChanged",
					onSleepApp:    "sleepApp" 
				},
			]},

			// {kind: "Control", classes: "player-background-layer"},
		]}
	],
	bindings: [
		{from:".$.player.disablePlaybackControls", to:".$.controlsToggleButton.value", oneWay:false},
		{from:".$.player.showFFRewindControls", to:".$.ffrewToggleButton.value", oneWay:false}
	],
	status:false, //false when is paused | true when is playing
	_isFullScreen : false,
	_isLoop: false,
	controlsTapped: function() {
		// this.$.tapDialog.show();
	},

	HideInfoControls: function(inSender, inEvent){
		console.log("Se ocultan los controles");
		if(!this.$.panel.isAtMin()){
			this.$.panel.hide();	
		}
		
		return true;
	},


	menuDraggin: function(inSender, inEvent){
		/*console.log(inSender);
		console.log(inEvent);*/
		console.log("Animate finish");
		// inEvent.preventDefault();
		return true;
	},

	menuDrag: function(inSender, inEvent){
		// console.log(inSender);
		// console.log(inEvent);
		console.log("drag");
		inEvent.preventDefault();
		return true;
	},

	speedChange: function(inSender, inEvent){
		console.log("llega slider a player");
		
		switch(inEvent.originator.currentPosition){
			case 2:
				// if(this.$.player._isPlaying){
					this.$.player.play();
				// }
			break;
			default:
				// if(this.$.player._isPlaying){
					this.$.player.speedChange(inEvent.originator.currentPosition);
				// }
			break;

		}
		
		// speedChange
		return true;
	},

	loopChanged: function(inSender, inEvent){
		this._isLoop = inSender.loop;
		this.$.player.setLoop(this._isLoop);
		return true;
	},

	sleepApp: function(inSender, inEvent){
		console.log("APP dormida");
		this.$.player.pause();
		return true;
	},


	dismissTapDialog: function(inSender, inEvent) {

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
	
		// this.$.player.unload();
		if(enyo.platform.webos < 4){
				this.$.player.unload();//comementar para dispositivos mas potentes	
		}
		// this.$.player.setPoster("");
		this.sources = {};
		// this.sd = null;
		// this.hd = null;
		this.currentTime=0;
		

		

			if(this.videoId[0].restricted){ //tratamos si es un video restringido restringido

				var poster = this.videoId[i].poster.split("default");
			
				if(poster[0]){
					this.$.player.setPoster(poster[0] + "hqdefault" + poster[1]);
				}

				this.$.videoInfoHeader.setSubSubTitle(this.videoId[i].title + " " + this.videoId[i].restricted);
				this.$.player.showFSControls();
				this.startJob("videoRestricted", function() { this.bubble("onVideoFinished",this); }, 3000);
				return;

			}

		for (var i = 0; i < this.videoId.length; i++) {
			
			if(this.sources.hasOwnProperty(this.videoId[i].resolution)){

				this.sources[this.videoId[i].resolution].push({src: this.videoId[i].url, type: this.videoId[i].type});

			}else{

				this.sources[this.videoId[i].resolution] = new Array({src: this.videoId[i].url, type: this.videoId[i].type});

			}
			/*if(this.videoId[i].resolution === "SD-MP4"){
				this.sd = {src: this.videoId[i].url, type: this.videoId[i].type};
			}
			if(this.videoId[i].resolution === "HD-MP4"){
				this.hd = {src: this.videoId[i].url, type: this.videoId[i].type};
			}
			if(this.videoId[i].title != this.$.videoInfoHeader.getSubSubTitle()){
				this.$.videoInfoHeader.setSubSubTitle(this.videoId[0].title);
			}*/
		}

		// console.log(this.videoId);
		if(this.videoId[0].title != this.$.videoInfoHeader.getSubSubTitle()){
			this.$.videoInfoHeader.setSubSubTitle(this.videoId[0].title);
		}

		this.$.player.setAutoplay(true);


		/*por defecto se inserta la resolucion 360p definida en los parámetros púbicos
			se mantendrá la resolución elegida por el usuario por toda la sesión si existe
			caso sontrario se elegirá la primera existente
		*/

		/*if(this.sd){
			this.sources.push(this.sd);
			this.quality = "SD-MP4";			
		}else{
			if(this.hd){
				this.sources.push(this.hd);
				this.quality = "HD-MP4";	
			}
		}*/

		// this.$.player.unload();
		// console.log(this.$.player.$.slider);
		// console.log(this.sources);
		// this.loadHackWebos(this.sources);
		
		this.$.player.$.slider.setAvailableQualities(this.sources);

		// this.$.player.setSources(this.sources);
		if(!this.sources.hasOwnProperty(this.quality)){
			var q = Object.keys(this.sources);
			this.setQuality(q.shift());
			// this.$.player.$.slider.setQuality(this.quality);
			// this.$.player.setSources(this.sources[this.quality]);
		// }else{
			// this.$.player.setSources(this.sources[0]);
		}

		this.$.player.getVideo().setCurrentTime(0);
		// this.$.player.getAudio().setCurrentTime(0);
		this.$.player.setVideoDuration(this.videoId[0].duration);
		this.$.player.$.slider.setQuality(this.getQuality());
		this.$.player.setSources(this.sources[this.getQuality()]);
		// this.$.player.setVideoSource(this.sources[this.getQuality()]);
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
		this.$.panel.show();
	},

	// loadHD: function(inSender, inEvent){
		
	// 	if((this.quality === "SD-MP4") && this.hd){
	// 		if(enyo.platform.webos < 4){
	// 			this.$.player.setPoster("");	
	// 		}
			
	// 		this.currentTime = this.$.player.getVideo().getCurrentTime();
	// 		this.sources = [];
	// 		this.sources.push(this.hd);
	// 		this.quality = "HD-MP4";

	// 		if(enyo.platform.webos < 4){
	// 			this.$.player.unload();//comementar para dispositivos mas potentes	
	// 		}
			
	// 		this.$.player.setSources(this.sources);
	// 	}
	// 	return true;
	// },

	// loadSD: function(inSender, inEvent){

	// 	if(this.sd && this.quality === "HD-MP4"){
	// 		if(enyo.platform.webos < 4){
	// 			this.$.player.setPoster("");	
	// 		}
	// 		this.currentTime = this.$.player.getVideo().getCurrentTime();
	// 		this.sources = [];
	// 		this.sources.push(this.sd);
	// 		this.quality = "SD-MP4";
			
	// 		if(enyo.platform.webos < 4){
	// 			this.$.player.unload();//comementar para dispositivos mas potentes	
	// 		}
			
	// 		this.$.player.setSources(this.sources);
	// 	}
	// 	return true;
	// },

	changeResolution: function(inSender, inEvent){
		// console.log("Player -> changeResolution: cambia resolución");

		// console.log(inEvent.quality);
		
		if(inEvent.quality === "video"){
			if (enyo.platform.webos < 4) {
				this.$.player.setPoster("");
			}
		}

		/*if(this.getQuality() != 'Audi'){

			this.currentTime = this.$.player.getVideo().getCurrentTime();
		}else{

			this.currentTime = this.$.player.getAudio().getCurrentTime();
		}*/
		this.currentTime = this.$.player.getVideo().getCurrentTime();

		
		// this.sources = [];
		// this.sources.push(this.sd);
		// this.quality = "SD-MP4";

		
		this.setQuality(inEvent.quality);

		if (enyo.platform.webos < 4) {
			this.$.player.unload(); //comementar para dispositivos mas potentes	
		}

		
		/*
			Cuando es seleccionado el source del video es solo de audio se activa el reproductor
			de audio para reproducir el recurso
		*/
		/*if(this.quality === 'Audi'){
			this.$.player.pause();
			// this.$.player.unload();
			this.$.player.setVideoSource(this.sources[this.quality]);
			this.$.player.$.audio.play();
		}else{
			this.$.player.$.audio.pause();
			// this.$.player.setSources(this.sources[this.quality]);
			this.$.player.play();
		}*/
		
		this.$.player.setSources(this.sources[this.quality]);	
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
			// this.$.player.setCurrentTime(this.$.player.getVideo().getCurrentTime());
		}
		return true;
	},

	videoFinished: function(inSender, inEvent){
		this.currentTime = 0;

		if(this._isLoop){
			this.$.player.setCurrentTime(this.currentTime);
			this.$.player.play();
			this.$.player.$.video.play();
			return true;	
		} 
		console.log("Player -> videoFinished : cambia estado del status" + this.status);
		this.status = false;
		console.log(" a "+  this.status);
	},


	// at firtsly we need to see if android platform is running
	// and make some optimization for backgrund mode.

	playVideo: function(inSender, inEvent){
		// console.log("playVideo : " + this.status);
		

		if(this.status){
			// console.log("dentro del status");
			// this.$.player.setPoster("");
			this.$.player.play();
		}
	},

	pauseVideo: function(inSender, inEvent){
		// this.$.player.setPoster("");
		// console.log("se pausa desde el player");
		this.status = !this.$.player.getVideo().isPaused();
		this.$.player.pause();
	},

	statusPlay: function(inSender, inEvent){
		/*this.log("******************************************");
		this.log(inSender);
		this.log("******************************************");
		this.log(inEvent);
		this.log("******************************************");
		this.log();
		console.log("MAndan a cambiar el estado del player");*/
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
        if(window.cordova){
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
	},

	internetConnectionHandler: function(play_pause){ //play -> true : pause -> false
		console.log("internetConnectionHandler : status del player " + this.getVideoStatus());
		console.log("internetConnectionHandler : status local " + this.status);
		if (play_pause && this.status){
			console.log("internetConnectionHandler : recargar el buffer");
			console.log(this.currentTime);
			
			// enyo.log("los sources son : " + enyo.json.stringify(this.sources));
			
			
			if(enyo.platform.webos){

				// this.$.player.unload();
				// this.$.player.setSources(this.sources);

			}else{

				// this.$.player.play();

			}

			/*HACK*/
			/*var p = document.getElementsByTagName("video")[0];
			p.load();*/
			enyo.$.app.$.player.$.player.$.video.play();
		}else if(!play_pause && this.status){

			this.currentTime = this.$.player.getVideo().getCurrentTime();
			console.log("se captura el time : " + this.currentTime);
		}
		
	},

	loadHackWebos: function(sources){ //hacer con chace porque solo funciona cuando ya esta completo
		var source = sources.pop();
		var req = new XMLHttpRequest();
		req.open('GET', source.src, true);
		req.responseType = 'blob';

		req.onload = function() {
		   // Onload is triggered even on 404
		   // so we need to check the status code
		   if (this.status === 200) {
		      var videoBlob = this.response;
		      var vid = URL.createObjectURL(videoBlob); // IE10+
		      // Video is now downloaded
		      // and we can set it as source on the video element
		      // video.src = vid;
		      // enyo.$.app.$.player.$.player.$.video.play();
		      console.log([{src:vid, type: source.type}]);
		      enyo.$.app.$.player.$.player.setSources([{src:vid, type: source.type}]);
		      setSources(this.sources);
		   }
		};

		req.onerror = function() {
		   // Error
		};

		req.send();
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