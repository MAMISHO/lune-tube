"use strict";function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr,i){if(!(Symbol.iterator in Object(arr)||Object.prototype.toString.call(arr)==="[object Arguments]")){return;}var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _instanceof(left,right){if(right!=null&&typeof Symbol!=="undefined"&&right[Symbol.hasInstance]){return!!right[Symbol.hasInstance](left);}else{return left instanceof right;}}function _classCallCheck2(instance,Constructor){if(!_instanceof(instance,Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _get(target,property,receiver){if(typeof Reflect!=="undefined"&&Reflect.get){_get=Reflect.get;}else{_get=function _get(target,property,receiver){var base=_superPropBase(target,property);if(!base)return;var desc=Object.getOwnPropertyDescriptor(base,property);if(desc.get){return desc.get.call(receiver);}return desc.value;};}return _get(target,property,receiver||target);}function _superPropBase(object,property){while(!Object.prototype.hasOwnProperty.call(object,property)){object=_getPrototypeOf(object);if(object===null)break;}return object;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map():undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function");}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper);}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor);}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class);};return _wrapNativeSuper(Class);}function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct;}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor();if(Class)_setPrototypeOf(instance,Class.prototype);return instance;};}return _construct.apply(null,arguments);}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1;}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.ytdl=f();}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++){o(t[i]);}return o;}return r;}()({1:[function(require,module,exports){// A cache that expires.
module.exports=/*#__PURE__*/function(_Map){_inherits(Cache,_Map);function Cache(){var _this3;_classCallCheck2(this,Cache);_this3=_possibleConstructorReturn(this,_getPrototypeOf(Cache).call(this));_this3.timeout=1000;return _this3;}_createClass(Cache,[{key:"set",value:function set(key,value){_get(_getPrototypeOf(Cache.prototype),"set",this).call(this,key,{tid:setTimeout(this.delete.bind(this,key),this.timeout),value:value});}},{key:"get",value:function get(key){var entry=_get(_getPrototypeOf(Cache.prototype),"get",this).call(this,key);if(entry){return entry.value;}}},{key:"delete",value:function _delete(key){var entry=_get(_getPrototypeOf(Cache.prototype),"get",this).call(this,key);if(entry){clearTimeout(entry.tid);_get(_getPrototypeOf(Cache.prototype),"delete",this).call(this,key);}}},{key:"clear",value:function clear(){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.values()[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var entry=_step.value;clearTimeout(entry.tid);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}_get(_getPrototypeOf(Cache.prototype),"clear",this).call(this);}}]);return Cache;}(_wrapNativeSuper(Map));},{}],2:[function(require,module,exports){/**
 * http://en.wikipedia.org/wiki/YouTube#Quality_and_formats
 */module.exports={'5':{mimeType:'video/flv; codecs="Sorenson H.283, mp3"',qualityLabel:'240p',bitrate:250000,audioBitrate:64},'6':{mimeType:'video/flv; codecs="Sorenson H.263, mp3"',qualityLabel:'270p',bitrate:800000,audioBitrate:64},'13':{mimeType:'video/3gp; codecs="MPEG-4 Visual, aac"',qualityLabel:null,bitrate:500000,audioBitrate:null},'17':{mimeType:'video/3gp; codecs="MPEG-4 Visual, aac"',qualityLabel:'144p',bitrate:50000,audioBitrate:24},'18':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'360p',bitrate:500000,audioBitrate:96},'22':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'720p',bitrate:2000000,audioBitrate:192},'34':{mimeType:'video/flv; codecs="H.264, aac"',qualityLabel:'360p',bitrate:500000,audioBitrate:128},'35':{mimeType:'video/flv; codecs="H.264, aac"',qualityLabel:'480p',bitrate:800000,audioBitrate:128},'36':{mimeType:'video/3gp; codecs="MPEG-4 Visual, aac"',qualityLabel:'240p',bitrate:175000,audioBitrate:32},'37':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'1080p',bitrate:3000000,audioBitrate:192},'38':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'3072p',bitrate:3500000,audioBitrate:192},'43':{mimeType:'video/webm; codecs="VP8, vorbis"',qualityLabel:'360p',bitrate:500000,audioBitrate:128},'44':{mimeType:'video/webm; codecs="VP8, vorbis"',qualityLabel:'480p',bitrate:1000000,audioBitrate:128},'45':{mimeType:'video/webm; codecs="VP8, vorbis"',qualityLabel:'720p',bitrate:2000000,audioBitrate:192},'46':{mimeType:'audio/webm; codecs="vp8, vorbis"',qualityLabel:'1080p',bitrate:null,audioBitrate:192},'82':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'360p',bitrate:500000,audioBitrate:96},'83':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'240p',bitrate:500000,audioBitrate:96},'84':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'720p',bitrate:2000000,audioBitrate:192},'85':{mimeType:'video/mp4; codecs="H.264, aac"',qualityLabel:'1080p',bitrate:3000000,audioBitrate:192},'91':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'144p',bitrate:100000,audioBitrate:48},'92':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'240p',bitrate:150000,audioBitrate:48},'93':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'360p',bitrate:500000,audioBitrate:128},'94':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'480p',bitrate:800000,audioBitrate:128},'95':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'720p',bitrate:1500000,audioBitrate:256},'96':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'1080p',bitrate:2500000,audioBitrate:256},'100':{mimeType:'audio/webm; codecs="VP8, vorbis"',qualityLabel:'360p',bitrate:null,audioBitrate:128},'101':{mimeType:'audio/webm; codecs="VP8, vorbis"',qualityLabel:'360p',bitrate:null,audioBitrate:192},'102':{mimeType:'audio/webm; codecs="VP8, vorbis"',qualityLabel:'720p',bitrate:null,audioBitrate:192},'120':{mimeType:'video/flv; codecs="H.264, aac"',qualityLabel:'720p',bitrate:2000000,audioBitrate:128},'127':{mimeType:'audio/ts; codecs="aac"',qualityLabel:null,bitrate:null,audioBitrate:96},'128':{mimeType:'audio/ts; codecs="aac"',qualityLabel:null,bitrate:null,audioBitrate:96},'132':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'240p',bitrate:150000,audioBitrate:48},'133':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'240p',bitrate:200000,audioBitrate:null},'134':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'360p',bitrate:300000,audioBitrate:null},'135':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'480p',bitrate:500000,audioBitrate:null},'136':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'720p',bitrate:1000000,audioBitrate:null},'137':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'1080p',bitrate:2500000,audioBitrate:null},'138':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'4320p',bitrate:13500000,audioBitrate:null},'139':{mimeType:'audio/mp4; codecs="aac"',qualityLabel:null,bitrate:null,audioBitrate:48},'140':{mimeType:'audio/m4a; codecs="aac"',qualityLabel:null,bitrate:null,audioBitrate:128},'141':{mimeType:'audio/mp4; codecs="aac"',qualityLabel:null,bitrate:null,audioBitrate:256},'151':{mimeType:'video/ts; codecs="H.264, aac"',qualityLabel:'720p',bitrate:50000,audioBitrate:24},'160':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'144p',bitrate:100000,audioBitrate:null},'171':{mimeType:'audio/webm; codecs="vorbis"',qualityLabel:null,bitrate:null,audioBitrate:128},'172':{mimeType:'audio/webm; codecs="vorbis"',qualityLabel:null,bitrate:null,audioBitrate:192},'242':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'240p',bitrate:100000,audioBitrate:null},'243':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'360p',bitrate:250000,audioBitrate:null},'244':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'480p',bitrate:500000,audioBitrate:null},'247':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'720p',bitrate:700000,audioBitrate:null},'248':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1080p',bitrate:1500000,audioBitrate:null},'249':{mimeType:'audio/webm; codecs="opus"',qualityLabel:null,bitrate:null,audioBitrate:48},'250':{mimeType:'audio/webm; codecs="opus"',qualityLabel:null,bitrate:null,audioBitrate:64},'251':{mimeType:'audio/webm; codecs="opus"',qualityLabel:null,bitrate:null,audioBitrate:160},'264':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'1440p',bitrate:4000000,audioBitrate:null},'266':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'2160p',bitrate:12500000,audioBitrate:null},'271':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1440p',bitrate:9000000,audioBitrate:null},'272':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'4320p',bitrate:20000000,audioBitrate:null},'278':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'144p 15fps',bitrate:80000,audioBitrate:null},'298':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'720p',bitrate:3000000,audioBitrate:null},'299':{mimeType:'video/mp4; codecs="H.264"',qualityLabel:'1080p',bitrate:5500000,audioBitrate:null},'302':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'720p HFR',bitrate:2500000,audioBitrate:null},'303':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1080p HFR',bitrate:5000000,audioBitrate:null},'308':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1440p HFR',bitrate:10000000,audioBitrate:null},'313':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'2160p',bitrate:13000000,audioBitrate:null},'315':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'2160p HFR',bitrate:20000000,audioBitrate:null},'330':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'144p HDR, HFR',bitrate:80000,audioBitrate:null},'331':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'240p HDR, HFR',bitrate:100000,audioBitrate:null},'332':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'360p HDR, HFR',bitrate:250000,audioBitrate:null},'333':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'240p HDR, HFR',bitrate:500000,audioBitrate:null},'334':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'720p HDR, HFR',bitrate:1000000,audioBitrate:null},'335':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1080p HDR, HFR',bitrate:1500000,audioBitrate:null},'336':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'1440p HDR, HFR',bitrate:5000000,audioBitrate:null},'337':{mimeType:'video/webm; codecs="VP9"',qualityLabel:'2160p HDR, HFR',bitrate:12000000,audioBitrate:null}};},{}],3:[function(require,module,exports){(function(setImmediate){var PassThrough=require('stream').PassThrough;var getInfo=require('./info');var util=require('./util');var sig=require('./sig');var request=require('miniget');var m3u8stream=require('m3u8stream');var parseTime=require('m3u8stream/dist/parse-time');/**
 * @param {string} link
 * @param {!Object} options
 * @return {ReadableStream}
 */var ytdl=function ytdl(link,options){var stream=createStream(options);ytdl.getInfo(link,options,function(err,info){if(err){stream.emit('error',err);return;}downloadFromInfoCallback(stream,info,options);});return stream;};module.exports=ytdl;ytdl.getBasicInfo=getInfo.getBasicInfo;ytdl.getInfo=getInfo.getFullInfo;ytdl.chooseFormat=util.chooseFormat;ytdl.filterFormats=util.filterFormats;ytdl.validateID=util.validateID;ytdl.validateURL=util.validateURL;ytdl.getURLVideoID=util.getURLVideoID;ytdl.getVideoID=util.getVideoID;ytdl.cache={sig:sig.cache,info:getInfo.cache};var createStream=function createStream(options){var stream=new PassThrough({highWaterMark:options&&options.highWaterMark||null});stream.destroy=function(){stream._isDestroyed=true;};return stream;};/**
 * Chooses a format to download.
 *
 * @param {stream.Readable} stream
 * @param {Object} info
 * @param {Object} options
 */var downloadFromInfoCallback=function downloadFromInfoCallback(stream,info,options){options=options||{};var format=util.chooseFormat(info.formats,options);if(_instanceof(format,Error)){// The caller expects this function to be async.
setImmediate(function(){stream.emit('error',format);});return;}stream.emit('info',info,format);if(stream._isDestroyed){return;}var contentLength,downloaded=0;var ondata=function ondata(chunk){downloaded+=chunk.length;stream.emit('progress',chunk.length,downloaded,contentLength);};var req;if(format.isHLS||format.isDashMPD){req=m3u8stream(format.url,{chunkReadahead:+info.live_chunk_readahead,begin:options.begin||format.live&&Date.now(),liveBuffer:options.liveBuffer,requestOptions:options.requestOptions,parser:format.isDashMPD?'dash-mpd':'m3u8',id:format.itag});req.on('progress',function(segment,totalSegments){stream.emit('progress',segment.size,segment.num,totalSegments);});}else{if(options.begin){format.url+='&begin='+parseTime.humanStr(options.begin);}var requestOptions=Object.assign({},options.requestOptions,{maxReconnects:6,maxRetries:3,backoff:{inc:500,max:10000}});if(options.range&&(options.range.start||options.range.end)){requestOptions.headers=Object.assign({},requestOptions.headers,{Range:"bytes=".concat(options.range.start||'0',"-").concat(options.range.end||'')});}req=request(format.url,requestOptions);req.on('response',function(res){if(stream._isDestroyed){return;}if(!contentLength){contentLength=parseInt(res.headers['content-length'],10);}});req.on('data',ondata);}stream.destroy=function(){stream._isDestroyed=true;if(req.abort)req.abort();req.end();req.removeListener('data',ondata);req.unpipe();};// Forward events from the request to the stream.
['abort','request','response','error','retry','reconnect'].forEach(function(event){req.prependListener(event,function(arg){stream.emit(event,arg);});});req.pipe(stream);};/**
 * Can be used to download video after its `info` is gotten through
 * `ytdl.getInfo()`. In case the user might want to look at the
 * `info` object before deciding to download.
 *
 * @param {Object} info
 * @param {!Object} options
 */ytdl.downloadFromInfo=function(info,options){var stream=createStream(options);if(!info.full){throw Error('Cannot use `ytdl.downloadFromInfo()` when called '+'with info from `ytdl.getBasicInfo()`');}setImmediate(function(){downloadFromInfoCallback(stream,info,options);});return stream;};}).call(this,require("timers").setImmediate);},{"./info":5,"./sig":6,"./util":7,"m3u8stream":13,"m3u8stream/dist/parse-time":15,"miniget":17,"stream":52,"timers":73}],4:[function(require,module,exports){var qs=require('querystring');var url=require('url');var Entities=require('html-entities').AllHtmlEntities;var util=require('./util');var parseTime=require('m3u8stream/dist/parse-time');var VIDEO_URL='https://www.youtube.com/watch?v=';var getMetaItem=function getMetaItem(body,name){return util.between(body,"<meta itemprop=\"".concat(name,"\" content=\""),'">');};/**
 * Get video description from html
 *
 * @param {string} html
 * @return {string}
 */exports.getVideoDescription=function(html){var regex=/<p.*?id="eow-description".*?>(.+?)<\/p>[\n\r\s]*?<\/div>/im;var description=html.match(regex);return description?Entities.decode(util.stripHTML(description[1])):'';};/**
 * Get video media (extra information) from html
 *
 * @param {string} body
 * @return {Object}
 */exports.getVideoMedia=function(body){var mediainfo=util.between(body,'<div id="watch-description-extras">','<div id="watch-discussion" class="branded-page-box yt-card">');if(mediainfo===''){return{};}var regexp=/<h4 class="title">([\s\S]*?)<\/h4>[\s\S]*?<ul .*?class=".*?watch-info-tag-list">[\s\S]*?<li>([\s\S]*?)<\/li>(?:\s*?<li>([\s\S]*?)<\/li>)?/g;var contentRegexp=/(?: - (\d{4}) \()?<a .*?(?:href="([^"]+)")?.*?>(.*?)<\/a>/;var imgRegexp=/<img src="([^"]+)".*?>/;var media={};var image=imgRegexp.exec(mediainfo);if(image){media.image=url.resolve(VIDEO_URL,image[1]);}var match;while((match=regexp.exec(mediainfo))!=null){var _match=match,_match2=_slicedToArray(_match,4),key=_match2[1],value=_match2[2],detail=_match2[3];key=Entities.decode(key).trim().replace(/\s/g,'_').toLowerCase();var content=contentRegexp.exec(value);if(content){var _content=_slicedToArray(content,4),year=_content[1],mediaUrl=_content[2],value2=_content[3];if(year){media.year=parseInt(year);}else if(detail){media.year=parseInt(detail);}value=value.slice(0,content.index);if(key!=='game'||value2!=='YouTube Gaming'){value+=value2;}media[key+'_url']=url.resolve(VIDEO_URL,mediaUrl);}media[key]=Entities.decode(value);}return media;};/**
 * Get video Owner from html.
 *
 * @param {string} body
 * @return {Object}
 */var userRegexp=/<a href="\/user\/([^"]+)/;var verifiedRegexp=/<span .*?(aria-label="Verified")(.*?(?=<\/span>))/;exports.getAuthor=function(body){var ownerinfo=util.between(body,'<div id="watch7-user-header" class=" spf-link ">','<div id="watch8-action-buttons" class="watch-action-buttons clearfix">');if(ownerinfo===''){return{};}var channelName=Entities.decode(util.between(util.between(ownerinfo,'<div class="yt-user-info">','</div>'),'>','</a>'));var userMatch=ownerinfo.match(userRegexp);var verifiedMatch=ownerinfo.match(verifiedRegexp);var channelID=getMetaItem(body,'channelId');var username=userMatch?userMatch[1]:util.between(util.between(body,'<span itemprop="author"','</span>'),'/user/','">');return{id:channelID,name:channelName,avatar:url.resolve(VIDEO_URL,util.between(ownerinfo,'data-thumb="','"')),verified:!!verifiedMatch,user:username,channel_url:'https://www.youtube.com/channel/'+channelID,user_url:'https://www.youtube.com/user/'+username};};/**
 * Get video published at from html.
 *
 * @param {string} body
 * @return {string}
 */exports.getPublished=function(body){return Date.parse(getMetaItem(body,'datePublished'));};/**
 * Get video published at from html.
 * Credits to https://github.com/paixaop.
 *
 * @param {string} body
 * @return {Array.<Object>}
 */exports.getRelatedVideos=function(body){var jsonStr=util.between(body,'\'RELATED_PLAYER_ARGS\': ',',\n');var watchNextJson,rvsParams,secondaryResults;try{jsonStr=JSON.parse(jsonStr);watchNextJson=JSON.parse(jsonStr.watch_next_response);rvsParams=jsonStr.rvs.split(',').map(function(e){return qs.parse(e);});secondaryResults=watchNextJson.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;}catch(err){return[];}var videos=[];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{var _loop=function _loop(){var result=_step2.value;var details=result.compactVideoRenderer;if(details){try{var viewCount=details.viewCountText.simpleText;var shortViewCount=details.shortViewCountText.simpleText;var rvsDetails=rvsParams.find(function(elem){return elem.id===details.videoId;});if(!/^\d/.test(shortViewCount)){shortViewCount=rvsDetails&&rvsDetails.short_view_count_text||'';}viewCount=(/^\d/.test(viewCount)?viewCount:shortViewCount).split(' ')[0];videos.push({id:details.videoId,title:details.title.simpleText,author:details.shortBylineText.runs[0].text,ucid:details.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId,author_thumbnail:details.channelThumbnail.thumbnails[0].url,short_view_count_text:shortViewCount.split(' ')[0],view_count:viewCount.replace(',',''),length_seconds:details.lengthText?Math.floor(parseTime.humanStr(details.lengthText.simpleText)/1000):rvsParams&&rvsParams.length_seconds+'',video_thumbnail:details.thumbnail.thumbnails[0].url});}catch(err){return"continue";}}};for(var _iterator2=secondaryResults[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var _ret=_loop();if(_ret==="continue")continue;}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return!=null){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}return videos;};},{"./util":7,"html-entities":8,"m3u8stream/dist/parse-time":15,"querystring":35,"url":74}],5:[function(require,module,exports){(function(process){var urllib=require('url');var querystring=require('querystring');var sax=require('sax');var request=require('miniget');var util=require('./util');var extras=require('./info-extras');var sig=require('./sig');var Cache=require('./cache');var VIDEO_URL='https://www.youtube.com/watch?v=';var EMBED_URL='https://www.youtube.com/embed/';var VIDEO_EURL='https://youtube.googleapis.com/v/';var INFO_HOST='www.youtube.com';var INFO_PATH='/get_video_info';/**
 * Gets info from a video without getting additional formats.
 *
 * @param {string} id
 * @param {Object} options
 * @param {Function(Error, Object)} callback
 */exports.getBasicInfo=function(id,options,callback){// Try getting config from the video page first.
var params='hl='+(options.lang||'en');var url=VIDEO_URL+id+'&'+params+'&bpctr='+Math.ceil(Date.now()/1000);// Remove header from watch page request.
// Otherwise, it'll use a different framework for rendering content.
var reqOptions=Object.assign({},options.requestOptions);reqOptions.headers=Object.assign({},reqOptions.headers,{'User-Agent':''});request(url,reqOptions,function(err,res,body){if(err)return callback(err);// Check if there are any errors with this video page.
var unavailableMsg=util.between(body,'<div id="player-unavailable"','>');if(unavailableMsg&&!/\bhid\b/.test(util.between(unavailableMsg,'class="','"'))){// Ignore error about age restriction.
if(!body.includes('<div id="watch7-player-age-gate-content"')){return callback(Error(util.between(body,'<h1 id="unavailable-message" class="message">','</h1>').trim()));}}// Parse out additional metadata from this page.
var additional={// Get the author/uploader.
author:extras.getAuthor(body),// Get the day the vid was published.
published:extras.getPublished(body),// Get description.
description:extras.getVideoDescription(body),// Get media info.
media:extras.getVideoMedia(body),// Get related videos.
related_videos:extras.getRelatedVideos(body)};var jsonStr=util.between(body,'ytplayer.config = ','</script>');var config;if(jsonStr){config=jsonStr.slice(0,jsonStr.lastIndexOf(';ytplayer.load'));gotConfig(id,options,additional,config,false,callback);}else{// If the video page doesn't work, maybe because it has mature content.
// and requires an account logged in to view, try the embed page.
url=EMBED_URL+id+'?'+params;request(url,options.requestOptions,function(err,res,body){if(err)return callback(err);config=util.between(body,'t.setConfig({\'PLAYER_CONFIG\': ',/\}(,'|\}\);)/);gotConfig(id,options,additional,config,true,callback);});}});};/**
 * @param {Object} info
 * @return {Array.<Object>}
 */var parseFormats=function parseFormats(info){var formats=[];if(info.player_response.streamingData){if(info.player_response.streamingData.formats){formats=formats.concat(info.player_response.streamingData.formats);}if(info.player_response.streamingData.adaptiveFormats){formats=formats.concat(info.player_response.streamingData.adaptiveFormats);}}return formats;};/**
 * @param {Object} id
 * @param {Object} options
 * @param {Object} additional
 * @param {Object} config
 * @param {boolean} fromEmbed
 * @param {Function(Error, Object)} callback
 */var gotConfig=function gotConfig(id,options,additional,config,fromEmbed,callback){if(!config){return callback(Error('Could not find player config'));}try{config=JSON.parse(config+(fromEmbed?'}':''));}catch(err){return callback(Error('Error parsing config: '+err.message));}var url=urllib.format({protocol:'https',host:INFO_HOST,pathname:INFO_PATH,query:{video_id:id,eurl:VIDEO_EURL+id,ps:'default',gl:'US',hl:options.lang||'en',sts:config.sts}});request(url,options.requestOptions,function(err,res,body){if(err)return callback(err);var info=querystring.parse(body);var player_response=config.args.player_response||info.player_response;if(info.status==='fail'){return callback(Error("Code ".concat(info.errorcode,": ").concat(util.stripHTML(info.reason))));}else try{info.player_response=JSON.parse(player_response);}catch(err){return callback(Error('Error parsing `player_response`: '+err.message));}var playability=info.player_response.playabilityStatus;if(playability&&playability.status==='UNPLAYABLE'){return callback(Error(util.stripHTML(playability.reason)));}info.formats=parseFormats(info);// Add additional properties to info.
Object.assign(info,additional,{video_id:id,// Give the standard link to the video.
video_url:VIDEO_URL+id,// Copy over a few props from `player_response.videoDetails`
// for backwards compatibility.
title:info.player_response.videoDetails&&info.player_response.videoDetails.title,length_seconds:info.player_response.videoDetails&&info.player_response.videoDetails.lengthSeconds});info.age_restricted=fromEmbed;info.html5player=config.assets.js;callback(null,info);});};/**
 * Gets info from a video additional formats and deciphered URLs.
 *
 * @param {string} id
 * @param {Object} options
 * @param {Function(Error, Object)} callback
 */exports.getFullInfo=function(id,options,callback){return exports.getBasicInfo(id,options,function(err,info){if(err)return callback(err);var hasManifest=info.player_response&&info.player_response.streamingData&&(info.player_response.streamingData.dashManifestUrl||info.player_response.streamingData.hlsManifestUrl);if(info.formats.length||hasManifest){var html5playerfile=urllib.resolve(VIDEO_URL,info.html5player);sig.getTokens(html5playerfile,options,function(err,tokens){if(err)return callback(err);sig.decipherFormats(info.formats,tokens,options.debug);var funcs=[];if(hasManifest&&info.player_response.streamingData.dashManifestUrl){var url=info.player_response.streamingData.dashManifestUrl;funcs.push(getDashManifest.bind(null,url,options));}if(hasManifest&&info.player_response.streamingData.hlsManifestUrl){var _url=info.player_response.streamingData.hlsManifestUrl;funcs.push(getM3U8.bind(null,_url,options));}util.parallel(funcs,function(err,results){if(err)return callback(err);if(results[0]){mergeFormats(info,results[0]);}if(results[1]){mergeFormats(info,results[1]);}info.formats=info.formats.map(util.addFormatMeta);info.formats.sort(util.sortFormats);info.full=true;callback(null,info);});});}else{callback(Error('This video is unavailable'));}});};/**
 * Merges formats from DASH or M3U8 with formats from video info page.
 *
 * @param {Object} info
 * @param {Object} formatsMap
 */var mergeFormats=function mergeFormats(info,formatsMap){info.formats.forEach(function(f){formatsMap[f.itag]=formatsMap[f.itag]||f;});info.formats=Object.values(formatsMap);};/**
 * Gets additional DASH formats.
 *
 * @param {string} url
 * @param {Object} options
 * @param {Function(!Error, Array.<Object>)} callback
 */var getDashManifest=function getDashManifest(url,options,callback){var formats={};var parser=sax.parser(false);parser.onerror=callback;parser.onopentag=function(node){if(node.name==='REPRESENTATION'){var itag=node.attributes.ID;formats[itag]={itag:itag,url:url};}};parser.onend=function(){callback(null,formats);};var req=request(urllib.resolve(VIDEO_URL,url),options.requestOptions);req.setEncoding('utf8');req.on('error',callback);req.on('data',function(chunk){parser.write(chunk);});req.on('end',parser.close.bind(parser));};/**
 * Gets additional formats.
 *
 * @param {string} url
 * @param {Object} options
 * @param {Function(!Error, Array.<Object>)} callback
 */var getM3U8=function getM3U8(url,options,callback){url=urllib.resolve(VIDEO_URL,url);request(url,options.requestOptions,function(err,res,body){if(err)return callback(err);var formats={};body.split('\n').filter(function(line){return /https?:\/\//.test(line);}).forEach(function(line){var itag=line.match(/\/itag\/(\d+)\//)[1];formats[itag]={itag:itag,url:line};});callback(null,formats);});};// Cached for getting basic/full info.
exports.cache=new Cache();// Cache get info functions.
// In case a user wants to get a video's info before downloading.
var _loop2=function _loop2(){var fnName=_arr2[_i2];/**
   * @param {string} link
   * @param {Object} options
   * @param {Function(Error, Object)} callback
   */var fn=exports[fnName];exports[fnName]=function(link,options,callback){if(typeof options==='function'){callback=options;options={};}else if(!options){options={};}if(!callback){return new Promise(function(resolve,reject){exports[fnName](link,options,function(err,info){if(err)return reject(err);resolve(info);});});}var id=util.getVideoID(link);if(_instanceof(id,Error))return callback(id);var key=[fnName,id,options.lang].join('-');if(exports.cache.get(key)){process.nextTick(function(){return callback(null,exports.cache.get(key));});}else{fn(id,options,function(err,info){if(err)return callback(err);exports.cache.set(key,info);callback(null,info);});}};};for(var _i2=0,_arr2=['getBasicInfo','getFullInfo'];_i2<_arr2.length;_i2++){_loop2();}// Export a few helpers.
exports.validateID=util.validateID;exports.validateURL=util.validateURL;exports.getURLVideoID=util.getURLVideoID;exports.getVideoID=util.getVideoID;}).call(this,require('_process'));},{"./cache":1,"./info-extras":4,"./sig":6,"./util":7,"_process":31,"miniget":17,"querystring":35,"sax":18,"url":74}],6:[function(require,module,exports){var url=require('url');var request=require('miniget');var querystring=require('querystring');// A shared cache to keep track of html5player.js tokens.
exports.cache=new Map();/**
 * Extract signature deciphering tokens from html5player file.
 *
 * @param {string} html5playerfile
 * @param {Object} options
 * @param {Function(!Error, Array.<string>)} callback
 */exports.getTokens=function(html5playerfile,options,callback){var key,cachedTokens;var rs=/(?:html5)?player[-_]([a-zA-Z0-9\-_]+)(?:\.js|\/)/.exec(html5playerfile);if(rs){key=rs[1];cachedTokens=exports.cache.get(key);}else{console.warn('Could not extract html5player key:',html5playerfile);}if(cachedTokens){callback(null,cachedTokens);}else{request(html5playerfile,options.requestOptions,function(err,res,body){if(err)return callback(err);var tokens=exports.extractActions(body);if(key&&(!tokens||!tokens.length)){callback(Error('Could not extract signature deciphering actions'));return;}exports.cache.set(key,tokens);callback(null,tokens);});}};/**
 * Decipher a signature based on action tokens.
 *
 * @param {Array.<string>} tokens
 * @param {string} sig
 * @return {string}
 */exports.decipher=function(tokens,sig){sig=sig.split('');for(var i=0,len=tokens.length;i<len;i++){var token=tokens[i],pos=void 0;switch(token[0]){case'r':sig=sig.reverse();break;case'w':pos=~~token.slice(1);sig=swapHeadAndPosition(sig,pos);break;case's':pos=~~token.slice(1);sig=sig.slice(pos);break;case'p':pos=~~token.slice(1);sig.splice(0,pos);break;}}return sig.join('');};/**
 * Swaps the first element of an array with one of given position.
 *
 * @param {Array.<Object>} arr
 * @param {number} position
 * @return {Array.<Object>}
 */var swapHeadAndPosition=function swapHeadAndPosition(arr,position){var first=arr[0];arr[0]=arr[position%arr.length];arr[position]=first;return arr;};var jsVarStr='[a-zA-Z_\\$][a-zA-Z_0-9]*';var jsSingleQuoteStr="'[^'\\\\]*(:?\\\\[\\s\\S][^'\\\\]*)*'";var jsDoubleQuoteStr="\"[^\"\\\\]*(:?\\\\[\\s\\S][^\"\\\\]*)*\"";var jsQuoteStr="(?:".concat(jsSingleQuoteStr,"|").concat(jsDoubleQuoteStr,")");var jsKeyStr="(?:".concat(jsVarStr,"|").concat(jsQuoteStr,")");var jsPropStr="(?:\\.".concat(jsVarStr,"|\\[").concat(jsQuoteStr,"\\])");var jsEmptyStr="(?:''|\"\")";var reverseStr=':function\\(a\\)\\{'+'(?:return )?a\\.reverse\\(\\)'+'\\}';var sliceStr=':function\\(a,b\\)\\{'+'return a\\.slice\\(b\\)'+'\\}';var spliceStr=':function\\(a,b\\)\\{'+'a\\.splice\\(0,b\\)'+'\\}';var swapStr=':function\\(a,b\\)\\{'+'var c=a\\[0\\];a\\[0\\]=a\\[b(?:%a\\.length)?\\];a\\[b(?:%a\\.length)?\\]=c(?:;return a)?'+'\\}';var actionsObjRegexp=new RegExp("var (".concat(jsVarStr,")=\\{((?:(?:")+jsKeyStr+reverseStr+'|'+jsKeyStr+sliceStr+'|'+jsKeyStr+spliceStr+'|'+jsKeyStr+swapStr+'),?\\r?\\n?)+)\\};');var actionsFuncRegexp=new RegExp("function(?: ".concat(jsVarStr,")?\\(a\\)\\{")+"a=a\\.split\\(".concat(jsEmptyStr,"\\);\\s*")+"((?:(?:a=)?".concat(jsVarStr)+jsPropStr+'\\(a,\\d+\\);)+)'+"return a\\.join\\(".concat(jsEmptyStr,"\\)")+'\\}');var reverseRegexp=new RegExp("(?:^|,)(".concat(jsKeyStr,")").concat(reverseStr),'m');var sliceRegexp=new RegExp("(?:^|,)(".concat(jsKeyStr,")").concat(sliceStr),'m');var spliceRegexp=new RegExp("(?:^|,)(".concat(jsKeyStr,")").concat(spliceStr),'m');var swapRegexp=new RegExp("(?:^|,)(".concat(jsKeyStr,")").concat(swapStr),'m');/**
 * Extracts the actions that should be taken to decipher a signature.
 *
 * This searches for a function that performs string manipulations on
 * the signature. We already know what the 3 possible changes to a signature
 * are in order to decipher it. There is
 *
 * * Reversing the string.
 * * Removing a number of characters from the beginning.
 * * Swapping the first character with another position.
 *
 * Note, `Array#slice()` used to be used instead of `Array#splice()`,
 * it's kept in case we encounter any older html5player files.
 *
 * After retrieving the function that does this, we can see what actions
 * it takes on a signature.
 *
 * @param {string} body
 * @return {Array.<string>}
 */exports.extractActions=function(body){var objResult=actionsObjRegexp.exec(body);var funcResult=actionsFuncRegexp.exec(body);if(!objResult||!funcResult){return null;}var obj=objResult[1].replace(/\$/g,'\\$');var objBody=objResult[2].replace(/\$/g,'\\$');var funcBody=funcResult[1].replace(/\$/g,'\\$');var result=reverseRegexp.exec(objBody);var reverseKey=result&&result[1].replace(/\$/g,'\\$').replace(/\$|^'|^"|'$|"$/g,'');result=sliceRegexp.exec(objBody);var sliceKey=result&&result[1].replace(/\$/g,'\\$').replace(/\$|^'|^"|'$|"$/g,'');result=spliceRegexp.exec(objBody);var spliceKey=result&&result[1].replace(/\$/g,'\\$').replace(/\$|^'|^"|'$|"$/g,'');result=swapRegexp.exec(objBody);var swapKey=result&&result[1].replace(/\$/g,'\\$').replace(/\$|^'|^"|'$|"$/g,'');var keys="(".concat([reverseKey,sliceKey,spliceKey,swapKey].join('|'),")");var myreg='(?:a=)?'+obj+"(?:\\.".concat(keys,"|\\['").concat(keys,"'\\]|\\[\"").concat(keys,"\"\\])")+'\\(a,(\\d+)\\)';var tokenizeRegexp=new RegExp(myreg,'g');var tokens=[];while((result=tokenizeRegexp.exec(funcBody))!==null){var key=result[1]||result[2]||result[3];switch(key){case swapKey:tokens.push('w'+result[4]);break;case reverseKey:tokens.push('r');break;case sliceKey:tokens.push('s'+result[4]);break;case spliceKey:tokens.push('p'+result[4]);break;}}return tokens;};/**
 * @param {Object} format
 * @param {string} sig
 * @param {boolean} debug
 */exports.setDownloadURL=function(format,sig,debug){var decodedUrl;if(format.url){decodedUrl=format.url;}else{if(debug){console.warn('Download url not found for itag '+format.itag);}return;}try{decodedUrl=decodeURIComponent(decodedUrl);}catch(err){if(debug){console.warn('Could not decode url: '+err.message);}return;}// Make some adjustments to the final url.
var parsedUrl=url.parse(decodedUrl,true);// Deleting the `search` part is necessary otherwise changes to
// `query` won't reflect when running `url.format()`
delete parsedUrl.search;var query=parsedUrl.query;// This is needed for a speedier download.
// See https://github.com/fent/node-ytdl-core/issues/127
query.ratebypass='yes';if(sig){// When YouTube provides a `sp` parameter the signature `sig` must go
// into the parameter it specifies.
// See https://github.com/fent/node-ytdl-core/issues/417
if(format.sp){query[format.sp]=sig;}else{query.signature=sig;}}format.url=url.format(parsedUrl);};/**
 * Applies `sig.decipher()` to all format URL's.
 *
 * @param {Array.<Object>} formats
 * @param {Array.<string>} tokens
 * @param {boolean} debug
 */exports.decipherFormats=function(formats,tokens,debug){formats.forEach(function(format){if(format.cipher){Object.assign(format,querystring.parse(format.cipher));delete format.cipher;}var sig=tokens&&format.s?exports.decipher(tokens,format.s):null;exports.setDownloadURL(format,sig,debug);});};},{"miniget":17,"querystring":35,"url":74}],7:[function(require,module,exports){var url=require('url');var FORMATS=require('./formats');// Use these to help sort formats, higher is better.
var audioEncodingRanks=['mp4a','mp3','vorbis','aac','opus','flac'];var videoEncodingRanks=['mp4v','avc1','Sorenson H.283','MPEG-4 Visual','VP8','VP9','H.264'];var getBitrate=function getBitrate(format){return parseInt(format.bitrate)||0;};var audioScore=function audioScore(format){var abitrate=format.audioBitrate||0;var aenc=audioEncodingRanks.findIndex(function(enc){return format.codecs&&format.codecs.includes(enc);});return abitrate+aenc/10;};/**
 * Sort formats from highest quality to lowest.
 * By resolution, then video bitrate, then audio bitrate.
 *
 * @param {Object} a
 * @param {Object} b
 */exports.sortFormats=function(a,b){var ares=a.qualityLabel?parseInt(a.qualityLabel.slice(0,-1)):0;var bres=b.qualityLabel?parseInt(b.qualityLabel.slice(0,-1)):0;var afeats=~~!!ares*2+~~!!a.audioBitrate;var bfeats=~~!!bres*2+~~!!b.audioBitrate;if(afeats===bfeats){if(ares===bres){var avbitrate=getBitrate(a);var bvbitrate=getBitrate(b);if(avbitrate===bvbitrate){var aascore=audioScore(a);var bascore=audioScore(b);if(aascore===bascore){var avenc=videoEncodingRanks.findIndex(function(enc){return a.codecs&&a.codecs.includes(enc);});var bvenc=videoEncodingRanks.findIndex(function(enc){return b.codecs&&b.codecs.includes(enc);});return bvenc-avenc;}else{return bascore-aascore;}}else{return bvbitrate-avbitrate;}}else{return bres-ares;}}else{return bfeats-afeats;}};/**
 * Choose a format depending on the given options.
 *
 * @param {Array.<Object>} formats
 * @param {Object} options
 * @return {Object|Error}
 */exports.chooseFormat=function(formats,options){if(_typeof(options.format)==='object'){return options.format;}if(options.filter){formats=exports.filterFormats(formats,options.filter);if(formats.length===0){return Error('No formats found with custom filter');}}var format;var quality=options.quality||'highest';switch(quality){case'highest':format=formats[0];break;case'lowest':format=formats[formats.length-1];break;case'highestaudio':formats=exports.filterFormats(formats,'audio');format=null;var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=formats[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var f=_step3.value;if(!format||audioScore(f)>audioScore(format))format=f;}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return!=null){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}break;case'lowestaudio':formats=exports.filterFormats(formats,'audio');format=null;var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=formats[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var _f=_step4.value;if(!format||audioScore(_f)<audioScore(format))format=_f;}}catch(err){_didIteratorError4=true;_iteratorError4=err;}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return!=null){_iterator4.return();}}finally{if(_didIteratorError4){throw _iteratorError4;}}}break;case'highestvideo':formats=exports.filterFormats(formats,'video');format=null;var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=formats[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var _f2=_step5.value;if(!format||getBitrate(_f2)>getBitrate(format))format=_f2;}}catch(err){_didIteratorError5=true;_iteratorError5=err;}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return!=null){_iterator5.return();}}finally{if(_didIteratorError5){throw _iteratorError5;}}}break;case'lowestvideo':formats=exports.filterFormats(formats,'video');format=null;var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=formats[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _f3=_step6.value;if(!format||getBitrate(_f3)<getBitrate(format))format=_f3;}}catch(err){_didIteratorError6=true;_iteratorError6=err;}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return!=null){_iterator6.return();}}finally{if(_didIteratorError6){throw _iteratorError6;}}}break;default:{var getFormat=function getFormat(itag){return formats.find(function(format){return''+format.itag===''+itag;});};if(Array.isArray(quality)){quality.find(function(q){return format=getFormat(q);});}else{format=getFormat(quality);}}}if(!format){return Error('No such format found: '+quality);}return format;};/**
 * @param {Array.<Object>} formats
 * @param {Function} filter
 * @return {Array.<Object>}
 */exports.filterFormats=function(formats,filter){var fn;var hasVideo=function hasVideo(format){return!!format.qualityLabel;};var hasAudio=function hasAudio(format){return!!format.audioBitrate;};switch(filter){case'audioandvideo':fn=function fn(format){return hasVideo(format)&&hasAudio(format);};break;case'video':fn=hasVideo;break;case'videoonly':fn=function fn(format){return hasVideo(format)&&!hasAudio(format);};break;case'audio':fn=hasAudio;break;case'audioonly':fn=function fn(format){return!hasVideo(format)&&hasAudio(format);};break;default:if(typeof filter==='function'){fn=filter;}else{throw TypeError("Given filter (".concat(filter,") is not supported"));}}return formats.filter(fn);};/**
 * String#indexOf() that supports regex too.
 *
 * @param {string} haystack
 * @param {string|RegExp} needle
 * @return {number}
 */var indexOf=function indexOf(haystack,needle){return _instanceof(needle,RegExp)?haystack.search(needle):haystack.indexOf(needle);};/**
 * Extract string inbetween another.
 *
 * @param {string} haystack
 * @param {string} left
 * @param {string} right
 * @return {string}
 */exports.between=function(haystack,left,right){var pos=indexOf(haystack,left);if(pos===-1){return'';}haystack=haystack.slice(pos+left.length);pos=indexOf(haystack,right);if(pos===-1){return'';}haystack=haystack.slice(0,pos);return haystack;};/**
 * Get video ID.
 *
 * There are a few type of video URL formats.
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://m.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/v/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://music.youtube.com/watch?v=VIDEO_ID
 *  - https://gaming.youtube.com/watch?v=VIDEO_ID
 *
 * @param {string} link
 * @return {string|Error}
 */var validQueryDomains=new Set(['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com','gaming.youtube.com']);var validPathDomains=new Set(['youtu.be','youtube.com','www.youtube.com']);exports.getURLVideoID=function(link){var parsed=url.parse(link,true);var id=parsed.query.v;if(validPathDomains.has(parsed.hostname)&&!id){var paths=parsed.pathname.split('/');id=paths[paths.length-1];}else if(parsed.hostname&&!validQueryDomains.has(parsed.hostname)){return Error('Not a YouTube domain');}if(!id){return Error('No video id found: '+link);}id=id.substring(0,11);if(!exports.validateID(id)){return TypeError("Video id (".concat(id,") does not match expected ")+"format (".concat(idRegex.toString(),")"));}return id;};/**
 * Gets video ID either from a url or by checking if the given string
 * matches the video ID format.
 *
 * @param {string} str
 * @return {string|Error}
 */exports.getVideoID=function(str){if(exports.validateID(str)){return str;}else{return exports.getURLVideoID(str);}};/**
 * Returns true if given id satifies YouTube's id format.
 *
 * @param {string} id
 * @return {boolean}
 */var idRegex=/^[a-zA-Z0-9-_]{11}$/;exports.validateID=function(id){return idRegex.test(id);};/**
 * Checks wether the input string includes a valid id.
 *
 * @param {string} string
 * @return {boolean}
 */exports.validateURL=function(string){return!_instanceof(exports.getURLVideoID(string),Error);};/**
 * @param {Object} format
 * @return {Object}
 */exports.addFormatMeta=function(format){format=Object.assign({},FORMATS[format.itag],format);format.container=format.mimeType?format.mimeType.split(';')[0].split('/')[1]:null;format.codecs=format.mimeType?exports.between(format.mimeType,'codecs="','"'):null;format.live=/\/source\/yt_live_broadcast\//.test(format.url);format.isHLS=/\/manifest\/hls_(variant|playlist)\//.test(format.url);format.isDashMPD=/\/manifest\/dash\//.test(format.url);return format;};/**
 * Get only the string from an HTML string.
 *
 * @param {string} html
 * @return {string}
 */exports.stripHTML=function(html){return html.replace(/\n/g,' ').replace(/\s*<\s*br\s*\/?\s*>\s*/gi,'\n').replace(/<\s*\/\s*p\s*>\s*<\s*p[^>]*>/gi,'\n').replace(/<.*?>/gi,'').trim();};/**
 * @param {Array.<Function>} funcs
 * @param {Function(!Error, Array.<Object>)} callback
 */exports.parallel=function(funcs,callback){var funcsDone=0;var errGiven=false;var results=[];var len=funcs.length;var checkDone=function checkDone(index,err,result){if(errGiven){return;}if(err){errGiven=true;callback(err);return;}results[index]=result;if(++funcsDone===len){callback(null,results);}};if(len>0){funcs.forEach(function(f,i){f(checkDone.bind(null,i));});}else{callback(null,results);}};},{"./formats":2,"url":74}],8:[function(require,module,exports){module.exports={XmlEntities:require('./lib/xml-entities.js'),Html4Entities:require('./lib/html4-entities.js'),Html5Entities:require('./lib/html5-entities.js'),AllHtmlEntities:require('./lib/html5-entities.js')};},{"./lib/html4-entities.js":9,"./lib/html5-entities.js":10,"./lib/xml-entities.js":11}],9:[function(require,module,exports){var HTML_ALPHA=['apos','nbsp','iexcl','cent','pound','curren','yen','brvbar','sect','uml','copy','ordf','laquo','not','shy','reg','macr','deg','plusmn','sup2','sup3','acute','micro','para','middot','cedil','sup1','ordm','raquo','frac14','frac12','frac34','iquest','Agrave','Aacute','Acirc','Atilde','Auml','Aring','Aelig','Ccedil','Egrave','Eacute','Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde','Ograve','Oacute','Ocirc','Otilde','Ouml','times','Oslash','Ugrave','Uacute','Ucirc','Uuml','Yacute','THORN','szlig','agrave','aacute','acirc','atilde','auml','aring','aelig','ccedil','egrave','eacute','ecirc','euml','igrave','iacute','icirc','iuml','eth','ntilde','ograve','oacute','ocirc','otilde','ouml','divide','oslash','ugrave','uacute','ucirc','uuml','yacute','thorn','yuml','quot','amp','lt','gt','OElig','oelig','Scaron','scaron','Yuml','circ','tilde','ensp','emsp','thinsp','zwnj','zwj','lrm','rlm','ndash','mdash','lsquo','rsquo','sbquo','ldquo','rdquo','bdquo','dagger','Dagger','permil','lsaquo','rsaquo','euro','fnof','Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta','Iota','Kappa','Lambda','Mu','Nu','Xi','Omicron','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega','alpha','beta','gamma','delta','epsilon','zeta','eta','theta','iota','kappa','lambda','mu','nu','xi','omicron','pi','rho','sigmaf','sigma','tau','upsilon','phi','chi','psi','omega','thetasym','upsih','piv','bull','hellip','prime','Prime','oline','frasl','weierp','image','real','trade','alefsym','larr','uarr','rarr','darr','harr','crarr','lArr','uArr','rArr','dArr','hArr','forall','part','exist','empty','nabla','isin','notin','ni','prod','sum','minus','lowast','radic','prop','infin','ang','and','or','cap','cup','int','there4','sim','cong','asymp','ne','equiv','le','ge','sub','sup','nsub','sube','supe','oplus','otimes','perp','sdot','lceil','rceil','lfloor','rfloor','lang','rang','loz','spades','clubs','hearts','diams'];var HTML_CODES=[39,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,34,38,60,62,338,339,352,353,376,710,732,8194,8195,8201,8204,8205,8206,8207,8211,8212,8216,8217,8218,8220,8221,8222,8224,8225,8240,8249,8250,8364,402,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,931,932,933,934,935,936,937,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,977,978,982,8226,8230,8242,8243,8254,8260,8472,8465,8476,8482,8501,8592,8593,8594,8595,8596,8629,8656,8657,8658,8659,8660,8704,8706,8707,8709,8711,8712,8713,8715,8719,8721,8722,8727,8730,8733,8734,8736,8743,8744,8745,8746,8747,8756,8764,8773,8776,8800,8801,8804,8805,8834,8835,8836,8838,8839,8853,8855,8869,8901,8968,8969,8970,8971,9001,9002,9674,9824,9827,9829,9830];var alphaIndex={};var numIndex={};var i=0;var length=HTML_ALPHA.length;while(i<length){var a=HTML_ALPHA[i];var c=HTML_CODES[i];alphaIndex[a]=String.fromCharCode(c);numIndex[c]=a;i++;}/**
 * @constructor
 */function Html4Entities(){}/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.prototype.decode=function(str){if(!str||!str.length){return'';}return str.replace(/&(#?[\w\d]+);?/g,function(s,entity){var chr;if(entity.charAt(0)==="#"){var code=entity.charAt(1).toLowerCase()==='x'?parseInt(entity.substr(2),16):parseInt(entity.substr(1));if(!(isNaN(code)||code<-32768||code>65535)){chr=String.fromCharCode(code);}}else{chr=alphaIndex[entity];}return chr||s;});};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.decode=function(str){return new Html4Entities().decode(str);};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.prototype.encode=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var alpha=numIndex[str.charCodeAt(i)];result+=alpha?"&"+alpha+";":str.charAt(i);i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.encode=function(str){return new Html4Entities().encode(str);};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.prototype.encodeNonUTF=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var cc=str.charCodeAt(i);var alpha=numIndex[cc];if(alpha){result+="&"+alpha+";";}else if(cc<32||cc>126){result+="&#"+cc+";";}else{result+=str.charAt(i);}i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.encodeNonUTF=function(str){return new Html4Entities().encodeNonUTF(str);};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.prototype.encodeNonASCII=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var c=str.charCodeAt(i);if(c<=255){result+=str[i++];continue;}result+='&#'+c+';';i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html4Entities.encodeNonASCII=function(str){return new Html4Entities().encodeNonASCII(str);};module.exports=Html4Entities;},{}],10:[function(require,module,exports){var ENTITIES=[['Aacute',[193]],['aacute',[225]],['Abreve',[258]],['abreve',[259]],['ac',[8766]],['acd',[8767]],['acE',[8766,819]],['Acirc',[194]],['acirc',[226]],['acute',[180]],['Acy',[1040]],['acy',[1072]],['AElig',[198]],['aelig',[230]],['af',[8289]],['Afr',[120068]],['afr',[120094]],['Agrave',[192]],['agrave',[224]],['alefsym',[8501]],['aleph',[8501]],['Alpha',[913]],['alpha',[945]],['Amacr',[256]],['amacr',[257]],['amalg',[10815]],['amp',[38]],['AMP',[38]],['andand',[10837]],['And',[10835]],['and',[8743]],['andd',[10844]],['andslope',[10840]],['andv',[10842]],['ang',[8736]],['ange',[10660]],['angle',[8736]],['angmsdaa',[10664]],['angmsdab',[10665]],['angmsdac',[10666]],['angmsdad',[10667]],['angmsdae',[10668]],['angmsdaf',[10669]],['angmsdag',[10670]],['angmsdah',[10671]],['angmsd',[8737]],['angrt',[8735]],['angrtvb',[8894]],['angrtvbd',[10653]],['angsph',[8738]],['angst',[197]],['angzarr',[9084]],['Aogon',[260]],['aogon',[261]],['Aopf',[120120]],['aopf',[120146]],['apacir',[10863]],['ap',[8776]],['apE',[10864]],['ape',[8778]],['apid',[8779]],['apos',[39]],['ApplyFunction',[8289]],['approx',[8776]],['approxeq',[8778]],['Aring',[197]],['aring',[229]],['Ascr',[119964]],['ascr',[119990]],['Assign',[8788]],['ast',[42]],['asymp',[8776]],['asympeq',[8781]],['Atilde',[195]],['atilde',[227]],['Auml',[196]],['auml',[228]],['awconint',[8755]],['awint',[10769]],['backcong',[8780]],['backepsilon',[1014]],['backprime',[8245]],['backsim',[8765]],['backsimeq',[8909]],['Backslash',[8726]],['Barv',[10983]],['barvee',[8893]],['barwed',[8965]],['Barwed',[8966]],['barwedge',[8965]],['bbrk',[9141]],['bbrktbrk',[9142]],['bcong',[8780]],['Bcy',[1041]],['bcy',[1073]],['bdquo',[8222]],['becaus',[8757]],['because',[8757]],['Because',[8757]],['bemptyv',[10672]],['bepsi',[1014]],['bernou',[8492]],['Bernoullis',[8492]],['Beta',[914]],['beta',[946]],['beth',[8502]],['between',[8812]],['Bfr',[120069]],['bfr',[120095]],['bigcap',[8898]],['bigcirc',[9711]],['bigcup',[8899]],['bigodot',[10752]],['bigoplus',[10753]],['bigotimes',[10754]],['bigsqcup',[10758]],['bigstar',[9733]],['bigtriangledown',[9661]],['bigtriangleup',[9651]],['biguplus',[10756]],['bigvee',[8897]],['bigwedge',[8896]],['bkarow',[10509]],['blacklozenge',[10731]],['blacksquare',[9642]],['blacktriangle',[9652]],['blacktriangledown',[9662]],['blacktriangleleft',[9666]],['blacktriangleright',[9656]],['blank',[9251]],['blk12',[9618]],['blk14',[9617]],['blk34',[9619]],['block',[9608]],['bne',[61,8421]],['bnequiv',[8801,8421]],['bNot',[10989]],['bnot',[8976]],['Bopf',[120121]],['bopf',[120147]],['bot',[8869]],['bottom',[8869]],['bowtie',[8904]],['boxbox',[10697]],['boxdl',[9488]],['boxdL',[9557]],['boxDl',[9558]],['boxDL',[9559]],['boxdr',[9484]],['boxdR',[9554]],['boxDr',[9555]],['boxDR',[9556]],['boxh',[9472]],['boxH',[9552]],['boxhd',[9516]],['boxHd',[9572]],['boxhD',[9573]],['boxHD',[9574]],['boxhu',[9524]],['boxHu',[9575]],['boxhU',[9576]],['boxHU',[9577]],['boxminus',[8863]],['boxplus',[8862]],['boxtimes',[8864]],['boxul',[9496]],['boxuL',[9563]],['boxUl',[9564]],['boxUL',[9565]],['boxur',[9492]],['boxuR',[9560]],['boxUr',[9561]],['boxUR',[9562]],['boxv',[9474]],['boxV',[9553]],['boxvh',[9532]],['boxvH',[9578]],['boxVh',[9579]],['boxVH',[9580]],['boxvl',[9508]],['boxvL',[9569]],['boxVl',[9570]],['boxVL',[9571]],['boxvr',[9500]],['boxvR',[9566]],['boxVr',[9567]],['boxVR',[9568]],['bprime',[8245]],['breve',[728]],['Breve',[728]],['brvbar',[166]],['bscr',[119991]],['Bscr',[8492]],['bsemi',[8271]],['bsim',[8765]],['bsime',[8909]],['bsolb',[10693]],['bsol',[92]],['bsolhsub',[10184]],['bull',[8226]],['bullet',[8226]],['bump',[8782]],['bumpE',[10926]],['bumpe',[8783]],['Bumpeq',[8782]],['bumpeq',[8783]],['Cacute',[262]],['cacute',[263]],['capand',[10820]],['capbrcup',[10825]],['capcap',[10827]],['cap',[8745]],['Cap',[8914]],['capcup',[10823]],['capdot',[10816]],['CapitalDifferentialD',[8517]],['caps',[8745,65024]],['caret',[8257]],['caron',[711]],['Cayleys',[8493]],['ccaps',[10829]],['Ccaron',[268]],['ccaron',[269]],['Ccedil',[199]],['ccedil',[231]],['Ccirc',[264]],['ccirc',[265]],['Cconint',[8752]],['ccups',[10828]],['ccupssm',[10832]],['Cdot',[266]],['cdot',[267]],['cedil',[184]],['Cedilla',[184]],['cemptyv',[10674]],['cent',[162]],['centerdot',[183]],['CenterDot',[183]],['cfr',[120096]],['Cfr',[8493]],['CHcy',[1063]],['chcy',[1095]],['check',[10003]],['checkmark',[10003]],['Chi',[935]],['chi',[967]],['circ',[710]],['circeq',[8791]],['circlearrowleft',[8634]],['circlearrowright',[8635]],['circledast',[8859]],['circledcirc',[8858]],['circleddash',[8861]],['CircleDot',[8857]],['circledR',[174]],['circledS',[9416]],['CircleMinus',[8854]],['CirclePlus',[8853]],['CircleTimes',[8855]],['cir',[9675]],['cirE',[10691]],['cire',[8791]],['cirfnint',[10768]],['cirmid',[10991]],['cirscir',[10690]],['ClockwiseContourIntegral',[8754]],['clubs',[9827]],['clubsuit',[9827]],['colon',[58]],['Colon',[8759]],['Colone',[10868]],['colone',[8788]],['coloneq',[8788]],['comma',[44]],['commat',[64]],['comp',[8705]],['compfn',[8728]],['complement',[8705]],['complexes',[8450]],['cong',[8773]],['congdot',[10861]],['Congruent',[8801]],['conint',[8750]],['Conint',[8751]],['ContourIntegral',[8750]],['copf',[120148]],['Copf',[8450]],['coprod',[8720]],['Coproduct',[8720]],['copy',[169]],['COPY',[169]],['copysr',[8471]],['CounterClockwiseContourIntegral',[8755]],['crarr',[8629]],['cross',[10007]],['Cross',[10799]],['Cscr',[119966]],['cscr',[119992]],['csub',[10959]],['csube',[10961]],['csup',[10960]],['csupe',[10962]],['ctdot',[8943]],['cudarrl',[10552]],['cudarrr',[10549]],['cuepr',[8926]],['cuesc',[8927]],['cularr',[8630]],['cularrp',[10557]],['cupbrcap',[10824]],['cupcap',[10822]],['CupCap',[8781]],['cup',[8746]],['Cup',[8915]],['cupcup',[10826]],['cupdot',[8845]],['cupor',[10821]],['cups',[8746,65024]],['curarr',[8631]],['curarrm',[10556]],['curlyeqprec',[8926]],['curlyeqsucc',[8927]],['curlyvee',[8910]],['curlywedge',[8911]],['curren',[164]],['curvearrowleft',[8630]],['curvearrowright',[8631]],['cuvee',[8910]],['cuwed',[8911]],['cwconint',[8754]],['cwint',[8753]],['cylcty',[9005]],['dagger',[8224]],['Dagger',[8225]],['daleth',[8504]],['darr',[8595]],['Darr',[8609]],['dArr',[8659]],['dash',[8208]],['Dashv',[10980]],['dashv',[8867]],['dbkarow',[10511]],['dblac',[733]],['Dcaron',[270]],['dcaron',[271]],['Dcy',[1044]],['dcy',[1076]],['ddagger',[8225]],['ddarr',[8650]],['DD',[8517]],['dd',[8518]],['DDotrahd',[10513]],['ddotseq',[10871]],['deg',[176]],['Del',[8711]],['Delta',[916]],['delta',[948]],['demptyv',[10673]],['dfisht',[10623]],['Dfr',[120071]],['dfr',[120097]],['dHar',[10597]],['dharl',[8643]],['dharr',[8642]],['DiacriticalAcute',[180]],['DiacriticalDot',[729]],['DiacriticalDoubleAcute',[733]],['DiacriticalGrave',[96]],['DiacriticalTilde',[732]],['diam',[8900]],['diamond',[8900]],['Diamond',[8900]],['diamondsuit',[9830]],['diams',[9830]],['die',[168]],['DifferentialD',[8518]],['digamma',[989]],['disin',[8946]],['div',[247]],['divide',[247]],['divideontimes',[8903]],['divonx',[8903]],['DJcy',[1026]],['djcy',[1106]],['dlcorn',[8990]],['dlcrop',[8973]],['dollar',[36]],['Dopf',[120123]],['dopf',[120149]],['Dot',[168]],['dot',[729]],['DotDot',[8412]],['doteq',[8784]],['doteqdot',[8785]],['DotEqual',[8784]],['dotminus',[8760]],['dotplus',[8724]],['dotsquare',[8865]],['doublebarwedge',[8966]],['DoubleContourIntegral',[8751]],['DoubleDot',[168]],['DoubleDownArrow',[8659]],['DoubleLeftArrow',[8656]],['DoubleLeftRightArrow',[8660]],['DoubleLeftTee',[10980]],['DoubleLongLeftArrow',[10232]],['DoubleLongLeftRightArrow',[10234]],['DoubleLongRightArrow',[10233]],['DoubleRightArrow',[8658]],['DoubleRightTee',[8872]],['DoubleUpArrow',[8657]],['DoubleUpDownArrow',[8661]],['DoubleVerticalBar',[8741]],['DownArrowBar',[10515]],['downarrow',[8595]],['DownArrow',[8595]],['Downarrow',[8659]],['DownArrowUpArrow',[8693]],['DownBreve',[785]],['downdownarrows',[8650]],['downharpoonleft',[8643]],['downharpoonright',[8642]],['DownLeftRightVector',[10576]],['DownLeftTeeVector',[10590]],['DownLeftVectorBar',[10582]],['DownLeftVector',[8637]],['DownRightTeeVector',[10591]],['DownRightVectorBar',[10583]],['DownRightVector',[8641]],['DownTeeArrow',[8615]],['DownTee',[8868]],['drbkarow',[10512]],['drcorn',[8991]],['drcrop',[8972]],['Dscr',[119967]],['dscr',[119993]],['DScy',[1029]],['dscy',[1109]],['dsol',[10742]],['Dstrok',[272]],['dstrok',[273]],['dtdot',[8945]],['dtri',[9663]],['dtrif',[9662]],['duarr',[8693]],['duhar',[10607]],['dwangle',[10662]],['DZcy',[1039]],['dzcy',[1119]],['dzigrarr',[10239]],['Eacute',[201]],['eacute',[233]],['easter',[10862]],['Ecaron',[282]],['ecaron',[283]],['Ecirc',[202]],['ecirc',[234]],['ecir',[8790]],['ecolon',[8789]],['Ecy',[1069]],['ecy',[1101]],['eDDot',[10871]],['Edot',[278]],['edot',[279]],['eDot',[8785]],['ee',[8519]],['efDot',[8786]],['Efr',[120072]],['efr',[120098]],['eg',[10906]],['Egrave',[200]],['egrave',[232]],['egs',[10902]],['egsdot',[10904]],['el',[10905]],['Element',[8712]],['elinters',[9191]],['ell',[8467]],['els',[10901]],['elsdot',[10903]],['Emacr',[274]],['emacr',[275]],['empty',[8709]],['emptyset',[8709]],['EmptySmallSquare',[9723]],['emptyv',[8709]],['EmptyVerySmallSquare',[9643]],['emsp13',[8196]],['emsp14',[8197]],['emsp',[8195]],['ENG',[330]],['eng',[331]],['ensp',[8194]],['Eogon',[280]],['eogon',[281]],['Eopf',[120124]],['eopf',[120150]],['epar',[8917]],['eparsl',[10723]],['eplus',[10865]],['epsi',[949]],['Epsilon',[917]],['epsilon',[949]],['epsiv',[1013]],['eqcirc',[8790]],['eqcolon',[8789]],['eqsim',[8770]],['eqslantgtr',[10902]],['eqslantless',[10901]],['Equal',[10869]],['equals',[61]],['EqualTilde',[8770]],['equest',[8799]],['Equilibrium',[8652]],['equiv',[8801]],['equivDD',[10872]],['eqvparsl',[10725]],['erarr',[10609]],['erDot',[8787]],['escr',[8495]],['Escr',[8496]],['esdot',[8784]],['Esim',[10867]],['esim',[8770]],['Eta',[919]],['eta',[951]],['ETH',[208]],['eth',[240]],['Euml',[203]],['euml',[235]],['euro',[8364]],['excl',[33]],['exist',[8707]],['Exists',[8707]],['expectation',[8496]],['exponentiale',[8519]],['ExponentialE',[8519]],['fallingdotseq',[8786]],['Fcy',[1060]],['fcy',[1092]],['female',[9792]],['ffilig',[64259]],['fflig',[64256]],['ffllig',[64260]],['Ffr',[120073]],['ffr',[120099]],['filig',[64257]],['FilledSmallSquare',[9724]],['FilledVerySmallSquare',[9642]],['fjlig',[102,106]],['flat',[9837]],['fllig',[64258]],['fltns',[9649]],['fnof',[402]],['Fopf',[120125]],['fopf',[120151]],['forall',[8704]],['ForAll',[8704]],['fork',[8916]],['forkv',[10969]],['Fouriertrf',[8497]],['fpartint',[10765]],['frac12',[189]],['frac13',[8531]],['frac14',[188]],['frac15',[8533]],['frac16',[8537]],['frac18',[8539]],['frac23',[8532]],['frac25',[8534]],['frac34',[190]],['frac35',[8535]],['frac38',[8540]],['frac45',[8536]],['frac56',[8538]],['frac58',[8541]],['frac78',[8542]],['frasl',[8260]],['frown',[8994]],['fscr',[119995]],['Fscr',[8497]],['gacute',[501]],['Gamma',[915]],['gamma',[947]],['Gammad',[988]],['gammad',[989]],['gap',[10886]],['Gbreve',[286]],['gbreve',[287]],['Gcedil',[290]],['Gcirc',[284]],['gcirc',[285]],['Gcy',[1043]],['gcy',[1075]],['Gdot',[288]],['gdot',[289]],['ge',[8805]],['gE',[8807]],['gEl',[10892]],['gel',[8923]],['geq',[8805]],['geqq',[8807]],['geqslant',[10878]],['gescc',[10921]],['ges',[10878]],['gesdot',[10880]],['gesdoto',[10882]],['gesdotol',[10884]],['gesl',[8923,65024]],['gesles',[10900]],['Gfr',[120074]],['gfr',[120100]],['gg',[8811]],['Gg',[8921]],['ggg',[8921]],['gimel',[8503]],['GJcy',[1027]],['gjcy',[1107]],['gla',[10917]],['gl',[8823]],['glE',[10898]],['glj',[10916]],['gnap',[10890]],['gnapprox',[10890]],['gne',[10888]],['gnE',[8809]],['gneq',[10888]],['gneqq',[8809]],['gnsim',[8935]],['Gopf',[120126]],['gopf',[120152]],['grave',[96]],['GreaterEqual',[8805]],['GreaterEqualLess',[8923]],['GreaterFullEqual',[8807]],['GreaterGreater',[10914]],['GreaterLess',[8823]],['GreaterSlantEqual',[10878]],['GreaterTilde',[8819]],['Gscr',[119970]],['gscr',[8458]],['gsim',[8819]],['gsime',[10894]],['gsiml',[10896]],['gtcc',[10919]],['gtcir',[10874]],['gt',[62]],['GT',[62]],['Gt',[8811]],['gtdot',[8919]],['gtlPar',[10645]],['gtquest',[10876]],['gtrapprox',[10886]],['gtrarr',[10616]],['gtrdot',[8919]],['gtreqless',[8923]],['gtreqqless',[10892]],['gtrless',[8823]],['gtrsim',[8819]],['gvertneqq',[8809,65024]],['gvnE',[8809,65024]],['Hacek',[711]],['hairsp',[8202]],['half',[189]],['hamilt',[8459]],['HARDcy',[1066]],['hardcy',[1098]],['harrcir',[10568]],['harr',[8596]],['hArr',[8660]],['harrw',[8621]],['Hat',[94]],['hbar',[8463]],['Hcirc',[292]],['hcirc',[293]],['hearts',[9829]],['heartsuit',[9829]],['hellip',[8230]],['hercon',[8889]],['hfr',[120101]],['Hfr',[8460]],['HilbertSpace',[8459]],['hksearow',[10533]],['hkswarow',[10534]],['hoarr',[8703]],['homtht',[8763]],['hookleftarrow',[8617]],['hookrightarrow',[8618]],['hopf',[120153]],['Hopf',[8461]],['horbar',[8213]],['HorizontalLine',[9472]],['hscr',[119997]],['Hscr',[8459]],['hslash',[8463]],['Hstrok',[294]],['hstrok',[295]],['HumpDownHump',[8782]],['HumpEqual',[8783]],['hybull',[8259]],['hyphen',[8208]],['Iacute',[205]],['iacute',[237]],['ic',[8291]],['Icirc',[206]],['icirc',[238]],['Icy',[1048]],['icy',[1080]],['Idot',[304]],['IEcy',[1045]],['iecy',[1077]],['iexcl',[161]],['iff',[8660]],['ifr',[120102]],['Ifr',[8465]],['Igrave',[204]],['igrave',[236]],['ii',[8520]],['iiiint',[10764]],['iiint',[8749]],['iinfin',[10716]],['iiota',[8489]],['IJlig',[306]],['ijlig',[307]],['Imacr',[298]],['imacr',[299]],['image',[8465]],['ImaginaryI',[8520]],['imagline',[8464]],['imagpart',[8465]],['imath',[305]],['Im',[8465]],['imof',[8887]],['imped',[437]],['Implies',[8658]],['incare',[8453]],['in',[8712]],['infin',[8734]],['infintie',[10717]],['inodot',[305]],['intcal',[8890]],['int',[8747]],['Int',[8748]],['integers',[8484]],['Integral',[8747]],['intercal',[8890]],['Intersection',[8898]],['intlarhk',[10775]],['intprod',[10812]],['InvisibleComma',[8291]],['InvisibleTimes',[8290]],['IOcy',[1025]],['iocy',[1105]],['Iogon',[302]],['iogon',[303]],['Iopf',[120128]],['iopf',[120154]],['Iota',[921]],['iota',[953]],['iprod',[10812]],['iquest',[191]],['iscr',[119998]],['Iscr',[8464]],['isin',[8712]],['isindot',[8949]],['isinE',[8953]],['isins',[8948]],['isinsv',[8947]],['isinv',[8712]],['it',[8290]],['Itilde',[296]],['itilde',[297]],['Iukcy',[1030]],['iukcy',[1110]],['Iuml',[207]],['iuml',[239]],['Jcirc',[308]],['jcirc',[309]],['Jcy',[1049]],['jcy',[1081]],['Jfr',[120077]],['jfr',[120103]],['jmath',[567]],['Jopf',[120129]],['jopf',[120155]],['Jscr',[119973]],['jscr',[119999]],['Jsercy',[1032]],['jsercy',[1112]],['Jukcy',[1028]],['jukcy',[1108]],['Kappa',[922]],['kappa',[954]],['kappav',[1008]],['Kcedil',[310]],['kcedil',[311]],['Kcy',[1050]],['kcy',[1082]],['Kfr',[120078]],['kfr',[120104]],['kgreen',[312]],['KHcy',[1061]],['khcy',[1093]],['KJcy',[1036]],['kjcy',[1116]],['Kopf',[120130]],['kopf',[120156]],['Kscr',[119974]],['kscr',[120000]],['lAarr',[8666]],['Lacute',[313]],['lacute',[314]],['laemptyv',[10676]],['lagran',[8466]],['Lambda',[923]],['lambda',[955]],['lang',[10216]],['Lang',[10218]],['langd',[10641]],['langle',[10216]],['lap',[10885]],['Laplacetrf',[8466]],['laquo',[171]],['larrb',[8676]],['larrbfs',[10527]],['larr',[8592]],['Larr',[8606]],['lArr',[8656]],['larrfs',[10525]],['larrhk',[8617]],['larrlp',[8619]],['larrpl',[10553]],['larrsim',[10611]],['larrtl',[8610]],['latail',[10521]],['lAtail',[10523]],['lat',[10923]],['late',[10925]],['lates',[10925,65024]],['lbarr',[10508]],['lBarr',[10510]],['lbbrk',[10098]],['lbrace',[123]],['lbrack',[91]],['lbrke',[10635]],['lbrksld',[10639]],['lbrkslu',[10637]],['Lcaron',[317]],['lcaron',[318]],['Lcedil',[315]],['lcedil',[316]],['lceil',[8968]],['lcub',[123]],['Lcy',[1051]],['lcy',[1083]],['ldca',[10550]],['ldquo',[8220]],['ldquor',[8222]],['ldrdhar',[10599]],['ldrushar',[10571]],['ldsh',[8626]],['le',[8804]],['lE',[8806]],['LeftAngleBracket',[10216]],['LeftArrowBar',[8676]],['leftarrow',[8592]],['LeftArrow',[8592]],['Leftarrow',[8656]],['LeftArrowRightArrow',[8646]],['leftarrowtail',[8610]],['LeftCeiling',[8968]],['LeftDoubleBracket',[10214]],['LeftDownTeeVector',[10593]],['LeftDownVectorBar',[10585]],['LeftDownVector',[8643]],['LeftFloor',[8970]],['leftharpoondown',[8637]],['leftharpoonup',[8636]],['leftleftarrows',[8647]],['leftrightarrow',[8596]],['LeftRightArrow',[8596]],['Leftrightarrow',[8660]],['leftrightarrows',[8646]],['leftrightharpoons',[8651]],['leftrightsquigarrow',[8621]],['LeftRightVector',[10574]],['LeftTeeArrow',[8612]],['LeftTee',[8867]],['LeftTeeVector',[10586]],['leftthreetimes',[8907]],['LeftTriangleBar',[10703]],['LeftTriangle',[8882]],['LeftTriangleEqual',[8884]],['LeftUpDownVector',[10577]],['LeftUpTeeVector',[10592]],['LeftUpVectorBar',[10584]],['LeftUpVector',[8639]],['LeftVectorBar',[10578]],['LeftVector',[8636]],['lEg',[10891]],['leg',[8922]],['leq',[8804]],['leqq',[8806]],['leqslant',[10877]],['lescc',[10920]],['les',[10877]],['lesdot',[10879]],['lesdoto',[10881]],['lesdotor',[10883]],['lesg',[8922,65024]],['lesges',[10899]],['lessapprox',[10885]],['lessdot',[8918]],['lesseqgtr',[8922]],['lesseqqgtr',[10891]],['LessEqualGreater',[8922]],['LessFullEqual',[8806]],['LessGreater',[8822]],['lessgtr',[8822]],['LessLess',[10913]],['lesssim',[8818]],['LessSlantEqual',[10877]],['LessTilde',[8818]],['lfisht',[10620]],['lfloor',[8970]],['Lfr',[120079]],['lfr',[120105]],['lg',[8822]],['lgE',[10897]],['lHar',[10594]],['lhard',[8637]],['lharu',[8636]],['lharul',[10602]],['lhblk',[9604]],['LJcy',[1033]],['ljcy',[1113]],['llarr',[8647]],['ll',[8810]],['Ll',[8920]],['llcorner',[8990]],['Lleftarrow',[8666]],['llhard',[10603]],['lltri',[9722]],['Lmidot',[319]],['lmidot',[320]],['lmoustache',[9136]],['lmoust',[9136]],['lnap',[10889]],['lnapprox',[10889]],['lne',[10887]],['lnE',[8808]],['lneq',[10887]],['lneqq',[8808]],['lnsim',[8934]],['loang',[10220]],['loarr',[8701]],['lobrk',[10214]],['longleftarrow',[10229]],['LongLeftArrow',[10229]],['Longleftarrow',[10232]],['longleftrightarrow',[10231]],['LongLeftRightArrow',[10231]],['Longleftrightarrow',[10234]],['longmapsto',[10236]],['longrightarrow',[10230]],['LongRightArrow',[10230]],['Longrightarrow',[10233]],['looparrowleft',[8619]],['looparrowright',[8620]],['lopar',[10629]],['Lopf',[120131]],['lopf',[120157]],['loplus',[10797]],['lotimes',[10804]],['lowast',[8727]],['lowbar',[95]],['LowerLeftArrow',[8601]],['LowerRightArrow',[8600]],['loz',[9674]],['lozenge',[9674]],['lozf',[10731]],['lpar',[40]],['lparlt',[10643]],['lrarr',[8646]],['lrcorner',[8991]],['lrhar',[8651]],['lrhard',[10605]],['lrm',[8206]],['lrtri',[8895]],['lsaquo',[8249]],['lscr',[120001]],['Lscr',[8466]],['lsh',[8624]],['Lsh',[8624]],['lsim',[8818]],['lsime',[10893]],['lsimg',[10895]],['lsqb',[91]],['lsquo',[8216]],['lsquor',[8218]],['Lstrok',[321]],['lstrok',[322]],['ltcc',[10918]],['ltcir',[10873]],['lt',[60]],['LT',[60]],['Lt',[8810]],['ltdot',[8918]],['lthree',[8907]],['ltimes',[8905]],['ltlarr',[10614]],['ltquest',[10875]],['ltri',[9667]],['ltrie',[8884]],['ltrif',[9666]],['ltrPar',[10646]],['lurdshar',[10570]],['luruhar',[10598]],['lvertneqq',[8808,65024]],['lvnE',[8808,65024]],['macr',[175]],['male',[9794]],['malt',[10016]],['maltese',[10016]],['Map',[10501]],['map',[8614]],['mapsto',[8614]],['mapstodown',[8615]],['mapstoleft',[8612]],['mapstoup',[8613]],['marker',[9646]],['mcomma',[10793]],['Mcy',[1052]],['mcy',[1084]],['mdash',[8212]],['mDDot',[8762]],['measuredangle',[8737]],['MediumSpace',[8287]],['Mellintrf',[8499]],['Mfr',[120080]],['mfr',[120106]],['mho',[8487]],['micro',[181]],['midast',[42]],['midcir',[10992]],['mid',[8739]],['middot',[183]],['minusb',[8863]],['minus',[8722]],['minusd',[8760]],['minusdu',[10794]],['MinusPlus',[8723]],['mlcp',[10971]],['mldr',[8230]],['mnplus',[8723]],['models',[8871]],['Mopf',[120132]],['mopf',[120158]],['mp',[8723]],['mscr',[120002]],['Mscr',[8499]],['mstpos',[8766]],['Mu',[924]],['mu',[956]],['multimap',[8888]],['mumap',[8888]],['nabla',[8711]],['Nacute',[323]],['nacute',[324]],['nang',[8736,8402]],['nap',[8777]],['napE',[10864,824]],['napid',[8779,824]],['napos',[329]],['napprox',[8777]],['natural',[9838]],['naturals',[8469]],['natur',[9838]],['nbsp',[160]],['nbump',[8782,824]],['nbumpe',[8783,824]],['ncap',[10819]],['Ncaron',[327]],['ncaron',[328]],['Ncedil',[325]],['ncedil',[326]],['ncong',[8775]],['ncongdot',[10861,824]],['ncup',[10818]],['Ncy',[1053]],['ncy',[1085]],['ndash',[8211]],['nearhk',[10532]],['nearr',[8599]],['neArr',[8663]],['nearrow',[8599]],['ne',[8800]],['nedot',[8784,824]],['NegativeMediumSpace',[8203]],['NegativeThickSpace',[8203]],['NegativeThinSpace',[8203]],['NegativeVeryThinSpace',[8203]],['nequiv',[8802]],['nesear',[10536]],['nesim',[8770,824]],['NestedGreaterGreater',[8811]],['NestedLessLess',[8810]],['nexist',[8708]],['nexists',[8708]],['Nfr',[120081]],['nfr',[120107]],['ngE',[8807,824]],['nge',[8817]],['ngeq',[8817]],['ngeqq',[8807,824]],['ngeqslant',[10878,824]],['nges',[10878,824]],['nGg',[8921,824]],['ngsim',[8821]],['nGt',[8811,8402]],['ngt',[8815]],['ngtr',[8815]],['nGtv',[8811,824]],['nharr',[8622]],['nhArr',[8654]],['nhpar',[10994]],['ni',[8715]],['nis',[8956]],['nisd',[8954]],['niv',[8715]],['NJcy',[1034]],['njcy',[1114]],['nlarr',[8602]],['nlArr',[8653]],['nldr',[8229]],['nlE',[8806,824]],['nle',[8816]],['nleftarrow',[8602]],['nLeftarrow',[8653]],['nleftrightarrow',[8622]],['nLeftrightarrow',[8654]],['nleq',[8816]],['nleqq',[8806,824]],['nleqslant',[10877,824]],['nles',[10877,824]],['nless',[8814]],['nLl',[8920,824]],['nlsim',[8820]],['nLt',[8810,8402]],['nlt',[8814]],['nltri',[8938]],['nltrie',[8940]],['nLtv',[8810,824]],['nmid',[8740]],['NoBreak',[8288]],['NonBreakingSpace',[160]],['nopf',[120159]],['Nopf',[8469]],['Not',[10988]],['not',[172]],['NotCongruent',[8802]],['NotCupCap',[8813]],['NotDoubleVerticalBar',[8742]],['NotElement',[8713]],['NotEqual',[8800]],['NotEqualTilde',[8770,824]],['NotExists',[8708]],['NotGreater',[8815]],['NotGreaterEqual',[8817]],['NotGreaterFullEqual',[8807,824]],['NotGreaterGreater',[8811,824]],['NotGreaterLess',[8825]],['NotGreaterSlantEqual',[10878,824]],['NotGreaterTilde',[8821]],['NotHumpDownHump',[8782,824]],['NotHumpEqual',[8783,824]],['notin',[8713]],['notindot',[8949,824]],['notinE',[8953,824]],['notinva',[8713]],['notinvb',[8951]],['notinvc',[8950]],['NotLeftTriangleBar',[10703,824]],['NotLeftTriangle',[8938]],['NotLeftTriangleEqual',[8940]],['NotLess',[8814]],['NotLessEqual',[8816]],['NotLessGreater',[8824]],['NotLessLess',[8810,824]],['NotLessSlantEqual',[10877,824]],['NotLessTilde',[8820]],['NotNestedGreaterGreater',[10914,824]],['NotNestedLessLess',[10913,824]],['notni',[8716]],['notniva',[8716]],['notnivb',[8958]],['notnivc',[8957]],['NotPrecedes',[8832]],['NotPrecedesEqual',[10927,824]],['NotPrecedesSlantEqual',[8928]],['NotReverseElement',[8716]],['NotRightTriangleBar',[10704,824]],['NotRightTriangle',[8939]],['NotRightTriangleEqual',[8941]],['NotSquareSubset',[8847,824]],['NotSquareSubsetEqual',[8930]],['NotSquareSuperset',[8848,824]],['NotSquareSupersetEqual',[8931]],['NotSubset',[8834,8402]],['NotSubsetEqual',[8840]],['NotSucceeds',[8833]],['NotSucceedsEqual',[10928,824]],['NotSucceedsSlantEqual',[8929]],['NotSucceedsTilde',[8831,824]],['NotSuperset',[8835,8402]],['NotSupersetEqual',[8841]],['NotTilde',[8769]],['NotTildeEqual',[8772]],['NotTildeFullEqual',[8775]],['NotTildeTilde',[8777]],['NotVerticalBar',[8740]],['nparallel',[8742]],['npar',[8742]],['nparsl',[11005,8421]],['npart',[8706,824]],['npolint',[10772]],['npr',[8832]],['nprcue',[8928]],['nprec',[8832]],['npreceq',[10927,824]],['npre',[10927,824]],['nrarrc',[10547,824]],['nrarr',[8603]],['nrArr',[8655]],['nrarrw',[8605,824]],['nrightarrow',[8603]],['nRightarrow',[8655]],['nrtri',[8939]],['nrtrie',[8941]],['nsc',[8833]],['nsccue',[8929]],['nsce',[10928,824]],['Nscr',[119977]],['nscr',[120003]],['nshortmid',[8740]],['nshortparallel',[8742]],['nsim',[8769]],['nsime',[8772]],['nsimeq',[8772]],['nsmid',[8740]],['nspar',[8742]],['nsqsube',[8930]],['nsqsupe',[8931]],['nsub',[8836]],['nsubE',[10949,824]],['nsube',[8840]],['nsubset',[8834,8402]],['nsubseteq',[8840]],['nsubseteqq',[10949,824]],['nsucc',[8833]],['nsucceq',[10928,824]],['nsup',[8837]],['nsupE',[10950,824]],['nsupe',[8841]],['nsupset',[8835,8402]],['nsupseteq',[8841]],['nsupseteqq',[10950,824]],['ntgl',[8825]],['Ntilde',[209]],['ntilde',[241]],['ntlg',[8824]],['ntriangleleft',[8938]],['ntrianglelefteq',[8940]],['ntriangleright',[8939]],['ntrianglerighteq',[8941]],['Nu',[925]],['nu',[957]],['num',[35]],['numero',[8470]],['numsp',[8199]],['nvap',[8781,8402]],['nvdash',[8876]],['nvDash',[8877]],['nVdash',[8878]],['nVDash',[8879]],['nvge',[8805,8402]],['nvgt',[62,8402]],['nvHarr',[10500]],['nvinfin',[10718]],['nvlArr',[10498]],['nvle',[8804,8402]],['nvlt',[60,8402]],['nvltrie',[8884,8402]],['nvrArr',[10499]],['nvrtrie',[8885,8402]],['nvsim',[8764,8402]],['nwarhk',[10531]],['nwarr',[8598]],['nwArr',[8662]],['nwarrow',[8598]],['nwnear',[10535]],['Oacute',[211]],['oacute',[243]],['oast',[8859]],['Ocirc',[212]],['ocirc',[244]],['ocir',[8858]],['Ocy',[1054]],['ocy',[1086]],['odash',[8861]],['Odblac',[336]],['odblac',[337]],['odiv',[10808]],['odot',[8857]],['odsold',[10684]],['OElig',[338]],['oelig',[339]],['ofcir',[10687]],['Ofr',[120082]],['ofr',[120108]],['ogon',[731]],['Ograve',[210]],['ograve',[242]],['ogt',[10689]],['ohbar',[10677]],['ohm',[937]],['oint',[8750]],['olarr',[8634]],['olcir',[10686]],['olcross',[10683]],['oline',[8254]],['olt',[10688]],['Omacr',[332]],['omacr',[333]],['Omega',[937]],['omega',[969]],['Omicron',[927]],['omicron',[959]],['omid',[10678]],['ominus',[8854]],['Oopf',[120134]],['oopf',[120160]],['opar',[10679]],['OpenCurlyDoubleQuote',[8220]],['OpenCurlyQuote',[8216]],['operp',[10681]],['oplus',[8853]],['orarr',[8635]],['Or',[10836]],['or',[8744]],['ord',[10845]],['order',[8500]],['orderof',[8500]],['ordf',[170]],['ordm',[186]],['origof',[8886]],['oror',[10838]],['orslope',[10839]],['orv',[10843]],['oS',[9416]],['Oscr',[119978]],['oscr',[8500]],['Oslash',[216]],['oslash',[248]],['osol',[8856]],['Otilde',[213]],['otilde',[245]],['otimesas',[10806]],['Otimes',[10807]],['otimes',[8855]],['Ouml',[214]],['ouml',[246]],['ovbar',[9021]],['OverBar',[8254]],['OverBrace',[9182]],['OverBracket',[9140]],['OverParenthesis',[9180]],['para',[182]],['parallel',[8741]],['par',[8741]],['parsim',[10995]],['parsl',[11005]],['part',[8706]],['PartialD',[8706]],['Pcy',[1055]],['pcy',[1087]],['percnt',[37]],['period',[46]],['permil',[8240]],['perp',[8869]],['pertenk',[8241]],['Pfr',[120083]],['pfr',[120109]],['Phi',[934]],['phi',[966]],['phiv',[981]],['phmmat',[8499]],['phone',[9742]],['Pi',[928]],['pi',[960]],['pitchfork',[8916]],['piv',[982]],['planck',[8463]],['planckh',[8462]],['plankv',[8463]],['plusacir',[10787]],['plusb',[8862]],['pluscir',[10786]],['plus',[43]],['plusdo',[8724]],['plusdu',[10789]],['pluse',[10866]],['PlusMinus',[177]],['plusmn',[177]],['plussim',[10790]],['plustwo',[10791]],['pm',[177]],['Poincareplane',[8460]],['pointint',[10773]],['popf',[120161]],['Popf',[8473]],['pound',[163]],['prap',[10935]],['Pr',[10939]],['pr',[8826]],['prcue',[8828]],['precapprox',[10935]],['prec',[8826]],['preccurlyeq',[8828]],['Precedes',[8826]],['PrecedesEqual',[10927]],['PrecedesSlantEqual',[8828]],['PrecedesTilde',[8830]],['preceq',[10927]],['precnapprox',[10937]],['precneqq',[10933]],['precnsim',[8936]],['pre',[10927]],['prE',[10931]],['precsim',[8830]],['prime',[8242]],['Prime',[8243]],['primes',[8473]],['prnap',[10937]],['prnE',[10933]],['prnsim',[8936]],['prod',[8719]],['Product',[8719]],['profalar',[9006]],['profline',[8978]],['profsurf',[8979]],['prop',[8733]],['Proportional',[8733]],['Proportion',[8759]],['propto',[8733]],['prsim',[8830]],['prurel',[8880]],['Pscr',[119979]],['pscr',[120005]],['Psi',[936]],['psi',[968]],['puncsp',[8200]],['Qfr',[120084]],['qfr',[120110]],['qint',[10764]],['qopf',[120162]],['Qopf',[8474]],['qprime',[8279]],['Qscr',[119980]],['qscr',[120006]],['quaternions',[8461]],['quatint',[10774]],['quest',[63]],['questeq',[8799]],['quot',[34]],['QUOT',[34]],['rAarr',[8667]],['race',[8765,817]],['Racute',[340]],['racute',[341]],['radic',[8730]],['raemptyv',[10675]],['rang',[10217]],['Rang',[10219]],['rangd',[10642]],['range',[10661]],['rangle',[10217]],['raquo',[187]],['rarrap',[10613]],['rarrb',[8677]],['rarrbfs',[10528]],['rarrc',[10547]],['rarr',[8594]],['Rarr',[8608]],['rArr',[8658]],['rarrfs',[10526]],['rarrhk',[8618]],['rarrlp',[8620]],['rarrpl',[10565]],['rarrsim',[10612]],['Rarrtl',[10518]],['rarrtl',[8611]],['rarrw',[8605]],['ratail',[10522]],['rAtail',[10524]],['ratio',[8758]],['rationals',[8474]],['rbarr',[10509]],['rBarr',[10511]],['RBarr',[10512]],['rbbrk',[10099]],['rbrace',[125]],['rbrack',[93]],['rbrke',[10636]],['rbrksld',[10638]],['rbrkslu',[10640]],['Rcaron',[344]],['rcaron',[345]],['Rcedil',[342]],['rcedil',[343]],['rceil',[8969]],['rcub',[125]],['Rcy',[1056]],['rcy',[1088]],['rdca',[10551]],['rdldhar',[10601]],['rdquo',[8221]],['rdquor',[8221]],['CloseCurlyDoubleQuote',[8221]],['rdsh',[8627]],['real',[8476]],['realine',[8475]],['realpart',[8476]],['reals',[8477]],['Re',[8476]],['rect',[9645]],['reg',[174]],['REG',[174]],['ReverseElement',[8715]],['ReverseEquilibrium',[8651]],['ReverseUpEquilibrium',[10607]],['rfisht',[10621]],['rfloor',[8971]],['rfr',[120111]],['Rfr',[8476]],['rHar',[10596]],['rhard',[8641]],['rharu',[8640]],['rharul',[10604]],['Rho',[929]],['rho',[961]],['rhov',[1009]],['RightAngleBracket',[10217]],['RightArrowBar',[8677]],['rightarrow',[8594]],['RightArrow',[8594]],['Rightarrow',[8658]],['RightArrowLeftArrow',[8644]],['rightarrowtail',[8611]],['RightCeiling',[8969]],['RightDoubleBracket',[10215]],['RightDownTeeVector',[10589]],['RightDownVectorBar',[10581]],['RightDownVector',[8642]],['RightFloor',[8971]],['rightharpoondown',[8641]],['rightharpoonup',[8640]],['rightleftarrows',[8644]],['rightleftharpoons',[8652]],['rightrightarrows',[8649]],['rightsquigarrow',[8605]],['RightTeeArrow',[8614]],['RightTee',[8866]],['RightTeeVector',[10587]],['rightthreetimes',[8908]],['RightTriangleBar',[10704]],['RightTriangle',[8883]],['RightTriangleEqual',[8885]],['RightUpDownVector',[10575]],['RightUpTeeVector',[10588]],['RightUpVectorBar',[10580]],['RightUpVector',[8638]],['RightVectorBar',[10579]],['RightVector',[8640]],['ring',[730]],['risingdotseq',[8787]],['rlarr',[8644]],['rlhar',[8652]],['rlm',[8207]],['rmoustache',[9137]],['rmoust',[9137]],['rnmid',[10990]],['roang',[10221]],['roarr',[8702]],['robrk',[10215]],['ropar',[10630]],['ropf',[120163]],['Ropf',[8477]],['roplus',[10798]],['rotimes',[10805]],['RoundImplies',[10608]],['rpar',[41]],['rpargt',[10644]],['rppolint',[10770]],['rrarr',[8649]],['Rrightarrow',[8667]],['rsaquo',[8250]],['rscr',[120007]],['Rscr',[8475]],['rsh',[8625]],['Rsh',[8625]],['rsqb',[93]],['rsquo',[8217]],['rsquor',[8217]],['CloseCurlyQuote',[8217]],['rthree',[8908]],['rtimes',[8906]],['rtri',[9657]],['rtrie',[8885]],['rtrif',[9656]],['rtriltri',[10702]],['RuleDelayed',[10740]],['ruluhar',[10600]],['rx',[8478]],['Sacute',[346]],['sacute',[347]],['sbquo',[8218]],['scap',[10936]],['Scaron',[352]],['scaron',[353]],['Sc',[10940]],['sc',[8827]],['sccue',[8829]],['sce',[10928]],['scE',[10932]],['Scedil',[350]],['scedil',[351]],['Scirc',[348]],['scirc',[349]],['scnap',[10938]],['scnE',[10934]],['scnsim',[8937]],['scpolint',[10771]],['scsim',[8831]],['Scy',[1057]],['scy',[1089]],['sdotb',[8865]],['sdot',[8901]],['sdote',[10854]],['searhk',[10533]],['searr',[8600]],['seArr',[8664]],['searrow',[8600]],['sect',[167]],['semi',[59]],['seswar',[10537]],['setminus',[8726]],['setmn',[8726]],['sext',[10038]],['Sfr',[120086]],['sfr',[120112]],['sfrown',[8994]],['sharp',[9839]],['SHCHcy',[1065]],['shchcy',[1097]],['SHcy',[1064]],['shcy',[1096]],['ShortDownArrow',[8595]],['ShortLeftArrow',[8592]],['shortmid',[8739]],['shortparallel',[8741]],['ShortRightArrow',[8594]],['ShortUpArrow',[8593]],['shy',[173]],['Sigma',[931]],['sigma',[963]],['sigmaf',[962]],['sigmav',[962]],['sim',[8764]],['simdot',[10858]],['sime',[8771]],['simeq',[8771]],['simg',[10910]],['simgE',[10912]],['siml',[10909]],['simlE',[10911]],['simne',[8774]],['simplus',[10788]],['simrarr',[10610]],['slarr',[8592]],['SmallCircle',[8728]],['smallsetminus',[8726]],['smashp',[10803]],['smeparsl',[10724]],['smid',[8739]],['smile',[8995]],['smt',[10922]],['smte',[10924]],['smtes',[10924,65024]],['SOFTcy',[1068]],['softcy',[1100]],['solbar',[9023]],['solb',[10692]],['sol',[47]],['Sopf',[120138]],['sopf',[120164]],['spades',[9824]],['spadesuit',[9824]],['spar',[8741]],['sqcap',[8851]],['sqcaps',[8851,65024]],['sqcup',[8852]],['sqcups',[8852,65024]],['Sqrt',[8730]],['sqsub',[8847]],['sqsube',[8849]],['sqsubset',[8847]],['sqsubseteq',[8849]],['sqsup',[8848]],['sqsupe',[8850]],['sqsupset',[8848]],['sqsupseteq',[8850]],['square',[9633]],['Square',[9633]],['SquareIntersection',[8851]],['SquareSubset',[8847]],['SquareSubsetEqual',[8849]],['SquareSuperset',[8848]],['SquareSupersetEqual',[8850]],['SquareUnion',[8852]],['squarf',[9642]],['squ',[9633]],['squf',[9642]],['srarr',[8594]],['Sscr',[119982]],['sscr',[120008]],['ssetmn',[8726]],['ssmile',[8995]],['sstarf',[8902]],['Star',[8902]],['star',[9734]],['starf',[9733]],['straightepsilon',[1013]],['straightphi',[981]],['strns',[175]],['sub',[8834]],['Sub',[8912]],['subdot',[10941]],['subE',[10949]],['sube',[8838]],['subedot',[10947]],['submult',[10945]],['subnE',[10955]],['subne',[8842]],['subplus',[10943]],['subrarr',[10617]],['subset',[8834]],['Subset',[8912]],['subseteq',[8838]],['subseteqq',[10949]],['SubsetEqual',[8838]],['subsetneq',[8842]],['subsetneqq',[10955]],['subsim',[10951]],['subsub',[10965]],['subsup',[10963]],['succapprox',[10936]],['succ',[8827]],['succcurlyeq',[8829]],['Succeeds',[8827]],['SucceedsEqual',[10928]],['SucceedsSlantEqual',[8829]],['SucceedsTilde',[8831]],['succeq',[10928]],['succnapprox',[10938]],['succneqq',[10934]],['succnsim',[8937]],['succsim',[8831]],['SuchThat',[8715]],['sum',[8721]],['Sum',[8721]],['sung',[9834]],['sup1',[185]],['sup2',[178]],['sup3',[179]],['sup',[8835]],['Sup',[8913]],['supdot',[10942]],['supdsub',[10968]],['supE',[10950]],['supe',[8839]],['supedot',[10948]],['Superset',[8835]],['SupersetEqual',[8839]],['suphsol',[10185]],['suphsub',[10967]],['suplarr',[10619]],['supmult',[10946]],['supnE',[10956]],['supne',[8843]],['supplus',[10944]],['supset',[8835]],['Supset',[8913]],['supseteq',[8839]],['supseteqq',[10950]],['supsetneq',[8843]],['supsetneqq',[10956]],['supsim',[10952]],['supsub',[10964]],['supsup',[10966]],['swarhk',[10534]],['swarr',[8601]],['swArr',[8665]],['swarrow',[8601]],['swnwar',[10538]],['szlig',[223]],['Tab',[9]],['target',[8982]],['Tau',[932]],['tau',[964]],['tbrk',[9140]],['Tcaron',[356]],['tcaron',[357]],['Tcedil',[354]],['tcedil',[355]],['Tcy',[1058]],['tcy',[1090]],['tdot',[8411]],['telrec',[8981]],['Tfr',[120087]],['tfr',[120113]],['there4',[8756]],['therefore',[8756]],['Therefore',[8756]],['Theta',[920]],['theta',[952]],['thetasym',[977]],['thetav',[977]],['thickapprox',[8776]],['thicksim',[8764]],['ThickSpace',[8287,8202]],['ThinSpace',[8201]],['thinsp',[8201]],['thkap',[8776]],['thksim',[8764]],['THORN',[222]],['thorn',[254]],['tilde',[732]],['Tilde',[8764]],['TildeEqual',[8771]],['TildeFullEqual',[8773]],['TildeTilde',[8776]],['timesbar',[10801]],['timesb',[8864]],['times',[215]],['timesd',[10800]],['tint',[8749]],['toea',[10536]],['topbot',[9014]],['topcir',[10993]],['top',[8868]],['Topf',[120139]],['topf',[120165]],['topfork',[10970]],['tosa',[10537]],['tprime',[8244]],['trade',[8482]],['TRADE',[8482]],['triangle',[9653]],['triangledown',[9663]],['triangleleft',[9667]],['trianglelefteq',[8884]],['triangleq',[8796]],['triangleright',[9657]],['trianglerighteq',[8885]],['tridot',[9708]],['trie',[8796]],['triminus',[10810]],['TripleDot',[8411]],['triplus',[10809]],['trisb',[10701]],['tritime',[10811]],['trpezium',[9186]],['Tscr',[119983]],['tscr',[120009]],['TScy',[1062]],['tscy',[1094]],['TSHcy',[1035]],['tshcy',[1115]],['Tstrok',[358]],['tstrok',[359]],['twixt',[8812]],['twoheadleftarrow',[8606]],['twoheadrightarrow',[8608]],['Uacute',[218]],['uacute',[250]],['uarr',[8593]],['Uarr',[8607]],['uArr',[8657]],['Uarrocir',[10569]],['Ubrcy',[1038]],['ubrcy',[1118]],['Ubreve',[364]],['ubreve',[365]],['Ucirc',[219]],['ucirc',[251]],['Ucy',[1059]],['ucy',[1091]],['udarr',[8645]],['Udblac',[368]],['udblac',[369]],['udhar',[10606]],['ufisht',[10622]],['Ufr',[120088]],['ufr',[120114]],['Ugrave',[217]],['ugrave',[249]],['uHar',[10595]],['uharl',[8639]],['uharr',[8638]],['uhblk',[9600]],['ulcorn',[8988]],['ulcorner',[8988]],['ulcrop',[8975]],['ultri',[9720]],['Umacr',[362]],['umacr',[363]],['uml',[168]],['UnderBar',[95]],['UnderBrace',[9183]],['UnderBracket',[9141]],['UnderParenthesis',[9181]],['Union',[8899]],['UnionPlus',[8846]],['Uogon',[370]],['uogon',[371]],['Uopf',[120140]],['uopf',[120166]],['UpArrowBar',[10514]],['uparrow',[8593]],['UpArrow',[8593]],['Uparrow',[8657]],['UpArrowDownArrow',[8645]],['updownarrow',[8597]],['UpDownArrow',[8597]],['Updownarrow',[8661]],['UpEquilibrium',[10606]],['upharpoonleft',[8639]],['upharpoonright',[8638]],['uplus',[8846]],['UpperLeftArrow',[8598]],['UpperRightArrow',[8599]],['upsi',[965]],['Upsi',[978]],['upsih',[978]],['Upsilon',[933]],['upsilon',[965]],['UpTeeArrow',[8613]],['UpTee',[8869]],['upuparrows',[8648]],['urcorn',[8989]],['urcorner',[8989]],['urcrop',[8974]],['Uring',[366]],['uring',[367]],['urtri',[9721]],['Uscr',[119984]],['uscr',[120010]],['utdot',[8944]],['Utilde',[360]],['utilde',[361]],['utri',[9653]],['utrif',[9652]],['uuarr',[8648]],['Uuml',[220]],['uuml',[252]],['uwangle',[10663]],['vangrt',[10652]],['varepsilon',[1013]],['varkappa',[1008]],['varnothing',[8709]],['varphi',[981]],['varpi',[982]],['varpropto',[8733]],['varr',[8597]],['vArr',[8661]],['varrho',[1009]],['varsigma',[962]],['varsubsetneq',[8842,65024]],['varsubsetneqq',[10955,65024]],['varsupsetneq',[8843,65024]],['varsupsetneqq',[10956,65024]],['vartheta',[977]],['vartriangleleft',[8882]],['vartriangleright',[8883]],['vBar',[10984]],['Vbar',[10987]],['vBarv',[10985]],['Vcy',[1042]],['vcy',[1074]],['vdash',[8866]],['vDash',[8872]],['Vdash',[8873]],['VDash',[8875]],['Vdashl',[10982]],['veebar',[8891]],['vee',[8744]],['Vee',[8897]],['veeeq',[8794]],['vellip',[8942]],['verbar',[124]],['Verbar',[8214]],['vert',[124]],['Vert',[8214]],['VerticalBar',[8739]],['VerticalLine',[124]],['VerticalSeparator',[10072]],['VerticalTilde',[8768]],['VeryThinSpace',[8202]],['Vfr',[120089]],['vfr',[120115]],['vltri',[8882]],['vnsub',[8834,8402]],['vnsup',[8835,8402]],['Vopf',[120141]],['vopf',[120167]],['vprop',[8733]],['vrtri',[8883]],['Vscr',[119985]],['vscr',[120011]],['vsubnE',[10955,65024]],['vsubne',[8842,65024]],['vsupnE',[10956,65024]],['vsupne',[8843,65024]],['Vvdash',[8874]],['vzigzag',[10650]],['Wcirc',[372]],['wcirc',[373]],['wedbar',[10847]],['wedge',[8743]],['Wedge',[8896]],['wedgeq',[8793]],['weierp',[8472]],['Wfr',[120090]],['wfr',[120116]],['Wopf',[120142]],['wopf',[120168]],['wp',[8472]],['wr',[8768]],['wreath',[8768]],['Wscr',[119986]],['wscr',[120012]],['xcap',[8898]],['xcirc',[9711]],['xcup',[8899]],['xdtri',[9661]],['Xfr',[120091]],['xfr',[120117]],['xharr',[10231]],['xhArr',[10234]],['Xi',[926]],['xi',[958]],['xlarr',[10229]],['xlArr',[10232]],['xmap',[10236]],['xnis',[8955]],['xodot',[10752]],['Xopf',[120143]],['xopf',[120169]],['xoplus',[10753]],['xotime',[10754]],['xrarr',[10230]],['xrArr',[10233]],['Xscr',[119987]],['xscr',[120013]],['xsqcup',[10758]],['xuplus',[10756]],['xutri',[9651]],['xvee',[8897]],['xwedge',[8896]],['Yacute',[221]],['yacute',[253]],['YAcy',[1071]],['yacy',[1103]],['Ycirc',[374]],['ycirc',[375]],['Ycy',[1067]],['ycy',[1099]],['yen',[165]],['Yfr',[120092]],['yfr',[120118]],['YIcy',[1031]],['yicy',[1111]],['Yopf',[120144]],['yopf',[120170]],['Yscr',[119988]],['yscr',[120014]],['YUcy',[1070]],['yucy',[1102]],['yuml',[255]],['Yuml',[376]],['Zacute',[377]],['zacute',[378]],['Zcaron',[381]],['zcaron',[382]],['Zcy',[1047]],['zcy',[1079]],['Zdot',[379]],['zdot',[380]],['zeetrf',[8488]],['ZeroWidthSpace',[8203]],['Zeta',[918]],['zeta',[950]],['zfr',[120119]],['Zfr',[8488]],['ZHcy',[1046]],['zhcy',[1078]],['zigrarr',[8669]],['zopf',[120171]],['Zopf',[8484]],['Zscr',[119989]],['zscr',[120015]],['zwj',[8205]],['zwnj',[8204]]];var alphaIndex={};var charIndex={};createIndexes(alphaIndex,charIndex);/**
 * @constructor
 */function Html5Entities(){}/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.prototype.decode=function(str){if(!str||!str.length){return'';}return str.replace(/&(#?[\w\d]+);?/g,function(s,entity){var chr;if(entity.charAt(0)==="#"){var code=entity.charAt(1)==='x'?parseInt(entity.substr(2).toLowerCase(),16):parseInt(entity.substr(1));if(!(isNaN(code)||code<-32768||code>65535)){chr=String.fromCharCode(code);}}else{chr=alphaIndex[entity];}return chr||s;});};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.decode=function(str){return new Html5Entities().decode(str);};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.prototype.encode=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var charInfo=charIndex[str.charCodeAt(i)];if(charInfo){var alpha=charInfo[str.charCodeAt(i+1)];if(alpha){i++;}else{alpha=charInfo[''];}if(alpha){result+="&"+alpha+";";i++;continue;}}result+=str.charAt(i);i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.encode=function(str){return new Html5Entities().encode(str);};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.prototype.encodeNonUTF=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var c=str.charCodeAt(i);var charInfo=charIndex[c];if(charInfo){var alpha=charInfo[str.charCodeAt(i+1)];if(alpha){i++;}else{alpha=charInfo[''];}if(alpha){result+="&"+alpha+";";i++;continue;}}if(c<32||c>126){result+='&#'+c+';';}else{result+=str.charAt(i);}i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.encodeNonUTF=function(str){return new Html5Entities().encodeNonUTF(str);};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.prototype.encodeNonASCII=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var c=str.charCodeAt(i);if(c<=255){result+=str[i++];continue;}result+='&#'+c+';';i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */Html5Entities.encodeNonASCII=function(str){return new Html5Entities().encodeNonASCII(str);};/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */function createIndexes(alphaIndex,charIndex){var i=ENTITIES.length;var _results=[];while(i--){var e=ENTITIES[i];var alpha=e[0];var chars=e[1];var chr=chars[0];var addChar=chr<32||chr>126||chr===62||chr===60||chr===38||chr===34||chr===39;var charInfo;if(addChar){charInfo=charIndex[chr]=charIndex[chr]||{};}if(chars[1]){var chr2=chars[1];alphaIndex[alpha]=String.fromCharCode(chr)+String.fromCharCode(chr2);_results.push(addChar&&(charInfo[chr2]=alpha));}else{alphaIndex[alpha]=String.fromCharCode(chr);_results.push(addChar&&(charInfo['']=alpha));}}}module.exports=Html5Entities;},{}],11:[function(require,module,exports){var ALPHA_INDEX={'&lt':'<','&gt':'>','&quot':'"','&apos':'\'','&amp':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':'\'','&amp;':'&'};var CHAR_INDEX={60:'lt',62:'gt',34:'quot',39:'apos',38:'amp'};var CHAR_S_INDEX={'<':'&lt;','>':'&gt;','"':'&quot;','\'':'&apos;','&':'&amp;'};/**
 * @constructor
 */function XmlEntities(){}/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.prototype.encode=function(str){if(!str||!str.length){return'';}return str.replace(/<|>|"|'|&/g,function(s){return CHAR_S_INDEX[s];});};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.encode=function(str){return new XmlEntities().encode(str);};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.prototype.decode=function(str){if(!str||!str.length){return'';}return str.replace(/&#?[0-9a-zA-Z]+;?/g,function(s){if(s.charAt(1)==='#'){var code=s.charAt(2).toLowerCase()==='x'?parseInt(s.substr(3),16):parseInt(s.substr(2));if(isNaN(code)||code<-32768||code>65535){return'';}return String.fromCharCode(code);}return ALPHA_INDEX[s]||s;});};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.decode=function(str){return new XmlEntities().decode(str);};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.prototype.encodeNonUTF=function(str){if(!str||!str.length){return'';}var strLength=str.length;var result='';var i=0;while(i<strLength){var c=str.charCodeAt(i);var alpha=CHAR_INDEX[c];if(alpha){result+="&"+alpha+";";i++;continue;}if(c<32||c>126){result+='&#'+c+';';}else{result+=str.charAt(i);}i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.encodeNonUTF=function(str){return new XmlEntities().encodeNonUTF(str);};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.prototype.encodeNonASCII=function(str){if(!str||!str.length){return'';}var strLenght=str.length;var result='';var i=0;while(i<strLenght){var c=str.charCodeAt(i);if(c<=255){result+=str[i++];continue;}result+='&#'+c+';';i++;}return result;};/**
 * @param {String} str
 * @returns {String}
 */XmlEntities.encodeNonASCII=function(str){return new XmlEntities().encodeNonASCII(str);};module.exports=XmlEntities;},{}],12:[function(require,module,exports){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};var stream_1=require("stream");var sax_1=__importDefault(require("sax"));var parse_time_1=require("./parse-time");module.exports=/*#__PURE__*/function(_stream_1$Writable){_inherits(DashMPDParser,_stream_1$Writable);function DashMPDParser(targetID){var _this4;_classCallCheck2(this,DashMPDParser);_this4=_possibleConstructorReturn(this,_getPrototypeOf(DashMPDParser).call(this));_this4._parser=sax_1.default.createStream(false,{lowercase:true});_this4._parser.on('error',_this4.emit.bind(_assertThisInitialized(_this4),'error'));var lastTag;var currtime=0;var seq=0;var segmentTemplate;var timescale,offset,duration,baseURL;var timeline=[];var getSegments=false;var isStatic;var treeLevel;var periodStart;var tmpl=function tmpl(str){var context={RepresentationID:targetID,Number:seq,Time:currtime};return str.replace(/\$(\w+)\$/g,function(m,p1){return context[p1]+'';});};_this4._parser.on('opentag',function(node){switch(node.name){case'mpd':currtime=new Date(node.attributes.availabilitystarttime).getTime();isStatic=node.attributes.type!=='dynamic';break;case'period':// Reset everything on <Period> tag.
seq=0;timescale=1000;duration=0;offset=0;baseURL=[];treeLevel=0;periodStart=parse_time_1.durationStr(node.attributes.start)||0;break;case'segmentlist':seq=parseInt(node.attributes.startnumber)||seq;timescale=parseInt(node.attributes.timescale)||timescale;duration=parseInt(node.attributes.duration)||duration;offset=parseInt(node.attributes.presentationtimeoffset)||offset;break;case'segmenttemplate':segmentTemplate=node.attributes;seq=parseInt(node.attributes.startnumber)||seq;timescale=parseInt(node.attributes.timescale)||timescale;break;case'segmenttimeline':case'baseurl':lastTag=node.name;break;case's':timeline.push([parseInt(node.attributes.d),parseInt(node.attributes.r)]);break;case'adaptationset':case'representation':treeLevel++;if(targetID==null){targetID=node.attributes.id;}getSegments=node.attributes.id===targetID+'';if(getSegments){if(periodStart){currtime+=periodStart;}if(offset){currtime-=offset/timescale*1000;}_this4.emit('starttime',currtime);}if(getSegments&&segmentTemplate&&timeline.length){if(segmentTemplate.initialization){_this4.emit('item',{url:baseURL.filter(function(s){return!!s;}).join('')+tmpl(segmentTemplate.initialization),seq:seq-1,duration:0});}var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=timeline[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var _step7$value=_slicedToArray(_step7.value,2),_duration=_step7$value[0],repeat=_step7$value[1];_duration=_duration/timescale*1000;repeat=repeat||1;for(var i=0;i<repeat;i++){_this4.emit('item',{url:baseURL.filter(function(s){return!!s;}).join('')+tmpl(segmentTemplate.media),seq:seq++,duration:_duration});currtime+=_duration;}}}catch(err){_didIteratorError7=true;_iteratorError7=err;}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return!=null){_iterator7.return();}}finally{if(_didIteratorError7){throw _iteratorError7;}}}}break;case'initialization':if(getSegments){_this4.emit('item',{url:baseURL.filter(function(s){return!!s;}).join('')+node.attributes.sourceurl,seq:seq++,duration:0});}break;case'segmenturl':if(getSegments){var tl=timeline.shift();var segmentDuration=(tl&&tl[0]||duration)/timescale*1000;_this4.emit('item',{url:baseURL.filter(function(s){return!!s;}).join('')+node.attributes.media,seq:seq++,duration:segmentDuration});currtime+=segmentDuration;}break;}});var onEnd=function onEnd(){if(isStatic){_this4.emit('endlist');}if(!getSegments){_this4.emit('error',Error("Representation '".concat(targetID,"' not found")));}_this4.emit('end');};_this4._parser.on('closetag',function(tagName){switch(tagName){case'adaptationset':case'representation':treeLevel--;break;case'segmentlist':if(getSegments){_this4.emit('endearly');onEnd();_this4._parser.removeAllListeners();}break;}});_this4._parser.on('text',function(text){if(lastTag==='baseurl'){baseURL[treeLevel]=text;lastTag=null;}});_this4.on('finish',onEnd);return _this4;}_createClass(DashMPDParser,[{key:"_write",value:function _write(chunk,encoding,callback){this._parser.write(chunk,encoding);callback();}}]);return DashMPDParser;}(stream_1.Writable);},{"./parse-time":15,"sax":18,"stream":52}],13:[function(require,module,exports){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};var stream_1=require("stream");var url_1=require("url");var miniget_1=__importDefault(require("miniget"));var m3u8_parser_1=__importDefault(require("./m3u8-parser"));var dash_mpd_parser_1=__importDefault(require("./dash-mpd-parser"));var queue_1=__importDefault(require("./queue"));var parse_time_1=require("./parse-time");var supportedParsers={'m3u8':m3u8_parser_1.default,'dash-mpd':dash_mpd_parser_1.default};var m3u8stream=function m3u8stream(playlistURL){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var stream=new stream_1.PassThrough();var chunkReadahead=options.chunkReadahead||3;var liveBuffer=options.liveBuffer||20000;// 20 seconds
var requestOptions=options.requestOptions;var Parser=supportedParsers[options.parser||(/\.mpd$/.test(playlistURL)?'dash-mpd':'m3u8')];if(!Parser){throw TypeError("parser '".concat(options.parser,"' not supported"));}var begin=0;if(typeof options.begin!=='undefined'){begin=typeof options.begin==='string'?parse_time_1.humanStr(options.begin):Math.max(options.begin-liveBuffer,0);}var liveBegin=Date.now()-liveBuffer;var currSegment;var streamQueue=new queue_1.default(function(req,callback){currSegment=req;// Count the size manually, since the `content-length` header is not
// always there.
var size=0;req.on('data',function(chunk){return size+=chunk.length;});req.pipe(stream,{end:false});req.on('end',function(){return callback(undefined,size);});},{concurrency:1});var segmentNumber=0;var downloaded=0;var requestQueue=new queue_1.default(function(segment,callback){var req=miniget_1.default(url_1.resolve(playlistURL,segment.url),requestOptions);req.on('error',callback);streamQueue.push(req,function(err,size){downloaded+=+size;stream.emit('progress',{num:++segmentNumber,size:size,duration:segment.duration,url:segment.url},requestQueue.total,downloaded);callback();});},{concurrency:chunkReadahead});var onError=function onError(err){if(ended){return;}stream.emit('error',err);// Stop on any error.
stream.end();};// When to look for items again.
var refreshThreshold;var minRefreshTime;var refreshTimeout;var fetchingPlaylist=false;var ended=false;var isStatic=false;var lastRefresh;var onQueuedEnd=function onQueuedEnd(err){currSegment=null;if(err){onError(err);}else if(!fetchingPlaylist&&!ended&&!isStatic&&requestQueue.tasks.length+requestQueue.active===refreshThreshold){var ms=Math.max(0,minRefreshTime-(Date.now()-lastRefresh));refreshTimeout=setTimeout(refreshPlaylist,ms);}else if((ended||isStatic)&&!requestQueue.tasks.length&&!requestQueue.active){stream.end();}};var currPlaylist;var lastSeq;var starttime=0;var refreshPlaylist=function refreshPlaylist(){fetchingPlaylist=true;lastRefresh=Date.now();currPlaylist=miniget_1.default(playlistURL,requestOptions);currPlaylist.on('error',onError);var parser=currPlaylist.pipe(new Parser(options.id));parser.on('starttime',function(a){if(starttime){return;}starttime=a;if(typeof options.begin==='string'&&begin>=0){begin+=starttime;}});parser.on('endlist',function(){isStatic=true;});parser.on('endearly',currPlaylist.unpipe.bind(currPlaylist,parser));var addedItems=[];var liveAddedItems=[];var addItem=function addItem(item,isLive){if(item.seq<=lastSeq){return;}lastSeq=item.seq;begin=item.time;requestQueue.push(item,onQueuedEnd);addedItems.push(item);if(isLive){liveAddedItems.push(item);}};var tailedItems=[],tailedItemsDuration=0;parser.on('item',function(item){var timedItem=Object.assign({time:starttime},item);var isLive=liveBegin<=timedItem.time;if(begin<=timedItem.time){addItem(timedItem,isLive);}else{tailedItems.push(timedItem);tailedItemsDuration+=timedItem.duration;// Only keep the last `liveBuffer` of items.
while(tailedItems.length>1&&tailedItemsDuration-tailedItems[0].duration>liveBuffer){tailedItemsDuration-=tailedItems.shift().duration;}}starttime+=timedItem.duration;});parser.on('end',function(){currPlaylist=null;// If we are too ahead of the stream, make sure to get the
// latest available items with a small buffer.
if(!addedItems.length&&tailedItems.length){tailedItems.forEach(function(item){addItem(item,true);});}// Refresh the playlist when remaining segments get low.
refreshThreshold=Math.max(1,Math.ceil(addedItems.length*0.01));// Throttle refreshing the playlist by looking at the duration
// of live items added on this refresh.
minRefreshTime=addedItems.reduce(function(total,item){return item.duration+total;},0);fetchingPlaylist=false;});};refreshPlaylist();stream.end=function(){ended=true;streamQueue.die();requestQueue.die();clearTimeout(refreshTimeout);if(currPlaylist){currPlaylist.unpipe();currPlaylist.abort();}if(currSegment){currSegment.unpipe();currSegment.abort();}stream_1.PassThrough.prototype.end.call(stream,null);};return stream;};module.exports=m3u8stream;},{"./dash-mpd-parser":12,"./m3u8-parser":14,"./parse-time":15,"./queue":16,"miniget":17,"stream":52,"url":74}],14:[function(require,module,exports){"use strict";var stream_1=require("stream");module.exports=/*#__PURE__*/function(_stream_1$Writable2){_inherits(m3u8Parser,_stream_1$Writable2);function m3u8Parser(){var _this5;_classCallCheck2(this,m3u8Parser);_this5=_possibleConstructorReturn(this,_getPrototypeOf(m3u8Parser).call(this));_this5._lastLine='';_this5._seq=0;_this5._nextItemDuration=null;_this5.on('finish',function(){_this5._parseLine(_this5._lastLine);_this5.emit('end');});return _this5;}_createClass(m3u8Parser,[{key:"_parseLine",value:function _parseLine(line){var match=line.match(/^#(EXT[A-Z0-9-]+)(?::(.*))?/);if(match){// This is a tag.
var tag=match[1];var value=match[2]||'';switch(tag){case'EXT-X-PROGRAM-DATE-TIME':this.emit('starttime',new Date(value).getTime());break;case'EXT-X-MEDIA-SEQUENCE':this._seq=parseInt(value);break;case'EXTINF':this._nextItemDuration=Math.round(parseFloat(value.split(',')[0])*1000);break;case'EXT-X-ENDLIST':this.emit('endlist');break;}}else if(!/^#/.test(line)&&line.trim()){// This is a segment
this.emit('item',{url:line.trim(),seq:this._seq++,duration:this._nextItemDuration});}}},{key:"_write",value:function _write(chunk,encoding,callback){var _this6=this;var lines=chunk.toString('utf8').split('\n');if(this._lastLine){lines[0]=this._lastLine+lines[0];}lines.forEach(function(line,i){if(i<lines.length-1){_this6._parseLine(line);}else{// Save the last line in case it has been broken up.
_this6._lastLine=line;}});callback();}}]);return m3u8Parser;}(stream_1.Writable);},{"stream":52}],15:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});/**
 * Converts human friendly time to milliseconds. Supports the format
 * 00:00:00.000 for hours, minutes, seconds, and milliseconds respectively.
 * And 0ms, 0s, 0m, 0h, and together 1m1s.
 */var numberFormat=/^\d+$/;var timeFormat=/^(?:(?:(\d+):)?(\d{1,2}):)?(\d{1,2})(?:\.(\d{3}))?$/;var timeUnits={ms:1,s:1000,m:60000,h:3600000};exports.humanStr=function(time){if(typeof time==='number'){return time;}if(numberFormat.test(time)){return+time;}var firstFormat=timeFormat.exec(time);if(firstFormat){return+(firstFormat[1]||0)*timeUnits.h+ +(firstFormat[2]||0)*timeUnits.m+ +firstFormat[3]*timeUnits.s+ +(firstFormat[4]||0);}else{var total=0;var r=/(-?\d+)(ms|s|m|h)/g;var rs;while((rs=r.exec(time))!=null){total+=+rs[1]*timeUnits[rs[2]];}return total;}};/**
 * Parses a duration string in the form of "123.456S", returns milliseconds.
 */exports.durationStr=function(time){var total=0;var r=/(\d+(?:\.\d+)?)(S|M|H)/g;var rs;while((rs=r.exec(time))!=null){total+=+rs[1]*timeUnits[rs[2].toLowerCase()];}return total;};},{}],16:[function(require,module,exports){"use strict";module.exports=/*#__PURE__*/function(){/**
     * A really simple queue with concurrency.
     */function Queue(worker){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};_classCallCheck2(this,Queue);this._worker=worker;this._concurrency=options.concurrency||1;this.tasks=[];this.total=0;this.active=0;}/**
     * Push a task to the queue.
     */_createClass(Queue,[{key:"push",value:function push(item,callback){this.tasks.push({item:item,callback:callback});this.total++;this._next();}/**
     * Process next job in queue.
     */},{key:"_next",value:function _next(){var _this7=this;if(this.active>=this._concurrency||!this.tasks.length){return;}var _this$tasks$shift=this.tasks.shift(),item=_this$tasks$shift.item,callback=_this$tasks$shift.callback;var callbackCalled=false;this.active++;this._worker(item,function(err,result){if(callbackCalled){return;}_this7.active--;callbackCalled=true;if(callback){callback(err,result);}_this7._next();});}/**
     * Stops processing queued jobs.
     */},{key:"die",value:function die(){this.tasks=[];}}]);return Queue;}();},{}],17:[function(require,module,exports){(function(process){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{"default":mod};};var http_1=__importDefault(require("http"));var https_1=__importDefault(require("https"));var url_1=require("url");var stream_1=require("stream");var httpLibs={'http:':http_1.default,'https:':https_1.default};var redirectCodes={301:true,302:true,303:true,307:true};var retryCodes={429:true,503:true};var defaults={maxRedirects:2,maxRetries:2,maxReconnects:0,backoff:{inc:100,max:10000}};function Miniget(url,options,callback){if(typeof options==='function'){callback=options;options={};}else if(!options){options={};}var opts=Object.assign({},defaults,options);var stream=new stream_1.PassThrough({highWaterMark:opts.highWaterMark});var myreq,mydecoded;var aborted=false;var redirects=0;var retries=0;var retryTimeout;var reconnects=0;var contentLength;var acceptRanges=false;var rangeStart=0,rangeEnd;var downloaded=0;// Check if this is a ranged request.
if(opts.headers&&opts.headers.Range){var r=/bytes=(\d+)-(\d+)?/.exec(opts.headers.Range+'');if(r){rangeStart=parseInt(r[1],10);rangeEnd=parseInt(r[2],10);}}// Add `Accept-Encoding` header.
if(opts.acceptEncoding){opts.headers=Object.assign({'Accept-Encoding':Object.keys(opts.acceptEncoding).join(', ')},opts.headers);}var doRetry=function doRetry(){var retryOptions=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(aborted){return false;}// If there is an error when the download has already started,
// but not finished, try reconnecting.
if(mydecoded&&0<downloaded){if(acceptRanges&&downloaded<contentLength&&reconnects++<opts.maxReconnects){mydecoded=null;retries=0;var inc=opts.backoff.inc;var ms=Math.min(inc,opts.backoff.max);retryTimeout=setTimeout(doDownload,ms);stream.emit('reconnect',reconnects,retryOptions.err);return true;}}else if((!retryOptions.statusCode||retryOptions.err&&retryOptions.err.message==='ENOTFOUND')&&retries++<opts.maxRetries){var _ms=retryOptions.retryAfter||Math.min(retries*opts.backoff.inc,opts.backoff.max);retryTimeout=setTimeout(doDownload,_ms);stream.emit('retry',retries,retryOptions.err);return true;}return false;};var onRequestError=function onRequestError(err,statusCode){if(!doRetry({err:err,statusCode:statusCode})){stream.emit('error',err);}};var doDownload=function doDownload(){if(aborted){return;}var parsed=url_1.parse(url);var httpLib=httpLibs[parsed.protocol];if(!httpLib){stream.emit('error',Error('Invalid URL: '+url));return;}Object.assign(parsed,opts);if(acceptRanges&&downloaded>0){var start=downloaded+rangeStart;var end=rangeEnd||'';parsed.headers=Object.assign({},parsed.headers,{Range:"bytes=".concat(start,"-").concat(end)});}if(opts.transform){parsed=opts.transform(parsed);if(parsed.protocol){httpLib=httpLibs[parsed.protocol];}}myreq=httpLib.get(parsed,function(res){if(res.statusCode in redirectCodes){if(redirects++>=opts.maxRedirects){stream.emit('error',Error('Too many redirects'));}else{url=res.headers.location;setTimeout(doDownload,res.headers['retry-after']?parseInt(res.headers['retry-after'],10)*1000:0);stream.emit('redirect',url);}return;// Check for rate limiting.
}else if(res.statusCode in retryCodes){doRetry({retryAfter:parseInt(res.headers['retry-after'],10)});return;}else if(res.statusCode<200||400<=res.statusCode){var err=Error('Status code: '+res.statusCode);if(res.statusCode>=500){onRequestError(err,res.statusCode);}else{stream.emit('error',err);}return;}var decoded=res;var cleanup=function cleanup(){res.removeListener('data',ondata);decoded.removeListener('end',onend);decoded.removeListener('error',onerror);res.removeListener('error',onerror);};var ondata=function ondata(chunk){downloaded+=chunk.length;};var onend=function onend(){cleanup();if(!doRetry()){stream.end();}};var onerror=function onerror(err){cleanup();onRequestError(err);};if(opts.acceptEncoding&&res.headers['content-encoding']){var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=res.headers['content-encoding'].split(', ').reverse()[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var enc=_step8.value;var fn=opts.acceptEncoding[enc];if(fn!=null){decoded=decoded.pipe(fn());decoded.on('error',onerror);}}}catch(err){_didIteratorError8=true;_iteratorError8=err;}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return!=null){_iterator8.return();}}finally{if(_didIteratorError8){throw _iteratorError8;}}}}if(!contentLength){contentLength=parseInt(res.headers['content-length']+'',10);acceptRanges=res.headers['accept-ranges']==='bytes'&&contentLength>0&&opts.maxReconnects>0;}res.on('data',ondata);decoded.on('end',onend);decoded.pipe(stream,{end:!acceptRanges});mydecoded=decoded;stream.emit('response',res);res.on('error',onerror);});myreq.on('error',onRequestError);stream.emit('request',myreq);};stream.abort=function(){aborted=true;stream.emit('abort');if(myreq){myreq.abort();}if(mydecoded){mydecoded.unpipe(stream);}clearTimeout(retryTimeout);};process.nextTick(doDownload);if(callback){var body='',myres;stream.setEncoding('utf8');stream.on('data',function(chunk){return body+=chunk;});stream.on('response',function(res){return myres=res;});stream.on('end',function(){return callback(null,myres,body);});stream.on('error',callback);}return callback?null:stream;}module.exports=Miniget;}).call(this,require('_process'));},{"_process":31,"http":53,"https":25,"stream":52,"url":74}],18:[function(require,module,exports){(function(Buffer){;(function(sax){// wrapper for non-node envs
sax.parser=function(strict,opt){return new SAXParser(strict,opt);};sax.SAXParser=SAXParser;sax.SAXStream=SAXStream;sax.createStream=createStream;// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
sax.MAX_BUFFER_LENGTH=64*1024;var buffers=['comment','sgmlDecl','textNode','tagName','doctype','procInstName','procInstBody','entity','attribName','attribValue','cdata','script'];sax.EVENTS=['text','processinginstruction','sgmldeclaration','doctype','comment','opentagstart','attribute','opentag','closetag','opencdata','cdata','closecdata','error','end','ready','script','opennamespace','closenamespace'];function SAXParser(strict,opt){if(!_instanceof(this,SAXParser)){return new SAXParser(strict,opt);}var parser=this;clearBuffers(parser);parser.q=parser.c='';parser.bufferCheckPosition=sax.MAX_BUFFER_LENGTH;parser.opt=opt||{};parser.opt.lowercase=parser.opt.lowercase||parser.opt.lowercasetags;parser.looseCase=parser.opt.lowercase?'toLowerCase':'toUpperCase';parser.tags=[];parser.closed=parser.closedRoot=parser.sawRoot=false;parser.tag=parser.error=null;parser.strict=!!strict;parser.noscript=!!(strict||parser.opt.noscript);parser.state=S.BEGIN;parser.strictEntities=parser.opt.strictEntities;parser.ENTITIES=parser.strictEntities?Object.create(sax.XML_ENTITIES):Object.create(sax.ENTITIES);parser.attribList=[];// namespaces form a prototype chain.
// it always points at the current tag,
// which protos to its parent tag.
if(parser.opt.xmlns){parser.ns=Object.create(rootNS);}// mostly just for error reporting
parser.trackPosition=parser.opt.position!==false;if(parser.trackPosition){parser.position=parser.line=parser.column=0;}emit(parser,'onready');}if(!Object.create){Object.create=function(o){function F(){}F.prototype=o;var newf=new F();return newf;};}if(!Object.keys){Object.keys=function(o){var a=[];for(var i in o){if(o.hasOwnProperty(i))a.push(i);}return a;};}function checkBufferLength(parser){var maxAllowed=Math.max(sax.MAX_BUFFER_LENGTH,10);var maxActual=0;for(var i=0,l=buffers.length;i<l;i++){var len=parser[buffers[i]].length;if(len>maxAllowed){// Text/cdata nodes can get big, and since they're buffered,
// we can get here under normal conditions.
// Avoid issues by emitting the text node now,
// so at least it won't get any bigger.
switch(buffers[i]){case'textNode':closeText(parser);break;case'cdata':emitNode(parser,'oncdata',parser.cdata);parser.cdata='';break;case'script':emitNode(parser,'onscript',parser.script);parser.script='';break;default:error(parser,'Max buffer length exceeded: '+buffers[i]);}}maxActual=Math.max(maxActual,len);}// schedule the next check for the earliest possible buffer overrun.
var m=sax.MAX_BUFFER_LENGTH-maxActual;parser.bufferCheckPosition=m+parser.position;}function clearBuffers(parser){for(var i=0,l=buffers.length;i<l;i++){parser[buffers[i]]='';}}function flushBuffers(parser){closeText(parser);if(parser.cdata!==''){emitNode(parser,'oncdata',parser.cdata);parser.cdata='';}if(parser.script!==''){emitNode(parser,'onscript',parser.script);parser.script='';}}SAXParser.prototype={end:function end(){_end(this);},write:write,resume:function resume(){this.error=null;return this;},close:function close(){return this.write(null);},flush:function flush(){flushBuffers(this);}};var Stream;try{Stream=require('stream').Stream;}catch(ex){Stream=function Stream(){};}var streamWraps=sax.EVENTS.filter(function(ev){return ev!=='error'&&ev!=='end';});function createStream(strict,opt){return new SAXStream(strict,opt);}function SAXStream(strict,opt){if(!_instanceof(this,SAXStream)){return new SAXStream(strict,opt);}Stream.apply(this);this._parser=new SAXParser(strict,opt);this.writable=true;this.readable=true;var me=this;this._parser.onend=function(){me.emit('end');};this._parser.onerror=function(er){me.emit('error',er);// if didn't throw, then means error was handled.
// go ahead and clear error, so we can write again.
me._parser.error=null;};this._decoder=null;streamWraps.forEach(function(ev){Object.defineProperty(me,'on'+ev,{get:function get(){return me._parser['on'+ev];},set:function set(h){if(!h){me.removeAllListeners(ev);me._parser['on'+ev]=h;return h;}me.on(ev,h);},enumerable:true,configurable:false});});}SAXStream.prototype=Object.create(Stream.prototype,{constructor:{value:SAXStream}});SAXStream.prototype.write=function(data){if(typeof Buffer==='function'&&typeof Buffer.isBuffer==='function'&&Buffer.isBuffer(data)){if(!this._decoder){var SD=require('string_decoder').StringDecoder;this._decoder=new SD('utf8');}data=this._decoder.write(data);}this._parser.write(data.toString());this.emit('data',data);return true;};SAXStream.prototype.end=function(chunk){if(chunk&&chunk.length){this.write(chunk);}this._parser.end();return true;};SAXStream.prototype.on=function(ev,handler){var me=this;if(!me._parser['on'+ev]&&streamWraps.indexOf(ev)!==-1){me._parser['on'+ev]=function(){var args=arguments.length===1?[arguments[0]]:Array.apply(null,arguments);args.splice(0,0,ev);me.emit.apply(me,args);};}return Stream.prototype.on.call(me,ev,handler);};// this really needs to be replaced with character classes.
// XML allows all manner of ridiculous numbers and digits.
var CDATA='[CDATA[';var DOCTYPE='DOCTYPE';var XML_NAMESPACE='http://www.w3.org/XML/1998/namespace';var XMLNS_NAMESPACE='http://www.w3.org/2000/xmlns/';var rootNS={xml:XML_NAMESPACE,xmlns:XMLNS_NAMESPACE};// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
// This implementation works on strings, a single character at a time
// as such, it cannot ever support astral-plane characters (10000-EFFFF)
// without a significant breaking change to either this  parser, or the
// JavaScript language.  Implementation of an emoji-capable xml parser
// is left as an exercise for the reader.
var nameStart=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;var nameBody=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;var entityStart=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;var entityBody=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;function isWhitespace(c){return c===' '||c==='\n'||c==='\r'||c==='\t';}function isQuote(c){return c==='"'||c==='\'';}function isAttribEnd(c){return c==='>'||isWhitespace(c);}function isMatch(regex,c){return regex.test(c);}function notMatch(regex,c){return!isMatch(regex,c);}var S=0;sax.STATE={BEGIN:S++,// leading byte order mark or whitespace
BEGIN_WHITESPACE:S++,// leading whitespace
TEXT:S++,// general stuff
TEXT_ENTITY:S++,// &amp and such.
OPEN_WAKA:S++,// <
SGML_DECL:S++,// <!BLARG
SGML_DECL_QUOTED:S++,// <!BLARG foo "bar
DOCTYPE:S++,// <!DOCTYPE
DOCTYPE_QUOTED:S++,// <!DOCTYPE "//blah
DOCTYPE_DTD:S++,// <!DOCTYPE "//blah" [ ...
DOCTYPE_DTD_QUOTED:S++,// <!DOCTYPE "//blah" [ "foo
COMMENT_STARTING:S++,// <!-
COMMENT:S++,// <!--
COMMENT_ENDING:S++,// <!-- blah -
COMMENT_ENDED:S++,// <!-- blah --
CDATA:S++,// <![CDATA[ something
CDATA_ENDING:S++,// ]
CDATA_ENDING_2:S++,// ]]
PROC_INST:S++,// <?hi
PROC_INST_BODY:S++,// <?hi there
PROC_INST_ENDING:S++,// <?hi "there" ?
OPEN_TAG:S++,// <strong
OPEN_TAG_SLASH:S++,// <strong /
ATTRIB:S++,// <a
ATTRIB_NAME:S++,// <a foo
ATTRIB_NAME_SAW_WHITE:S++,// <a foo _
ATTRIB_VALUE:S++,// <a foo=
ATTRIB_VALUE_QUOTED:S++,// <a foo="bar
ATTRIB_VALUE_CLOSED:S++,// <a foo="bar"
ATTRIB_VALUE_UNQUOTED:S++,// <a foo=bar
ATTRIB_VALUE_ENTITY_Q:S++,// <foo bar="&quot;"
ATTRIB_VALUE_ENTITY_U:S++,// <foo bar=&quot
CLOSE_TAG:S++,// </a
CLOSE_TAG_SAW_WHITE:S++,// </a   >
SCRIPT:S++,// <script> ...
SCRIPT_ENDING:S++// <script> ... <
};sax.XML_ENTITIES={'amp':'&','gt':'>','lt':'<','quot':'"','apos':"'"};sax.ENTITIES={'amp':'&','gt':'>','lt':'<','quot':'"','apos':"'",'AElig':198,'Aacute':193,'Acirc':194,'Agrave':192,'Aring':197,'Atilde':195,'Auml':196,'Ccedil':199,'ETH':208,'Eacute':201,'Ecirc':202,'Egrave':200,'Euml':203,'Iacute':205,'Icirc':206,'Igrave':204,'Iuml':207,'Ntilde':209,'Oacute':211,'Ocirc':212,'Ograve':210,'Oslash':216,'Otilde':213,'Ouml':214,'THORN':222,'Uacute':218,'Ucirc':219,'Ugrave':217,'Uuml':220,'Yacute':221,'aacute':225,'acirc':226,'aelig':230,'agrave':224,'aring':229,'atilde':227,'auml':228,'ccedil':231,'eacute':233,'ecirc':234,'egrave':232,'eth':240,'euml':235,'iacute':237,'icirc':238,'igrave':236,'iuml':239,'ntilde':241,'oacute':243,'ocirc':244,'ograve':242,'oslash':248,'otilde':245,'ouml':246,'szlig':223,'thorn':254,'uacute':250,'ucirc':251,'ugrave':249,'uuml':252,'yacute':253,'yuml':255,'copy':169,'reg':174,'nbsp':160,'iexcl':161,'cent':162,'pound':163,'curren':164,'yen':165,'brvbar':166,'sect':167,'uml':168,'ordf':170,'laquo':171,'not':172,'shy':173,'macr':175,'deg':176,'plusmn':177,'sup1':185,'sup2':178,'sup3':179,'acute':180,'micro':181,'para':182,'middot':183,'cedil':184,'ordm':186,'raquo':187,'frac14':188,'frac12':189,'frac34':190,'iquest':191,'times':215,'divide':247,'OElig':338,'oelig':339,'Scaron':352,'scaron':353,'Yuml':376,'fnof':402,'circ':710,'tilde':732,'Alpha':913,'Beta':914,'Gamma':915,'Delta':916,'Epsilon':917,'Zeta':918,'Eta':919,'Theta':920,'Iota':921,'Kappa':922,'Lambda':923,'Mu':924,'Nu':925,'Xi':926,'Omicron':927,'Pi':928,'Rho':929,'Sigma':931,'Tau':932,'Upsilon':933,'Phi':934,'Chi':935,'Psi':936,'Omega':937,'alpha':945,'beta':946,'gamma':947,'delta':948,'epsilon':949,'zeta':950,'eta':951,'theta':952,'iota':953,'kappa':954,'lambda':955,'mu':956,'nu':957,'xi':958,'omicron':959,'pi':960,'rho':961,'sigmaf':962,'sigma':963,'tau':964,'upsilon':965,'phi':966,'chi':967,'psi':968,'omega':969,'thetasym':977,'upsih':978,'piv':982,'ensp':8194,'emsp':8195,'thinsp':8201,'zwnj':8204,'zwj':8205,'lrm':8206,'rlm':8207,'ndash':8211,'mdash':8212,'lsquo':8216,'rsquo':8217,'sbquo':8218,'ldquo':8220,'rdquo':8221,'bdquo':8222,'dagger':8224,'Dagger':8225,'bull':8226,'hellip':8230,'permil':8240,'prime':8242,'Prime':8243,'lsaquo':8249,'rsaquo':8250,'oline':8254,'frasl':8260,'euro':8364,'image':8465,'weierp':8472,'real':8476,'trade':8482,'alefsym':8501,'larr':8592,'uarr':8593,'rarr':8594,'darr':8595,'harr':8596,'crarr':8629,'lArr':8656,'uArr':8657,'rArr':8658,'dArr':8659,'hArr':8660,'forall':8704,'part':8706,'exist':8707,'empty':8709,'nabla':8711,'isin':8712,'notin':8713,'ni':8715,'prod':8719,'sum':8721,'minus':8722,'lowast':8727,'radic':8730,'prop':8733,'infin':8734,'ang':8736,'and':8743,'or':8744,'cap':8745,'cup':8746,'int':8747,'there4':8756,'sim':8764,'cong':8773,'asymp':8776,'ne':8800,'equiv':8801,'le':8804,'ge':8805,'sub':8834,'sup':8835,'nsub':8836,'sube':8838,'supe':8839,'oplus':8853,'otimes':8855,'perp':8869,'sdot':8901,'lceil':8968,'rceil':8969,'lfloor':8970,'rfloor':8971,'lang':9001,'rang':9002,'loz':9674,'spades':9824,'clubs':9827,'hearts':9829,'diams':9830};Object.keys(sax.ENTITIES).forEach(function(key){var e=sax.ENTITIES[key];var s=typeof e==='number'?String.fromCharCode(e):e;sax.ENTITIES[key]=s;});for(var s in sax.STATE){sax.STATE[sax.STATE[s]]=s;}// shorthand
S=sax.STATE;function emit(parser,event,data){parser[event]&&parser[event](data);}function emitNode(parser,nodeType,data){if(parser.textNode)closeText(parser);emit(parser,nodeType,data);}function closeText(parser){parser.textNode=textopts(parser.opt,parser.textNode);if(parser.textNode)emit(parser,'ontext',parser.textNode);parser.textNode='';}function textopts(opt,text){if(opt.trim)text=text.trim();if(opt.normalize)text=text.replace(/\s+/g,' ');return text;}function error(parser,er){closeText(parser);if(parser.trackPosition){er+='\nLine: '+parser.line+'\nColumn: '+parser.column+'\nChar: '+parser.c;}er=new Error(er);parser.error=er;emit(parser,'onerror',er);return parser;}function _end(parser){if(parser.sawRoot&&!parser.closedRoot)strictFail(parser,'Unclosed root tag');if(parser.state!==S.BEGIN&&parser.state!==S.BEGIN_WHITESPACE&&parser.state!==S.TEXT){error(parser,'Unexpected end');}closeText(parser);parser.c='';parser.closed=true;emit(parser,'onend');SAXParser.call(parser,parser.strict,parser.opt);return parser;}function strictFail(parser,message){if(_typeof(parser)!=='object'||!_instanceof(parser,SAXParser)){throw new Error('bad call to strictFail');}if(parser.strict){error(parser,message);}}function newTag(parser){if(!parser.strict)parser.tagName=parser.tagName[parser.looseCase]();var parent=parser.tags[parser.tags.length-1]||parser;var tag=parser.tag={name:parser.tagName,attributes:{}};// will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
if(parser.opt.xmlns){tag.ns=parent.ns;}parser.attribList.length=0;emitNode(parser,'onopentagstart',tag);}function qname(name,attribute){var i=name.indexOf(':');var qualName=i<0?['',name]:name.split(':');var prefix=qualName[0];var local=qualName[1];// <x "xmlns"="http://foo">
if(attribute&&name==='xmlns'){prefix='xmlns';local='';}return{prefix:prefix,local:local};}function attrib(parser){if(!parser.strict){parser.attribName=parser.attribName[parser.looseCase]();}if(parser.attribList.indexOf(parser.attribName)!==-1||parser.tag.attributes.hasOwnProperty(parser.attribName)){parser.attribName=parser.attribValue='';return;}if(parser.opt.xmlns){var qn=qname(parser.attribName,true);var prefix=qn.prefix;var local=qn.local;if(prefix==='xmlns'){// namespace binding attribute. push the binding into scope
if(local==='xml'&&parser.attribValue!==XML_NAMESPACE){strictFail(parser,'xml: prefix must be bound to '+XML_NAMESPACE+'\n'+'Actual: '+parser.attribValue);}else if(local==='xmlns'&&parser.attribValue!==XMLNS_NAMESPACE){strictFail(parser,'xmlns: prefix must be bound to '+XMLNS_NAMESPACE+'\n'+'Actual: '+parser.attribValue);}else{var tag=parser.tag;var parent=parser.tags[parser.tags.length-1]||parser;if(tag.ns===parent.ns){tag.ns=Object.create(parent.ns);}tag.ns[local]=parser.attribValue;}}// defer onattribute events until all attributes have been seen
// so any new bindings can take effect. preserve attribute order
// so deferred events can be emitted in document order
parser.attribList.push([parser.attribName,parser.attribValue]);}else{// in non-xmlns mode, we can emit the event right away
parser.tag.attributes[parser.attribName]=parser.attribValue;emitNode(parser,'onattribute',{name:parser.attribName,value:parser.attribValue});}parser.attribName=parser.attribValue='';}function openTag(parser,selfClosing){if(parser.opt.xmlns){// emit namespace binding events
var tag=parser.tag;// add namespace info to tag
var qn=qname(parser.tagName);tag.prefix=qn.prefix;tag.local=qn.local;tag.uri=tag.ns[qn.prefix]||'';if(tag.prefix&&!tag.uri){strictFail(parser,'Unbound namespace prefix: '+JSON.stringify(parser.tagName));tag.uri=qn.prefix;}var parent=parser.tags[parser.tags.length-1]||parser;if(tag.ns&&parent.ns!==tag.ns){Object.keys(tag.ns).forEach(function(p){emitNode(parser,'onopennamespace',{prefix:p,uri:tag.ns[p]});});}// handle deferred onattribute events
// Note: do not apply default ns to attributes:
//   http://www.w3.org/TR/REC-xml-names/#defaulting
for(var i=0,l=parser.attribList.length;i<l;i++){var nv=parser.attribList[i];var name=nv[0];var value=nv[1];var qualName=qname(name,true);var prefix=qualName.prefix;var local=qualName.local;var uri=prefix===''?'':tag.ns[prefix]||'';var a={name:name,value:value,prefix:prefix,local:local,uri:uri};// if there's any attributes with an undefined namespace,
// then fail on them now.
if(prefix&&prefix!=='xmlns'&&!uri){strictFail(parser,'Unbound namespace prefix: '+JSON.stringify(prefix));a.uri=prefix;}parser.tag.attributes[name]=a;emitNode(parser,'onattribute',a);}parser.attribList.length=0;}parser.tag.isSelfClosing=!!selfClosing;// process the tag
parser.sawRoot=true;parser.tags.push(parser.tag);emitNode(parser,'onopentag',parser.tag);if(!selfClosing){// special case for <script> in non-strict mode.
if(!parser.noscript&&parser.tagName.toLowerCase()==='script'){parser.state=S.SCRIPT;}else{parser.state=S.TEXT;}parser.tag=null;parser.tagName='';}parser.attribName=parser.attribValue='';parser.attribList.length=0;}function closeTag(parser){if(!parser.tagName){strictFail(parser,'Weird empty close tag.');parser.textNode+='</>';parser.state=S.TEXT;return;}if(parser.script){if(parser.tagName!=='script'){parser.script+='</'+parser.tagName+'>';parser.tagName='';parser.state=S.SCRIPT;return;}emitNode(parser,'onscript',parser.script);parser.script='';}// first make sure that the closing tag actually exists.
// <a><b></c></b></a> will close everything, otherwise.
var t=parser.tags.length;var tagName=parser.tagName;if(!parser.strict){tagName=tagName[parser.looseCase]();}var closeTo=tagName;while(t--){var close=parser.tags[t];if(close.name!==closeTo){// fail the first time in strict mode
strictFail(parser,'Unexpected close tag');}else{break;}}// didn't find it.  we already failed for strict, so just abort.
if(t<0){strictFail(parser,'Unmatched closing tag: '+parser.tagName);parser.textNode+='</'+parser.tagName+'>';parser.state=S.TEXT;return;}parser.tagName=tagName;var s=parser.tags.length;while(s-->t){var tag=parser.tag=parser.tags.pop();parser.tagName=parser.tag.name;emitNode(parser,'onclosetag',parser.tagName);var x={};for(var i in tag.ns){x[i]=tag.ns[i];}var parent=parser.tags[parser.tags.length-1]||parser;if(parser.opt.xmlns&&tag.ns!==parent.ns){// remove namespace bindings introduced by tag
Object.keys(tag.ns).forEach(function(p){var n=tag.ns[p];emitNode(parser,'onclosenamespace',{prefix:p,uri:n});});}}if(t===0)parser.closedRoot=true;parser.tagName=parser.attribValue=parser.attribName='';parser.attribList.length=0;parser.state=S.TEXT;}function parseEntity(parser){var entity=parser.entity;var entityLC=entity.toLowerCase();var num;var numStr='';if(parser.ENTITIES[entity]){return parser.ENTITIES[entity];}if(parser.ENTITIES[entityLC]){return parser.ENTITIES[entityLC];}entity=entityLC;if(entity.charAt(0)==='#'){if(entity.charAt(1)==='x'){entity=entity.slice(2);num=parseInt(entity,16);numStr=num.toString(16);}else{entity=entity.slice(1);num=parseInt(entity,10);numStr=num.toString(10);}}entity=entity.replace(/^0+/,'');if(isNaN(num)||numStr.toLowerCase()!==entity){strictFail(parser,'Invalid character entity');return'&'+parser.entity+';';}return String.fromCodePoint(num);}function beginWhiteSpace(parser,c){if(c==='<'){parser.state=S.OPEN_WAKA;parser.startTagPosition=parser.position;}else if(!isWhitespace(c)){// have to process this as a text node.
// weird, but happens.
strictFail(parser,'Non-whitespace before first tag.');parser.textNode=c;parser.state=S.TEXT;}}function charAt(chunk,i){var result='';if(i<chunk.length){result=chunk.charAt(i);}return result;}function write(chunk){var parser=this;if(this.error){throw this.error;}if(parser.closed){return error(parser,'Cannot write after close. Assign an onready handler.');}if(chunk===null){return _end(parser);}if(_typeof(chunk)==='object'){chunk=chunk.toString();}var i=0;var c='';while(true){c=charAt(chunk,i++);parser.c=c;if(!c){break;}if(parser.trackPosition){parser.position++;if(c==='\n'){parser.line++;parser.column=0;}else{parser.column++;}}switch(parser.state){case S.BEGIN:parser.state=S.BEGIN_WHITESPACE;if(c==="\uFEFF"){continue;}beginWhiteSpace(parser,c);continue;case S.BEGIN_WHITESPACE:beginWhiteSpace(parser,c);continue;case S.TEXT:if(parser.sawRoot&&!parser.closedRoot){var starti=i-1;while(c&&c!=='<'&&c!=='&'){c=charAt(chunk,i++);if(c&&parser.trackPosition){parser.position++;if(c==='\n'){parser.line++;parser.column=0;}else{parser.column++;}}}parser.textNode+=chunk.substring(starti,i-1);}if(c==='<'&&!(parser.sawRoot&&parser.closedRoot&&!parser.strict)){parser.state=S.OPEN_WAKA;parser.startTagPosition=parser.position;}else{if(!isWhitespace(c)&&(!parser.sawRoot||parser.closedRoot)){strictFail(parser,'Text data outside of root node.');}if(c==='&'){parser.state=S.TEXT_ENTITY;}else{parser.textNode+=c;}}continue;case S.SCRIPT:// only non-strict
if(c==='<'){parser.state=S.SCRIPT_ENDING;}else{parser.script+=c;}continue;case S.SCRIPT_ENDING:if(c==='/'){parser.state=S.CLOSE_TAG;}else{parser.script+='<'+c;parser.state=S.SCRIPT;}continue;case S.OPEN_WAKA:// either a /, ?, !, or text is coming next.
if(c==='!'){parser.state=S.SGML_DECL;parser.sgmlDecl='';}else if(isWhitespace(c)){// wait for it...
}else if(isMatch(nameStart,c)){parser.state=S.OPEN_TAG;parser.tagName=c;}else if(c==='/'){parser.state=S.CLOSE_TAG;parser.tagName='';}else if(c==='?'){parser.state=S.PROC_INST;parser.procInstName=parser.procInstBody='';}else{strictFail(parser,'Unencoded <');// if there was some whitespace, then add that in.
if(parser.startTagPosition+1<parser.position){var pad=parser.position-parser.startTagPosition;c=new Array(pad).join(' ')+c;}parser.textNode+='<'+c;parser.state=S.TEXT;}continue;case S.SGML_DECL:if((parser.sgmlDecl+c).toUpperCase()===CDATA){emitNode(parser,'onopencdata');parser.state=S.CDATA;parser.sgmlDecl='';parser.cdata='';}else if(parser.sgmlDecl+c==='--'){parser.state=S.COMMENT;parser.comment='';parser.sgmlDecl='';}else if((parser.sgmlDecl+c).toUpperCase()===DOCTYPE){parser.state=S.DOCTYPE;if(parser.doctype||parser.sawRoot){strictFail(parser,'Inappropriately located doctype declaration');}parser.doctype='';parser.sgmlDecl='';}else if(c==='>'){emitNode(parser,'onsgmldeclaration',parser.sgmlDecl);parser.sgmlDecl='';parser.state=S.TEXT;}else if(isQuote(c)){parser.state=S.SGML_DECL_QUOTED;parser.sgmlDecl+=c;}else{parser.sgmlDecl+=c;}continue;case S.SGML_DECL_QUOTED:if(c===parser.q){parser.state=S.SGML_DECL;parser.q='';}parser.sgmlDecl+=c;continue;case S.DOCTYPE:if(c==='>'){parser.state=S.TEXT;emitNode(parser,'ondoctype',parser.doctype);parser.doctype=true;// just remember that we saw it.
}else{parser.doctype+=c;if(c==='['){parser.state=S.DOCTYPE_DTD;}else if(isQuote(c)){parser.state=S.DOCTYPE_QUOTED;parser.q=c;}}continue;case S.DOCTYPE_QUOTED:parser.doctype+=c;if(c===parser.q){parser.q='';parser.state=S.DOCTYPE;}continue;case S.DOCTYPE_DTD:parser.doctype+=c;if(c===']'){parser.state=S.DOCTYPE;}else if(isQuote(c)){parser.state=S.DOCTYPE_DTD_QUOTED;parser.q=c;}continue;case S.DOCTYPE_DTD_QUOTED:parser.doctype+=c;if(c===parser.q){parser.state=S.DOCTYPE_DTD;parser.q='';}continue;case S.COMMENT:if(c==='-'){parser.state=S.COMMENT_ENDING;}else{parser.comment+=c;}continue;case S.COMMENT_ENDING:if(c==='-'){parser.state=S.COMMENT_ENDED;parser.comment=textopts(parser.opt,parser.comment);if(parser.comment){emitNode(parser,'oncomment',parser.comment);}parser.comment='';}else{parser.comment+='-'+c;parser.state=S.COMMENT;}continue;case S.COMMENT_ENDED:if(c!=='>'){strictFail(parser,'Malformed comment');// allow <!-- blah -- bloo --> in non-strict mode,
// which is a comment of " blah -- bloo "
parser.comment+='--'+c;parser.state=S.COMMENT;}else{parser.state=S.TEXT;}continue;case S.CDATA:if(c===']'){parser.state=S.CDATA_ENDING;}else{parser.cdata+=c;}continue;case S.CDATA_ENDING:if(c===']'){parser.state=S.CDATA_ENDING_2;}else{parser.cdata+=']'+c;parser.state=S.CDATA;}continue;case S.CDATA_ENDING_2:if(c==='>'){if(parser.cdata){emitNode(parser,'oncdata',parser.cdata);}emitNode(parser,'onclosecdata');parser.cdata='';parser.state=S.TEXT;}else if(c===']'){parser.cdata+=']';}else{parser.cdata+=']]'+c;parser.state=S.CDATA;}continue;case S.PROC_INST:if(c==='?'){parser.state=S.PROC_INST_ENDING;}else if(isWhitespace(c)){parser.state=S.PROC_INST_BODY;}else{parser.procInstName+=c;}continue;case S.PROC_INST_BODY:if(!parser.procInstBody&&isWhitespace(c)){continue;}else if(c==='?'){parser.state=S.PROC_INST_ENDING;}else{parser.procInstBody+=c;}continue;case S.PROC_INST_ENDING:if(c==='>'){emitNode(parser,'onprocessinginstruction',{name:parser.procInstName,body:parser.procInstBody});parser.procInstName=parser.procInstBody='';parser.state=S.TEXT;}else{parser.procInstBody+='?'+c;parser.state=S.PROC_INST_BODY;}continue;case S.OPEN_TAG:if(isMatch(nameBody,c)){parser.tagName+=c;}else{newTag(parser);if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else{if(!isWhitespace(c)){strictFail(parser,'Invalid character in tag name');}parser.state=S.ATTRIB;}}continue;case S.OPEN_TAG_SLASH:if(c==='>'){openTag(parser,true);closeTag(parser);}else{strictFail(parser,'Forward-slash in opening tag not followed by >');parser.state=S.ATTRIB;}continue;case S.ATTRIB:// haven't read the attribute name yet.
if(isWhitespace(c)){continue;}else if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else if(isMatch(nameStart,c)){parser.attribName=c;parser.attribValue='';parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_NAME:if(c==='='){parser.state=S.ATTRIB_VALUE;}else if(c==='>'){strictFail(parser,'Attribute without value');parser.attribValue=parser.attribName;attrib(parser);openTag(parser);}else if(isWhitespace(c)){parser.state=S.ATTRIB_NAME_SAW_WHITE;}else if(isMatch(nameBody,c)){parser.attribName+=c;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_NAME_SAW_WHITE:if(c==='='){parser.state=S.ATTRIB_VALUE;}else if(isWhitespace(c)){continue;}else{strictFail(parser,'Attribute without value');parser.tag.attributes[parser.attribName]='';parser.attribValue='';emitNode(parser,'onattribute',{name:parser.attribName,value:''});parser.attribName='';if(c==='>'){openTag(parser);}else if(isMatch(nameStart,c)){parser.attribName=c;parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');parser.state=S.ATTRIB;}}continue;case S.ATTRIB_VALUE:if(isWhitespace(c)){continue;}else if(isQuote(c)){parser.q=c;parser.state=S.ATTRIB_VALUE_QUOTED;}else{strictFail(parser,'Unquoted attribute value');parser.state=S.ATTRIB_VALUE_UNQUOTED;parser.attribValue=c;}continue;case S.ATTRIB_VALUE_QUOTED:if(c!==parser.q){if(c==='&'){parser.state=S.ATTRIB_VALUE_ENTITY_Q;}else{parser.attribValue+=c;}continue;}attrib(parser);parser.q='';parser.state=S.ATTRIB_VALUE_CLOSED;continue;case S.ATTRIB_VALUE_CLOSED:if(isWhitespace(c)){parser.state=S.ATTRIB;}else if(c==='>'){openTag(parser);}else if(c==='/'){parser.state=S.OPEN_TAG_SLASH;}else if(isMatch(nameStart,c)){strictFail(parser,'No whitespace between attributes');parser.attribName=c;parser.attribValue='';parser.state=S.ATTRIB_NAME;}else{strictFail(parser,'Invalid attribute name');}continue;case S.ATTRIB_VALUE_UNQUOTED:if(!isAttribEnd(c)){if(c==='&'){parser.state=S.ATTRIB_VALUE_ENTITY_U;}else{parser.attribValue+=c;}continue;}attrib(parser);if(c==='>'){openTag(parser);}else{parser.state=S.ATTRIB;}continue;case S.CLOSE_TAG:if(!parser.tagName){if(isWhitespace(c)){continue;}else if(notMatch(nameStart,c)){if(parser.script){parser.script+='</'+c;parser.state=S.SCRIPT;}else{strictFail(parser,'Invalid tagname in closing tag.');}}else{parser.tagName=c;}}else if(c==='>'){closeTag(parser);}else if(isMatch(nameBody,c)){parser.tagName+=c;}else if(parser.script){parser.script+='</'+parser.tagName;parser.tagName='';parser.state=S.SCRIPT;}else{if(!isWhitespace(c)){strictFail(parser,'Invalid tagname in closing tag');}parser.state=S.CLOSE_TAG_SAW_WHITE;}continue;case S.CLOSE_TAG_SAW_WHITE:if(isWhitespace(c)){continue;}if(c==='>'){closeTag(parser);}else{strictFail(parser,'Invalid characters in closing tag');}continue;case S.TEXT_ENTITY:case S.ATTRIB_VALUE_ENTITY_Q:case S.ATTRIB_VALUE_ENTITY_U:var returnState;var buffer;switch(parser.state){case S.TEXT_ENTITY:returnState=S.TEXT;buffer='textNode';break;case S.ATTRIB_VALUE_ENTITY_Q:returnState=S.ATTRIB_VALUE_QUOTED;buffer='attribValue';break;case S.ATTRIB_VALUE_ENTITY_U:returnState=S.ATTRIB_VALUE_UNQUOTED;buffer='attribValue';break;}if(c===';'){parser[buffer]+=parseEntity(parser);parser.entity='';parser.state=returnState;}else if(isMatch(parser.entity.length?entityBody:entityStart,c)){parser.entity+=c;}else{strictFail(parser,'Invalid character in entity name');parser[buffer]+='&'+parser.entity+c;parser.entity='';parser.state=returnState;}continue;default:throw new Error(parser,'Unknown state: '+parser.state);}}// while
if(parser.position>=parser.bufferCheckPosition){checkBufferLength(parser);}return parser;}/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */ /* istanbul ignore next */if(!String.fromCodePoint){(function(){var stringFromCharCode=String.fromCharCode;var floor=Math.floor;var fromCodePoint=function fromCodePoint(){var MAX_SIZE=0x4000;var codeUnits=[];var highSurrogate;var lowSurrogate;var index=-1;var length=arguments.length;if(!length){return'';}var result='';while(++index<length){var codePoint=Number(arguments[index]);if(!isFinite(codePoint)||// `NaN`, `+Infinity`, or `-Infinity`
codePoint<0||// not a valid Unicode code point
codePoint>0x10FFFF||// not a valid Unicode code point
floor(codePoint)!==codePoint// not an integer
){throw RangeError('Invalid code point: '+codePoint);}if(codePoint<=0xFFFF){// BMP code point
codeUnits.push(codePoint);}else{// Astral code point; split in surrogate halves
// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
codePoint-=0x10000;highSurrogate=(codePoint>>10)+0xD800;lowSurrogate=codePoint%0x400+0xDC00;codeUnits.push(highSurrogate,lowSurrogate);}if(index+1===length||codeUnits.length>MAX_SIZE){result+=stringFromCharCode.apply(null,codeUnits);codeUnits.length=0;}}return result;};/* istanbul ignore next */if(Object.defineProperty){Object.defineProperty(String,'fromCodePoint',{value:fromCodePoint,configurable:true,writable:true});}else{String.fromCodePoint=fromCodePoint;}})();}})(typeof exports==='undefined'?this.sax={}:exports);}).call(this,require("buffer").Buffer);},{"buffer":21,"stream":52,"string_decoder":72}],19:[function(require,module,exports){'use strict';exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)]=62;revLookup['_'.charCodeAt(0)]=63;function getLens(b64){var len=b64.length;if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4');}// Trim off extra bytes after placeholder bytes are found
// See: https://github.com/beatgammit/base64-js/issues/42
var validLen=b64.indexOf('=');if(validLen===-1)validLen=len;var placeHoldersLen=validLen===len?0:4-validLen%4;return[validLen,placeHoldersLen];}// base64 is 4/3 + up to two characters of the original data
function byteLength(b64){var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];return(validLen+placeHoldersLen)*3/4-placeHoldersLen;}function _byteLength(b64,validLen,placeHoldersLen){return(validLen+placeHoldersLen)*3/4-placeHoldersLen;}function toByteArray(b64){var tmp;var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];var arr=new Arr(_byteLength(b64,validLen,placeHoldersLen));var curByte=0;// if there are placeholders, only get up to the last complete 4 chars
var len=placeHoldersLen>0?validLen-4:validLen;var i;for(i=0;i<len;i+=4){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[curByte++]=tmp>>16&0xFF;arr[curByte++]=tmp>>8&0xFF;arr[curByte++]=tmp&0xFF;}if(placeHoldersLen===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[curByte++]=tmp&0xFF;}if(placeHoldersLen===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[curByte++]=tmp>>8&0xFF;arr[curByte++]=tmp&0xFF;}return arr;}function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16&0xFF0000)+(uint8[i+1]<<8&0xFF00)+(uint8[i+2]&0xFF);output.push(tripletToBase64(tmp));}return output.join('');}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;// if we have 1 byte left, pad 2 bytes
var parts=[];var maxChunkLength=16383;// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}// pad the end with zeros, but make sure to not forget the extra bytes
if(extraBytes===1){tmp=uint8[len-1];parts.push(lookup[tmp>>2]+lookup[tmp<<4&0x3F]+'==');}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];parts.push(lookup[tmp>>10]+lookup[tmp>>4&0x3F]+lookup[tmp<<2&0x3F]+'=');}return parts.join('');}},{}],20:[function(require,module,exports){},{}],21:[function(require,module,exports){(function(Buffer){/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */'use strict';var base64=require('base64-js');var ieee754=require('ieee754');var customInspectSymbol=typeof Symbol==='function'&&typeof Symbol.for==='function'?Symbol.for('nodejs.util.inspect.custom'):null;exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=0x7fffffff;exports.kMaxLength=K_MAX_LENGTH;/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=='undefined'&&typeof console.error==='function'){console.error('This browser lacks typed array (Uint8Array) support which is required by '+'`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');}function typedArraySupport(){// Can typed array instances can be augmented?
try{var arr=new Uint8Array(1);var proto={foo:function foo(){return 42;}};Object.setPrototypeOf(proto,Uint8Array.prototype);Object.setPrototypeOf(arr,proto);return arr.foo()===42;}catch(e){return false;}}Object.defineProperty(Buffer.prototype,'parent',{enumerable:true,get:function get(){if(!Buffer.isBuffer(this))return undefined;return this.buffer;}});Object.defineProperty(Buffer.prototype,'offset',{enumerable:true,get:function get(){if(!Buffer.isBuffer(this))return undefined;return this.byteOffset;}});function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError('The value "'+length+'" is invalid for option "size"');}// Return an augmented `Uint8Array` instance
var buf=new Uint8Array(length);Object.setPrototypeOf(buf,Buffer.prototype);return buf;}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function Buffer(arg,encodingOrOffset,length){// Common case.
if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new TypeError('The "string" argument must be of type string. Received type number');}return allocUnsafe(arg);}return from(arg,encodingOrOffset,length);}// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if(typeof Symbol!=='undefined'&&Symbol.species!=null&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false});}Buffer.poolSize=8192;// not used by this implementation
function from(value,encodingOrOffset,length){if(typeof value==='string'){return fromString(value,encodingOrOffset);}if(ArrayBuffer.isView(value)){return fromArrayLike(value);}if(value==null){throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, '+'or Array-like Object. Received type '+_typeof(value));}if(isInstance(value,ArrayBuffer)||value&&isInstance(value.buffer,ArrayBuffer)){return fromArrayBuffer(value,encodingOrOffset,length);}if(typeof value==='number'){throw new TypeError('The "value" argument must not be of type number. Received type number');}var valueOf=value.valueOf&&value.valueOf();if(valueOf!=null&&valueOf!==value){return Buffer.from(valueOf,encodingOrOffset,length);}var b=fromObject(value);if(b)return b;if(typeof Symbol!=='undefined'&&Symbol.toPrimitive!=null&&typeof value[Symbol.toPrimitive]==='function'){return Buffer.from(value[Symbol.toPrimitive]('string'),encodingOrOffset,length);}throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, '+'or Array-like Object. Received type '+_typeof(value));}/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length);};// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype,Uint8Array.prototype);Object.setPrototypeOf(Buffer,Uint8Array);function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be of type number');}else if(size<0){throw new RangeError('The value "'+size+'" is invalid for option "size"');}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size);}if(fill!==undefined){// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding==='string'?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill);}return createBuffer(size);}/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding);};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0);}/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */Buffer.allocUnsafe=function(size){return allocUnsafe(size);};/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size);};function fromString(string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8';}if(!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
buf=buf.slice(0,actual);}return buf;}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255;}return buf;}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('"offset" is outside of buffer bounds');}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('"length" is outside of buffer bounds');}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array);}else if(length===undefined){buf=new Uint8Array(array,byteOffset);}else{buf=new Uint8Array(array,byteOffset,length);}// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(buf,Buffer.prototype);return buf;}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf;}obj.copy(buf,0,0,len);return buf;}if(obj.length!==undefined){if(typeof obj.length!=='number'||numberIsNaN(obj.length)){return createBuffer(0);}return fromArrayLike(obj);}if(obj.type==='Buffer'&&Array.isArray(obj.data)){return fromArrayLike(obj.data);}}function checked(length){// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(length>=K_MAX_LENGTH){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+K_MAX_LENGTH.toString(16)+' bytes');}return length|0;}function SlowBuffer(length){if(+length!=length){// eslint-disable-line eqeqeq
length=0;}return Buffer.alloc(+length);}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true&&b!==Buffer.prototype;// so Buffer.isBuffer(Buffer.prototype) will be false
};Buffer.compare=function compare(a,b){if(isInstance(a,Uint8Array))a=Buffer.from(a,a.offset,a.byteLength);if(isInstance(b,Uint8Array))b=Buffer.from(b,b.offset,b.byteLength);if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'latin1':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return true;default:return false;}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers');}if(list.length===0){return Buffer.alloc(0);}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(isInstance(buf,Uint8Array)){buf=Buffer.from(buf);}if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer,pos);pos+=buf.length;}return buffer;};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length;}if(ArrayBuffer.isView(string)||isInstance(string,ArrayBuffer)){return string.byteLength;}if(typeof string!=='string'){throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. '+'Received type '+_typeof(string));}var len=string.length;var mustMatch=arguments.length>2&&arguments[2]===true;if(!mustMatch&&len===0)return 0;// Use a for loop to avoid recursion
var loweredCase=false;for(;;){switch(encoding){case'ascii':case'latin1':case'binary':return len;case'utf8':case'utf-8':return utf8ToBytes(string).length;case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return len*2;case'hex':return len>>>1;case'base64':return base64ToBytes(string).length;default:if(loweredCase){return mustMatch?-1:utf8ToBytes(string).length;// assume utf8
}encoding=(''+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if(start===undefined||start<0){start=0;}// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if(start>this.length){return'';}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return'';}// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end>>>=0;start>>>=0;if(end<=start){return'';}if(!encoding)encoding='utf8';while(true){switch(encoding){case'hex':return hexSlice(this,start,end);case'utf8':case'utf-8':return utf8Slice(this,start,end);case'ascii':return asciiSlice(this,start,end);case'latin1':case'binary':return latin1Slice(this,start,end);case'base64':return base64Slice(this,start,end);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(encoding+'').toLowerCase();loweredCase=true;}}}// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits');}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this;};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits');}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this;};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits');}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this;};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return'';if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments);};Buffer.prototype.toLocaleString=Buffer.prototype.toString;Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');if(this===b)return true;return Buffer.compare(this,b)===0;};Buffer.prototype.inspect=function inspect(){var str='';var max=exports.INSPECT_MAX_BYTES;str=this.toString('hex',0,max).replace(/(.{2})/g,'$1 ').trim();if(this.length>max)str+=' ... ';return'<Buffer '+str+'>';};if(customInspectSymbol){Buffer.prototype[customInspectSymbol]=Buffer.prototype.inspect;}Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(isInstance(target,Uint8Array)){target=Buffer.from(target,target.offset,target.byteLength);}if(!Buffer.isBuffer(target)){throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. '+'Received type '+_typeof(target));}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index');}if(thisStart>=thisEnd&&start>=end){return 0;}if(thisStart>=thisEnd){return-1;}if(start>=end){return 1;}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){// Empty buffer means no match
if(buffer.length===0)return-1;// Normalize byteOffset
if(typeof byteOffset==='string'){encoding=byteOffset;byteOffset=0;}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff;}else if(byteOffset<-0x80000000){byteOffset=-0x80000000;}byteOffset=+byteOffset;// Coerce to Number.
if(numberIsNaN(byteOffset)){// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
byteOffset=dir?0:buffer.length-1;}// Normalize byteOffset: negative offsets start from the end of the buffer
if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return-1;}// Normalize val
if(typeof val==='string'){val=Buffer.from(val,encoding);}// Finally, search either indexOf (if dir is true) or lastIndexOf
if(Buffer.isBuffer(val)){// Special case: looking for empty string/buffer always fails
if(val.length===0){return-1;}return arrayIndexOf(buffer,val,byteOffset,encoding,dir);}else if(typeof val==='number'){val=val&0xFF;// Search for a byte value [0-255]
if(typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);}throw new TypeError('val must be string, number or Buffer');}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1;}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i];}else{return buf.readUInt16BE(i*indexSize);}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize;}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break;}}if(found)return i;}}return-1;}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1;};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true);};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false);};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else{length=Number(length);if(length>remaining){length=remaining;}}var strLen=string.length;if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed;}return i;}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length);}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length);}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length);}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);}Buffer.prototype.write=function write(string,offset,length,encoding){// Buffer#write(string)
if(offset===undefined){encoding='utf8';length=this.length;offset=0;// Buffer#write(string, encoding)
}else if(length===undefined&&typeof offset==='string'){encoding=offset;length=this.length;offset=0;// Buffer#write(string, offset[, length][, encoding])
}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding='utf8';}else{encoding=length;length=undefined;}}else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds');}if(!encoding)encoding='utf8';var loweredCase=false;for(;;){switch(encoding){case'hex':return hexWrite(this,string,offset,length);case'utf8':case'utf-8':return utf8Write(this,string,offset,length);case'ascii':return asciiWrite(this,string,offset,length);case'latin1':case'binary':return latin1Write(this,string,offset,length);case'base64':// Warning: maxLength not taken into account in base64Write
return base64Write(this,string,offset,length);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(''+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)};};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf);}else{return base64.fromByteArray(buf.slice(start,end));}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>0xEF?4:firstByte>0xDF?3:firstByte>0xBF?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;if(tempCodePoint>0x7F){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint;}}}}if(codePoint===null){// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint=0xFFFD;bytesPerSequence=1;}else if(codePoint>0xFFFF){// encode to utf16 (surrogate pair dance)
codePoint-=0x10000;res.push(codePoint>>>10&0x3FF|0xD800);codePoint=0xDC00|codePoint&0x3FF;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res);}// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH=0x1000;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints);// avoid extra slice()
}// Decode in chunks to avoid "call stack size exceeded".
var res='';var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F);}return ret;}function latin1Slice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out='';for(var i=start;i<end;++i){out+=hexSliceLookupTable[buf[i]];}return out;}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res='';for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res;}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf=this.subarray(start,end);// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(newBuf,Buffer.prototype);return newBuf;};/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}return val;};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=0x100)){val+=this[offset+--byteLength]*mul;}return val;};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset];};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8;};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1];};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*0x1000000;};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*0x1000000+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3]);};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=0x100)){val+=this[offset+--i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&0x80))return this[offset];return(0xff-this[offset]+1)*-1;};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24;};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3];};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4);};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4);};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8);};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8);};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError('Index out of range');}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,0xff,0);this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);this[offset]=value&0xff;this[offset+1]=value>>>8;return offset+2;};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);this[offset]=value>>>8;this[offset+1]=value&0xff;return offset+2;};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&0xff;return offset+4;};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;return offset+4;};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);if(value<0)value=0xff+value+1;this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);this[offset]=value&0xff;this[offset+1]=value>>>8;return offset+2;};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);this[offset]=value>>>8;this[offset+1]=value&0xff;return offset+2;};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);this[offset]=value&0xff;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4;};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(value<0)value=0xffffffff+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;return offset+4;};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range');if(offset<0)throw new RangeError('Index out of range');}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4;}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert);};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert);};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8;}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert);};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert);};// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!Buffer.isBuffer(target))throw new TypeError('argument should be a Buffer');if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;// Copy 0 bytes; we're done
if(end===start)return 0;if(target.length===0||this.length===0)return 0;// Fatal error conditions
if(targetStart<0){throw new RangeError('targetStart out of bounds');}if(start<0||start>=this.length)throw new RangeError('Index out of range');if(end<0)throw new RangeError('sourceEnd out of bounds');// Are we oob?
if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;if(this===target&&typeof Uint8Array.prototype.copyWithin==='function'){// Use built-in when available, missing from IE11
this.copyWithin(targetStart,start,end);}else if(this===target&&start<targetStart&&targetStart<end){// descending copy from end
for(var i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else{Uint8Array.prototype.set.call(target,this.subarray(start,end),targetStart);}return len;};// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill=function fill(val,start,end,encoding){// Handle string cases:
if(typeof val==='string'){if(typeof start==='string'){encoding=start;start=0;end=this.length;}else if(typeof end==='string'){encoding=end;end=this.length;}if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string');}if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}if(val.length===1){var code=val.charCodeAt(0);if(encoding==='utf8'&&code<128||encoding==='latin1'){// Fast path: If `val` fits into a single byte, use that numeric value.
val=code;}}}else if(typeof val==='number'){val=val&255;}else if(typeof val==='boolean'){val=Number(val);}// Invalid ranges are not set to a default, so can range check early.
if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index');}if(end<=start){return this;}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val;}}else{var bytes=Buffer.isBuffer(val)?val:Buffer.from(val,encoding);var len=bytes.length;if(len===0){throw new TypeError('The value "'+val+'" is invalid for argument "value"');}for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this;};// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;function base64clean(str){// Node takes equal signs as end of the Base64 encoding
str=str.split('=')[0];// Node strips out invalid characters like \n and \t from the string, base64-js does not
str=str.trim().replace(INVALID_BASE64_RE,'');// Node converts strings with length < 2 to ''
if(str.length<2)return'';// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
while(str.length%4!==0){str=str+'=';}return str;}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);// is surrogate component
if(codePoint>0xD7FF&&codePoint<0xE000){// last char was a lead
if(!leadSurrogate){// no lead yet
if(codePoint>0xDBFF){// unexpected trail
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}else if(i+1===length){// unpaired lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}// valid lead
leadSurrogate=codePoint;continue;}// 2 leads in a row
if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);leadSurrogate=codePoint;continue;}// valid surrogate pair
codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;}else if(leadSurrogate){// valid bmp char, but last char was a lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);}leadSurrogate=null;// encode utf8
if(codePoint<0x80){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<0x800){if((units-=2)<0)break;bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80);}else if(codePoint<0x10000){if((units-=3)<0)break;bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else if(codePoint<0x110000){if((units-=4)<0)break;bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else{throw new Error('Invalid code point');}}return bytes;}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i)&0xFF);}return byteArray;}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str){return base64.toByteArray(base64clean(str));}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i;}// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj,type){return _instanceof(obj,type)||obj!=null&&obj.constructor!=null&&obj.constructor.name!=null&&obj.constructor.name===type.name;}function numberIsNaN(obj){// For IE11 support
return obj!==obj;// eslint-disable-line no-self-compare
}// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable=function(){var alphabet='0123456789abcdef';var table=new Array(256);for(var i=0;i<16;++i){var i16=i*16;for(var j=0;j<16;++j){table[i16+j]=alphabet[i]+alphabet[j];}}return table;}();}).call(this,require("buffer").Buffer);},{"base64-js":19,"buffer":21,"ieee754":26}],22:[function(require,module,exports){module.exports={"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"};},{}],23:[function(require,module,exports){(function(Buffer){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg){if(Array.isArray){return Array.isArray(arg);}return objectToString(arg)==='[object Array]';}exports.isArray=isArray;function isBoolean(arg){return typeof arg==='boolean';}exports.isBoolean=isBoolean;function isNull(arg){return arg===null;}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null;}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==='number';}exports.isNumber=isNumber;function isString(arg){return typeof arg==='string';}exports.isString=isString;function isSymbol(arg){return _typeof(arg)==='symbol';}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0;}exports.isUndefined=isUndefined;function isRegExp(re){return objectToString(re)==='[object RegExp]';}exports.isRegExp=isRegExp;function isObject(arg){return _typeof(arg)==='object'&&arg!==null;}exports.isObject=isObject;function isDate(d){return objectToString(d)==='[object Date]';}exports.isDate=isDate;function isError(e){return objectToString(e)==='[object Error]'||_instanceof(e,Error);}exports.isError=isError;function isFunction(arg){return typeof arg==='function';}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==='boolean'||typeof arg==='number'||typeof arg==='string'||_typeof(arg)==='symbol'||// ES6 symbol
typeof arg==='undefined';}exports.isPrimitive=isPrimitive;exports.isBuffer=Buffer.isBuffer;function objectToString(o){return Object.prototype.toString.call(o);}}).call(this,{"isBuffer":require("../../is-buffer/index.js")});},{"../../is-buffer/index.js":28}],24:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var objectCreate=Object.create||objectCreatePolyfill;var objectKeys=Object.keys||objectKeysPolyfill;var bind=Function.prototype.bind||functionBindPolyfill;function EventEmitter(){if(!this._events||!Object.prototype.hasOwnProperty.call(this,'_events')){this._events=objectCreate(null);this._eventsCount=0;}this._maxListeners=this._maxListeners||undefined;}module.exports=EventEmitter;// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners=10;var hasDefineProperty;try{var o={};if(Object.defineProperty)Object.defineProperty(o,'x',{value:0});hasDefineProperty=o.x===0;}catch(err){hasDefineProperty=false;}if(hasDefineProperty){Object.defineProperty(EventEmitter,'defaultMaxListeners',{enumerable:true,get:function get(){return defaultMaxListeners;},set:function set(arg){// check whether the input is a positive number (whose value is zero or
// greater and not a NaN).
if(typeof arg!=='number'||arg<0||arg!==arg)throw new TypeError('"defaultMaxListeners" must be a positive number');defaultMaxListeners=arg;}});}else{EventEmitter.defaultMaxListeners=defaultMaxListeners;}// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners=function setMaxListeners(n){if(typeof n!=='number'||n<0||isNaN(n))throw new TypeError('"n" argument must be a positive number');this._maxListeners=n;return this;};function $getMaxListeners(that){if(that._maxListeners===undefined)return EventEmitter.defaultMaxListeners;return that._maxListeners;}EventEmitter.prototype.getMaxListeners=function getMaxListeners(){return $getMaxListeners(this);};// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler,isFn,self){if(isFn)handler.call(self);else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i){listeners[i].call(self);}}}function emitOne(handler,isFn,self,arg1){if(isFn)handler.call(self,arg1);else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i){listeners[i].call(self,arg1);}}}function emitTwo(handler,isFn,self,arg1,arg2){if(isFn)handler.call(self,arg1,arg2);else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i){listeners[i].call(self,arg1,arg2);}}}function emitThree(handler,isFn,self,arg1,arg2,arg3){if(isFn)handler.call(self,arg1,arg2,arg3);else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i){listeners[i].call(self,arg1,arg2,arg3);}}}function emitMany(handler,isFn,self,args){if(isFn)handler.apply(self,args);else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i){listeners[i].apply(self,args);}}}EventEmitter.prototype.emit=function emit(type){var er,handler,len,args,i,events;var doError=type==='error';events=this._events;if(events)doError=doError&&events.error==null;else if(!doError)return false;// If there is no 'error' event listener then throw.
if(doError){if(arguments.length>1)er=arguments[1];if(_instanceof(er,Error)){throw er;// Unhandled 'error' event
}else{// At least give some kind of context to the user
var err=new Error('Unhandled "error" event. ('+er+')');err.context=er;throw err;}return false;}handler=events[type];if(!handler)return false;var isFn=typeof handler==='function';len=arguments.length;switch(len){// fast cases
case 1:emitNone(handler,isFn,this);break;case 2:emitOne(handler,isFn,this,arguments[1]);break;case 3:emitTwo(handler,isFn,this,arguments[1],arguments[2]);break;case 4:emitThree(handler,isFn,this,arguments[1],arguments[2],arguments[3]);break;// slower
default:args=new Array(len-1);for(i=1;i<len;i++){args[i-1]=arguments[i];}emitMany(handler,isFn,this,args);}return true;};function _addListener(target,type,listener,prepend){var m;var events;var existing;if(typeof listener!=='function')throw new TypeError('"listener" argument must be a function');events=target._events;if(!events){events=target._events=objectCreate(null);target._eventsCount=0;}else{// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
if(events.newListener){target.emit('newListener',type,listener.listener?listener.listener:listener);// Re-assign `events` because a newListener handler could have caused the
// this._events to be assigned to a new object
events=target._events;}existing=events[type];}if(!existing){// Optimize the case of one listener. Don't need the extra array object.
existing=events[type]=listener;++target._eventsCount;}else{if(typeof existing==='function'){// Adding the second element, need to change to array.
existing=events[type]=prepend?[listener,existing]:[existing,listener];}else{// If we've already got an array, just append.
if(prepend){existing.unshift(listener);}else{existing.push(listener);}}// Check for listener leak
if(!existing.warned){m=$getMaxListeners(target);if(m&&m>0&&existing.length>m){existing.warned=true;var w=new Error('Possible EventEmitter memory leak detected. '+existing.length+' "'+String(type)+'" listeners '+'added. Use emitter.setMaxListeners() to '+'increase limit.');w.name='MaxListenersExceededWarning';w.emitter=target;w.type=type;w.count=existing.length;if((typeof console==="undefined"?"undefined":_typeof(console))==='object'&&console.warn){console.warn('%s: %s',w.name,w.message);}}}}return target;}EventEmitter.prototype.addListener=function addListener(type,listener){return _addListener(this,type,listener,false);};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener=function prependListener(type,listener){return _addListener(this,type,listener,true);};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type,this.wrapFn);this.fired=true;switch(arguments.length){case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target,arguments[0]);case 2:return this.listener.call(this.target,arguments[0],arguments[1]);case 3:return this.listener.call(this.target,arguments[0],arguments[1],arguments[2]);default:var args=new Array(arguments.length);for(var i=0;i<args.length;++i){args[i]=arguments[i];}this.listener.apply(this.target,args);}}}function _onceWrap(target,type,listener){var state={fired:false,wrapFn:undefined,target:target,type:type,listener:listener};var wrapped=bind.call(onceWrapper,state);wrapped.listener=listener;state.wrapFn=wrapped;return wrapped;}EventEmitter.prototype.once=function once(type,listener){if(typeof listener!=='function')throw new TypeError('"listener" argument must be a function');this.on(type,_onceWrap(this,type,listener));return this;};EventEmitter.prototype.prependOnceListener=function prependOnceListener(type,listener){if(typeof listener!=='function')throw new TypeError('"listener" argument must be a function');this.prependListener(type,_onceWrap(this,type,listener));return this;};// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener=function removeListener(type,listener){var list,events,position,i,originalListener;if(typeof listener!=='function')throw new TypeError('"listener" argument must be a function');events=this._events;if(!events)return this;list=events[type];if(!list)return this;if(list===listener||list.listener===listener){if(--this._eventsCount===0)this._events=objectCreate(null);else{delete events[type];if(events.removeListener)this.emit('removeListener',type,list.listener||listener);}}else if(typeof list!=='function'){position=-1;for(i=list.length-1;i>=0;i--){if(list[i]===listener||list[i].listener===listener){originalListener=list[i].listener;position=i;break;}}if(position<0)return this;if(position===0)list.shift();else spliceOne(list,position);if(list.length===1)events[type]=list[0];if(events.removeListener)this.emit('removeListener',type,originalListener||listener);}return this;};EventEmitter.prototype.removeAllListeners=function removeAllListeners(type){var listeners,events,i;events=this._events;if(!events)return this;// not listening for removeListener, no need to emit
if(!events.removeListener){if(arguments.length===0){this._events=objectCreate(null);this._eventsCount=0;}else if(events[type]){if(--this._eventsCount===0)this._events=objectCreate(null);else delete events[type];}return this;}// emit removeListener for all listeners on all events
if(arguments.length===0){var keys=objectKeys(events);var key;for(i=0;i<keys.length;++i){key=keys[i];if(key==='removeListener')continue;this.removeAllListeners(key);}this.removeAllListeners('removeListener');this._events=objectCreate(null);this._eventsCount=0;return this;}listeners=events[type];if(typeof listeners==='function'){this.removeListener(type,listeners);}else if(listeners){// LIFO order
for(i=listeners.length-1;i>=0;i--){this.removeListener(type,listeners[i]);}}return this;};function _listeners(target,type,unwrap){var events=target._events;if(!events)return[];var evlistener=events[type];if(!evlistener)return[];if(typeof evlistener==='function')return unwrap?[evlistener.listener||evlistener]:[evlistener];return unwrap?unwrapListeners(evlistener):arrayClone(evlistener,evlistener.length);}EventEmitter.prototype.listeners=function listeners(type){return _listeners(this,type,true);};EventEmitter.prototype.rawListeners=function rawListeners(type){return _listeners(this,type,false);};EventEmitter.listenerCount=function(emitter,type){if(typeof emitter.listenerCount==='function'){return emitter.listenerCount(type);}else{return listenerCount.call(emitter,type);}};EventEmitter.prototype.listenerCount=listenerCount;function listenerCount(type){var events=this._events;if(events){var evlistener=events[type];if(typeof evlistener==='function'){return 1;}else if(evlistener){return evlistener.length;}}return 0;}EventEmitter.prototype.eventNames=function eventNames(){return this._eventsCount>0?Reflect.ownKeys(this._events):[];};// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list,index){for(var i=index,k=i+1,n=list.length;k<n;i+=1,k+=1){list[i]=list[k];}list.pop();}function arrayClone(arr,n){var copy=new Array(n);for(var i=0;i<n;++i){copy[i]=arr[i];}return copy;}function unwrapListeners(arr){var ret=new Array(arr.length);for(var i=0;i<ret.length;++i){ret[i]=arr[i].listener||arr[i];}return ret;}function objectCreatePolyfill(proto){var F=function F(){};F.prototype=proto;return new F();}function objectKeysPolyfill(obj){var keys=[];for(var k in obj){if(Object.prototype.hasOwnProperty.call(obj,k)){keys.push(k);}}return k;}function functionBindPolyfill(context){var fn=this;return function(){return fn.apply(context,arguments);};}},{}],25:[function(require,module,exports){var http=require('http');var url=require('url');var https=module.exports;for(var key in http){if(http.hasOwnProperty(key))https[key]=http[key];}https.request=function(params,cb){params=validateParams(params);return http.request.call(this,params,cb);};https.get=function(params,cb){params=validateParams(params);return http.get.call(this,params,cb);};function validateParams(params){if(typeof params==='string'){params=url.parse(params);}if(!params.protocol){params.protocol='https:';}if(params.protocol!=='https:'){throw new Error('Protocol "'+params.protocol+'" not supported. Expected "https:"');}return params;}},{"http":53,"url":74}],26:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity;}else{m=m+Math.pow(2,mLen);e=e-eBias;}return(s?-1:1)*m*Math.pow(2,e-mLen);};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else{value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};},{}],27:[function(require,module,exports){if(typeof Object.create==='function'){// implementation from standard node.js 'util' module
module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});}};}else{// old school shim for old browsers
module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;}};}},{}],28:[function(require,module,exports){/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ // The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports=function(obj){return obj!=null&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer);};function isBuffer(obj){return!!obj.constructor&&typeof obj.constructor.isBuffer==='function'&&obj.constructor.isBuffer(obj);}// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj){return typeof obj.readFloatLE==='function'&&typeof obj.slice==='function'&&isBuffer(obj.slice(0,0));}},{}],29:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]';};},{}],30:[function(require,module,exports){(function(process){'use strict';if(typeof process==='undefined'||!process.version||process.version.indexOf('v0.')===0||process.version.indexOf('v1.')===0&&process.version.indexOf('v1.8.')!==0){module.exports={nextTick:nextTick};}else{module.exports=process;}function nextTick(fn,arg1,arg2,arg3){if(typeof fn!=='function'){throw new TypeError('"callback" argument must be a function');}var len=arguments.length;var args,i;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function afterTickOne(){fn.call(null,arg1);});case 3:return process.nextTick(function afterTickTwo(){fn.call(null,arg1,arg2);});case 4:return process.nextTick(function afterTickThree(){fn.call(null,arg1,arg2,arg3);});default:args=new Array(len-1);i=0;while(i<args.length){args[i++]=arguments[i];}return process.nextTick(function afterTick(){fn.apply(null,args);});}}}).call(this,require('_process'));},{"_process":31}],31:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],32:[function(require,module,exports){(function(global){/*! https://mths.be/punycode v1.4.1 by @mathias */;(function(root){/** Detect free variables */var freeExports=_typeof(exports)=='object'&&exports&&!exports.nodeType&&exports;var freeModule=_typeof(module)=='object'&&module&&!module.nodeType&&module;var freeGlobal=_typeof(global)=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal;}/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var punycode,/** Highest positive signed 32-bit float value */maxInt=2147483647,// aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,// 0x80
delimiter='-',// '\x2D'
/** Regular expressions */regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,// unprintable ASCII chars + non-ASCII chars
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,// RFC 3490 separators
/** Error messages */errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},/** Convenience shortcuts */baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,/** Temporary variable */key;/*--------------------------------------------------------------------------*/ /**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function error(type){throw new RangeError(errors[type]);}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}return result;}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
result=parts[0]+'@';string=parts[1];}// Avoid `split(regex)` for IE8 compatibility. See #17.
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);return output;}).join('');}/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}if(codePoint-65<26){return codePoint-65;}if(codePoint-97<26){return codePoint-97;}return base;}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function digitToBasic(digit,flag){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return digit+22+75*(digit<26)-((flag!=0)<<5);}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;/* no initialization */delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function decode(input){// Don't use UCS-2
var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,/** Cached calculation results */baseMinusT;// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}for(j=0;j<basic;++j){// if it's not a basic code point
if(input.charCodeAt(j)>=0x80){error('not-basic');}output.push(input.charCodeAt(j));}// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(index=basic>0?basic+1:0;index<inputLength;)/* no final expression */{// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(oldi=i,w=1,k=base;;/* no condition */k+=base){if(index>=inputLength){error('invalid-input');}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break;}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}w*=baseMinusT;}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
if(floor(i/out)>maxInt-n){error('overflow');}n+=floor(i/out);i%=out;// Insert `n` at position `i` of the output
output.splice(i++,0,n);}return ucs2encode(output);}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],/** `inputLength` will hold the number of code points in `input`. */inputLength,/** Cached calculation results */handledCPCountPlusOne,baseMinusT,qMinusT;// Convert the input in UCS-2 to Unicode
input=ucs2decode(input);// Cache the length
inputLength=input.length;// Initialize the state
n=initialN;delta=0;bias=initialBias;// Handle the basic code points
for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}handledCPCount=basicLength=output.length;// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.
// Finish the basic string - if it is not empty - with a delimiter
if(basicLength){output.push(delimiter);}// Main encoding loop:
while(handledCPCount<inputLength){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}if(currentValue==n){// Represent delta as a generalized variable-length integer
for(q=delta,k=base;;/* no condition */k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break;}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}++delta;++n;}return output.join('');}/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}/*--------------------------------------------------------------------------*/ /** Define the public API */punycode={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */'version':'1.4.1',/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */'ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};/** Expose `punycode` */ // Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(typeof define=='function'&&_typeof(define.amd)=='object'&&define.amd){define('punycode',function(){return punycode;});}else if(freeExports&&freeModule){if(module.exports==freeExports){// in Node.js, io.js, or RingoJS v0.8.0+
freeModule.exports=punycode;}else{// in Narwhal or RingoJS v0.7.0-
for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{// in Rhino or a web browser
root.punycode=punycode;}})(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],33:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}var len=qs.length;// maxKeys <= 0 means that we should not limit keys count
if(maxKeys>0&&len>maxKeys){len=maxKeys;}for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};},{}],34:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';var stringifyPrimitive=function stringifyPrimitive(v){switch(_typeof(v)){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}if(_typeof(obj)==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}return res;}var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}return res;};},{}],35:[function(require,module,exports){'use strict';exports.decode=exports.parse=require('./decode');exports.encode=exports.stringify=require('./encode');},{"./decode":33,"./encode":34}],36:[function(require,module,exports){module.exports=require('./lib/_stream_duplex.js');},{"./lib/_stream_duplex.js":37}],37:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';/*<replacement>*/var pna=require('process-nextick-args');/*</replacement>*/ /*<replacement>*/var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){keys.push(key);}return keys;};/*</replacement>*/module.exports=Duplex;/*<replacement>*/var util=Object.create(require('core-util-is'));util.inherits=require('inherits');/*</replacement>*/var Readable=require('./_stream_readable');var Writable=require('./_stream_writable');util.inherits(Duplex,Readable);{// avoid scope creep, the keys array can then be collected
var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}}function Duplex(options){if(!_instanceof(this,Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);if(options&&options.readable===false)this.readable=false;if(options&&options.writable===false)this.writable=false;this.allowHalfOpen=true;if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;this.once('end',onend);}Object.defineProperty(Duplex.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});// the no-half-open enforcer
function onend(){// if we allow half-open state, or if the writable side ended,
// then we're ok.
if(this.allowHalfOpen||this._writableState.ended)return;// no more data can be written.
// But allow more writes to happen in this tick.
pna.nextTick(onEndNT,this);}function onEndNT(self){self.end();}Object.defineProperty(Duplex.prototype,'destroyed',{get:function get(){if(this._readableState===undefined||this._writableState===undefined){return false;}return this._readableState.destroyed&&this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(this._readableState===undefined||this._writableState===undefined){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;this._writableState.destroyed=value;}});Duplex.prototype._destroy=function(err,cb){this.push(null);this.end();pna.nextTick(cb,err);};},{"./_stream_readable":39,"./_stream_writable":41,"core-util-is":23,"inherits":27,"process-nextick-args":30}],38:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';module.exports=PassThrough;var Transform=require('./_stream_transform');/*<replacement>*/var util=Object.create(require('core-util-is'));util.inherits=require('inherits');/*</replacement>*/util.inherits(PassThrough,Transform);function PassThrough(options){if(!_instanceof(this,PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};},{"./_stream_transform":40,"core-util-is":23,"inherits":27}],39:[function(require,module,exports){(function(process,global){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';/*<replacement>*/var pna=require('process-nextick-args');/*</replacement>*/module.exports=Readable;/*<replacement>*/var isArray=require('isarray');/*</replacement>*/ /*<replacement>*/var Duplex;/*</replacement>*/Readable.ReadableState=ReadableState;/*<replacement>*/var EE=require('events').EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length;};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/ /*<replacement>*/var Buffer=require('safe-buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||_instanceof(obj,OurUint8Array);}/*</replacement>*/ /*<replacement>*/var util=Object.create(require('core-util-is'));util.inherits=require('inherits');/*</replacement>*/ /*<replacement>*/var debugUtil=require('util');var debug=void 0;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream');}else{debug=function debug(){};}/*</replacement>*/var BufferList=require('./internal/streams/BufferList');var destroyImpl=require('./internal/streams/destroy');var StringDecoder;util.inherits(Readable,Stream);var kProxyEvents=['error','close','destroy','pause','resume'];function prependListener(emitter,event,fn){// Sadly this is not cacheable as some libraries bundle their own
// event emitter implementation with them.
if(typeof emitter.prependListener==='function')return emitter.prependListener(event,fn);// This is a hack to make sure that our error handler is attached before any
// userland ones.  NEVER DO THIS. This is here only because this code needs
// to continue to work with older versions of Node.js that do not include
// the prependListener() method. The goal is to eventually remove this hack.
if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}function ReadableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream.
// These options can be provided separately as readableXXX and writableXXX.
var isDuplex=_instanceof(stream,Duplex);// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.readableObjectMode;// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
var hwm=options.highWaterMark;var readableHwm=options.readableHighWaterMark;var defaultHwm=this.objectMode?16:16*1024;if(hwm||hwm===0)this.highWaterMark=hwm;else if(isDuplex&&(readableHwm||readableHwm===0))this.highWaterMark=readableHwm;else this.highWaterMark=defaultHwm;// cast to ints.
this.highWaterMark=Math.floor(this.highWaterMark);// A linked list is used to store data chunks instead of an array because the
// linked list can remove elements from the beginning faster than
// array.shift()
this.buffer=new BufferList();this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;// a flag to be able to tell if the event 'readable'/'data' is emitted
// immediately, or on a later tick.  We set this to true at first, because
// any actions that shouldn't happen until "later" should generally also
// not happen before the first read call.
this.sync=true;// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;// has it been destroyed
this.destroyed=false;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain=0;// if true, a maybeReadMore has been scheduled
this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}function Readable(options){Duplex=Duplex||require('./_stream_duplex');if(!_instanceof(this,Readable))return new Readable(options);this._readableState=new ReadableState(options,this);// legacy
this.readable=true;if(options){if(typeof options.read==='function')this._read=options.read;if(typeof options.destroy==='function')this._destroy=options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype,'destroyed',{get:function get(){if(this._readableState===undefined){return false;}return this._readableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._readableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){this.push(null);cb(err);};// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding='';}skipChunkCheck=true;}}else{skipChunkCheck=true;}return readableAddChunk(this,chunk,encoding,false,skipChunkCheck);};// Unshift should *always* be something directly out of read()
Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,true,false);};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){var state=stream._readableState;if(chunk===null){state.reading=false;onEofChunk(stream,state);}else{var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){stream.emit('error',er);}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=='string'&&!state.objectMode&&Object.getPrototypeOf(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk);}if(addToFront){if(state.endEmitted)stream.emit('error',new Error('stream.unshift() after end event'));else addChunk(stream,state,chunk,true);}else if(state.ended){stream.emit('error',new Error('stream.push() after EOF'));}else{state.reading=false;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,false);else maybeReadMore(stream,state);}else{addChunk(stream,state,chunk,false);}}}else if(!addToFront){state.reading=false;}}return needMoreData(state);}function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){stream.emit('data',chunk);stream.read(0);}else{// update the buffer info.
state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}maybeReadMore(stream,state);}function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}return er;}// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0);}Readable.prototype.isPaused=function(){return this._readableState.flowing===false;};// backwards compatibility.
Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this._readableState.decoder=new StringDecoder(enc);this._readableState.encoding=enc;return this;};// Don't raise the hwm > 8MB
var MAX_HWM=0x800000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){n=MAX_HWM;}else{// Get the next highest power of 2 to prevent increasing hwm excessively in
// tiny amounts
n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n;}// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){// Only flow one buffer at a time
if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length;}// If we're asking for more than the current hwm, then raise the hwm.
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;// Don't have enough
if(!state.ended){state.needReadable=true;return 0;}return state.length;}// you can override either this method, or the async _read(n) below.
Readable.prototype.read=function(n){debug('read',n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=false;// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null;}n=howMuchToRead(n,state);// if we've ended, and we're now clear, then finish it up.
if(n===0&&state.ended){if(state.length===0)endReadable(this);return null;}// All the actual chunk generation logic needs to be
// *below* the call to _read.  The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.
// Note that this may be asynchronous, or synchronous.  Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead=state.needReadable;debug('need readable',doRead);// if we currently have less than the highWaterMark, then also read some
if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug('length less than watermark',doRead);}// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if(state.ended||state.reading){doRead=false;debug('reading or ended',doRead);}else if(doRead){debug('do read');state.reading=true;state.sync=true;// if the length is currently zero, then we *need* a readable event.
if(state.length===0)state.needReadable=true;// call internal read method
this._read(state.highWaterMark);state.sync=false;// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if(!state.reading)n=howMuchToRead(nOrig,state);}var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=true;n=0;}else{state.length-=n;}if(state.length===0){// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if(!state.ended)state.needReadable=true;// If we tried to read() past the EOF, then emit end on the next tick.
if(nOrig!==n&&state.ended)endReadable(this);}if(ret!==null)this.emit('data',ret);return ret;};function onEofChunk(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;// emit 'readable' now to make sure it gets picked up.
emitReadable(stream);}// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream){var state=stream._readableState;state.needReadable=false;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=true;if(state.sync)pna.nextTick(emitReadable_,stream);else emitReadable_(stream);}}function emitReadable_(stream){debug('emit readable');stream.emit('readable');flow(stream);}// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;pna.nextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){var len=state.length;while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){debug('maybeReadMore read 0');stream.read(0);if(len===state.length)// didn't get any data, stop spinning.
break;else len=state.length;}state.readingMore=false;}// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read=function(n){this.emit('error',new Error('_read() is not implemented'));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break;}state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)pna.nextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable,unpipeInfo){debug('onunpipe');if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===false){unpipeInfo.hasUnpiped=true;cleanup();}}}function onend(){debug('onend');dest.end();}// when the dest drains, it reduces the awaitDrain counter
// on the source.  This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=false;function cleanup(){debug('cleanup');// cleanup event handlers once the pipe is broken
dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',unpipe);src.removeListener('data',ondata);cleanedUp=true;// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}// If the user pushes more data while we're writing to dest then we'll end up
// in ondata again. However, we only want to increase awaitDrain once because
// dest will only emit one 'drain' event for the multiple writes.
// => Introduce a guard on increasing awaitDrain.
var increasedAwaitDrain=false;src.on('data',ondata);function ondata(chunk){debug('ondata');increasedAwaitDrain=false;var ret=dest.write(chunk);if(false===ret&&!increasedAwaitDrain){// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',src._readableState.awaitDrain);src._readableState.awaitDrain++;increasedAwaitDrain=true;}src.pause();}}// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)dest.emit('error',er);}// Make sure our error handler is attached before userland ones.
prependListener(dest,'error',onerror);// Both close and finish should trigger unpipe, but only once.
function onclose(){dest.removeListener('finish',onfinish);unpipe();}dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe();}dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest);}// tell the dest that it's being piped to
dest.emit('pipe',src);// start the flow if it hasn't been started already.
if(!state.flowing){debug('pipe resume');src.resume();}return dest;};function pipeOnDrain(src){return function(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=true;flow(src);}};}Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:false};// if we're not piping anywhere, then do nothing.
if(state.pipesCount===0)return this;// just one destination.  most common case.
if(state.pipesCount===1){// passed in one, but it's not the right one.
if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;// got a match.
state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit('unpipe',this,unpipeInfo);return this;}// slow case. multiple pipe destinations.
if(!dest){// remove all.
var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++){dests[i].emit('unpipe',this,unpipeInfo);}return this;}// try to find the right one.
var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this,unpipeInfo);return this;};// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if(ev==='data'){// Start flowing on next tick if stream isn't explicitly paused
if(this._readableState.flowing!==false)this.resume();}else if(ev==='readable'){var state=this._readableState;if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=true;state.emittedReadable=false;if(!state.reading){pna.nextTick(nReadingNextTick,this);}else if(state.length){emitReadable(this);}}}return res;};Readable.prototype.addListener=Readable.prototype.on;function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0);}// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');state.flowing=true;resume(this,state);}return this;};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;pna.nextTick(resume_,stream,state);}}function resume_(stream,state){if(!state.reading){debug('resume read 0');stream.read(0);}state.resumeScheduled=false;state.awaitDrain=0;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(false!==this._readableState.flowing){debug('pause');this._readableState.flowing=false;this.emit('pause');}return this;};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);while(state.flowing&&stream.read()!==null){}}// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap=function(stream){var _this=this;var state=this._readableState;var paused=false;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)_this.push(chunk);}_this.push(null);});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);// don't skip over falsy values in objectMode
if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=_this.push(chunk);if(!ret){paused=true;stream.pause();}});// proxy all the other methods.
// important when wrapping filters and duplexes.
for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function(method){return function(){return stream[method].apply(stream,arguments);};}(i);}}// proxy certain important events.
for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],this.emit.bind(this,kProxyEvents[n]));}// when we try to consume some more bytes, simply unpause the
// underlying stream.
this._read=function(n){debug('wrapped _read',n);if(paused){paused=false;stream.resume();}};return this;};Object.defineProperty(Readable.prototype,'readableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.highWaterMark;}});// exposed for testing purposes only.
Readable._fromList=fromList;// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n,state){// nothing buffered
if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){// read it all, truncate the list
if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.head.data;else ret=state.buffer.concat(state.length);state.buffer.clear();}else{// read part of list
ret=fromListPartial(n,state.buffer,state.decoder);}return ret;}// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n,list,hasStrings){var ret;if(n<list.head.data.length){// slice is the same for buffers and strings
ret=list.head.data.slice(0,n);list.head.data=list.head.data.slice(n);}else if(n===list.head.data.length){// first chunk is a perfect match
ret=list.shift();}else{// result spans more than one buffer
ret=hasStrings?copyFromBufferString(n,list):copyFromBuffer(n,list);}return ret;}// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n,list){var p=list.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null;}else{list.head=p;p.data=str.slice(nb);}break;}++c;}list.length-=c;return ret;}// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n,list){var ret=Buffer.allocUnsafe(n);var p=list.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)list.head=p.next;else list.head=list.tail=null;}else{list.head=p;p.data=buf.slice(nb);}break;}++c;}list.length-=c;return ret;}function endReadable(stream){var state=stream._readableState;// If we get here before consuming all the bytes, then that is a
// bug in node.  Should never happen.
if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');if(!state.endEmitted){state.ended=true;pna.nextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){// Check that we didn't get one last unshift.
if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit('end');}}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i;}return-1;}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./_stream_duplex":37,"./internal/streams/BufferList":42,"./internal/streams/destroy":43,"./internal/streams/stream":44,"_process":31,"core-util-is":23,"events":24,"inherits":27,"isarray":29,"process-nextick-args":30,"safe-buffer":45,"string_decoder/":46,"util":20}],40:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';module.exports=Transform;var Duplex=require('./_stream_duplex');/*<replacement>*/var util=Object.create(require('core-util-is'));util.inherits=require('inherits');/*</replacement>*/util.inherits(Transform,Duplex);function afterTransform(er,data){var ts=this._transformState;ts.transforming=false;var cb=ts.writecb;if(!cb){return this.emit('error',new Error('write callback called multiple times'));}ts.writechunk=null;ts.writecb=null;if(data!=null)// single equals check for both `null` and `undefined`
this.push(data);cb(er);var rs=this._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){this._read(rs.highWaterMark);}}function Transform(options){if(!_instanceof(this,Transform))return new Transform(options);Duplex.call(this,options);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};// start out asking for a readable event once data is transformed.
this._readableState.needReadable=true;// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync=false;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush;}// When the writable side finishes, then flush out anything remaining.
this.on('prefinish',prefinish);}function prefinish(){var _this=this;if(typeof this._flush==='function'){this._flush(function(er,data){done(_this,er,data);});}else{done(this,null,null);}}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding);};// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform=function(chunk,encoding,cb){throw new Error('_transform() is not implemented');};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else{// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform=true;}};Transform.prototype._destroy=function(err,cb){var _this2=this;Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);_this2.emit('close');});};function done(stream,er,data){if(er)return stream.emit('error',er);if(data!=null)// single equals check for both `null` and `undefined`
stream.push(data);// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
if(stream._writableState.length)throw new Error('Calling transform done when ws.length != 0');if(stream._transformState.transforming)throw new Error('Calling transform done when still transforming');return stream.push(null);}},{"./_stream_duplex":37,"core-util-is":23,"inherits":27}],41:[function(require,module,exports){(function(process,global,setImmediate){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';/*<replacement>*/var pna=require('process-nextick-args');/*</replacement>*/module.exports=Writable;/* <replacement> */function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null;}// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state);};}/* </replacement> */ /*<replacement>*/var asyncWrite=!process.browser&&['v0.10','v0.9.'].indexOf(process.version.slice(0,5))>-1?setImmediate:pna.nextTick;/*</replacement>*/ /*<replacement>*/var Duplex;/*</replacement>*/Writable.WritableState=WritableState;/*<replacement>*/var util=Object.create(require('core-util-is'));util.inherits=require('inherits');/*</replacement>*/ /*<replacement>*/var internalUtil={deprecate:require('util-deprecate')};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/ /*<replacement>*/var Buffer=require('safe-buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||_instanceof(obj,OurUint8Array);}/*</replacement>*/var destroyImpl=require('./internal/streams/destroy');util.inherits(Writable,Stream);function nop(){}function WritableState(options,stream){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream.
// These options can be provided separately as readableXXX and writableXXX.
var isDuplex=_instanceof(stream,Duplex);// object stream flag to indicate whether or not this stream
// contains buffers or objects.
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.writableObjectMode;// the point at which write() starts returning false
// Note: 0 is a valid value, means that we always return false if
// the entire buffer is not flushed immediately on write()
var hwm=options.highWaterMark;var writableHwm=options.writableHighWaterMark;var defaultHwm=this.objectMode?16:16*1024;if(hwm||hwm===0)this.highWaterMark=hwm;else if(isDuplex&&(writableHwm||writableHwm===0))this.highWaterMark=writableHwm;else this.highWaterMark=defaultHwm;// cast to ints.
this.highWaterMark=Math.floor(this.highWaterMark);// if _final has been called
this.finalCalled=false;// drain event flag.
this.needDrain=false;// at the start of calling end()
this.ending=false;// when end() has been called, and returned
this.ended=false;// when 'finish' is emitted
this.finished=false;// has it been destroyed
this.destroyed=false;// should we decode strings into buffers before passing to _write?
// this is here so that some node-core streams can optimize string
// handling at a lower level.
var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// not an actual buffer we keep track of, but a measurement
// of how much we're waiting to get pushed to some underlying
// socket or file.
this.length=0;// a flag to see when we're in the middle of a write.
this.writing=false;// when true all writes will be buffered until .uncork() call
this.corked=0;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// a flag to know if we're processing previously buffered items, which
// may call the _write() callback in the same tick, so that we don't
// end up in an overlapped onwrite situation.
this.bufferProcessing=false;// the callback that's passed to _write(chunk,cb)
this.onwrite=function(er){onwrite(stream,er);};// the callback that the user supplies to write(chunk,encoding,cb)
this.writecb=null;// the amount that is being written when _write is called.
this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;// number of pending user-supplied write callbacks
// this must be 0 before 'finish' can be emitted
this.pendingcb=0;// emit prefinish if the only thing we're waiting for is _write cbs
// This is relevant for synchronous Transform streams
this.prefinished=false;// True if the error was already emitted and should not be thrown again
this.errorEmitted=false;// count buffered requests
this.bufferedRequestCount=0;// allocate the first CorkedRequest, there is always
// one allocated and free to use, and we maintain at most two
this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out;};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function(){return this.getBuffer();},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.','DEP0003')});}catch(_){}})();// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;if(typeof Symbol==='function'&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==='function'){realHasInstance=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function value(object){if(realHasInstance.call(this,object))return true;if(this!==Writable)return false;return object&&_instanceof(object._writableState,WritableState);}});}else{realHasInstance=function realHasInstance(object){return _instanceof(object,this);};}function Writable(options){Duplex=Duplex||require('./_stream_duplex');// Writable ctor is applied to Duplexes, too.
// `realHasInstance` is necessary because using plain `instanceof`
// would return false, as no `_writableState` property is attached.
// Trying to use the custom `instanceof` for Writable here will also break the
// Node.js LazyTransform implementation, which has a non-trivial getter for
// `_writableState` that would lead to infinite recursion.
if(!realHasInstance.call(Writable,this)&&!_instanceof(this,Duplex)){return new Writable(options);}this._writableState=new WritableState(options,this);// legacy.
this.writable=true;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;if(typeof options.destroy==='function')this._destroy=options.destroy;if(typeof options.final==='function')this._final=options.final;}Stream.call(this);}// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe=function(){this.emit('error',new Error('Cannot pipe, not readable'));};function writeAfterEnd(stream,cb){var er=new Error('write after end');// TODO: defer error events consistently everywhere, not just the cb
stream.emit('error',er);pna.nextTick(cb,er);}// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream,state,chunk,cb){var valid=true;var er=false;if(chunk===null){er=new TypeError('May not write null values to stream');}else if(typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new TypeError('Invalid non-string/buffer chunk');}if(er){stream.emit('error',er);pna.nextTick(cb,er);valid=false;}return valid;}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;var isBuf=!state.objectMode&&_isUint8Array(chunk);if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk);}if(typeof encoding==='function'){cb=encoding;encoding=null;}if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ended)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);}return ret;};Writable.prototype.cork=function(){var state=this._writableState;state.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){// node::ParseEncoding() requires lower case.
if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new TypeError('Unknown encoding: '+encoding);this._writableState.defaultEncoding=encoding;return this;};function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){chunk=Buffer.from(chunk,encoding);}return chunk;}Object.defineProperty(Writable.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=true;encoding='buffer';chunk=newChunk;}}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;// we must ensure that previous needDrain will not be reset to false.
if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest;}else{state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else{doWrite(stream,state,false,len,chunk,encoding,cb);}return ret;}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){// defer the callback if we are being called synchronously
// to avoid piling up things on the stack
pna.nextTick(cb,er);// this can emit finish, and it will always happen
// after error
pna.nextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=true;stream.emit('error',er);}else{// the caller expect this to happen before if
// it is async
cb(er);stream._writableState.errorEmitted=true;stream.emit('error',er);// this can emit finish, but finish must
// always follow error
finishMaybe(stream,state);}}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{// Check if we're actually ready to finish, but don't emit yet
var finished=needFinish(state);if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){/*<replacement>*/asyncWrite(afterWrite,stream,state,finished,cb);/*</replacement>*/}else{afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit('drain');}}// if there's something in the buffer waiting, then process it
function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){// Fast case, write everything using _writev()
var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=true;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=false;entry=entry.next;count+=1;}buffer.allBuffers=allBuffers;doWrite(stream,state,true,state.length,buffer,'',holder.finish);// doWrite is almost always async, defer these to save a bit of time
// as the hot path ends with doWrite
state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else{state.corkedRequestsFree=new CorkedRequest(state);}state.bufferedRequestCount=0;}else{// Slow case, write chunks one-by-one
while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;state.bufferedRequestCount--;// if we didn't call the onwrite immediately, then
// it means that we need to wait until it does.
// also, that means that the chunk and cb are currently
// being processed, so move the buffer counter past them.
if(state.writing){break;}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new Error('_write() is not implemented'));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==='function'){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);// .end() fully uncorks
if(state.corked){state.corked=1;this.uncork();}// ignore unnecessary end() calls.
if(!state.ending&&!state.finished)endWritable(this,state,cb);};function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;}function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){stream.emit('error',err);}state.prefinished=true;stream.emit('prefinish');finishMaybe(stream,state);});}function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==='function'){state.pendingcb++;state.finalCalled=true;pna.nextTick(callFinal,stream,state);}else{state.prefinished=true;stream.emit('prefinish');}}}function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=true;stream.emit('finish');}}return need;}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)pna.nextTick(cb);else stream.once('finish',cb);}state.ended=true;stream.writable=false;}function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}if(state.corkedRequestsFree){state.corkedRequestsFree.next=corkReq;}else{state.corkedRequestsFree=corkReq;}}Object.defineProperty(Writable.prototype,'destroyed',{get:function get(){if(this._writableState===undefined){return false;}return this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._writableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._writableState.destroyed=value;}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){this.end();cb(err);};}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("timers").setImmediate);},{"./_stream_duplex":37,"./internal/streams/destroy":43,"./internal/streams/stream":44,"_process":31,"core-util-is":23,"inherits":27,"process-nextick-args":30,"safe-buffer":45,"timers":73,"util-deprecate":76}],42:[function(require,module,exports){'use strict';function _classCallCheck(instance,Constructor){if(!_instanceof(instance,Constructor)){throw new TypeError("Cannot call a class as a function");}}var Buffer=require('safe-buffer').Buffer;var util=require('util');function copyBuffer(src,target,offset){src.copy(target,offset);}module.exports=function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0;}BufferList.prototype.push=function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length;};BufferList.prototype.unshift=function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length;};BufferList.prototype.shift=function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret;};BufferList.prototype.clear=function clear(){this.head=this.tail=null;this.length=0;};BufferList.prototype.join=function join(s){if(this.length===0)return'';var p=this.head;var ret=''+p.data;while(p=p.next){ret+=s+p.data;}return ret;};BufferList.prototype.concat=function concat(n){if(this.length===0)return Buffer.alloc(0);if(this.length===1)return this.head.data;var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next;}return ret;};return BufferList;}();if(util&&util.inspect&&util.inspect.custom){module.exports.prototype[util.inspect.custom]=function(){var obj=util.inspect({length:this.length});return this.constructor.name+' '+obj;};}},{"safe-buffer":45,"util":20}],43:[function(require,module,exports){'use strict';/*<replacement>*/var pna=require('process-nextick-args');/*</replacement>*/ // undocumented cb() API, needed for core, not for public API
function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err);}else if(err&&(!this._writableState||!this._writableState.errorEmitted)){pna.nextTick(emitErrorNT,this,err);}return this;}// we set destroyed to true before firing error callbacks in order
// to make it re-entrance safe in case destroy() is called within callbacks
if(this._readableState){this._readableState.destroyed=true;}// if this is a duplex stream mark the writable part as destroyed as well
if(this._writableState){this._writableState.destroyed=true;}this._destroy(err||null,function(err){if(!cb&&err){pna.nextTick(emitErrorNT,_this,err);if(_this._writableState){_this._writableState.errorEmitted=true;}}else if(cb){cb(err);}});return this;}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false;}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finished=false;this._writableState.errorEmitted=false;}}function emitErrorNT(self,err){self.emit('error',err);}module.exports={destroy:destroy,undestroy:undestroy};},{"process-nextick-args":30}],44:[function(require,module,exports){module.exports=require('events').EventEmitter;},{"events":24}],45:[function(require,module,exports){/* eslint-disable node/no-deprecated-api */var buffer=require('buffer');var Buffer=buffer.Buffer;// alternative to using Object.keys for old browsers
function copyProps(src,dst){for(var key in src){dst[key]=src[key];}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer;}else{// Copy properties from require('buffer')
copyProps(buffer,exports);exports.Buffer=SafeBuffer;}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length);}// Copy static methods from Buffer
copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==='number'){throw new TypeError('Argument must not be a number');}return Buffer(arg,encodingOrOffset,length);};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==='string'){buf.fill(fill,encoding);}else{buf.fill(fill);}}else{buf.fill(0);}return buf;};SafeBuffer.allocUnsafe=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return Buffer(size);};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return buffer.SlowBuffer(size);};},{"buffer":21}],46:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';/*<replacement>*/var Buffer=require('safe-buffer').Buffer;/*</replacement>*/var isEncoding=Buffer.isEncoding||function(encoding){encoding=''+encoding;switch(encoding&&encoding.toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':case'raw':return true;default:return false;}};function _normalizeEncoding(enc){if(!enc)return'utf8';var retried;while(true){switch(enc){case'utf8':case'utf-8':return'utf8';case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return'utf16le';case'latin1':case'binary':return'latin1';case'base64':case'ascii':case'hex':return enc;default:if(retried)return;// undefined
enc=(''+enc).toLowerCase();retried=true;}}};// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc){var nenc=_normalizeEncoding(enc);if(typeof nenc!=='string'&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error('Unknown encoding: '+enc);return nenc||enc;}// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder=StringDecoder;function StringDecoder(encoding){this.encoding=normalizeEncoding(encoding);var nb;switch(this.encoding){case'utf16le':this.text=utf16Text;this.end=utf16End;nb=4;break;case'utf8':this.fillLast=utf8FillLast;nb=4;break;case'base64':this.text=base64Text;this.end=base64End;nb=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return;}this.lastNeed=0;this.lastTotal=0;this.lastChar=Buffer.allocUnsafe(nb);}StringDecoder.prototype.write=function(buf){if(buf.length===0)return'';var r;var i;if(this.lastNeed){r=this.fillLast(buf);if(r===undefined)return'';i=this.lastNeed;this.lastNeed=0;}else{i=0;}if(i<buf.length)return r?r+this.text(buf,i):this.text(buf,i);return r||'';};StringDecoder.prototype.end=utf8End;// Returns only complete characters in a Buffer
StringDecoder.prototype.text=utf8Text;// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length){buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal);}buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length);this.lastNeed-=buf.length;};// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte){if(byte<=0x7F)return 0;else if(byte>>5===0x06)return 2;else if(byte>>4===0x0E)return 3;else if(byte>>3===0x1E)return 4;return byte>>6===0x02?-1:-2;}// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self,buf,i){var j=buf.length-1;if(j<i)return 0;var nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-1;return nb;}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-2;return nb;}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0){if(nb===2)nb=0;else self.lastNeed=nb-3;}return nb;}return 0;}// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self,buf,p){if((buf[0]&0xC0)!==0x80){self.lastNeed=0;return"\uFFFD";}if(self.lastNeed>1&&buf.length>1){if((buf[1]&0xC0)!==0x80){self.lastNeed=1;return"\uFFFD";}if(self.lastNeed>2&&buf.length>2){if((buf[2]&0xC0)!==0x80){self.lastNeed=2;return"\uFFFD";}}}}// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,buf,p);if(r!==undefined)return r;if(this.lastNeed<=buf.length){buf.copy(this.lastChar,p,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal);}buf.copy(this.lastChar,p,0,buf.length);this.lastNeed-=buf.length;}// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf,i){var total=utf8CheckIncomplete(this,buf,i);if(!this.lastNeed)return buf.toString('utf8',i);this.lastTotal=total;var end=buf.length-(total-this.lastNeed);buf.copy(this.lastChar,0,end);return buf.toString('utf8',i,end);}// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+"\uFFFD";return r;}// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf,i){if((buf.length-i)%2===0){var r=buf.toString('utf16le',i);if(r){var c=r.charCodeAt(r.length-1);if(c>=0xD800&&c<=0xDBFF){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];return r.slice(0,-1);}}return r;}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=buf[buf.length-1];return buf.toString('utf16le',i,buf.length-1);}// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed){var end=this.lastTotal-this.lastNeed;return r+this.lastChar.toString('utf16le',0,end);}return r;}function base64Text(buf,i){var n=(buf.length-i)%3;if(n===0)return buf.toString('base64',i);this.lastNeed=3-n;this.lastTotal=3;if(n===1){this.lastChar[0]=buf[buf.length-1];}else{this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];}return buf.toString('base64',i,buf.length-n);}function base64End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+this.lastChar.toString('base64',0,3-this.lastNeed);return r;}// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf){return buf.toString(this.encoding);}function simpleEnd(buf){return buf&&buf.length?this.write(buf):'';}},{"safe-buffer":45}],47:[function(require,module,exports){module.exports=require('./readable').PassThrough;},{"./readable":48}],48:[function(require,module,exports){exports=module.exports=require('./lib/_stream_readable.js');exports.Stream=exports;exports.Readable=exports;exports.Writable=require('./lib/_stream_writable.js');exports.Duplex=require('./lib/_stream_duplex.js');exports.Transform=require('./lib/_stream_transform.js');exports.PassThrough=require('./lib/_stream_passthrough.js');},{"./lib/_stream_duplex.js":37,"./lib/_stream_passthrough.js":38,"./lib/_stream_readable.js":39,"./lib/_stream_transform.js":40,"./lib/_stream_writable.js":41}],49:[function(require,module,exports){module.exports=require('./readable').Transform;},{"./readable":48}],50:[function(require,module,exports){module.exports=require('./lib/_stream_writable.js');},{"./lib/_stream_writable.js":41}],51:[function(require,module,exports){/* eslint-disable node/no-deprecated-api */var buffer=require('buffer');var Buffer=buffer.Buffer;// alternative to using Object.keys for old browsers
function copyProps(src,dst){for(var key in src){dst[key]=src[key];}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer;}else{// Copy properties from require('buffer')
copyProps(buffer,exports);exports.Buffer=SafeBuffer;}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length);}SafeBuffer.prototype=Object.create(Buffer.prototype);// Copy static methods from Buffer
copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==='number'){throw new TypeError('Argument must not be a number');}return Buffer(arg,encodingOrOffset,length);};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==='string'){buf.fill(fill,encoding);}else{buf.fill(fill);}}else{buf.fill(0);}return buf;};SafeBuffer.allocUnsafe=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return Buffer(size);};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return buffer.SlowBuffer(size);};},{"buffer":21}],52:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports=Stream;var EE=require('events').EventEmitter;var inherits=require('inherits');inherits(Stream,EE);Stream.Readable=require('readable-stream/readable.js');Stream.Writable=require('readable-stream/writable.js');Stream.Duplex=require('readable-stream/duplex.js');Stream.Transform=require('readable-stream/transform.js');Stream.PassThrough=require('readable-stream/passthrough.js');// Backwards-compat with node 0.4.x
Stream.Stream=Stream;// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.
function Stream(){EE.call(this);}Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){if(dest.writable){if(false===dest.write(chunk)&&source.pause){source.pause();}}}source.on('data',ondata);function ondrain(){if(source.readable&&source.resume){source.resume();}}dest.on('drain',ondrain);// If the 'end' option is not supplied, dest.end() will be called when
// source gets the 'end' or 'close' events.  Only dest.end() once.
if(!dest._isStdio&&(!options||options.end!==false)){source.on('end',onend);source.on('close',onclose);}var didOnEnd=false;function onend(){if(didOnEnd)return;didOnEnd=true;dest.end();}function onclose(){if(didOnEnd)return;didOnEnd=true;if(typeof dest.destroy==='function')dest.destroy();}// don't leave dangling pipes when there are errors.
function onerror(er){cleanup();if(EE.listenerCount(this,'error')===0){throw er;// Unhandled stream error in pipe.
}}source.on('error',onerror);dest.on('error',onerror);// remove all the event listeners that were added.
function cleanup(){source.removeListener('data',ondata);dest.removeListener('drain',ondrain);source.removeListener('end',onend);source.removeListener('close',onclose);source.removeListener('error',onerror);dest.removeListener('error',onerror);source.removeListener('end',cleanup);source.removeListener('close',cleanup);dest.removeListener('close',cleanup);}source.on('end',cleanup);source.on('close',cleanup);dest.on('close',cleanup);dest.emit('pipe',source);// Allow for unix-like usage: A.pipe(B).pipe(C)
return dest;};},{"events":24,"inherits":27,"readable-stream/duplex.js":36,"readable-stream/passthrough.js":47,"readable-stream/readable.js":48,"readable-stream/transform.js":49,"readable-stream/writable.js":50}],53:[function(require,module,exports){(function(global){var ClientRequest=require('./lib/request');var response=require('./lib/response');var extend=require('xtend');var statusCodes=require('builtin-status-codes');var url=require('url');var http=exports;http.request=function(opts,cb){if(typeof opts==='string')opts=url.parse(opts);else opts=extend(opts);// Normally, the page is loaded from http or https, so not specifying a protocol
// will result in a (valid) protocol-relative url. However, this won't work if
// the protocol is something else, like 'file:'
var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?'http:':'';var protocol=opts.protocol||defaultProtocol;var host=opts.hostname||opts.host;var port=opts.port;var path=opts.path||'/';// Necessary for IPv6 addresses
if(host&&host.indexOf(':')!==-1)host='['+host+']';// This may be a relative url. The browser should always be able to interpret it correctly.
opts.url=(host?protocol+'//'+host:'')+(port?':'+port:'')+path;opts.method=(opts.method||'GET').toUpperCase();opts.headers=opts.headers||{};// Also valid opts.auth, opts.mode
var req=new ClientRequest(opts);if(cb)req.on('response',cb);return req;};http.get=function get(opts,cb){var req=http.request(opts,cb);req.end();return req;};http.ClientRequest=ClientRequest;http.IncomingMessage=response.IncomingMessage;http.Agent=function(){};http.Agent.defaultMaxSockets=4;http.globalAgent=new http.Agent();http.STATUS_CODES=statusCodes;http.METHODS=['CHECKOUT','CONNECT','COPY','DELETE','GET','HEAD','LOCK','M-SEARCH','MERGE','MKACTIVITY','MKCOL','MOVE','NOTIFY','OPTIONS','PATCH','POST','PROPFIND','PROPPATCH','PURGE','PUT','REPORT','SEARCH','SUBSCRIBE','TRACE','UNLOCK','UNSUBSCRIBE'];}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./lib/request":55,"./lib/response":56,"builtin-status-codes":22,"url":74,"xtend":77}],54:[function(require,module,exports){(function(global){exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream);exports.writableStream=isFunction(global.WritableStream);exports.abortController=isFunction(global.AbortController);// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr;function getXHR(){// Cache the xhr value
if(xhr!==undefined)return xhr;if(global.XMLHttpRequest){xhr=new global.XMLHttpRequest();// If XDomainRequest is available (ie only, where xhr might not work
// cross domain), use the page location. Otherwise use example.com
// Note: this doesn't actually make an http request.
try{xhr.open('GET',global.XDomainRequest?'/':'https://example.com');}catch(e){xhr=null;}}else{// Service workers don't have XHR
xhr=null;}return xhr;}function checkTypeSupport(type){var xhr=getXHR();if(!xhr)return false;try{xhr.responseType=type;return xhr.responseType===type;}catch(e){}return false;}// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer=exports.fetch||checkTypeSupport('arraybuffer');// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream=!exports.fetch&&checkTypeSupport('ms-stream');exports.mozchunkedarraybuffer=!exports.fetch&&checkTypeSupport('moz-chunked-arraybuffer');// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType=exports.fetch||(getXHR()?isFunction(getXHR().overrideMimeType):false);function isFunction(value){return typeof value==='function';}xhr=null;// Help gc
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],55:[function(require,module,exports){(function(process,global,Buffer){var capability=require('./capability');var inherits=require('inherits');var response=require('./response');var stream=require('readable-stream');var IncomingMessage=response.IncomingMessage;var rStates=response.readyStates;function decideMode(preferBinary,useFetch){if(capability.fetch&&useFetch){return'fetch';}else if(capability.mozchunkedarraybuffer){return'moz-chunked-arraybuffer';}else if(capability.msstream){return'ms-stream';}else if(capability.arraybuffer&&preferBinary){return'arraybuffer';}else{return'text';}}var ClientRequest=module.exports=function(opts){var self=this;stream.Writable.call(self);self._opts=opts;self._body=[];self._headers={};if(opts.auth)self.setHeader('Authorization','Basic '+Buffer.from(opts.auth).toString('base64'));Object.keys(opts.headers).forEach(function(name){self.setHeader(name,opts.headers[name]);});var preferBinary;var useFetch=true;if(opts.mode==='disable-fetch'||'requestTimeout'in opts&&!capability.abortController){// If the use of XHR should be preferred. Not typically needed.
useFetch=false;preferBinary=true;}else if(opts.mode==='prefer-streaming'){// If streaming is a high priority but binary compatibility and
// the accuracy of the 'content-type' header aren't
preferBinary=false;}else if(opts.mode==='allow-wrong-content-type'){// If streaming is more important than preserving the 'content-type' header
preferBinary=!capability.overrideMimeType;}else if(!opts.mode||opts.mode==='default'||opts.mode==='prefer-fast'){// Use binary if text streaming may corrupt data or the content-type header, or for speed
preferBinary=true;}else{throw new Error('Invalid value for opts.mode');}self._mode=decideMode(preferBinary,useFetch);self._fetchTimer=null;self.on('finish',function(){self._onFinish();});};inherits(ClientRequest,stream.Writable);ClientRequest.prototype.setHeader=function(name,value){var self=this;var lowerName=name.toLowerCase();// This check is not necessary, but it prevents warnings from browsers about setting unsafe
// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
// http-browserify did it, so I will too.
if(unsafeHeaders.indexOf(lowerName)!==-1)return;self._headers[lowerName]={name:name,value:value};};ClientRequest.prototype.getHeader=function(name){var header=this._headers[name.toLowerCase()];if(header)return header.value;return null;};ClientRequest.prototype.removeHeader=function(name){var self=this;delete self._headers[name.toLowerCase()];};ClientRequest.prototype._onFinish=function(){var self=this;if(self._destroyed)return;var opts=self._opts;var headersObj=self._headers;var body=null;if(opts.method!=='GET'&&opts.method!=='HEAD'){body=new Blob(self._body,{type:(headersObj['content-type']||{}).value||''});}// create flattened list of headers
var headersList=[];Object.keys(headersObj).forEach(function(keyName){var name=headersObj[keyName].name;var value=headersObj[keyName].value;if(Array.isArray(value)){value.forEach(function(v){headersList.push([name,v]);});}else{headersList.push([name,value]);}});if(self._mode==='fetch'){var signal=null;var fetchTimer=null;if(capability.abortController){var controller=new AbortController();signal=controller.signal;self._fetchAbortController=controller;if('requestTimeout'in opts&&opts.requestTimeout!==0){self._fetchTimer=global.setTimeout(function(){self.emit('requestTimeout');if(self._fetchAbortController)self._fetchAbortController.abort();},opts.requestTimeout);}}global.fetch(self._opts.url,{method:self._opts.method,headers:headersList,body:body||undefined,mode:'cors',credentials:opts.withCredentials?'include':'same-origin',signal:signal}).then(function(response){self._fetchResponse=response;self._connect();},function(reason){global.clearTimeout(self._fetchTimer);if(!self._destroyed)self.emit('error',reason);});}else{var xhr=self._xhr=new global.XMLHttpRequest();try{xhr.open(self._opts.method,self._opts.url,true);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}// Can't set responseType on really old browsers
if('responseType'in xhr)xhr.responseType=self._mode;if('withCredentials'in xhr)xhr.withCredentials=!!opts.withCredentials;if(self._mode==='text'&&'overrideMimeType'in xhr)xhr.overrideMimeType('text/plain; charset=x-user-defined');if('requestTimeout'in opts){xhr.timeout=opts.requestTimeout;xhr.ontimeout=function(){self.emit('requestTimeout');};}headersList.forEach(function(header){xhr.setRequestHeader(header[0],header[1]);});self._response=null;xhr.onreadystatechange=function(){switch(xhr.readyState){case rStates.LOADING:case rStates.DONE:self._onXHRProgress();break;}};// Necessary for streaming in Firefox, since xhr.response is ONLY defined
// in onprogress, not in onreadystatechange with xhr.readyState = 3
if(self._mode==='moz-chunked-arraybuffer'){xhr.onprogress=function(){self._onXHRProgress();};}xhr.onerror=function(){if(self._destroyed)return;self.emit('error',new Error('XHR error'));};try{xhr.send(body);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}}};/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */function statusValid(xhr){try{var status=xhr.status;return status!==null&&status!==0;}catch(e){return false;}}ClientRequest.prototype._onXHRProgress=function(){var self=this;if(!statusValid(self._xhr)||self._destroyed)return;if(!self._response)self._connect();self._response._onXHRProgress();};ClientRequest.prototype._connect=function(){var self=this;if(self._destroyed)return;self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode,self._fetchTimer);self._response.on('error',function(err){self.emit('error',err);});self.emit('response',self._response);};ClientRequest.prototype._write=function(chunk,encoding,cb){var self=this;self._body.push(chunk);cb();};ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){var self=this;self._destroyed=true;global.clearTimeout(self._fetchTimer);if(self._response)self._response._destroyed=true;if(self._xhr)self._xhr.abort();else if(self._fetchAbortController)self._fetchAbortController.abort();};ClientRequest.prototype.end=function(data,encoding,cb){var self=this;if(typeof data==='function'){cb=data;data=undefined;}stream.Writable.prototype.end.call(self,data,encoding,cb);};ClientRequest.prototype.flushHeaders=function(){};ClientRequest.prototype.setTimeout=function(){};ClientRequest.prototype.setNoDelay=function(){};ClientRequest.prototype.setSocketKeepAlive=function(){};// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders=['accept-charset','accept-encoding','access-control-request-headers','access-control-request-method','connection','content-length','cookie','cookie2','date','dnt','expect','host','keep-alive','origin','referer','te','trailer','transfer-encoding','upgrade','via'];}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":54,"./response":56,"_process":31,"buffer":21,"inherits":27,"readable-stream":71}],56:[function(require,module,exports){(function(process,global,Buffer){var capability=require('./capability');var inherits=require('inherits');var stream=require('readable-stream');var rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};var IncomingMessage=exports.IncomingMessage=function(xhr,response,mode,fetchTimer){var self=this;stream.Readable.call(self);self._mode=mode;self.headers={};self.rawHeaders=[];self.trailers={};self.rawTrailers=[];// Fake the 'close' event, but only once 'end' fires
self.on('end',function(){// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
process.nextTick(function(){self.emit('close');});});if(mode==='fetch'){var read=function read(){reader.read().then(function(result){if(self._destroyed)return;if(result.done){global.clearTimeout(fetchTimer);self.push(null);return;}self.push(Buffer.from(result.value));read();}).catch(function(err){global.clearTimeout(fetchTimer);if(!self._destroyed)self.emit('error',err);});};self._fetchResponse=response;self.url=response.url;self.statusCode=response.status;self.statusMessage=response.statusText;response.headers.forEach(function(header,key){self.headers[key.toLowerCase()]=header;self.rawHeaders.push(key,header);});if(capability.writableStream){var writable=new WritableStream({write:function write(chunk){return new Promise(function(resolve,reject){if(self._destroyed){reject();}else if(self.push(Buffer.from(chunk))){resolve();}else{self._resumeFetch=resolve;}});},close:function close(){global.clearTimeout(fetchTimer);if(!self._destroyed)self.push(null);},abort:function abort(err){if(!self._destroyed)self.emit('error',err);}});try{response.body.pipeTo(writable).catch(function(err){global.clearTimeout(fetchTimer);if(!self._destroyed)self.emit('error',err);});return;}catch(e){}// pipeTo method isn't defined. Can't find a better way to feature test this
}// fallback for when writableStream or pipeTo aren't available
var reader=response.body.getReader();read();}else{self._xhr=xhr;self._pos=0;self.url=xhr.responseURL;self.statusCode=xhr.status;self.statusMessage=xhr.statusText;var headers=xhr.getAllResponseHeaders().split(/\r?\n/);headers.forEach(function(header){var matches=header.match(/^([^:]+):\s*(.*)/);if(matches){var key=matches[1].toLowerCase();if(key==='set-cookie'){if(self.headers[key]===undefined){self.headers[key]=[];}self.headers[key].push(matches[2]);}else if(self.headers[key]!==undefined){self.headers[key]+=', '+matches[2];}else{self.headers[key]=matches[2];}self.rawHeaders.push(matches[1],matches[2]);}});self._charset='x-user-defined';if(!capability.overrideMimeType){var mimeType=self.rawHeaders['mime-type'];if(mimeType){var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);if(charsetMatch){self._charset=charsetMatch[1].toLowerCase();}}if(!self._charset)self._charset='utf-8';// best guess
}}};inherits(IncomingMessage,stream.Readable);IncomingMessage.prototype._read=function(){var self=this;var resolve=self._resumeFetch;if(resolve){self._resumeFetch=null;resolve();}};IncomingMessage.prototype._onXHRProgress=function(){var self=this;var xhr=self._xhr;var response=null;switch(self._mode){case'text':response=xhr.responseText;if(response.length>self._pos){var newData=response.substr(self._pos);if(self._charset==='x-user-defined'){var buffer=Buffer.alloc(newData.length);for(var i=0;i<newData.length;i++){buffer[i]=newData.charCodeAt(i)&0xff;}self.push(buffer);}else{self.push(newData,self._charset);}self._pos=response.length;}break;case'arraybuffer':if(xhr.readyState!==rStates.DONE||!xhr.response)break;response=xhr.response;self.push(Buffer.from(new Uint8Array(response)));break;case'moz-chunked-arraybuffer':// take whole
response=xhr.response;if(xhr.readyState!==rStates.LOADING||!response)break;self.push(Buffer.from(new Uint8Array(response)));break;case'ms-stream':response=xhr.response;if(xhr.readyState!==rStates.LOADING)break;var reader=new global.MSStreamReader();reader.onprogress=function(){if(reader.result.byteLength>self._pos){self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))));self._pos=reader.result.byteLength;}};reader.onload=function(){self.push(null);};// reader.onerror = ??? // TODO: this
reader.readAsArrayBuffer(response);break;}// The ms-stream case handles end separately in reader.onload()
if(self._xhr.readyState===rStates.DONE&&self._mode!=='ms-stream'){self.push(null);}};}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":54,"_process":31,"buffer":21,"inherits":27,"readable-stream":71}],57:[function(require,module,exports){'use strict';function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;subClass.__proto__=superClass;}var codes={};function createErrorType(code,message,Base){if(!Base){Base=Error;}function getMessage(arg1,arg2,arg3){if(typeof message==='string'){return message;}else{return message(arg1,arg2,arg3);}}var NodeError=/*#__PURE__*/function(_Base){_inheritsLoose(NodeError,_Base);function NodeError(arg1,arg2,arg3){return _Base.call(this,getMessage(arg1,arg2,arg3))||this;}return NodeError;}(Base);NodeError.prototype.name=Base.name;NodeError.prototype.code=code;codes[code]=NodeError;}// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected,thing){if(Array.isArray(expected)){var len=expected.length;expected=expected.map(function(i){return String(i);});if(len>2){return"one of ".concat(thing," ").concat(expected.slice(0,len-1).join(', '),", or ")+expected[len-1];}else if(len===2){return"one of ".concat(thing," ").concat(expected[0]," or ").concat(expected[1]);}else{return"of ".concat(thing," ").concat(expected[0]);}}else{return"of ".concat(thing," ").concat(String(expected));}}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str,search,pos){return str.substr(!pos||pos<0?0:+pos,search.length)===search;}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str,search,this_len){if(this_len===undefined||this_len>str.length){this_len=str.length;}return str.substring(this_len-search.length,this_len)===search;}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str,search,start){if(typeof start!=='number'){start=0;}if(start+search.length>str.length){return false;}else{return str.indexOf(search,start)!==-1;}}createErrorType('ERR_INVALID_OPT_VALUE',function(name,value){return'The value "'+value+'" is invalid for option "'+name+'"';},TypeError);createErrorType('ERR_INVALID_ARG_TYPE',function(name,expected,actual){// determiner: 'must be' or 'must not be'
var determiner;if(typeof expected==='string'&&startsWith(expected,'not ')){determiner='must not be';expected=expected.replace(/^not /,'');}else{determiner='must be';}var msg;if(endsWith(name,' argument')){// For cases like 'first argument'
msg="The ".concat(name," ").concat(determiner," ").concat(oneOf(expected,'type'));}else{var type=includes(name,'.')?'property':'argument';msg="The \"".concat(name,"\" ").concat(type," ").concat(determiner," ").concat(oneOf(expected,'type'));}msg+=". Received type ".concat(_typeof(actual));return msg;},TypeError);createErrorType('ERR_STREAM_PUSH_AFTER_EOF','stream.push() after EOF');createErrorType('ERR_METHOD_NOT_IMPLEMENTED',function(name){return'The '+name+' method is not implemented';});createErrorType('ERR_STREAM_PREMATURE_CLOSE','Premature close');createErrorType('ERR_STREAM_DESTROYED',function(name){return'Cannot call '+name+' after a stream was destroyed';});createErrorType('ERR_MULTIPLE_CALLBACK','Callback called multiple times');createErrorType('ERR_STREAM_CANNOT_PIPE','Cannot pipe, not readable');createErrorType('ERR_STREAM_WRITE_AFTER_END','write after end');createErrorType('ERR_STREAM_NULL_VALUES','May not write null values to stream',TypeError);createErrorType('ERR_UNKNOWN_ENCODING',function(arg){return'Unknown encoding: '+arg;},TypeError);createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT','stream.unshift() after end event');module.exports.codes=codes;},{}],58:[function(require,module,exports){(function(process){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';/*<replacement>*/var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj){keys.push(key);}return keys;};/*</replacement>*/module.exports=Duplex;var Readable=require('./_stream_readable');var Writable=require('./_stream_writable');require('inherits')(Duplex,Readable);{// Allow the keys array to be GC'ed.
var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}}function Duplex(options){if(!_instanceof(this,Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);this.allowHalfOpen=true;if(options){if(options.readable===false)this.readable=false;if(options.writable===false)this.writable=false;if(options.allowHalfOpen===false){this.allowHalfOpen=false;this.once('end',onend);}}}Object.defineProperty(Duplex.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});Object.defineProperty(Duplex.prototype,'writableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer();}});Object.defineProperty(Duplex.prototype,'writableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.length;}});// the no-half-open enforcer
function onend(){// If the writable side ended, then we're ok.
if(this._writableState.ended)return;// no more data can be written.
// But allow more writes to happen in this tick.
process.nextTick(onEndNT,this);}function onEndNT(self){self.end();}Object.defineProperty(Duplex.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._readableState===undefined||this._writableState===undefined){return false;}return this._readableState.destroyed&&this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(this._readableState===undefined||this._writableState===undefined){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;this._writableState.destroyed=value;}});}).call(this,require('_process'));},{"./_stream_readable":60,"./_stream_writable":62,"_process":31,"inherits":27}],59:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';module.exports=PassThrough;var Transform=require('./_stream_transform');require('inherits')(PassThrough,Transform);function PassThrough(options){if(!_instanceof(this,PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};},{"./_stream_transform":61,"inherits":27}],60:[function(require,module,exports){(function(process,global){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';module.exports=Readable;/*<replacement>*/var Duplex;/*</replacement>*/Readable.ReadableState=ReadableState;/*<replacement>*/var EE=require('events').EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length;};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/var Buffer=require('buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||_instanceof(obj,OurUint8Array);}/*<replacement>*/var debugUtil=require('util');var debug;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream');}else{debug=function debug(){};}/*</replacement>*/var BufferList=require('./internal/streams/buffer_list');var destroyImpl=require('./internal/streams/destroy');var _require=require('./internal/streams/state'),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require('../errors').codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_STREAM_PUSH_AFTER_EOF=_require$codes.ERR_STREAM_PUSH_AFTER_EOF,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_STREAM_UNSHIFT_AFTER_END_EVENT=_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;// Lazy loaded to improve the startup performance.
var StringDecoder;var createReadableStreamAsyncIterator;var from;require('inherits')(Readable,Stream);var errorOrDestroy=destroyImpl.errorOrDestroy;var kProxyEvents=['error','close','destroy','pause','resume'];function prependListener(emitter,event,fn){// Sadly this is not cacheable as some libraries bundle their own
// event emitter implementation with them.
if(typeof emitter.prependListener==='function')return emitter.prependListener(event,fn);// This is a hack to make sure that our error handler is attached before any
// userland ones.  NEVER DO THIS. This is here only because this code needs
// to continue to work with older versions of Node.js that do not include
// the prependListener() method. The goal is to eventually remove this hack.
if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(Array.isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}function ReadableState(options,stream,isDuplex){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream.
// These options can be provided separately as readableXXX and writableXXX.
if(typeof isDuplex!=='boolean')isDuplex=_instanceof(stream,Duplex);// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.readableObjectMode;// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
this.highWaterMark=getHighWaterMark(this,options,'readableHighWaterMark',isDuplex);// A linked list is used to store data chunks instead of an array because the
// linked list can remove elements from the beginning faster than
// array.shift()
this.buffer=new BufferList();this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;// a flag to be able to tell if the event 'readable'/'data' is emitted
// immediately, or on a later tick.  We set this to true at first, because
// any actions that shouldn't happen until "later" should generally also
// not happen before the first read call.
this.sync=true;// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;this.paused=true;// Should close be emitted on destroy. Defaults to true.
this.emitClose=options.emitClose!==false;// Should .destroy() be called after 'end' (and potentially 'finish')
this.autoDestroy=!!options.autoDestroy;// has it been destroyed
this.destroyed=false;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain=0;// if true, a maybeReadMore has been scheduled
this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}function Readable(options){Duplex=Duplex||require('./_stream_duplex');if(!_instanceof(this,Readable))return new Readable(options);// Checking for a Stream.Duplex instance is faster here instead of inside
// the ReadableState constructor, at least with V8 6.5
var isDuplex=_instanceof(this,Duplex);this._readableState=new ReadableState(options,this,isDuplex);// legacy
this.readable=true;if(options){if(typeof options.read==='function')this._read=options.read;if(typeof options.destroy==='function')this._destroy=options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._readableState===undefined){return false;}return this._readableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._readableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){cb(err);};// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding='';}skipChunkCheck=true;}}else{skipChunkCheck=true;}return readableAddChunk(this,chunk,encoding,false,skipChunkCheck);};// Unshift should *always* be something directly out of read()
Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,true,false);};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){debug('readableAddChunk',chunk);var state=stream._readableState;if(chunk===null){state.reading=false;onEofChunk(stream,state);}else{var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){errorOrDestroy(stream,er);}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=='string'&&!state.objectMode&&Object.getPrototypeOf(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk);}if(addToFront){if(state.endEmitted)errorOrDestroy(stream,new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream,state,chunk,true);}else if(state.ended){errorOrDestroy(stream,new ERR_STREAM_PUSH_AFTER_EOF());}else if(state.destroyed){return false;}else{state.reading=false;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,false);else maybeReadMore(stream,state);}else{addChunk(stream,state,chunk,false);}}}else if(!addToFront){state.reading=false;maybeReadMore(stream,state);}}// We can push more data if we are below the highWaterMark.
// Also, if we have no data yet, we can stand some more bytes.
// This is to work around cases where hwm=0, such as the repl.
return!state.ended&&(state.length<state.highWaterMark||state.length===0);}function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){state.awaitDrain=0;stream.emit('data',chunk);}else{// update the buffer info.
state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}maybeReadMore(stream,state);}function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE('chunk',['string','Buffer','Uint8Array'],chunk);}return er;}Readable.prototype.isPaused=function(){return this._readableState.flowing===false;};// backwards compatibility.
Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;var decoder=new StringDecoder(enc);this._readableState.decoder=decoder;// If setEncoding(null), decoder.encoding equals utf8
this._readableState.encoding=this._readableState.decoder.encoding;// Iterate over current buffer to convert already stored Buffers:
var p=this._readableState.buffer.head;var content='';while(p!==null){content+=decoder.write(p.data);p=p.next;}this._readableState.buffer.clear();if(content!=='')this._readableState.buffer.push(content);this._readableState.length=content.length;return this;};// Don't raise the hwm > 1GB
var MAX_HWM=0x40000000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){// TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
n=MAX_HWM;}else{// Get the next highest power of 2 to prevent increasing hwm excessively in
// tiny amounts
n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n;}// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){// Only flow one buffer at a time
if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length;}// If we're asking for more than the current hwm, then raise the hwm.
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;// Don't have enough
if(!state.ended){state.needReadable=true;return 0;}return state.length;}// you can override either this method, or the async _read(n) below.
Readable.prototype.read=function(n){debug('read',n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=false;// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if(n===0&&state.needReadable&&((state.highWaterMark!==0?state.length>=state.highWaterMark:state.length>0)||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null;}n=howMuchToRead(n,state);// if we've ended, and we're now clear, then finish it up.
if(n===0&&state.ended){if(state.length===0)endReadable(this);return null;}// All the actual chunk generation logic needs to be
// *below* the call to _read.  The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.
// Note that this may be asynchronous, or synchronous.  Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead=state.needReadable;debug('need readable',doRead);// if we currently have less than the highWaterMark, then also read some
if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug('length less than watermark',doRead);}// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if(state.ended||state.reading){doRead=false;debug('reading or ended',doRead);}else if(doRead){debug('do read');state.reading=true;state.sync=true;// if the length is currently zero, then we *need* a readable event.
if(state.length===0)state.needReadable=true;// call internal read method
this._read(state.highWaterMark);state.sync=false;// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if(!state.reading)n=howMuchToRead(nOrig,state);}var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=state.length<=state.highWaterMark;n=0;}else{state.length-=n;state.awaitDrain=0;}if(state.length===0){// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if(!state.ended)state.needReadable=true;// If we tried to read() past the EOF, then emit end on the next tick.
if(nOrig!==n&&state.ended)endReadable(this);}if(ret!==null)this.emit('data',ret);return ret;};function onEofChunk(stream,state){debug('onEofChunk');if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;if(state.sync){// if we are sync, wait until next tick to emit the data.
// Otherwise we risk emitting data in the flow()
// the readable code triggers during a read() call
emitReadable(stream);}else{// emit 'readable' now to make sure it gets picked up.
state.needReadable=false;if(!state.emittedReadable){state.emittedReadable=true;emitReadable_(stream);}}}// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream){var state=stream._readableState;debug('emitReadable',state.needReadable,state.emittedReadable);state.needReadable=false;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=true;process.nextTick(emitReadable_,stream);}}function emitReadable_(stream){var state=stream._readableState;debug('emitReadable_',state.destroyed,state.length,state.ended);if(!state.destroyed&&(state.length||state.ended)){stream.emit('readable');state.emittedReadable=false;}// The stream needs another readable event if
// 1. It is not flowing, as the flow mechanism will take
//    care of it.
// 2. It is not ended.
// 3. It is below the highWaterMark, so we can schedule
//    another readable later.
state.needReadable=!state.flowing&&!state.ended&&state.length<=state.highWaterMark;flow(stream);}// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;process.nextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){// Attempt to read more data if we should.
//
// The conditions for reading more data are (one of):
// - Not enough data buffered (state.length < state.highWaterMark). The loop
//   is responsible for filling the buffer with enough data if such data
//   is available. If highWaterMark is 0 and we are not in the flowing mode
//   we should _not_ attempt to buffer any extra data. We'll get more data
//   when the stream consumer calls read() instead.
// - No data in the buffer, and the stream is in flowing mode. In this mode
//   the loop below is responsible for ensuring read() is called. Failing to
//   call read here would abort the flow and there's no other mechanism for
//   continuing the flow if the stream consumer has just subscribed to the
//   'data' event.
//
// In addition to the above conditions to keep reading data, the following
// conditions prevent the data from being read:
// - The stream has ended (state.ended).
// - There is already a pending 'read' operation (state.reading). This is a
//   case where the the stream has called the implementation defined _read()
//   method, but they are processing the call asynchronously and have _not_
//   called push() with new data. In this case we skip performing more
//   read()s. The execution ends in this method again after the _read() ends
//   up calling push() with more data.
while(!state.reading&&!state.ended&&(state.length<state.highWaterMark||state.flowing&&state.length===0)){var len=state.length;debug('maybeReadMore read 0');stream.read(0);if(len===state.length)// didn't get any data, stop spinning.
break;}state.readingMore=false;}// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read=function(n){errorOrDestroy(this,new ERR_METHOD_NOT_IMPLEMENTED('_read()'));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break;}state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)process.nextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable,unpipeInfo){debug('onunpipe');if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===false){unpipeInfo.hasUnpiped=true;cleanup();}}}function onend(){debug('onend');dest.end();}// when the dest drains, it reduces the awaitDrain counter
// on the source.  This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=false;function cleanup(){debug('cleanup');// cleanup event handlers once the pipe is broken
dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',unpipe);src.removeListener('data',ondata);cleanedUp=true;// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}src.on('data',ondata);function ondata(chunk){debug('ondata');var ret=dest.write(chunk);debug('dest.write',ret);if(ret===false){// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',state.awaitDrain);state.awaitDrain++;}src.pause();}}// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)errorOrDestroy(dest,er);}// Make sure our error handler is attached before userland ones.
prependListener(dest,'error',onerror);// Both close and finish should trigger unpipe, but only once.
function onclose(){dest.removeListener('finish',onfinish);unpipe();}dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe();}dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest);}// tell the dest that it's being piped to
dest.emit('pipe',src);// start the flow if it hasn't been started already.
if(!state.flowing){debug('pipe resume');src.resume();}return dest;};function pipeOnDrain(src){return function pipeOnDrainFunctionResult(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=true;flow(src);}};}Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:false};// if we're not piping anywhere, then do nothing.
if(state.pipesCount===0)return this;// just one destination.  most common case.
if(state.pipesCount===1){// passed in one, but it's not the right one.
if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;// got a match.
state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit('unpipe',this,unpipeInfo);return this;}// slow case. multiple pipe destinations.
if(!dest){// remove all.
var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++){dests[i].emit('unpipe',this,{hasUnpiped:false});}return this;}// try to find the right one.
var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this,unpipeInfo);return this;};// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);var state=this._readableState;if(ev==='data'){// update readableListening so that resume() may be a no-op
// a few lines down. This is needed to support once('readable').
state.readableListening=this.listenerCount('readable')>0;// Try start flowing on next tick if stream isn't explicitly paused
if(state.flowing!==false)this.resume();}else if(ev==='readable'){if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=true;state.flowing=false;state.emittedReadable=false;debug('on readable',state.length,state.reading);if(state.length){emitReadable(this);}else if(!state.reading){process.nextTick(nReadingNextTick,this);}}}return res;};Readable.prototype.addListener=Readable.prototype.on;Readable.prototype.removeListener=function(ev,fn){var res=Stream.prototype.removeListener.call(this,ev,fn);if(ev==='readable'){// We need to check if there is someone still listening to
// readable and reset the state. However this needs to happen
// after readable has been emitted but before I/O (nextTick) to
// support once('readable', fn) cycles. This means that calling
// resume within the same tick will have no
// effect.
process.nextTick(updateReadableListening,this);}return res;};Readable.prototype.removeAllListeners=function(ev){var res=Stream.prototype.removeAllListeners.apply(this,arguments);if(ev==='readable'||ev===undefined){// We need to check if there is someone still listening to
// readable and reset the state. However this needs to happen
// after readable has been emitted but before I/O (nextTick) to
// support once('readable', fn) cycles. This means that calling
// resume within the same tick will have no
// effect.
process.nextTick(updateReadableListening,this);}return res;};function updateReadableListening(self){var state=self._readableState;state.readableListening=self.listenerCount('readable')>0;if(state.resumeScheduled&&!state.paused){// flowing needs to be set to true now, otherwise
// the upcoming resume will not flow.
state.flowing=true;// crude way to check if we should resume
}else if(self.listenerCount('data')>0){self.resume();}}function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0);}// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');// we flow only if there is no one listening
// for readable, but we still have to call
// resume()
state.flowing=!state.readableListening;resume(this,state);}state.paused=false;return this;};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;process.nextTick(resume_,stream,state);}}function resume_(stream,state){debug('resume',state.reading);if(!state.reading){stream.read(0);}state.resumeScheduled=false;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(this._readableState.flowing!==false){debug('pause');this._readableState.flowing=false;this.emit('pause');}this._readableState.paused=true;return this;};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);while(state.flowing&&stream.read()!==null){;}}// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap=function(stream){var _this=this;var state=this._readableState;var paused=false;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)_this.push(chunk);}_this.push(null);});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);// don't skip over falsy values in objectMode
if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=_this.push(chunk);if(!ret){paused=true;stream.pause();}});// proxy all the other methods.
// important when wrapping filters and duplexes.
for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function methodWrap(method){return function methodWrapReturnFunction(){return stream[method].apply(stream,arguments);};}(i);}}// proxy certain important events.
for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],this.emit.bind(this,kProxyEvents[n]));}// when we try to consume some more bytes, simply unpause the
// underlying stream.
this._read=function(n){debug('wrapped _read',n);if(paused){paused=false;stream.resume();}};return this;};if(typeof Symbol==='function'){Readable.prototype[Symbol.asyncIterator]=function(){if(createReadableStreamAsyncIterator===undefined){createReadableStreamAsyncIterator=require('./internal/streams/async_iterator');}return createReadableStreamAsyncIterator(this);};}Object.defineProperty(Readable.prototype,'readableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.highWaterMark;}});Object.defineProperty(Readable.prototype,'readableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState&&this._readableState.buffer;}});Object.defineProperty(Readable.prototype,'readableFlowing',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.flowing;},set:function set(state){if(this._readableState){this._readableState.flowing=state;}}});// exposed for testing purposes only.
Readable._fromList=fromList;Object.defineProperty(Readable.prototype,'readableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.length;}});// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n,state){// nothing buffered
if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){// read it all, truncate the list
if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.first();else ret=state.buffer.concat(state.length);state.buffer.clear();}else{// read part of list
ret=state.buffer.consume(n,state.decoder);}return ret;}function endReadable(stream){var state=stream._readableState;debug('endReadable',state.endEmitted);if(!state.endEmitted){state.ended=true;process.nextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){debug('endReadableNT',state.endEmitted,state.length);// Check that we didn't get one last unshift.
if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit('end');if(state.autoDestroy){// In case of duplex streams we need a way to detect
// if the writable side is ready for autoDestroy as well
var wState=stream._writableState;if(!wState||wState.autoDestroy&&wState.finished){stream.destroy();}}}}if(typeof Symbol==='function'){Readable.from=function(iterable,opts){if(from===undefined){from=require('./internal/streams/from');}return from(Readable,iterable,opts);};}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i;}return-1;}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":57,"./_stream_duplex":58,"./internal/streams/async_iterator":63,"./internal/streams/buffer_list":64,"./internal/streams/destroy":65,"./internal/streams/from":67,"./internal/streams/state":69,"./internal/streams/stream":70,"_process":31,"buffer":21,"events":24,"inherits":27,"string_decoder/":72,"util":20}],61:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';module.exports=Transform;var _require$codes=require('../errors').codes,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_TRANSFORM_ALREADY_TRANSFORMING=_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,ERR_TRANSFORM_WITH_LENGTH_0=_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;var Duplex=require('./_stream_duplex');require('inherits')(Transform,Duplex);function afterTransform(er,data){var ts=this._transformState;ts.transforming=false;var cb=ts.writecb;if(cb===null){return this.emit('error',new ERR_MULTIPLE_CALLBACK());}ts.writechunk=null;ts.writecb=null;if(data!=null)// single equals check for both `null` and `undefined`
this.push(data);cb(er);var rs=this._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){this._read(rs.highWaterMark);}}function Transform(options){if(!_instanceof(this,Transform))return new Transform(options);Duplex.call(this,options);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};// start out asking for a readable event once data is transformed.
this._readableState.needReadable=true;// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync=false;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush;}// When the writable side finishes, then flush out anything remaining.
this.on('prefinish',prefinish);}function prefinish(){var _this=this;if(typeof this._flush==='function'&&!this._readableState.destroyed){this._flush(function(er,data){done(_this,er,data);});}else{done(this,null,null);}}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding);};// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else{// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform=true;}};Transform.prototype._destroy=function(err,cb){Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);});};function done(stream,er,data){if(er)return stream.emit('error',er);if(data!=null)// single equals check for both `null` and `undefined`
stream.push(data);// TODO(BridgeAR): Write a test for these two error cases
// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
if(stream._writableState.length)throw new ERR_TRANSFORM_WITH_LENGTH_0();if(stream._transformState.transforming)throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();return stream.push(null);}},{"../errors":57,"./_stream_duplex":58,"inherits":27}],62:[function(require,module,exports){(function(process,global){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';module.exports=Writable;/* <replacement> */function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null;}// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state);};}/* </replacement> */ /*<replacement>*/var Duplex;/*</replacement>*/Writable.WritableState=WritableState;/*<replacement>*/var internalUtil={deprecate:require('util-deprecate')};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/var Buffer=require('buffer').Buffer;var OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||_instanceof(obj,OurUint8Array);}var destroyImpl=require('./internal/streams/destroy');var _require=require('./internal/streams/state'),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require('../errors').codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_STREAM_CANNOT_PIPE=_require$codes.ERR_STREAM_CANNOT_PIPE,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED,ERR_STREAM_NULL_VALUES=_require$codes.ERR_STREAM_NULL_VALUES,ERR_STREAM_WRITE_AFTER_END=_require$codes.ERR_STREAM_WRITE_AFTER_END,ERR_UNKNOWN_ENCODING=_require$codes.ERR_UNKNOWN_ENCODING;var errorOrDestroy=destroyImpl.errorOrDestroy;require('inherits')(Writable,Stream);function nop(){}function WritableState(options,stream,isDuplex){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream,
// e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
if(typeof isDuplex!=='boolean')isDuplex=_instanceof(stream,Duplex);// object stream flag to indicate whether or not this stream
// contains buffers or objects.
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.writableObjectMode;// the point at which write() starts returning false
// Note: 0 is a valid value, means that we always return false if
// the entire buffer is not flushed immediately on write()
this.highWaterMark=getHighWaterMark(this,options,'writableHighWaterMark',isDuplex);// if _final has been called
this.finalCalled=false;// drain event flag.
this.needDrain=false;// at the start of calling end()
this.ending=false;// when end() has been called, and returned
this.ended=false;// when 'finish' is emitted
this.finished=false;// has it been destroyed
this.destroyed=false;// should we decode strings into buffers before passing to _write?
// this is here so that some node-core streams can optimize string
// handling at a lower level.
var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// not an actual buffer we keep track of, but a measurement
// of how much we're waiting to get pushed to some underlying
// socket or file.
this.length=0;// a flag to see when we're in the middle of a write.
this.writing=false;// when true all writes will be buffered until .uncork() call
this.corked=0;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// a flag to know if we're processing previously buffered items, which
// may call the _write() callback in the same tick, so that we don't
// end up in an overlapped onwrite situation.
this.bufferProcessing=false;// the callback that's passed to _write(chunk,cb)
this.onwrite=function(er){onwrite(stream,er);};// the callback that the user supplies to write(chunk,encoding,cb)
this.writecb=null;// the amount that is being written when _write is called.
this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;// number of pending user-supplied write callbacks
// this must be 0 before 'finish' can be emitted
this.pendingcb=0;// emit prefinish if the only thing we're waiting for is _write cbs
// This is relevant for synchronous Transform streams
this.prefinished=false;// True if the error was already emitted and should not be thrown again
this.errorEmitted=false;// Should close be emitted on destroy. Defaults to true.
this.emitClose=options.emitClose!==false;// Should .destroy() be called after 'finish' (and potentially 'end')
this.autoDestroy=!!options.autoDestroy;// count buffered requests
this.bufferedRequestCount=0;// allocate the first CorkedRequest, there is always
// one allocated and free to use, and we maintain at most two
this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out;};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function writableStateBufferGetter(){return this.getBuffer();},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.','DEP0003')});}catch(_){}})();// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;if(typeof Symbol==='function'&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==='function'){realHasInstance=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function value(object){if(realHasInstance.call(this,object))return true;if(this!==Writable)return false;return object&&_instanceof(object._writableState,WritableState);}});}else{realHasInstance=function realHasInstance(object){return _instanceof(object,this);};}function Writable(options){Duplex=Duplex||require('./_stream_duplex');// Writable ctor is applied to Duplexes, too.
// `realHasInstance` is necessary because using plain `instanceof`
// would return false, as no `_writableState` property is attached.
// Trying to use the custom `instanceof` for Writable here will also break the
// Node.js LazyTransform implementation, which has a non-trivial getter for
// `_writableState` that would lead to infinite recursion.
// Checking for a Stream.Duplex instance is faster here instead of inside
// the WritableState constructor, at least with V8 6.5
var isDuplex=_instanceof(this,Duplex);if(!isDuplex&&!realHasInstance.call(Writable,this))return new Writable(options);this._writableState=new WritableState(options,this,isDuplex);// legacy.
this.writable=true;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;if(typeof options.destroy==='function')this._destroy=options.destroy;if(typeof options.final==='function')this._final=options.final;}Stream.call(this);}// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe=function(){errorOrDestroy(this,new ERR_STREAM_CANNOT_PIPE());};function writeAfterEnd(stream,cb){var er=new ERR_STREAM_WRITE_AFTER_END();// TODO: defer error events consistently everywhere, not just the cb
errorOrDestroy(stream,er);process.nextTick(cb,er);}// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream,state,chunk,cb){var er;if(chunk===null){er=new ERR_STREAM_NULL_VALUES();}else if(typeof chunk!=='string'&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE('chunk',['string','Buffer'],chunk);}if(er){errorOrDestroy(stream,er);process.nextTick(cb,er);return false;}return true;}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;var isBuf=!state.objectMode&&_isUint8Array(chunk);if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk);}if(typeof encoding==='function'){cb=encoding;encoding=null;}if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ending)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);}return ret;};Writable.prototype.cork=function(){this._writableState.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){// node::ParseEncoding() requires lower case.
if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new ERR_UNKNOWN_ENCODING(encoding);this._writableState.defaultEncoding=encoding;return this;};Object.defineProperty(Writable.prototype,'writableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer();}});function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){chunk=Buffer.from(chunk,encoding);}return chunk;}Object.defineProperty(Writable.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=true;encoding='buffer';chunk=newChunk;}}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;// we must ensure that previous needDrain will not be reset to false.
if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest;}else{state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else{doWrite(stream,state,false,len,chunk,encoding,cb);}return ret;}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(state.destroyed)state.onwrite(new ERR_STREAM_DESTROYED('write'));else if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){// defer the callback if we are being called synchronously
// to avoid piling up things on the stack
process.nextTick(cb,er);// this can emit finish, and it will always happen
// after error
process.nextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);}else{// the caller expect this to happen before if
// it is async
cb(er);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);// this can emit finish, but finish must
// always follow error
finishMaybe(stream,state);}}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;if(typeof cb!=='function')throw new ERR_MULTIPLE_CALLBACK();onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{// Check if we're actually ready to finish, but don't emit yet
var finished=needFinish(state)||stream.destroyed;if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){process.nextTick(afterWrite,stream,state,finished,cb);}else{afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit('drain');}}// if there's something in the buffer waiting, then process it
function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){// Fast case, write everything using _writev()
var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=true;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=false;entry=entry.next;count+=1;}buffer.allBuffers=allBuffers;doWrite(stream,state,true,state.length,buffer,'',holder.finish);// doWrite is almost always async, defer these to save a bit of time
// as the hot path ends with doWrite
state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else{state.corkedRequestsFree=new CorkedRequest(state);}state.bufferedRequestCount=0;}else{// Slow case, write chunks one-by-one
while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;state.bufferedRequestCount--;// if we didn't call the onwrite immediately, then
// it means that we need to wait until it does.
// also, that means that the chunk and cb are currently
// being processed, so move the buffer counter past them.
if(state.writing){break;}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==='function'){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);// .end() fully uncorks
if(state.corked){state.corked=1;this.uncork();}// ignore unnecessary end() calls.
if(!state.ending)endWritable(this,state,cb);return this;};Object.defineProperty(Writable.prototype,'writableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.length;}});function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;}function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){errorOrDestroy(stream,err);}state.prefinished=true;stream.emit('prefinish');finishMaybe(stream,state);});}function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==='function'&&!state.destroyed){state.pendingcb++;state.finalCalled=true;process.nextTick(callFinal,stream,state);}else{state.prefinished=true;stream.emit('prefinish');}}}function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=true;stream.emit('finish');if(state.autoDestroy){// In case of duplex streams we need a way to detect
// if the readable side is ready for autoDestroy as well
var rState=stream._readableState;if(!rState||rState.autoDestroy&&rState.endEmitted){stream.destroy();}}}}return need;}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)process.nextTick(cb);else stream.once('finish',cb);}state.ended=true;stream.writable=false;}function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}// reuse the free corkReq.
state.corkedRequestsFree.next=corkReq;}Object.defineProperty(Writable.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._writableState===undefined){return false;}return this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._writableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._writableState.destroyed=value;}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){cb(err);};}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":57,"./_stream_duplex":58,"./internal/streams/destroy":65,"./internal/streams/state":69,"./internal/streams/stream":70,"_process":31,"buffer":21,"inherits":27,"util-deprecate":76}],63:[function(require,module,exports){(function(process){'use strict';var _Object$setPrototypeO;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var finished=require('./end-of-stream');var kLastResolve=Symbol('lastResolve');var kLastReject=Symbol('lastReject');var kError=Symbol('error');var kEnded=Symbol('ended');var kLastPromise=Symbol('lastPromise');var kHandlePromise=Symbol('handlePromise');var kStream=Symbol('stream');function createIterResult(value,done){return{value:value,done:done};}function readAndResolve(iter){var resolve=iter[kLastResolve];if(resolve!==null){var data=iter[kStream].read();// we defer if data is null
// we can be expecting either 'end' or
// 'error'
if(data!==null){iter[kLastPromise]=null;iter[kLastResolve]=null;iter[kLastReject]=null;resolve(createIterResult(data,false));}}}function onReadable(iter){// we wait for the next tick, because it might
// emit an error with process.nextTick
process.nextTick(readAndResolve,iter);}function wrapForNext(lastPromise,iter){return function(resolve,reject){lastPromise.then(function(){if(iter[kEnded]){resolve(createIterResult(undefined,true));return;}iter[kHandlePromise](resolve,reject);},reject);};}var AsyncIteratorPrototype=Object.getPrototypeOf(function(){});var ReadableStreamAsyncIteratorPrototype=Object.setPrototypeOf((_Object$setPrototypeO={get stream(){return this[kStream];},next:function next(){var _this=this;// if we have detected an error in the meanwhile
// reject straight away
var error=this[kError];if(error!==null){return Promise.reject(error);}if(this[kEnded]){return Promise.resolve(createIterResult(undefined,true));}if(this[kStream].destroyed){// We need to defer via nextTick because if .destroy(err) is
// called, the error will be emitted via nextTick, and
// we cannot guarantee that there is no error lingering around
// waiting to be emitted.
return new Promise(function(resolve,reject){process.nextTick(function(){if(_this[kError]){reject(_this[kError]);}else{resolve(createIterResult(undefined,true));}});});}// if we have multiple next() calls
// we will wait for the previous Promise to finish
// this logic is optimized to support for await loops,
// where next() is only called once at a time
var lastPromise=this[kLastPromise];var promise;if(lastPromise){promise=new Promise(wrapForNext(lastPromise,this));}else{// fast path needed to support multiple this.push()
// without triggering the next() queue
var data=this[kStream].read();if(data!==null){return Promise.resolve(createIterResult(data,false));}promise=new Promise(this[kHandlePromise]);}this[kLastPromise]=promise;return promise;}},_defineProperty(_Object$setPrototypeO,Symbol.asyncIterator,function(){return this;}),_defineProperty(_Object$setPrototypeO,"return",function _return(){var _this2=this;// destroy(err, cb) is a private API
// we can guarantee we have that here, because we control the
// Readable class this is attached to
return new Promise(function(resolve,reject){_this2[kStream].destroy(null,function(err){if(err){reject(err);return;}resolve(createIterResult(undefined,true));});});}),_Object$setPrototypeO),AsyncIteratorPrototype);var createReadableStreamAsyncIterator=function createReadableStreamAsyncIterator(stream){var _Object$create;var iterator=Object.create(ReadableStreamAsyncIteratorPrototype,(_Object$create={},_defineProperty(_Object$create,kStream,{value:stream,writable:true}),_defineProperty(_Object$create,kLastResolve,{value:null,writable:true}),_defineProperty(_Object$create,kLastReject,{value:null,writable:true}),_defineProperty(_Object$create,kError,{value:null,writable:true}),_defineProperty(_Object$create,kEnded,{value:stream._readableState.endEmitted,writable:true}),_defineProperty(_Object$create,kHandlePromise,{value:function value(resolve,reject){var data=iterator[kStream].read();if(data){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(data,false));}else{iterator[kLastResolve]=resolve;iterator[kLastReject]=reject;}},writable:true}),_Object$create));iterator[kLastPromise]=null;finished(stream,function(err){if(err&&err.code!=='ERR_STREAM_PREMATURE_CLOSE'){var reject=iterator[kLastReject];// reject if we are waiting for data in the Promise
// returned by next() and store the error
if(reject!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;reject(err);}iterator[kError]=err;return;}var resolve=iterator[kLastResolve];if(resolve!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(undefined,true));}iterator[kEnded]=true;});stream.on('readable',onReadable.bind(null,iterator));return iterator;};module.exports=createReadableStreamAsyncIterator;}).call(this,require('_process'));},{"./end-of-stream":66,"_process":31}],64:[function(require,module,exports){'use strict';function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var _require=require('buffer'),Buffer=_require.Buffer;var _require2=require('util'),inspect=_require2.inspect;var custom=inspect&&inspect.custom||'inspect';function copyBuffer(src,target,offset){Buffer.prototype.copy.call(src,target,offset);}module.exports=/*#__PURE__*/function(){function BufferList(){this.head=null;this.tail=null;this.length=0;}var _proto=BufferList.prototype;_proto.push=function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length;};_proto.unshift=function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length;};_proto.shift=function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret;};_proto.clear=function clear(){this.head=this.tail=null;this.length=0;};_proto.join=function join(s){if(this.length===0)return'';var p=this.head;var ret=''+p.data;while(p=p.next){ret+=s+p.data;}return ret;};_proto.concat=function concat(n){if(this.length===0)return Buffer.alloc(0);var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next;}return ret;}// Consumes a specified amount of bytes or characters from the buffered data.
;_proto.consume=function consume(n,hasStrings){var ret;if(n<this.head.data.length){// `slice` is the same for buffers and strings.
ret=this.head.data.slice(0,n);this.head.data=this.head.data.slice(n);}else if(n===this.head.data.length){// First chunk is a perfect match.
ret=this.shift();}else{// Result spans more than one buffer.
ret=hasStrings?this._getString(n):this._getBuffer(n);}return ret;};_proto.first=function first(){return this.head.data;}// Consumes a specified amount of characters from the buffered data.
;_proto._getString=function _getString(n){var p=this.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else{this.head=p;p.data=str.slice(nb);}break;}++c;}this.length-=c;return ret;}// Consumes a specified amount of bytes from the buffered data.
;_proto._getBuffer=function _getBuffer(n){var ret=Buffer.allocUnsafe(n);var p=this.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else{this.head=p;p.data=buf.slice(nb);}break;}++c;}this.length-=c;return ret;}// Make sure the linked list only shows the minimal necessary information.
;_proto[custom]=function(_,options){return inspect(this,_objectSpread({},options,{// Only inspect one level.
depth:0,// It should not recurse.
customInspect:false}));};return BufferList;}();},{"buffer":21,"util":20}],65:[function(require,module,exports){(function(process){'use strict';// undocumented cb() API, needed for core, not for public API
function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err);}else if(err){if(!this._writableState){process.nextTick(emitErrorNT,this,err);}else if(!this._writableState.errorEmitted){this._writableState.errorEmitted=true;process.nextTick(emitErrorNT,this,err);}}return this;}// we set destroyed to true before firing error callbacks in order
// to make it re-entrance safe in case destroy() is called within callbacks
if(this._readableState){this._readableState.destroyed=true;}// if this is a duplex stream mark the writable part as destroyed as well
if(this._writableState){this._writableState.destroyed=true;}this._destroy(err||null,function(err){if(!cb&&err){if(!_this._writableState){process.nextTick(emitErrorAndCloseNT,_this,err);}else if(!_this._writableState.errorEmitted){_this._writableState.errorEmitted=true;process.nextTick(emitErrorAndCloseNT,_this,err);}else{process.nextTick(emitCloseNT,_this);}}else if(cb){process.nextTick(emitCloseNT,_this);cb(err);}else{process.nextTick(emitCloseNT,_this);}});return this;}function emitErrorAndCloseNT(self,err){emitErrorNT(self,err);emitCloseNT(self);}function emitCloseNT(self){if(self._writableState&&!self._writableState.emitClose)return;if(self._readableState&&!self._readableState.emitClose)return;self.emit('close');}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false;}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finalCalled=false;this._writableState.prefinished=false;this._writableState.finished=false;this._writableState.errorEmitted=false;}}function emitErrorNT(self,err){self.emit('error',err);}function errorOrDestroy(stream,err){// We have tests that rely on errors being emitted
// in the same tick, so changing this is semver major.
// For now when you opt-in to autoDestroy we allow
// the error to be emitted nextTick. In a future
// semver major update we should change the default to this.
var rState=stream._readableState;var wState=stream._writableState;if(rState&&rState.autoDestroy||wState&&wState.autoDestroy)stream.destroy(err);else stream.emit('error',err);}module.exports={destroy:destroy,undestroy:undestroy,errorOrDestroy:errorOrDestroy};}).call(this,require('_process'));},{"_process":31}],66:[function(require,module,exports){// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';var ERR_STREAM_PREMATURE_CLOSE=require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;function once(callback){var called=false;return function(){if(called)return;called=true;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}callback.apply(this,args);};}function noop(){}function isRequest(stream){return stream.setHeader&&typeof stream.abort==='function';}function eos(stream,opts,callback){if(typeof opts==='function')return eos(stream,null,opts);if(!opts)opts={};callback=once(callback||noop);var readable=opts.readable||opts.readable!==false&&stream.readable;var writable=opts.writable||opts.writable!==false&&stream.writable;var onlegacyfinish=function onlegacyfinish(){if(!stream.writable)onfinish();};var writableEnded=stream._writableState&&stream._writableState.finished;var onfinish=function onfinish(){writable=false;writableEnded=true;if(!readable)callback.call(stream);};var readableEnded=stream._readableState&&stream._readableState.endEmitted;var onend=function onend(){readable=false;readableEnded=true;if(!writable)callback.call(stream);};var onerror=function onerror(err){callback.call(stream,err);};var onclose=function onclose(){var err;if(readable&&!readableEnded){if(!stream._readableState||!stream._readableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE();return callback.call(stream,err);}if(writable&&!writableEnded){if(!stream._writableState||!stream._writableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE();return callback.call(stream,err);}};var onrequest=function onrequest(){stream.req.on('finish',onfinish);};if(isRequest(stream)){stream.on('complete',onfinish);stream.on('abort',onclose);if(stream.req)onrequest();else stream.on('request',onrequest);}else if(writable&&!stream._writableState){// legacy streams
stream.on('end',onlegacyfinish);stream.on('close',onlegacyfinish);}stream.on('end',onend);stream.on('finish',onfinish);if(opts.error!==false)stream.on('error',onerror);stream.on('close',onclose);return function(){stream.removeListener('complete',onfinish);stream.removeListener('abort',onclose);stream.removeListener('request',onrequest);if(stream.req)stream.req.removeListener('finish',onfinish);stream.removeListener('end',onlegacyfinish);stream.removeListener('close',onlegacyfinish);stream.removeListener('finish',onfinish);stream.removeListener('end',onend);stream.removeListener('error',onerror);stream.removeListener('close',onclose);};}module.exports=eos;},{"../../../errors":57}],67:[function(require,module,exports){module.exports=function(){throw new Error('Readable.from is not available in the browser');};},{}],68:[function(require,module,exports){// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';var eos;function once(callback){var called=false;return function(){if(called)return;called=true;callback.apply(void 0,arguments);};}var _require$codes=require('../../../errors').codes,ERR_MISSING_ARGS=_require$codes.ERR_MISSING_ARGS,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED;function noop(err){// Rethrow the error if it exists to avoid swallowing it
if(err)throw err;}function isRequest(stream){return stream.setHeader&&typeof stream.abort==='function';}function destroyer(stream,reading,writing,callback){callback=once(callback);var closed=false;stream.on('close',function(){closed=true;});if(eos===undefined)eos=require('./end-of-stream');eos(stream,{readable:reading,writable:writing},function(err){if(err)return callback(err);closed=true;callback();});var destroyed=false;return function(err){if(closed)return;if(destroyed)return;destroyed=true;// request.destroy just do .end - .abort is what we want
if(isRequest(stream))return stream.abort();if(typeof stream.destroy==='function')return stream.destroy();callback(err||new ERR_STREAM_DESTROYED('pipe'));};}function call(fn){fn();}function pipe(from,to){return from.pipe(to);}function popCallback(streams){if(!streams.length)return noop;if(typeof streams[streams.length-1]!=='function')return noop;return streams.pop();}function pipeline(){for(var _len=arguments.length,streams=new Array(_len),_key=0;_key<_len;_key++){streams[_key]=arguments[_key];}var callback=popCallback(streams);if(Array.isArray(streams[0]))streams=streams[0];if(streams.length<2){throw new ERR_MISSING_ARGS('streams');}var error;var destroys=streams.map(function(stream,i){var reading=i<streams.length-1;var writing=i>0;return destroyer(stream,reading,writing,function(err){if(!error)error=err;if(err)destroys.forEach(call);if(reading)return;destroys.forEach(call);callback(error);});});return streams.reduce(pipe);}module.exports=pipeline;},{"../../../errors":57,"./end-of-stream":66}],69:[function(require,module,exports){'use strict';var ERR_INVALID_OPT_VALUE=require('../../../errors').codes.ERR_INVALID_OPT_VALUE;function highWaterMarkFrom(options,isDuplex,duplexKey){return options.highWaterMark!=null?options.highWaterMark:isDuplex?options[duplexKey]:null;}function getHighWaterMark(state,options,duplexKey,isDuplex){var hwm=highWaterMarkFrom(options,isDuplex,duplexKey);if(hwm!=null){if(!(isFinite(hwm)&&Math.floor(hwm)===hwm)||hwm<0){var name=isDuplex?duplexKey:'highWaterMark';throw new ERR_INVALID_OPT_VALUE(name,hwm);}return Math.floor(hwm);}// Default value
return state.objectMode?16:16*1024;}module.exports={getHighWaterMark:getHighWaterMark};},{"../../../errors":57}],70:[function(require,module,exports){arguments[4][44][0].apply(exports,arguments);},{"dup":44,"events":24}],71:[function(require,module,exports){exports=module.exports=require('./lib/_stream_readable.js');exports.Stream=exports;exports.Readable=exports;exports.Writable=require('./lib/_stream_writable.js');exports.Duplex=require('./lib/_stream_duplex.js');exports.Transform=require('./lib/_stream_transform.js');exports.PassThrough=require('./lib/_stream_passthrough.js');exports.finished=require('./lib/internal/streams/end-of-stream.js');exports.pipeline=require('./lib/internal/streams/pipeline.js');},{"./lib/_stream_duplex.js":58,"./lib/_stream_passthrough.js":59,"./lib/_stream_readable.js":60,"./lib/_stream_transform.js":61,"./lib/_stream_writable.js":62,"./lib/internal/streams/end-of-stream.js":66,"./lib/internal/streams/pipeline.js":68}],72:[function(require,module,exports){arguments[4][46][0].apply(exports,arguments);},{"dup":46,"safe-buffer":51}],73:[function(require,module,exports){(function(setImmediate,clearImmediate){var nextTick=require('process/browser.js').nextTick;var apply=Function.prototype.apply;var slice=Array.prototype.slice;var immediateIds={};var nextImmediateId=0;// DOM APIs, for completeness
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){timeout.close();};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};// Does not start the time, just sets up the members needed.
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate=typeof setImmediate==="function"?setImmediate:function(fn){var id=nextImmediateId++;var args=arguments.length<2?false:slice.call(arguments,1);immediateIds[id]=true;nextTick(function onNextTick(){if(immediateIds[id]){// fn.call() is faster so we optimize for the common use-case
// @see http://jsperf.com/call-apply-segu
if(args){fn.apply(null,args);}else{fn.call(null);}// Prevent ids from leaking
exports.clearImmediate(id);}});return id;};exports.clearImmediate=typeof clearImmediate==="function"?clearImmediate:function(id){delete immediateIds[id];};}).call(this,require("timers").setImmediate,require("timers").clearImmediate);},{"process/browser.js":31,"timers":73}],74:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';var punycode=require('punycode');var util=require('./util');exports.parse=urlParse;exports.resolve=urlResolve;exports.resolveObject=urlResolveObject;exports.format=urlFormat;exports.Url=Url;function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,// Special case for a simple path URL
simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims=['<','>','"','`',' ','\r','\n','\t'],// RFC 2396: characters not allowed for various reasons.
unwise=['{','}','|','\\','^','`'].concat(delims),// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape=['\''].concat(unwise),// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars=['%','/','?',';','#'].concat(autoEscape),hostEndingChars=['/','?','#'],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,// protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol={'javascript':true,'javascript:':true},// protocols that never have a hostname.
hostlessProtocol={'javascript':true,'javascript:':true},// protocols that always contain a // bit.
slashedProtocol={'http':true,'https':true,'ftp':true,'gopher':true,'file':true,'http:':true,'https:':true,'ftp:':true,'gopher:':true,'file:':true},querystring=require('querystring');function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&util.isObject(url)&&_instanceof(url,Url))return url;var u=new Url();u.parse(url,parseQueryString,slashesDenoteHost);return u;}Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!util.isString(url)){throw new TypeError("Parameter 'url' must be a string, not "+_typeof(url));}// Copy chrome, IE, opera backslash-handling behavior.
// Back slashes before the query string get converted to forward slashes
// See: https://code.google.com/p/chromium/issues/detail?id=25916
var queryIndex=url.indexOf('?'),splitter=queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',uSplit=url.split(splitter),slashRegex=/\\/g;uSplit[0]=uSplit[0].replace(slashRegex,'/');url=uSplit.join(splitter);var rest=url;// trim before proceeding.
// This is to support parse stuff like "  http://foo.com  \n"
rest=rest.trim();if(!slashesDenoteHost&&url.split('#').length===1){// Try fast path regexp
var simplePath=simplePathPattern.exec(rest);if(simplePath){this.path=rest;this.href=rest;this.pathname=simplePath[1];if(simplePath[2]){this.search=simplePath[2];if(parseQueryString){this.query=querystring.parse(this.search.substr(1));}else{this.query=this.search.substr(1);}}else if(parseQueryString){this.search='';this.query={};}return this;}}var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto;rest=rest.substr(proto.length);}// figure out if it's got a host
// user@server is *always* interpreted as a hostname, and url
// resolution will treat //foo/bar as host=foo,path=bar because that's
// how the browser resolves relative URLs.
if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes=rest.substr(0,2)==='//';if(slashes&&!(proto&&hostlessProtocol[proto])){rest=rest.substr(2);this.slashes=true;}}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){// there's a hostname.
// the first instance of /, ?, ;, or # ends the host.
//
// If there is an @ in the hostname, then non-host chars *are* allowed
// to the left of the last @ sign, unless some host-ending character
// comes *before* the @-sign.
// URLs are obnoxious.
//
// ex:
// http://a@b@c/ => user:a@b host:c
// http://a@b?@c => user:a host:c path:/?@c
// v0.12 TODO(isaacs): This is not quite how Chrome does things.
// Review our test case against browsers more comprehensively.
// find the first instance of any hostEndingChars
var hostEnd=-1;for(var i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// at this point, either we have an explicit point where the
// auth portion cannot go past, or the last @ char is the decider.
var auth,atSign;if(hostEnd===-1){// atSign can be anywhere.
atSign=rest.lastIndexOf('@');}else{// atSign must be in auth portion.
// http://a@b/c@d => host:b auth:a path:/c@d
atSign=rest.lastIndexOf('@',hostEnd);}// Now we have a portion which is definitely the auth.
// Pull that off.
if(atSign!==-1){auth=rest.slice(0,atSign);rest=rest.slice(atSign+1);this.auth=decodeURIComponent(auth);}// the host is the remaining to the left of the first non-host char
hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))hostEnd=hec;}// if we still have not hit it, then the entire thing is a host.
if(hostEnd===-1)hostEnd=rest.length;this.host=rest.slice(0,hostEnd);rest=rest.slice(hostEnd);// pull out port.
this.parseHost();// we've indicated that there is a hostname,
// so even if it's empty, it has to be present.
this.hostname=this.hostname||'';// if hostname begins with [ and ends with ]
// assume that it's an IPv6 address.
var ipv6Hostname=this.hostname[0]==='['&&this.hostname[this.hostname.length-1]===']';// validate a little.
if(!ipv6Hostname){var hostparts=this.hostname.split(/\./);for(var i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(!part)continue;if(!part.match(hostnamePartPattern)){var newpart='';for(var j=0,k=part.length;j<k;j++){if(part.charCodeAt(j)>127){// we replace non-ASCII char with a temporary placeholder
// we need this to make sure size of hostname is not
// broken by replacing non-ASCII by nothing
newpart+='x';}else{newpart+=part[j];}}// we test again with ASCII char only
if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i);var notHost=hostparts.slice(i+1);var bit=part.match(hostnamePartStart);if(bit){validParts.push(bit[1]);notHost.unshift(bit[2]);}if(notHost.length){rest='/'+notHost.join('.')+rest;}this.hostname=validParts.join('.');break;}}}}if(this.hostname.length>hostnameMaxLen){this.hostname='';}else{// hostnames are always lower case.
this.hostname=this.hostname.toLowerCase();}if(!ipv6Hostname){// IDNA Support: Returns a punycoded representation of "domain".
// It only converts parts of the domain name that
// have non-ASCII characters, i.e. it doesn't matter if
// you call it with a domain that already is ASCII-only.
this.hostname=punycode.toASCII(this.hostname);}var p=this.port?':'+this.port:'';var h=this.hostname||'';this.host=h+p;this.href+=this.host;// strip [ and ] from the hostname
// the host field still retains them, though
if(ipv6Hostname){this.hostname=this.hostname.substr(1,this.hostname.length-2);if(rest[0]!=='/'){rest='/'+rest;}}}// now rest is set to the post-host stuff.
// chop off any delim chars.
if(!unsafeProtocol[lowerProto]){// First, make 100% sure that any "autoEscape" chars get
// escaped, even if encodeURIComponent doesn't think they
// need to be.
for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];if(rest.indexOf(ae)===-1)continue;var esc=encodeURIComponent(ae);if(esc===ae){esc=escape(ae);}rest=rest.split(ae).join(esc);}}// chop off from the tail first.
var hash=rest.indexOf('#');if(hash!==-1){// got a fragment string.
this.hash=rest.substr(hash);rest=rest.slice(0,hash);}var qm=rest.indexOf('?');if(qm!==-1){this.search=rest.substr(qm);this.query=rest.substr(qm+1);if(parseQueryString){this.query=querystring.parse(this.query);}rest=rest.slice(0,qm);}else if(parseQueryString){// no query string, but parseQueryString still requested
this.search='';this.query={};}if(rest)this.pathname=rest;if(slashedProtocol[lowerProto]&&this.hostname&&!this.pathname){this.pathname='/';}//to support http.request
if(this.pathname||this.search){var p=this.pathname||'';var s=this.search||'';this.path=p+s;}// finally, reconstruct the href based on what has been validated.
this.href=this.format();return this;};// format a parsed object into a url string
function urlFormat(obj){// ensure it's an object, and not a string url.
// If it's an obj, this is a no-op.
// this way, you can call url_format() on strings
// to clean up potentially wonky urls.
if(util.isString(obj))obj=urlParse(obj);if(!_instanceof(obj,Url))return Url.prototype.format.call(obj);return obj.format();}Url.prototype.format=function(){var auth=this.auth||'';if(auth){auth=encodeURIComponent(auth);auth=auth.replace(/%3A/i,':');auth+='@';}var protocol=this.protocol||'',pathname=this.pathname||'',hash=this.hash||'',host=false,query='';if(this.host){host=auth+this.host;}else if(this.hostname){host=auth+(this.hostname.indexOf(':')===-1?this.hostname:'['+this.hostname+']');if(this.port){host+=':'+this.port;}}if(this.query&&util.isObject(this.query)&&Object.keys(this.query).length){query=querystring.stringify(this.query);}var search=this.search||query&&'?'+query||'';if(protocol&&protocol.substr(-1)!==':')protocol+=':';// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
// unless they had them to begin with.
if(this.slashes||(!protocol||slashedProtocol[protocol])&&host!==false){host='//'+(host||'');if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;}else if(!host){host='';}if(hash&&hash.charAt(0)!=='#')hash='#'+hash;if(search&&search.charAt(0)!=='?')search='?'+search;pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match);});search=search.replace('#','%23');return protocol+host+pathname+search+hash;};function urlResolve(source,relative){return urlParse(source,false,true).resolve(relative);}Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,false,true)).format();};function urlResolveObject(source,relative){if(!source)return relative;return urlParse(source,false,true).resolveObject(relative);}Url.prototype.resolveObject=function(relative){if(util.isString(relative)){var rel=new Url();rel.parse(relative,false,true);relative=rel;}var result=new Url();var tkeys=Object.keys(this);for(var tk=0;tk<tkeys.length;tk++){var tkey=tkeys[tk];result[tkey]=this[tkey];}// hash is always overridden, no matter what.
// even href="" will remove it.
result.hash=relative.hash;// if the relative url is empty, then there's nothing left to do here.
if(relative.href===''){result.href=result.format();return result;}// hrefs like //foo/bar always cut to the protocol.
if(relative.slashes&&!relative.protocol){// take everything except the protocol from relative
var rkeys=Object.keys(relative);for(var rk=0;rk<rkeys.length;rk++){var rkey=rkeys[rk];if(rkey!=='protocol')result[rkey]=relative[rkey];}//urlParse appends trailing / to urls like http://www.example.com
if(slashedProtocol[result.protocol]&&result.hostname&&!result.pathname){result.path=result.pathname='/';}result.href=result.format();return result;}if(relative.protocol&&relative.protocol!==result.protocol){// if it's a known url protocol, then changing
// the protocol does weird things
// first, if it's not file:, then we MUST have a host,
// and if there was a path
// to begin with, then we MUST have a path.
// if it is file:, then the host is dropped,
// because that's known to be hostless.
// anything else is assumed to be absolute.
if(!slashedProtocol[relative.protocol]){var keys=Object.keys(relative);for(var v=0;v<keys.length;v++){var k=keys[v];result[k]=relative[k];}result.href=result.format();return result;}result.protocol=relative.protocol;if(!relative.host&&!hostlessProtocol[relative.protocol]){var relPath=(relative.pathname||'').split('/');while(relPath.length&&!(relative.host=relPath.shift())){;}if(!relative.host)relative.host='';if(!relative.hostname)relative.hostname='';if(relPath[0]!=='')relPath.unshift('');if(relPath.length<2)relPath.unshift('');result.pathname=relPath.join('/');}else{result.pathname=relative.pathname;}result.search=relative.search;result.query=relative.query;result.host=relative.host||'';result.auth=relative.auth;result.hostname=relative.hostname||relative.host;result.port=relative.port;// to support http.request
if(result.pathname||result.search){var p=result.pathname||'';var s=result.search||'';result.path=p+s;}result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;}var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',isRelAbs=relative.host||relative.pathname&&relative.pathname.charAt(0)==='/',mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split('/')||[],relPath=relative.pathname&&relative.pathname.split('/')||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];// if the url is a non-slashed url, then relative
// links like ../.. should be able
// to crawl up to the hostname, as well.  This is strange.
// result.protocol has already been set by now.
// Later on, put the first path part into the host field.
if(psychotic){result.hostname='';result.port=null;if(result.host){if(srcPath[0]==='')srcPath[0]=result.host;else srcPath.unshift(result.host);}result.host='';if(relative.protocol){relative.hostname=null;relative.port=null;if(relative.host){if(relPath[0]==='')relPath[0]=relative.host;else relPath.unshift(relative.host);}relative.host=null;}mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}if(isRelAbs){// it's absolute.
result.host=relative.host||relative.host===''?relative.host:result.host;result.hostname=relative.hostname||relative.hostname===''?relative.hostname:result.hostname;result.search=relative.search;result.query=relative.query;srcPath=relPath;// fall through to the dot-handling below.
}else if(relPath.length){// it's relative
// throw away the existing file, and take the new path instead.
if(!srcPath)srcPath=[];srcPath.pop();srcPath=srcPath.concat(relPath);result.search=relative.search;result.query=relative.query;}else if(!util.isNullOrUndefined(relative.search)){// just pull out the search.
// like href='?foo'.
// Put this after the other two cases because it simplifies the booleans
if(psychotic){result.hostname=result.host=srcPath.shift();//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}result.search=relative.search;result.query=relative.query;//to support http.request
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.href=result.format();return result;}if(!srcPath.length){// no path at all.  easy.
// we've already handled the other stuff above.
result.pathname=null;//to support http.request
if(result.search){result.path='/'+result.search;}else{result.path=null;}result.href=result.format();return result;}// if a url ENDs in . or .., then it must get a trailing slash.
// however, if it ends in anything else non-slashy,
// then it must NOT get a trailing slash.
var last=srcPath.slice(-1)[0];var hasTrailingSlash=(result.host||relative.host||srcPath.length>1)&&(last==='.'||last==='..')||last==='';// strip single dots, resolve double dots to parent dir
// if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=srcPath.length;i>=0;i--){last=srcPath[i];if(last==='.'){srcPath.splice(i,1);}else if(last==='..'){srcPath.splice(i,1);up++;}else if(up){srcPath.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(!mustEndAbs&&!removeAllDots){for(;up--;up){srcPath.unshift('..');}}if(mustEndAbs&&srcPath[0]!==''&&(!srcPath[0]||srcPath[0].charAt(0)!=='/')){srcPath.unshift('');}if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){srcPath.push('');}var isAbsolute=srcPath[0]===''||srcPath[0]&&srcPath[0].charAt(0)==='/';// put the host back
if(psychotic){result.hostname=result.host=isAbsolute?'':srcPath.length?srcPath.shift():'';//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}mustEndAbs=mustEndAbs||result.host&&srcPath.length;if(mustEndAbs&&!isAbsolute){srcPath.unshift('');}if(!srcPath.length){result.pathname=null;result.path=null;}else{result.pathname=srcPath.join('/');}//to support request.http
if(!util.isNull(result.pathname)||!util.isNull(result.search)){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.auth=relative.auth||result.auth;result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;};Url.prototype.parseHost=function(){var host=this.host;var port=portPattern.exec(host);if(port){port=port[0];if(port!==':'){this.port=port.substr(1);}host=host.substr(0,host.length-port.length);}if(host)this.hostname=host;};},{"./util":75,"punycode":32,"querystring":35}],75:[function(require,module,exports){'use strict';module.exports={isString:function isString(arg){return typeof arg==='string';},isObject:function isObject(arg){return _typeof(arg)==='object'&&arg!==null;},isNull:function isNull(arg){return arg===null;},isNullOrUndefined:function isNullOrUndefined(arg){return arg==null;}};},{}],76:[function(require,module,exports){(function(global){/**
 * Module exports.
 */module.exports=deprecate;/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */function deprecate(fn,msg){if(config('noDeprecation')){return fn;}var warned=false;function deprecated(){if(!warned){if(config('throwDeprecation')){throw new Error(msg);}else if(config('traceDeprecation')){console.trace(msg);}else{console.warn(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;}/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */function config(name){// accessing global.localStorage can trigger a DOMException in sandboxed iframes
try{if(!global.localStorage)return false;}catch(_){return false;}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==='true';}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],77:[function(require,module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){var target={};for(var i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}},{}]},{},[3])(3);});