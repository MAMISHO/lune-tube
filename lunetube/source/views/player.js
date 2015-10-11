/*enyo.kind({
    name: "Player",
    published: {
        videoId: ""
    },
    // fit: true,
    components: [
				{
					fit: true,
					components: [{
						name: "player",
						kind: "moon.VideoPlayer",
						inline:true,
						spotlight: false,
						// src: 'http://www.w3schools.com/html/mov_bbb.mp4',
						src: "",
						classes: "moon-8h player",
						// classes: "moon-video-player-sample",
						poster: "assets/video-poster.png",
						infoComponents: [{
							kind: "moon.VideoInfoBackground",
							orient: "left",
							fit: true,
							components: [
								{
									kind: "moon.VideoInfoHeader",
									title: "Downton Abbey",
									subTitle: "",
									subSubTitle: "",
									description: ""
								}
							]
						}],
						components: [
							{kind: "moon.VideoFullscreenToggleButton"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/video-player/icon-placeholder.png"}
						]
					}]
				}
			// ]}
    ],
    create:function() {
        this.inherited(arguments);
        var lista = [];
        var video = {};
        // video.src = "http://r3---sn-8vq54voxn25po-n89e.googlevideo.com/videoplayback?mt=1444241616&mv=m&dur=307.130&ms=au&ip=77.225.228.71&initcwndbps=832500&ipbits=0&mm=31&mn=sn-8vq54voxn25po-n89e&id=o-AGYCjcziaQN5G5t-5Cdkx0lxPyAsTEaLuIHZfUafgQMV&fexp=9405191%2C9406175%2C9407490%2C9407502%2C9407520%2C9407610%2C9408012%2C9408212%2C9408540%2C9408710%2C9409069%2C9414764%2C9415365%2C9415485%2C9416023%2C9416126%2C9416985%2C9417056%2C9417707%2C9418401%2C9418448%2C9419427%2C9419742%2C9419965%2C9420348%2C9421013%2C9421253%2C9421765%2C9421940&lmt=1442161262650232&upn=PghoUe1D974&expire=1444263374&sver=3&source=youtube&mime=video%2Fmp4&pcm2cms=yes&pl=24&key=yt6&itag=22&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2cms%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&ratebypass=yes&signature=84E21D7FE2BA6F9FEA935B591BAF5DF46FC5F484.9C4A2E8EE84EEF64BE4600A9501694232E2D4075&signature=undefined";
        video.src= "https://www.youtube.com/watch?v=TLci6ErUugM";
        // lista.push(video);
        // video.src = this.video_id;
        // lista.push(video);
        // this.$.player.setSources(lista);
        this.load();
    },

    bindings: [
		// {from:".$.autoplayToggle.value", to:".$.player.autoplay"}
	],
	videoIdChanged1: function(){
		// this.$.player.unload();
		// this.$.player.setSrc(this.video_id);
		this.$.player.setSources(this.videoId);
		this.load();
	},
	unload: function() {
		this.$.player.unload();
	},
	load: function() {
		this.$.player.unload();
		this.$.player.setSources(this.sources);
	},
	webMovieCounter: function(inSender, inEvent) {

		// Set source by sources array
		this.sources = [
			{src: undefined, type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/video/movie_300.ogv", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/video/movie_300.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle("Ticking Counter Video");
	},
	webMovieBunny: function(inSender, inEvent) {
		console.log("inicia reproducir");

		this.sources = [
			{src: null, type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/bunny/movie.ogv", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/bunny/movie.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle("Bunny Video");
	},
	videoIdChanged: function(inSender, inEvent) {

		// Set source by sources array
		this.$.player.setAutoplay(true);
		console.log("cambian los sources");
		console.log(this.videoId);
		this.sources = [];
		for (var i = 0; i < this.videoId.length; i++) {
			this.sources.push({src: this.videoId[i].url, type: this.videoId[i].type});
		}
		this.$.player.setSources(this.sources);
		if(this.videoId[0].title){
			this.$.videoInfoHeader.setTitle(this.videoId[0].title);
		}
	},
	error: function(inSender, inEvent) {

		this.src = "http://foo.bar";
		this.$.player.setSrc(this.src);
		this.$.videoInfoHeader.setTitle("Error video");
	}
});*/

enyo.kind({
	name: "Player",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	published: {
        videoId: ""
    },
	components: [
		{
			name: "player",
			kind: "moon.VideoPlayer",
			ontap:"showControlsPlayer",
			sources: [
				{src: "http://media.w3.org/2010/05/bunny/movie.mp4", type: "video/mp4"},
				{src: "http://media.w3.org/2010/05/bunny/movie.ogg", type: "video/ogg"},
				{src: "http://media.w3.org/2010/05/bunny/movie.webm", type: "video/webm"}
			],
			poster: "assets/video-poster.png",
			// autoplay:true,
			onPlaybackControlsTapped: "controlsTapped",
			/*infoComponents: [
				{kind: "moon.VideoInfoBackground", orient: "left", background: true, fit: true, components: [
					{
						kind: "moon.ChannelInfo",
						channelNo: "13",
						channelName: "AMC",
						classes: "moon-2h",
						components: [
							{content: "3D"},
							{content: "Live"},
							{content: "REC 08:22", classes: "moon-video-player-info-redicon "}
						]
					},
					{
						kind: "moon.VideoInfoHeader",
						title: "Downton Abbey - Extra Title",
						subTitle: "Mon June 21, 7:00 - 8:00pm",
						subSubTitle: "R - TV 14, V, L, SC",
						description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
						components: [
							{content: "Icon 1", classes: "moon-video-player-info-icon"},
							{content: "Icon 2", classes: "moon-video-player-info-icon"},
							{content: "Icon 3", classes: "moon-video-player-info-icon"}
						]
					}
				]},
				{kind: "moon.VideoInfoBackground", orient: "right", background: true, components: [
					{kind:"moon.Clock"}
				]}
			],*/
			components: [
				{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
				{kind: "moon.ToggleButton", name:"controlsToggleButton", content:"Controls 1"},
				{kind: "moon.Button", content:"Unload", ontap:"unload"},
				{kind: "moon.Button", content:"Reload", ontap:"load"},
				{kind: "moon.ToggleButton", content:"FF/Rewind", name:"ffrewToggleButton"},
				{kind: "moon.ContextualPopupDecorator", components: [
					{kind: "moon.TooltipDecorator", components: [
						{kind: "moon.Button", content: "Popup"},
						{kind: "moon.Tooltip", floating:true, content: "I'm a tooltip for a button."}
					]},
					{
						kind: "moon.ContextualPopup",
						classes: "moon-3h moon-6v",
						components: [
							{kind: "moon.Item", content:"Item 1"},
							{kind: "moon.Item", content:"Item 2"},
							{kind: "moon.Item", content:"Item 3"}
						]
					}
				]},
				{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
				{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
				{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"}
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
	load: function() {
		this.$.player.unload();
		// We can set source by sources array
		this.sources = [
			{src: "http://media.w3.org/2010/05/bunny/movie.mp4", type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/bunny/movie.ogg", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/bunny/movie.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
	},
	videoIdChanged: function(inSender, inEvent) {

		// Set source by sources array
		this.$.player.setAutoplay(true);
		console.log("cambian los sources");
		console.log(this.videoId);
		this.sources = [];
		for (var i = 0; i < this.videoId.length; i++) {
			this.sources.push({src: this.videoId[i].url, type: this.videoId[i].type});
		}
		this.$.player.setSources(this.sources);
		if(this.videoId[0].title){
			// this.$.videoInfoHeader.setTitle(this.videoId[0].title);
		}
	},
	showControlsPlayer: function(inSender, inEvent){
		this.$.player.showFSControls();
		// this.$.player.disablePlaybackControls=false;
	}
});