enyo.kind({
    name: "Player",
    // kind: "Control",
    // classes: "moon enyo-fit enyo-unselectable",
    published: {
        video_id: "http://r3---sn-8vq54voxn25po-n89e.googlevideo.com/videoplayback?ip=77.225.228.71&key=yt6&mv=m&mt=1444241486&ms=au&mn=sn-8vq54voxn25po-n89e&mm=31&id=o-AO-Az8QyjRL595RpR4HXYoCZtek1KjA7lz_ZvADmZqmw&upn=q-UxijpH0hE&ratebypass=yes&signature=07071FC1B1E599BE6DEF0CB76166DB6ABD5BDB91.E11E4A00F6AB210874335888E0B731ECAF63B88B&sver=3&pcm2cms=yes&ipbits=0&initcwndbps=832500&itag=22&pl=24&dur=272.602&source=youtube&expire=1444263136&mime=video%2Fmp4&lmt=1440659373410208&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2cms%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&fexp=9405191%2C9406175%2C9407490%2C9407502%2C9407520%2C9407610%2C9408012%2C9408212%2C9408540%2C9408710%2C9409069%2C9414764%2C9415365%2C9415485%2C9416023%2C9416126%2C9416985%2C9417056%2C9417707%2C9418401%2C9418448%2C9419427%2C9419742%2C9419965%2C9420348%2C9421013%2C9421253%2C9421765%2C9421940&signature=undefined"
    },
    components: [
        // {kind: "moon.Panel", joinToPrev: true, title: "Player", layoutKind: "FittableColumnsLayout", classes: "moon-7h", components: [
				{
					fit: true,
					components: [{
						name: "player",
						kind: "moon.VideoPlayer",
						inline:true,
						// src: 'http://www.w3schools.com/html/mov_bbb.mp4',
						// src: "http://r1---sn-8vq54voxn25po-n89e.googlevideo.com/videoplayback?pcm2cms=yes&fexp=9405191%2C9406175%2C9407490%2C9407502%2C9407520%2C9407610%2C9408012%2C9408212%2C9408540%2C9408710%2C9409069%2C9414764%2C9415365%2C9415485%2C9416023%2C9416126%2C9416985%2C9417056%2C9417707%2C9418401%2C9418448%2C9419427%2C9419742%2C9419965%2C9420348%2C9421013%2C9421253%2C9421765%2C9421940&mime=video%2Fmp4&pl=24&itag=22&mv=m&mt=1444234394&ms=au&ratebypass=yes&mn=sn-8vq54voxn25po-n89e&mm=31&initcwndbps=822500&source=youtube&id=o-AEgmLGva2w0iCioiej7Mkh4RS0hJsXTrmbupCgrqijpi&sver=3&lmt=1404619348553721&key=yt6&ip=77.225.228.71&expire=1444256101&dur=45.975&upn=_FdFeOwoK0A&signature=B902CD20F9E67A0F9361CCD01C311B071F29D587.421916583B708E130568541FFC3240E2757390C7&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2cms%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&ipbits=0&signature=undefined",
						classes: "moon-8h",
						poster: "assets/video-poster.png",
						/*infoComponents: [{
							kind: "moon.VideoInfoBackground",
							orient: "left",
							fit: true,
							components: [
								{
									kind: "moon.ChannelInfo",
									channelNo: "13",
									channelName: "AMC",
									classes: "moon-2h",
									components: [
										{content: "3D"},
										{content: "Live"},
										{content: "REC 08:22", classes: "moon-video-player-info-redicon"}
									]
								},
								{
									kind: "moon.VideoInfoHeader",
									title: "Downton Abbey",
									subTitle: "Mon June 21, 7:00 - 8:00pm",
									subSubTitle: "R - TV 14, V, L, SC",
									description: "The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and"
								}
							]
						}, 
						{
							kind: "moon.VideoInfoBackground",
							orient: "right",
							components: [
								{kind:"moon.Clock"}
							]
						}],*/
						components: [
							{kind: "moon.VideoFullscreenToggleButton"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"},
							{kind: "moon.IconButton", src: "assets/images/video-player/icon-placeholder.png"}
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
        lista.push(video);
        this.$.player.setSources(lista);
        this.load();
    },

    bindings: [
		// {from:".$.autoplayToggle.value", to:".$.player.autoplay"}
	],
	unload: function() {
		this.$.player.unload();
	},
	load: function() {
		// this.$.player.unload();
		// this.$.player.setSources(this.sources);
		/*this.$.player.setSources(
			[
			{src: undefined, type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/video/movie_300.ogv", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/video/movie_300.webm", type: "video/webm"}
		]
			);*/
	},
	webMovieCounter: function(inSender, inEvent) {
		/*if (!inEvent.originator.active) {
			return;
		}*/
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
		/*if (!inEvent.originator.active) {
			return;
		}*/
		// Set source by sources array
		this.sources = [
			{src: null, type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/bunny/movie.ogv", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/bunny/movie.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle("Bunny Video");
	},
	webMovieSintel: function(inSender, inEvent) {
		/*if (!inEvent.originator.active) {
			return;
		}*/
		// Set source by sources array
		this.sources = [
			{src: "http://media.w3.org/2010/05/sintel/trailer.mp4", type: "video/mp4"},
			{src: "http://media.w3.org/2010/05/sintel/trailer.ogv", type: "video/ogg"},
			{src: "http://media.w3.org/2010/05/sintel/trailer.webm", type: "video/webm"}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle("The Sintel Video");
	},
	error: function(inSender, inEvent) {
		/*if (!inEvent.originator.active) {
			return;
		}*/
		this.src = "http://foo.bar";
		this.$.player.setSrc(this.src);
		this.$.videoInfoHeader.setTitle("Error video");
	}
});