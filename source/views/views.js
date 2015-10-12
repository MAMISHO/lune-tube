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
    	onShowMainMenu: "showMainMenu",
    	onBackToList: "backToList",
    	onShowMenuOption: "showMenuOption"
	},
	components:[
			{kind: "onyx.MenuDecorator", onSelect: "itemSelected", components: [
                {kind: "onyx.Menu", name:"menuOption",classes:"menu-option", components: [
                	{content: "Playlist"},
                    {content: "Favorites"},
                    {content: "History"},
                    {classes: "onyx-menu-divider"},
                    {content: "Login"}
                ]}
            ]},
			{kind: 'Panels',name:"panel", fit: true, classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, components: [
				{layoutKind: "FittableRowsLayout", components: [
					{kind: "Menu", name:"menu"},
					{name: 'content_list',fit: true, layoutKind: "FittableRowsLayout", components: [
						{kind: 'Scroller', horizontal:"hidden", classes: 'enyo-fit', touch: true, components: [
							{kind:"VideoList", name:"videoList"},
						]}
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
		this.$.youtube.search(q).response(this, "receiveResults");
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
		this.$.menu.setSearching(false);
		this.$.videoList.setSearching(false);
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
		this.setQuery(q);
		return true;
	},

	queryChanged: function(){
		this.search(this.query);
	},

	showMenuOption: function(inSender, inEvent){
		this.$.menuOption.show();
		return true;
	},

	backToList: function(inSender, inEvent){
		this.$.panel.setIndex(0);
		return true;
	}
});
