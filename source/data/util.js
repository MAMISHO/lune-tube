

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