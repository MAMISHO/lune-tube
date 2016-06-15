var fs = require('fs');
var ytdl = require('..');

var url = 'http://www.youtube.com/watch?v=UjEr26JNfQg';

/*ytdl('http://www.youtube.com/watch?v=UjEr26JNfQg')
  .pipe(fs.createWriteStream('example.mp4'));*/

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
});