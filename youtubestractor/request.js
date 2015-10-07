function getData(){
	console.log("activa el boton");
	var video_id = $("#video_id").val();
	// console.log(video_id);
	$.ajax({
	  url: "http://www.youtube.com/get_video_info?video_id=" + video_id,
	  cache: false
	})
	  .done(function( data ) {
	  	// console.log(data);
	  	customData(data);
	  	$("#data_text").append(data);
	});
}

function customData(videoInfo){
	var params = {};
		/*params.target = video.link;
		params.title = video.title;
 		params.thumbUrl = video.thumbnail_240_320;*/


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

	/*Algunas lineas contienen dos valores separados por comas*/
	var newSplit = [];
	for (i = 0; i < streamsSplit.length; i++) {
		var secondSplit = streamsSplit[i].split(",");
		newSplit.push.apply(newSplit, secondSplit);
	}

	streamsSplit = newSplit;
				
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

		/*if ((i + 1) % 6 === 0 && itag === "18") { // 6 parameters per video; itag 18 is "MP4 360p", see http://userscripts.org/scripts/review/25105
			found = true;
			url += "&signature=" + sig;
			break;
		}*/
	}
	console.log(my_array);
	if (found) {
		console.log("video direct URL found: " + url);
		params.target = url;
		console.log(params);
		$( "#results" ).append(JSON.stringify(params));
		// this.foundVideo(params);
	} else {
		var msg = "Couldn't find video in MP4 360p";
		console.log(msg);
		return;
	}
}