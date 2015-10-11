/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	published:{
		query_history: "",
		query:""
	},
	handlers: {
    	onLoadMore: "loadMore",
    	onStartVideo: "startVideo",
    	onSearchEvent:"searchEvent",
    	onShowMainMenu: "showMainMenu"
	},
	components:[

			{kind: "Menu", name:"menu"},
			{kind: 'Panels',name:"panel", fit: true, classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, components: [
				{name: 'content_list',layoutKind: "FittableRowsLayout", components: [
					{kind: 'Scroller', classes: 'enyo-fit', touch: true, components: [
						{kind:"VideoList", name:"videoList"},
						// {classes: 'panels-sample-sliding-content', content: 'Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. '}
						
					]}
				]},
				{name: 'content_player',fit: true, components: [
						{kind: "Player", name:"player"}
				]},
			]},
		{kind:"YoutubeApi", name: "youtube"},
		{kind:"YoutubeVideo", name: "yt"}
	],
	videos:[],
	create:function() {
        this.inherited(arguments);
        this.queryChanged();
    },

    search: function(q) {
    	console.log("buscar: " + q);
		this.$.youtube.search(q).response(this, "receiveResults");
		// this.$.youtube.searchVideosList("cats").response(this, "receiveResults");
	},

	receiveResults: function(inRequest, inResponse){
		if(!inResponse) return;
		
		if(this.getQuery() !== this.query_history){
			this.query_history = this.getQuery();
			this.videos = inResponse;
		}else{
			this.videos = this.videos.concat(inResponse);
		}

		this.$.videoList.setVideoList(this.videos);
		this.$.panel.setIndex(0);
	},

	loadMore: function(inSender, inEvent){
		this.$.youtube.searchNext(this.query).response(this, "receiveResults");
		return true;
	},

	startVideo: function(inSender, video_id){
		this.$.yt.startVideo(video_id).response(this, "startPlayVideo");
		return true;
	},

	startPlayVideo: function(inResponse, video){
		this.$.player.setVideoId(video);
		this.$.panel.setIndex(1);
	},

	searchEvent: function(inSender, q){
		// console.log(inSender);
		console.log(q);
		this.setQuery(q);
		return true;
	},

	queryChanged: function(){
		this.search(this.query);
	},

	showMainMenu: function(inSender, inEvent){

	}
});
