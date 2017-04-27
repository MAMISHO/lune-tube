cache = new YoutubeCache();
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

    startVideo: function(video_id){ //first try
      console.log("first try");
      // console.log(video_id);
      this._videoId = video_id;
      this.video_id_try = video_id;
    	var url = "https://www.youtube.com/get_video_info";
	    var ajax = new enyo.Ajax({
	    	url: url,
	    	method: "GET",
        conntentype: "text/plain",
        handleAs: "text",
	    	cache: false,
	    	cacheBust: false,
        callbackName: null,
        overrideCallback: null
	    });

	    ajax.response(enyo.bind(this, "startVideoResponse"));
	    return ajax.go({video_id:video_id});
    },

    getVideoRestricted: function(){ //second try
      // console.log("Se envia akax 2");
      var url = "https://www.youtube.com/get_video_info";
      var ajax = new enyo.Ajax({
        url: url,
        method: "GET",
        conntentype: "text/plain",
        handleAs: "text",
        cache: false,
        cacheBust: false,
        callbackName: null,
        overrideCallback: null
      });

      ajax.response(enyo.bind(this, "startVideoResponse"));
      return ajax.go({video_id:this.video_id_try, el:"detailpage", ps:"default", eurl:"",gl:"US",hl:"en"});
    },

    startVideoResponse: function(inRequest, inResponse){
      // console.log(inResponse);
    	if(!inResponse) return;
      return this.parseYoutubeVideoInfo(inResponse);
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
    // console.log(streamsText);
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
      '17',   // 144p 3GP
      '36',   // 240p 3GP,
      '133',  // 240p DASH-MP4
      '43',   // 360p WebM
      '18',   // 360p HD-H.264 (MP4)
      '134',  // 360p HD-H.264 (DASH-MP4)
      '44',   // 480p WebM
      '135',  // 480p HD-DASH-MP4
      '45',   // 720p WebM
      '22',   // 720p HD-MP4
      '136',  // 720p HD-DASH-MP4
      '37',   // 1080p HD-MP4
      '46',   // 1080p HD-WebM
      '38',   // 3072p HD-MP4
    ];
    // console.log(streams);
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
    var imageHQ;


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
        //
        // 
            
            if (bestStream.s){
              videoIsRestricted = true;
              result.restricted = "This video is restricted by youtube. Soon we will support these videos.";
              break;
            } 
          
          // send resolution
            /*if(bestStream.itag === '22'){
              result.resolution = "HD-MP4";
            }else if(bestStream.itag === '18'){
              result.resolution = "SD-MP4";
            }else if(bestStream.itag === '43'){
              result.resolution = "SD-WEBM";
            }else{
              result.resolution = "SD-3GP";
            }*/


    		    result.url = bestStream.url + '&signature=' + (bestStream.sig || '');
    		    // result.type = bestStream.type;
    		    // Strip codec information off of the mime type
    		    
            /*if (result.type && result.type.indexOf(';') !== -1) {
    		      result.type = result.type.split(';', 1)[0];
    		    }*/

    		    if (params.title) {
    		      result.title = params.title.replace(/\+/g, ' ');
    		    }

    		    if (params.length_seconds) {
    		      result.duration = params.length_seconds;
    		    }

            if(params.iurl){
              imageHQ = params.iurl;
            }

            var quality = this.mapQualityVideo(bestStream);
            result.resolution    = quality.resolution;
            result.quality_label = quality.quality_label;
            result.type          = quality.type;


    		    var r = result;
    		    results.push(r);
  		  }
    }

    // this.numberOfTries = 0;
    // this.video_id_try = "";

    if(videoIsRestricted){
      // this.youtubeDecipherService(this._videoId);
      // var posterTmp;
      if(results.length > 0){
        posterTmp = results.pop().poster;
        return {status:"fail", signature:true, posterTmp: imageHQ};
      }else{
        return {status:"fail", signature:true};
      }
    }else{

      // console.log(results);
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
      var url = "http://localhost:3000/";
      // var url = "https://fast-peak-30985.herokuapp.com";
      // var url = "https://www.youtube.com/watch";

      var param = {user:JSON.stringify(body)};
      var request = new enyo.Ajax({
          url: url,
          method: "GET"
      });

      request.response(enyo.bind(this, "youtubeDecipherServiceResponse"));
      request.error(enyo.bind(this, "youtubeDecipherServiceEror"));
      return request.go({id:this.video_id_try});
      // return request.go();
    },

    youtubeDecipherServiceResponse: function(inRequest, inResponse){
      if(!inResponse) return;
      
      this.video_id_try = "";
      return inResponse.videos;
    },

    youtubeDecipherServiceEror: function(inRequest, inResponse){
      if(!inResponse) return;
      console.log("Error decipher");
      console.log(inResponse);
    },

    youtubeDecryptLocalService: function(video_id){ //third tryç
      // console.log("Se envia akax 3");
      var url = "https://www.youtube.com/watch";
      var request = new enyo.Ajax({
          url: url,
          method: "GET",
          conntentype: "text/plain",
          handleAs: "text",
          cache: false,
          cacheBust: false,
          callbackName: null,
          overrideCallback: null
      });

      request.response(enyo.bind(this, "youtubeDecryptLocalServiceResponse"));
      request.error(enyo.bind(this, "youtubeGetBodyError"));

      if(video_id){
        return request.go({v:video_id});
      }else{
        return request.go({v:this.video_id_try});
      }
    },

    youtubeDecryptLocalServiceResponse: function(inRequest, inResponse){
      if(!inResponse) return;
      // if(inRequest) return inResponse;
      // console.log(inResponse);

      var opts = {};
      var description = getVideoDescription(inResponse);

      var jsonStr = between(inResponse, 'ytplayer.config = ', '</script>');

      if (jsonStr) {
        
        jsonStr = jsonStr.slice(0, jsonStr.lastIndexOf(';ytplayer.load'));
        
        var config;
        try {
          config = JSON.parse(jsonStr);
          config.assets.js = 's.ytimg.com' + config.assets.js;
        } catch (err) {
          return callback(new Error('Error parsing config: ' + err.message));
        }

        // var config = this.parseJSON(jsonStr);
        if (!config) {
          return {error: "No se puden obtener videos"};
        }

        
        this.gotConfig(opts, description, config, enyo.bind(this, "callbackFromYT"));

      }else{
        console.log("YoutubeVideo -> youtubeGetBodyResponse: No hay jsonStr del body");
      }
    },

    callbackFromYT: function(err, info){
      if(err) {
        return {error:true, message:"No se ha encontrado videos"};
      }
      // console.log(info.description);

      var formats_compatibles = [
      '139',  //audio
      '140',
      '141',  
      // '17',   // 144p 3GP
      '160',  // 144p MP4
      '264',  // 144p DASH-MP4
      '36',   // 240p 3GP,
      '133',  // 240p DASH-MP4
      '43',   // 360p WebM
      '18',   // 360p HD-H.264 (MP4)
      '134',  // 360p HD-H.264 (DASH-MP4)
      '44',   // 480p WebM
      '135',  // 480p HD-DASH-MP4
      '45',   // 720p WebM
      '22',   // 720p HD-MP4
      // '136',  // 720p HD-DASH-MP4
      '37',   // 1080p HD-MP4
      '46',   // 1080p HD-WebM
      '38',   // 3072p HD-MP4
    ];

    //filtramos los formatos permitidos
      var formats = info.formats.filter(function findFormatCompatible(v){
                            if(v.itag){
                                if(formats_compatibles.indexOf(v.itag) > -1){
                                  return v;
                                }
                            }
                            // return;
                      // var x = v.itag ? formats.indexOf(a.itag): return ;
                    });

      // ordenamos los formatos para el player
      formats.sort(function(a, b) {
        var x = a.itag ? formats.indexOf(a.itag) : -1;
        var y = b.itag ? formats.indexOf(b.itag) : -1;
        return y - x;
      });
        var videos = [];

        for (var i = 0; i < formats.length; i++) {
          var v = {
            resolution : "SD-3GP",
            duration: info.length_seconds,
            poster: info.thumbnail_url,
            status: "ok",
            title: info.title,
            url: formats[i].url,
            descriptionHtml: ""
          };

          if(info.description){
            // v.descriptionHtml = info.description.join();
            v.descriptionHtml = info.description[0];
          }

          /*switch(formats[i].itag){

            case "18":
              v.resolution = "SD-MP4";
              if (formats[i].type && formats[i].type.indexOf(';') !== -1) {
                    v.type = formats[i].type.split(';', 1)[0];
                }

            break;
            case "22":
              v.resolution = "HD-MP4";
              if (formats[i].type && formats[i].type.indexOf(';') !== -1) {
                    v.type = formats[i].type.split(';', 1)[0];
                }
                
            break;
            case "43":
              v.resolution = "SD-WEBM";
              if (formats[i].type && formats[i].type.indexOf(';') !== -1) {
                    v.type = formats[i].type.split(';', 1)[0];
                }
                
            break;
            default :
              if (formats[i].type && formats[i].type.indexOf(';') !== -1) {
                    v.type = formats[i].type.split(';', 1)[0];
                }

            break;
          }*/
          var quality = this.mapQualityVideo(formats[i]);
          v.resolution    = quality.resolution;
          v.quality_label = quality.quality_label;
          v.type          = quality.type;

          videos.push(v);
        }

        if(videos.length > 0){
          return this.bubble("onStartPlayVideo",videos);
        }else{

          return {error:true, message:"No se ha encontrado videos"};
        }
      

    },

    youtubeGetBodyError: function(){
      if(!inResponse) return;
      console.log("Error decrypt");
      console.log(inResponse);
      return inResponse;
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

      if (info.formats[0] && info.formats[0].s || info.dashmpd || info.hlsvp) {

        return this.getTokens(config.assets.js, opts.debug, function(err, tokens) {
          if (err) return callback(err);

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
            return callback(null, info);
          }

          if (info.dashmpd) { //revisar esta funcion y traer los modulos necesarios
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
        return callback(null, info);
      }
    },


    getTokens: function(html5playerfile, debug, callback) {
      
      var key, cachedTokens;
      var rs = /(?:html5)?player-([a-zA-Z0-9\-_]+)(?:\.js|\/)/
        .exec(html5playerfile);
      if (rs) {
       
        key = rs[1];
        cachedTokens = cache.getKey(key);
      } else {
        console.warn('could not extract html5player key:', html5playerfile);
      }

      if (cachedTokens) {

        return callback(null, cachedTokens);
      } else {

        html5playerfile = 'https://' + html5playerfile;
       
        request(html5playerfile, function(err, body) {
          if(err){
            return err;
          }
          
          var tokens = extractActions(body,function(err, tokens){
            
            if(err){
              return;
            }
            
            if (!tokens || !tokens.length) {
              callback(
                new Error('Could not extract signature deciphering actions'));
              return;
            }

            cache.setKey(key, tokens);
            return callback(null, tokens);
          });

        });
      }
    },

    mapQualityVideo: function(item){
      var q = {
                resolution:"",
                quality_label:"",
                type: ""
              };

      switch(item.itag){
      // case '17':
      case '160':
      case '264':
          if(item.quality){
            q.resolution = '144p';
          }

          if(!item.quality_label){
            q.quality_label = '144p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '36':
          if(item.quality){
            q.resolution = '240p';
          }

          if(!item.quality_label){
            q.quality_label = '240p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '43':
          if(item.quality){
            q.resolution = '360p';
          }

          if(!item.quality_label){
            q.quality_label = '360p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '18':
          if(item.quality){
            q.resolution = '360p';
          }

          if(!item.quality_label){
            q.quality_label = '360p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '22':
          if(item.quality){
            q.resolution = '720p';
          }

          if(!item.quality_label){
            q.quality_label = '720p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '136':
          if(item.quality){
            q.resolution = '720p';
          }

          if(!item.quality_label){
            q.quality_label = '720p';
          }

          if(item.resolution){
            q.resolution = item.resolution;
          }
          break;
      case '139':
      case '140':
      case '141':
          // if(item.quality){
            q.resolution = 'Audi';
          // }

          if(!item.quality_label){
            q.quality_label = '100p';
          }

          /*if(item.resolution){
            q.resolution = item.resolution;
          }*/
          break;
      default:
            q.quality_label = item.quality_label;
            q.resolution = "Auto";
      }

      if(item.type){

        // q.type = item.type.split(';', 1)[0];  
        q.type = item.type;  
      }
      

      return q;
    }
});