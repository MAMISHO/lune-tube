function between(haystack, left, right) {
  var pos;
  pos = haystack.indexOf(left);
  if (pos === -1) { return ''; }
  haystack = haystack.slice(pos + left.length);
  pos = haystack.indexOf(right);
  if (pos === -1) { return ''; }
  haystack = haystack.slice(0, pos);
  return haystack;
}

function getVideoDescription(html) {
	var Entities = require('html-entities').AllHtmlEntities;
  var regex = /<p.*?id="eow-description".*?>(.+?)<\/p>[\n\r\s]*?<\/div>/im;
  var description = html.match(regex);
  // console.log(description);
  return description ? new Entities().decode(description[1]
    .replace(/\n/g, ' ')
    .replace(/\s*<\s*br\s*\/?\s*>\s*/gi, '\n')
    .replace(/<\s*\/\s*p\s*>\s*<\s*p[^>]*>/gi, '\n')
    .replace(/<.*?>/gi, '')).trim() : '';
}

function parseFormats(info, debug) {

	var qs       = require('querystring');
  var formats = [];
  if (info.url_encoded_fmt_stream_map) {
    formats = formats
      .concat(info.url_encoded_fmt_stream_map.split(','));
  }
  if (info.adaptive_fmts) {
    formats = formats.concat(info.adaptive_fmts.split(','));
  }

  formats = formats
    .map(function(format) {
      var data = qs.parse(format);
      var meta = FORMATS[data.itag];
      if (!meta && debug) {
        console.warn('No format metadata for itag ' + data.itag + ' found');
      }

      for (var key in meta) {
        data[key] = meta[key];
      }

      return data;
    });
  delete info.url_encoded_fmt_stream_map;
  delete info.adaptive_fmts;

  return formats;
}

function loadScript(src, callback)
{
  var s,
      r,
      t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function() {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if ( !r && (!this.readyState || this.readyState == 'complete') )
    {
      r = true;
      callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}


function extractActions(body, callback) {
  
  var objResult = actionsObjRegexp.exec(body);
  if (!objResult) { return callback("error no object", null); }
  var funcResult = actionsFuncRegexp.exec(body);
  if (!funcResult) { return callback("Error no function", null); }

  var obj      = objResult[1].replace(/\$/g, '\\$');
  var objBody  = objResult[2].replace(/\$/g, '\\$');
  var funcbody = funcResult[1].replace(/\$/g, '\\$');

  var result = reverseRegexp.exec(objBody);
  var reverseKey = result && result[1].replace(/\$/g, '\\$');
  result = sliceRegexp.exec(objBody);
  var sliceKey = result && result[1].replace(/\$/g, '\\$');
  result = spliceRegexp.exec(objBody);
  var spliceKey = result && result[1].replace(/\$/g, '\\$');
  result = swapRegexp.exec(objBody);
  var swapKey = result && result[1].replace(/\$/g, '\\$');

  var myreg = '(?:a=)?' + obj + '\\.(' +
    [reverseKey, sliceKey, spliceKey, swapKey].join('|') + ')\\(a,(\\d+)\\)';
  var tokenizeRegexp = new RegExp(myreg, 'g');
  var tokens = [];
  while ((result = tokenizeRegexp.exec(funcbody)) !== null) {
    switch (result[1]) {
      case swapKey:
        tokens.push('w' + result[2]);
        break;
      case reverseKey:
        tokens.push('r');
        break;
      case sliceKey:
        tokens.push('s' + result[2]);
        break;
      case spliceKey:
        tokens.push('p' + result[2]);
        break;
    }
  }

  return callback(null, tokens);
}

function swapHeadAndPosition(arr, position) {
  var first = arr[0];
  arr[0] = arr[position % arr.length];
  arr[position] = first;
  return arr;
}

function decipherFormats(formats, tokens, debug) {
      formats.forEach(function(format) {
        var sig = tokens && format.s ? decipher(tokens, format.s) : null;
        setDownloadURL(format, sig, debug);
      });
}

function decipher(tokens, sig) {
      sig = sig.split('');
      var pos;
      for (var i = 0, len = tokens.length; i < len; i++) {
        var token = tokens[i];
        switch (token[0]) {
        case 'r':
          sig = sig.reverse();
          break;
        case 'w':
          pos = ~~token.slice(1);
          sig = swapHeadAndPosition(sig, pos);
          break;
        case 's':
          pos = ~~token.slice(1);
          sig = sig.slice(pos);
          break;
        case 'p':
          pos = ~~token.slice(1);
          sig.splice(0, pos);
          break;
        }
      }
      return sig.join('');
}

function setDownloadURL(format, sig, debug) {
    var url     = require('url');
    var decodedUrl;
    if (format.url) {
      decodedUrl = format.url;
    } else if (format.stream) {
      if (format.conn) {
        if (format.conn.indexOf('rtmp') === 0) {
          format.rtmp = true;
        }
        decodedUrl = format.conn;
        if (decodedUrl[decodedUrl.length - 1] !== '/') {
          decodedUrl += '/';
        }
        decodedUrl += format.stream;
      } else {
        decodedUrl = format.stream;
      }
    } else {
      if (debug) {
        console.warn('download url not found for itag ' + format.itag);
      }
      return;
    }

    try {
      decodedUrl = decodeURIComponent(decodedUrl);
    } catch (err) {
      if (debug) {
        console.warn('could not decode url: ' + err.message);
      }
      return;
    }

    // Make some adjustments to the final url.
    var parsedUrl = url.parse(decodedUrl, true);

    // Deleting the `search` part is necessary otherwise changes to
    // `query` won't reflect when running `url.format()`
    delete parsedUrl.search;

    var query = parsedUrl.query;
    query.ratebypass = 'yes';
    if (sig) {
      query.signature = sig;
    }

    format.url = url.format(parsedUrl);
}

function decipherURL(url, tokens) {
  return url.replace(/\/s\/([a-fA-F0-9\.]+)/, function(_, s) {
    return '/signature/' + decipher(tokens, s);
  });
}

function mergeFormats(info, formatsMap) {
  info.formats.forEach(function(f) {
    var cf = formatsMap[f.itag];
    if (cf) {
      for (var key in f) { cf[key] = f[key]; }
    } else {
      formatsMap[f.itag] = f;
    }
  });
  info.formats = [];
  for (var itag in formatsMap) { info.formats.push(formatsMap[itag]); }
}


function getM3U8(url, debug, callback) {
  request(url, function(err, body) {
    if (err) return callback(err);

    var formats = {};
    body
      .split('\n')
      .filter(function(line) {
        return line.trim().length && line[0] !== '#';
      })
      .forEach(function(line) {
        var itag = line.match(/\/itag\/(\d+)\//)[1];
        if (!itag) {
          if (debug) {
            console.warn('No itag found in url ' + line);
          }
          return;
        }
        var meta = FORMATS[itag];
        if (!meta && debug) {
          console.warn('No format metadata for itag ' + itag + ' found');
        }
        var format = { itag: itag, url: line };
        for (var key in meta) {
          format[key] = meta[key];
        }
        formats[itag] = format;
      });
    callback(null, formats);
  });
}

/*function request(url, callback) {
  enyo.log("Utils -> request: Inicia configuracion de REQUEST");
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      enyo.log("Utils -> request: Se devuelve el callback");
      callback(null, xhttp.response);
    }else{
      // callback("error de request", null);
      enyo.log("Utils -> Solicitando el REQUEST");
    }
  };
  xhttp.open("GET", url, false);
  xhttp.send();
  enyo.log("Utils -> request: Finaliza configuracion de REQUEST");
}*/

function request(url, callback){
  var ajax = new enyo.Ajax({
            url: url,
            method: "GET",
            cacheBust: false,
            callbackName: null,
            overrideCallback: null,
            sync: true
        });

        ajax.response(function success(inRequest, inResponse){
          if(!inResponse){
            return callback("error del request", null);  
          } 
          return callback(null, inResponse);
        });
        ajax.error(function error(inRequest, inResponse){
          if(!inResponse) return callback("error del request", null); 
          return callback(null, inResponse);
        });
        return ajax.go();

}

function sortFormats(a, b) {
  var ares = a.resolution ? parseInt(a.resolution.slice(0, -1), 10) : 0;
  var bres = b.resolution ? parseInt(b.resolution.slice(0, -1), 10) : 0;
  var afeats = ~~!!ares * 2 + ~~!!a.audioBitrate;
  var bfeats = ~~!!bres * 2 + ~~!!b.audioBitrate;

  function getBitrate(c) {
    if (c.bitrate) {
      var s = c.bitrate.split('-');
      return parseFloat(s[s.length - 1], 10);
    } else {
      return 0;
    }
  }

  function audioScore(c) {
    var abitrate = c.audioBitrate || 0;
    var aenc = audioEncodingRanks[c.audioEncoding] || 0;
    return abitrate + aenc / 10;
  }

  if (afeats === bfeats) {
    if (ares === bres) {
      var avbitrate = getBitrate(a);
      var bvbitrate = getBitrate(b);
      if (avbitrate === bvbitrate) {
        var aascore = audioScore(a);
        var bascore = audioScore(b);
        if (aascore === bascore) {
          var avenc = videoEncodingRanks[a.encoding] || 0;
          var bvenc = videoEncodingRanks[b.encoding] || 0;
          return bvenc - avenc;
        } else {
          return bascore - aascore;
        }
      } else {
        return bvbitrate - avbitrate;
      }
    } else {
      return bres - ares;
    }
  } else {
    return bfeats - afeats;
  }
}





var jsvarStr = '[a-zA-Z_\\$][a-zA-Z_0-9]*';
var reverseStr = ':function\\(a\\)\\{' +
  '(?:return )?a\\.reverse\\(\\)' +
'\\}';
var sliceStr = ':function\\(a,b\\)\\{' +
  'return a\\.slice\\(b\\)' +
'\\}';
var spliceStr = ':function\\(a,b\\)\\{' +
  'a\\.splice\\(0,b\\)' +
'\\}';
var swapStr = ':function\\(a,b\\)\\{' +
  'var c=a\\[0\\];a\\[0\\]=a\\[b%a\\.length\\];a\\[b\\]=c(?:;return a)?' +
'\\}';
var actionsObjRegexp = new RegExp(
  'var (' + jsvarStr + ')=\\{((?:(?:' +
    jsvarStr + reverseStr + '|' +
    jsvarStr + sliceStr   + '|' +
    jsvarStr + spliceStr  + '|' +
    jsvarStr + swapStr +
  '),?\\n?)+)\\};'
);
var actionsFuncRegexp = new RegExp('function(?: ' + jsvarStr + ')?\\(a\\)\\{' +
    'a=a\\.split\\(""\\);\\s*' +
    '((?:(?:a=)?' + jsvarStr + '\\.' + jsvarStr + '\\(a,\\d+\\);)+)' +
    'return a\\.join\\(""\\)' +
  '\\}'
);
var reverseRegexp = new RegExp('(?:^|,)(' + jsvarStr + ')' + reverseStr, 'm');
var sliceRegexp   = new RegExp('(?:^|,)(' + jsvarStr + ')' + sliceStr, 'm');
var spliceRegexp  = new RegExp('(?:^|,)(' + jsvarStr + ')' + spliceStr, 'm');
var swapRegexp    = new RegExp('(?:^|,)(' + jsvarStr + ')' + swapStr, 'm');

var audioEncodingRanks = {
  mp3: 1,
  vorbis: 2,
  aac: 3,
  opus: 4,
  flac: 5,
};

var videoEncodingRanks = {
  'Sorenson H.283': 1,
  'VP8': 3,
  'MPEG-4 Visual': 2,
  'VP9': 4,
  'H.264': 5,
};


var FORMATS={
      '5': {
        container: 'flv',
        resolution: '240p',
        encoding: 'Sorenson H.283',
        profile: null,
        bitrate: '0.25',
        audioEncoding: 'mp3',
        audioBitrate: 64,
      },

      '6': {
        container: 'flv',
        resolution: '270p',
        encoding: 'Sorenson H.263',
        profile: null,
        bitrate: '0.8',
        audioEncoding: 'mp3',
        audioBitrate: 64,
      },

      '13': {
        container: '3gp',
        resolution: null,
        encoding: 'MPEG-4 Visual',
        profile: null,
        bitrate: '0.5',
        audioEncoding: 'aac',
        audioBitrate: null,
      },

      '17': {
        container: '3gp',
        resolution: '144p',
        encoding: 'MPEG-4 Visual',
        profile: 'simple',
        bitrate: '0.05',
        audioEncoding: 'aac',
        audioBitrate: 24,
      },

      '18': {
        container: 'mp4',
        resolution: '360p',
        encoding: 'H.264',
        profile: 'baseline',
        bitrate: '0.5',
        audioEncoding: 'aac',
        audioBitrate: 96,
      },

      '22': {
        container: 'mp4',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '2-3',
        audioEncoding: 'aac',
        audioBitrate: 192,
      },

      '34': {
        container: 'flv',
        resolution: '360p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.5',
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '35': {
        container: 'flv',
        resolution: '480p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.8-1',
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '36': {
        container: '3gp',
        resolution: '240p',
        encoding: 'MPEG-4 Visual',
        profile: 'simple',
        bitrate: '0.175',
        audioEncoding: 'aac',
        audioBitrate: 36,
      },

      '37': {
        container: 'mp4',
        resolution: '1080p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '3-5.9',
        audioEncoding: 'aac',
        audioBitrate: 192,
      },

      '38': {
        container: 'mp4',
        resolution: '3072p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '3.5-5',
        audioEncoding: 'aac',
        audioBitrate: 192,
      },

      '43': {
        container: 'webm',
        resolution: '360p',
        encoding: 'VP8',
        profile: null,
        bitrate: '0.5',
        audioEncoding: 'vorbis',
        audioBitrate: 128,
      },

      '44': {
        container: 'webm',
        resolution: '480p',
        encoding: 'VP8',
        profile: null,
        bitrate: '1',
        audioEncoding: 'vorbis',
        audioBitrate: 128,
      },

      '45': {
        container: 'webm',
        resolution: '720p',
        encoding: 'VP8',
        profile: null,
        bitrate: '2',
        audioEncoding: 'vorbis',
        audioBitrate: 192,
      },

      '46': {
        container: 'webm',
        resolution: '1080p',
        encoding: 'vp8',
        profile: null,
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 192,
      },

      '82': {
        container: 'mp4',
        resolution: '360p',
        encoding: 'H.264',
        profile: '3d',
        bitrate: '0.5',
        audioEncoding: 'aac',
        audioBitrate: 96,
      },

      '83': {
        container: 'mp4',
        resolution: '240p',
        encoding: 'H.264',
        profile: '3d',
        bitrate: '0.5',
        audioEncoding: 'aac',
        audioBitrate: 96,
      },

      '84': {
        container: 'mp4',
        resolution: '720p',
        encoding: 'H.264',
        profile: '3d',
        bitrate: '2-3',
        audioEncoding: 'aac',
        audioBitrate: 192,
      },

      '85': {
        container: 'mp4',
        resolution: '1080p',
        encoding: 'H.264',
        profile: '3d',
        bitrate: '3-4',
        audioEncoding: 'aac',
        audioBitrate: 192,
      },

      '100': {
        container: 'webm',
        resolution: '360p',
        encoding: 'VP8',
        profile: '3d',
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 128,
      },

      '101': {
        container: 'webm',
        resolution: '360p',
        encoding: 'VP8',
        profile: '3d',
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 192,
      },

      '102': {
        container: 'webm',
        resolution: '720p',
        encoding: 'VP8',
        profile: '3d',
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 192,
      },

      // DASH (video only)
      '133': {
        container: 'mp4',
        resolution: '240p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.2-0.3',
        audioEncoding: null,
        audioBitrate: null,
      },

      '134': {
        container: 'mp4',
        resolution: '360p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.3-0.4',
        audioEncoding: null,
        audioBitrate: null,
      },

      '135': {
        container: 'mp4',
        resolution: '480p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.5-1',
        audioEncoding: null,
        audioBitrate: null,
      },

      '136': {
        container: 'mp4',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '1-1.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '137': {
        container: 'mp4',
        resolution: '1080p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '2-3',
        audioEncoding: null,
        audioBitrate: null,
      },

      '138': {
        container: 'mp4',
        resolution: '2160p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '13.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '160': {
        container: 'mp4',
        resolution: '144p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.1',
        audioEncoding: null,
        audioBitrate: null,
      },

      '242': {
        container: 'webm',
        resolution: '240p',
        encoding: 'VP9',
        profile: null,
        bitrate: '0.14',
        audioEncoding: null,
        audioBitrate: null,
      },

      '243': {
        container: 'webm',
        resolution: '360p',
        encoding: 'VP9',
        profile: null,
        bitrate: '0.26',
        audioEncoding: null,
        audioBitrate: null,
      },

      '244': {
        container: 'webm',
        resolution: '480p',
        encoding: 'VP9',
        profile: null,
        bitrate: '0.585',
        audioEncoding: null,
        audioBitrate: null,
      },

      '247': {
        container: 'webm',
        resolution: '720p',
        encoding: 'VP9',
        profile: null,
        bitrate: '1.184',
        audioEncoding: null,
        audioBitrate: null,
      },

      '248': {
        container: 'webm',
        resolution: '1080p',
        encoding: 'VP9',
        profile: null,
        bitrate: '1.895',
        audioEncoding: null,
        audioBitrate: null,
      },

      '264': {
        container: 'mp4',
        resolution: '1440p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '4-5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '266': {
        container: 'mp4',
        resolution: '2160p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '12.5-13.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '271': {
        container: 'webm',
        resolution: '1440p',
        encoding: 'VP9',
        profile: null,
        bitrate: '9',
        audioEncoding: null,
        audioBitrate: null,
      },

      '272': {
        container: 'webm',
        resolution: '2160p',
        encoding: 'VP9',
        profile: null,
        bitrate: '20',
        audioEncoding: null,
        audioBitrate: null,
      },

      '278': {
        container: 'webm',
        resolution: '144p',
        encoding: 'VP9',
        profile: null,
        bitrate: '0.08',
        audioEncoding: null,
        audioBitrate: null,
      },

      '298': {
        container: 'mp4',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '3-3.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '299': {
        container: 'mp4',
        resolution: '1080p',
        encoding: 'H.264',
        profile: 'high',
        bitrate: '5.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '302': {
        container: 'webm',
        resolution: '720p',
        encoding: 'VP9',
        profile: null,
        bitrate: '2.5',
        audioEncoding: null,
        audioBitrate: null,
      },

      '303': {
        container: 'webm',
        resolution: '1080p',
        encoding: 'VP9',
        profile: null,
        bitrate: '5',
        audioEncoding: null,
        audioBitrate: null,
      },

      // DASH (audio only)
      '139': {
        container: 'mp4',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'aac',
        audioBitrate: 48,
      },

      '140': {
        container: 'mp4',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '141': {
        container: 'mp4',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'aac',
        audioBitrate: 256,
      },

      '171': {
        container: 'webm',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 128,
      },

      '172': {
        container: 'webm',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'vorbis',
        audioBitrate: 192,
      },

      '249': {
        container: 'webm',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'opus',
        audioBitrate: 50,
      },
      '250': {
        container: 'webm',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'opus',
        audioBitrate: 70,
      },
      '251': {
        container: 'webm',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'opus',
        audioBitrate: 160,
      },

      // Live streaming
      '92': {
        container: 'ts',
        resolution: '240p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.15-0.3',
        audioEncoding: 'aac',
        audioBitrate: 48,
      },

      '93': {
        container: 'ts',
        resolution: '480p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.5-1',
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '94': {
        container: 'ts',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '0.8-1.25',
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '95': {
        container: 'ts',
        resolution: '1080p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '1.5-3',
        audioEncoding: 'aac',
        audioBitrate: 256,
      },

      '96': {
        container: 'ts',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'main',
        bitrate: '2.5-6',
        audioEncoding: 'aac',
        audioBitrate: 256,
      },

      '120': {
        container: 'flv',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'Main@L3.1',
        bitrate: '2',
        audioEncoding: 'aac',
        audioBitrate: 128,
      },

      '127': {
        container: 'ts',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'aac',
        audioBitrate: 96,
      },

      '128': {
        container: 'ts',
        resolution: null,
        encoding: null,
        profile: null,
        bitrate: null,
        audioEncoding: 'aac',
        audioBitrate: 96,
      },

      '132': {
        container: 'ts',
        resolution: '240p',
        encoding: 'H.264',
        profile: 'baseline',
        bitrate: '0.15-0.2',
        audioEncoding: 'aac',
        audioBitrate: 48,
      },

      '151': {
        container: 'ts',
        resolution: '720p',
        encoding: 'H.264',
        profile: 'baseline',
        bitrate: '0.05',
        audioEncoding: 'aac',
        audioBitrate: 24,
      }
    };