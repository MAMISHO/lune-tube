var fs = require('fs');
var ytdl = require('..');

var express = require("express"),  
    app = express();

var router = express.Router();

router.get('/', function(req, res) {
	// console.log("Llega el siguiente parámetro : " + req.query.url);
	var URL_BASE = "https://www.youtube.com/watch?v=";
	var url = "";
	if(req.query.url){
		url = req.quer.url;
	}else if(req.query.id){
		url = URL_BASE + req.query.id;
	}else{
		return res.send({video: null});
	}

	ytdl.getInfo(url, function(err, info) {
		if(err){
			console.log("Hay ERR");
			console.log(err);
		}
		if(info){
			console.log("Hay info");

			console.log(url);
			// fs.writeFile('example.json', JSON.stringify(info));
			if(info.formats){
				var formats = info.formats;
				var videos = [];

				for (var i = 0; i < formats.length; i++) {
					var v = {
						resolution : "SD-3GP",
						duration: info.length_seconds,
						poster: info.thumbnail_url,
						status: "ok",
						title: info.title,
						url: formats[i].url
					};
					switch(formats[i].itag){
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
					}
					/*if(formats[i].itag === '18'){
						return res.send(formats[i]);
					}*/
					videos.push(v);
				}
				if(videos.length > 0){
					console.log("se devuelve");
					return res.send(videos);
				}else{
					console.log("null");
					return res.send({video: null});
				}
			}else{
				return res.send({video: null});
			}
		}
	});
   // res.send("Hello World!");
});

app.use(router);

app.listen(3000, function() {  
  console.log("Node server running on http://localhost:3000");
});



/*var url = 'http://www.youtube.com/watch?v=UjEr26JNfQg';

ytdl.getInfo(url, function(err, info) {
	if(err){
		console.log("Hay ERR");
		console.log(err);
	}
	if(info){
		console.log("Hay info");
		// console.log(info);
		fs.writeFile('example.json', JSON.stringify(info));
	}
});*/