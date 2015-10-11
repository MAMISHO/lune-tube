enyo.kind({
	name: "YoutubeApi",
	kind: enyo.Component,
	published: {
		nextPage:"",
	},
	components: [

	],
	create:function() {
		this.inherited(arguments);
	},
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
			if(!inResponse) return [];
			// return inResponse;
			// console.log(inResponse);
			this.nextPage = inResponse.nextPageToken;
			var videos = [];
			var data = inResponse.items;

			for (var i = 0; i < data.length; i++) {
				var v = {};
				v.video_id = data[i].id.videoId;
				v.channel_id = data[i].snippet.channelId;
				v.image = data[i].snippet.thumbnails.default.url;
				v.title = data[i].snippet.title;
				v.chanel = data[i].snippet.channelTitle;
				v.views = "",
				v.time = data[i].snippet.publishedAt.split("T")[0];
				var vevo = v.chanel.search("VEVO");
				if(vevo === -1){
					videos.push(v);
				}
			}
			return videos;
	},

	searchVideosList: function(query){
		var params={
			maxResults: 15,
			chart: "mostPopular",
			q: query,
			part: "snippet",
			// type: "video",
			key: "AIzaSyCKQFgdGripe3wQYC31aipO9_sXw_dMhEE"
		};

		var url_base = "https://www.googleapis.com/youtube/v3/";
		var method = "videos";

			return new enyo.JsonpRequest({
				url: url_base + method
			}).go(params).response(this, "processResponseSearchVideoList");
	},

	processResponseSearchVideoList: function(inSender, inResponse){
		if(!inResponse) return [];
		return inResponse;
	},

	searchNext: function(inSearchText){
			var url_base = "https://content.googleapis.com/youtube/v3/";
			var method = "search";
			var params={
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

});