enyo.kind({
    name: "YoutubeVideo",
    kind: enyo.Component,
    published: {
        
    },
    events: {
        // doStartVideo: "startVideo"
    },
    components: [
        
    ],
    // numberOfTries:0,
    video_id_try:"",
    create:function() {
        this.inherited(arguments);
    },

    startVideo: function(video_id){
      // console.log(video_id);
      this.video_id_try = video_id;
    	var url = "http://www.youtube.com/get_video_info";
	    var ajax = new enyo.Ajax({
	    	url: url,
	    	method: "GET",
	    	cache: false,
	    	cacheBust: false,
            callbackName: null,
            overrideCallback: null
	    });

	    ajax.response(enyo.bind(this, "startVideoResponse"));
	    return ajax.go({video_id:video_id});
    },

    getVideoRestricted: function(){

      var url = "https://www.youtube.com/get_video_info";
      var ajax = new enyo.Ajax({
        url: url,
        method: "GET",
        cache: false,
        cacheBust: false,
            callbackName: null,
            overrideCallback: null
      });

      ajax.response(enyo.bind(this, "startVideoResponse"));
      return ajax.go({video_id:this.video_id_try, el:"detailpage", ps:"default", eurl:"",gl:"US",hl:"en"});
    },

    startVideoResponse: function(inRequest, inResponse){
    	if(!inResponse) return;
    	// console.log(inResponse);
      // console.log(inRequest);
    	// console.log();
    	return this.parseYoutubeVideoInfo(inResponse);
    	// return this.decodeVideo(inResponse);
    	// console.log(inRequest);
    	// console.log(inResponse);
    },


    decodeVideo: function(videoInfo){
    	console.log(videoInfo.responseText);
    	var params={};
    	var videoInfoSplit = videoInfo.split("&");
  		var streams;
  		var i=0;
  		for (i = 0; i < videoInfo.length; i++) {
  			var paramPair = videoInfoSplit[i].split("=");
  			if (paramPair[0] === "url_encoded_fmt_stream_map") {
  				streams = decodeURIComponent(paramPair[1]);
  				break;
  			}
  		}

  		if (!streams) {
  			var msg = "YouTube videoInfo parsing: url_encoded_fmt_stream_map not found";
  			console.log(msg);
  			return;
  		}

  		streamsSplit = streams.split("&");
  		console.log(streamsSplit);

		/*Algunas lineas contienen dos valores separados por comas*/
    	var newSplit = [];
    	for (i = 0; i < streamsSplit.length; i++) {
    		var secondSplit = streamsSplit[i].split(",");
    		newSplit.push.apply(newSplit, secondSplit);
    	}

    	streamsSplit = newSplit;
    	// console.log(streamsSplit);
    				
    	var url, sig, itag;
    	var found = false;
	
	     var my_array = [];
  	   for (i = 0; i < streamsSplit.length; i++) {
    			var paramPair = streamsSplit[i].split("=");
    			var obj = {};
    			if (paramPair[0] === "url") {
    				url = decodeURIComponent(paramPair[1]);
    				obj.url = url;
    			} else if (paramPair[0] === "sig") {
    				sig = paramPair[1]; // do not decode, as we would have to encode it later (although decoding/encoding has currently no effect for the signature)
    				obj.sig = sig;
    			} else if (paramPair[0] === "itag") {
    				itag = paramPair[1];
    				obj.itag = itag;
    			}
    			my_array.push(obj);

    			if ((i + 1) % 6 === 0 && itag === "18") { // 6 parameters per video; itag 18 is "MP4 360p", see http://userscripts.org/scripts/review/25105
    				found = true;
    				url += "&signature=" + sig;
    				break;
    			}
  		  }
    		console.log(my_array);
    		if (found) {
    			// console.log("video direct URL found: " + url);
    			params.target = url;
    			// console.log(params);
    			return params.target;
    			// $( "#results" ).append(JSON.stringify(params));
    			// this.foundVideo(params);
    		} else {
    			var msg = "Couldn't find video in MP4 360p";
    			console.log(msg);
    			return;
    		}
    },

    parseYoutubeVideoInfo: function(response) {
    // Splits parameters in a query string.
    // this.numberOfTries++;
    var params = this.extractParameters(response);

    // If the request failed, return an object with an error code
    // and an error message
    // if (params.status === 'fail' && this.numberOfTries==2) {
    if (params.status === 'fail') {
      //
      // Hopefully this error message will be properly localized.
      // Do we need to add any parameters to the XMLHttpRequest to
      // specify the language we want?
      //
      // Note that we include fake type and url properties in the returned
      // object. This is because we still need to trigger the video app's
      // view activity handler to display the error message from youtube,
      // and those parameters are required.
      //
      // this.numberOfTries = 0;
      // this.video_id_try = "";
      return {
        status: params.status,
        errorcode: params.errorcode,
        reason: (params.reason || '').replace(/\+/g, ' ')
      };
    }
    
   /* if(params.status === 'fail' && this.numberOfTries == 1){
      console.log("se realiza un segundo intento");
      console.log(params);
      return this.getVideoRestricted();
    }*/

    // Otherwise, the query was successful
    
    // console.log(params);
    // Now parse the available streams
    var streamsText = params.url_encoded_fmt_stream_map;
    if (!streamsText)
      throw Error('No url_encoded_fmt_stream_map parameter');
    var streams = streamsText.split(',');
    for (var i = 0, n = streams.length; i < n; i++) {
      streams[i] = this.extractParameters(streams[i]);
    }

    // This is the list of youtube video formats, ordered from worst
    // (but playable) to best.  These numbers are values used as the
    // itag parameter of each stream description. See
    // https://en.wikipedia.org/wiki/YouTube#Quality_and_codecs
    //
    // XXX
    // Format 18 is H.264, which we can play on the phone, but probably
    // not on desktop. When this code was all in chrome, we used an #ifdef
    // for to enable H.264 for Gonk only. If we still need to do that, then
    // we can modify YoutubeProtocolHandler.js to send an allow_h264 flag
    // along with the url and type and then honor that flag here.
    // The inclusion of H264 might not break b2g desktop anyway; on that
    // platform, viewing youtube seems to launch an external Quicktime
    // viewer or something.
    //
    
    var formats = [
      '17', // 144p 3GP
      '36', // 240p 3GP
      '43', // 360p WebM
      '18', // 360p H.264
      '22' //720 HD
    ];

    // Sort the array of stream descriptions in order of format
    // preference, so that the first item is the most preferred one
    streams.sort(function(a, b) {
      var x = a.itag ? formats.indexOf(a.itag) : -1;
      var y = b.itag ? formats.indexOf(b.itag) : -1;
      return y - x;
    });

    // console.log(streams);
    var results = [];
    for (i = 0; i < streams.length; i++) {
    	var result = {
      		status: params.status
    	};
    	var bestStream = streams[i];

	    // If the best stream is a format we don't support give up.
	    if (formats.indexOf(bestStream.itag) !== -1){
	      // throw Error('No supported video formats');
	      // console.log('No supported video formats');
	    // }else{
        
        // send resolution
        if(bestStream.itag === '22'){
          result.resolution = "HD-MP4";
        }else if(bestStream.itag === '18'){
          result.resolution = "SD-MP4";
        }else if(bestStream.itag === '43'){
          result.resolution = "SD-WEBM";
        }else{
          result.resolution = "SD-3GP";
        }


		    result.url = bestStream.url + '&signature=' + (bestStream.sig || '');
		    result.type = bestStream.type;
		    // Strip codec information off of the mime type
		    if (result.type && result.type.indexOf(';') !== -1) {
		      result.type = result.type.split(';', 1)[0];
		    }

		    if (params.title) {
		      result.title = params.title.replace(/\+/g, ' ');
		    }

		    if (params.length_seconds) {
		      result.duration = params.length_seconds;
		    }

		    if (params.thumbnail_url) {
		      result.poster = params.thumbnail_url;
		    }

        if (bestStream.s){
          result.restricted = "This video is restricted by youtube. Soon we will support these videos.";
        }
		    var r = result;
		    results.push(r);
		  }
    }

    // this.numberOfTries = 0;
    this.video_id_try = "";
    return results;
  },

  extractParameters: function(q) {
      var params = q.split('&');
      var result = {};
      for (var i = 0, n = params.length; i < n; i++) {
        var param = params[i];
        var pos = param.indexOf('=');
        if (pos === -1)
          continue;
        var name = param.substring(0, pos);
        var value = param.substring(pos + 1);
        result[name] = decodeURIComponent(value);
      }
      return result;
    }
});