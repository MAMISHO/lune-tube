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
    _videoId:"",
    create:function() {
        this.inherited(arguments);
    },

    startVideo: function(video_id){
      // console.log(video_id);
      this._videoId = video_id;
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
        conntentype: "text/plain",
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
      return this.parseYoutubeVideoInfo(inResponse);
    },

    /*decodeVideo: function(videoInfo){
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

		// Algunas lineas contienen dos valores separados por comas
    	var newSplit = [];
    	for (i = 0; i < streamsSplit.length; i++) {
    		var secondSplit = streamsSplit[i].split(",");
    		newSplit.push.apply(newSplit, secondSplit);
    	}

    	streamsSplit = newSplit;
    	console.log(streamsSplit);
    				
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
    },*/

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
    var videoIsRestricted = false;

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
              videoIsRestricted = true;
              result.restricted = "This video is restricted by youtube. Soon we will support these videos.";
            }
    		    var r = result;
    		    results.push(r);
  		  }
    }

    // this.numberOfTries = 0;
    // this.video_id_try = "";
    // console.log(results);
    if(videoIsRestricted){
      // this.youtubeDecipherService(this._videoId);
      return {status:"fail",signature:true};
    }else{
      return results;
    }
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
    },

    youtubeDecipherService: function(body){
      console.log("Se envia decrypt");
      var url = "http://localhost:3000/";
      // var url = "https://fast-peak-30985.herokuapp.com";
      // var url = "https://www.youtube.com/watch";
      // var formData = new FormData();

      // formData.append("user", body);
      var param = {user:JSON.stringify(body)};
      var request = new enyo.Ajax({
          url: url,
          method: "GET",
          // postBody: formData,
          // user:body,
          // contentType: 'application/x-www-form-urlencoded',
          // cacheBust: false,
          // callbackName: null,
          // overrideCallback: null
      });

      request.response(enyo.bind(this, "youtubeDecipherServiceResponse"));
      request.error(enyo.bind(this, "youtubeDecipherServiceEror"));
      return request.go({id:this.video_id_try});
      // return request.go();
    },

    youtubeDecipherServiceResponse: function(inRequest, inResponse){
      if(!inResponse) return;
      console.log("successful decipher");
      console.log(inResponse.length);
      console.log(inResponse);
      this.video_id_try = "";
      return inResponse.videos;
    },

    youtubeDecipherServiceEror: function(inRequest, inResponse){
      if(!inResponse) return;
      console.log("Error decipher");
      console.log(inResponse);
    },

    youtubeGetBody: function(){
      console.log("Peticion de Body");
      var url = "https://www.youtube.com/watch";
      var request = new enyo.Ajax({
          url: url,
          method: "GET",
          cacheBust: false,
          callbackName: null,
          overrideCallback: null
      });

      request.response(enyo.bind(this, "youtubeGetBodyResponse"));
      request.error(enyo.bind(this, "youtubeGetBodyError"));
      return request.go({v:this.video_id_try});
    },

    youtubeGetBodyResponse: function(inRequest, inResponse){
      if(!inResponse) return;
      // console.log(inResponse);
      var opts = {};
      var callback={};
      console.log("YoutubeVideo -> youtubeGetBodyResponse: Resvibe el body");
      // console.log(inResponse);
      console.log("YoutubeVideo -> youtubeGetBodyResponse: Sacamos los params");
      var description = getVideoDescription(inResponse);
      var jsonStr = between(inResponse, 'ytplayer.config = ', '</script>');
      // console.log(jsonStr);

      if (jsonStr) {
        var config = this.parseJSON(jsonStr);
        console.log("YoutubeVideo -> youtubeGetBodyResponse: Hay config");
        console.log(config);
        if (!config) {
          return callback(new Error('could not parse video page config'));
        }
        this.gotConfig(opts, description, config, function(err, formats){ 
          console.log("Finalizado");
          console.log(formats);
        });
      }else{
        console.log("YoutubeVideo -> youtubeGetBodyResponse: No hay jsonSTR del body");
      }

      // return inResponse;
    },

    youtubeGetBodyError: function(){
      if(!inResponse) return;
      console.log("Error decipher");
      console.log(inResponse);
    },

    parseJSON: function (body) {
      var JStream     = require('jstream');
      var jstream = new JStream();
      var config = null;

      jstream.on('data', function(data) {
        config = data;
        jstream.pause();
      });

      // Suppress errors. If there is one, `config` won't be defined,
      // which is already checked.
      jstream.on('error', function() {});

      jstream.end(body);
      return config;
    },

    gotConfig: function (opts, description, config, callback) {
      var KEYS_TO_SPLIT = [
        'keywords',
        'fmt_list',
        'fexp',
        'watermark'
      ];

      var info = config.args;
      if (info.status === 'fail') {
        var msg = info.errorcode && info.reason ?
          'Code ' + info.errorcode + ': ' + info.reason : 'Video not found';
        callback(new Error(msg));
        return;
      }

      // Split some keys by commas.
      KEYS_TO_SPLIT.forEach(function(key) {
        if (!info[key]) return;
        info[key] = info[key]
        .split(',')
        .filter(function(v) { return v !== ''; });
      });

      info.fmt_list = info.fmt_list ?
        info.fmt_list.map(function(format) {
          return format.split('/');
        }) : [];

      if (info.video_verticals) {
        info.video_verticals = info.video_verticals
        .slice(1, -1)
        .split(', ')
        .filter(function(val) { return val !== ''; })
        .map(function(val) { return parseInt(val, 10); })
        ;
      }

      info.formats = parseFormats(info);
      info.description = description;
      console.log(info);

      if (info.formats[0] && info.formats[0].s || info.dashmpd || info.hlsvp) {
        this.getTokens(config.assets.js, opts.debug, function(err, tokens) {
          if (err) return callback(err);

          console.log("regresa al gotinfo");

          decipherFormats(info.formats, tokens, opts.debug);

          var concurrent = info.dashmpd ? 1 : 0 + info.hlsvp ? 1 : 0;
          if (!concurrent) {
            callback(null, info);
            return;
          }

          function checkDone() {
            if (--concurrent > 0) { return; }
            if (!info.formats.length) {
              callback(new Error('No formats found'));
              return;
            }
            info.formats.sort(sortFormats);
            // console.log(info);
            callback(null, info);
            return;
          }

          if (info.dashmpd) {
            info.dashmpd = decipherURL(info.dashmpd, tokens);
            getDashManifest(info.dashmpd, opts.debug, function(err, formats) {
              if (err) return callback(err);
              decipherFormats(info.formats, tokens, opts.debug);
              mergeFormats(info, formats);
              checkDone();
            });
          }

          if (info.hlsvp) {
            info.hlsvp = decipherURL(info.hlsvp, tokens);
            // console.log(info);
            getM3U8(info.hlsvp, opts.debug, function(err, formats) {
              if (err) return callback(err);
              mergeFormats(info, formats);
              checkDone();
            });
          }
        });

      } else {
        if (!info.formats.length) {
          callback(new Error('Video not found'));
          return;
        }
        decipherFormats(info.formats, null, opts.debug);
        callback(null, info);
      }
    },


    getTokens: function(html5playerfile, debug, callback) {
      var key, cachedTokens;
      var rs = /(?:html5)?player-([a-zA-Z0-9\-_]+)(?:\.js|\/)/
        .exec(html5playerfile);
      if (rs) {
        key = rs[1];
        // cachedTokens = cache.get(key);
      } else {
        console.warn('could not extract html5player key:', html5playerfile);
      }

      if (cachedTokens) {
        callback(null, cachedTokens);
      } else {
        html5playerfile = 'http:' + html5playerfile;
        console.log("Llega al else" + html5playerfile);


        // CArgar body con enyo
        var ajax = new enyo.Ajax({
            url: html5playerfile,
            method: "GET",
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        ajax.response(function(inRequest, inResponse){
          if(!inResponse) return;
          console.log("Hay body html5");
          // console.log(inResponse);
          var body = inResponse;
          var tokens = extractActions(body);
          if (!tokens || !tokens.length) {
            callback(
              new Error('Could not extract signature deciphering actions'));
            return;
          }

          // cache.set(key, tokens);
          callback(null, tokens);

          // return inResponse;
        });
        ajax.error(function(inRequest, inResponse){
          if(!inResponse) return;
          console.log("Hay error al tare el body html5");
        });
        return ajax.go();
      }
    }
});