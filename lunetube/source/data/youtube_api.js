enyo.kind({
	name: "YoutubeApi",
	kind: enyo.Component,
	published: {

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
			console.log(inResponse);
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
	}

	});