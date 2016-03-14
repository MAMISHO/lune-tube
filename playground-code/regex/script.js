var myregex=[
		{ "urlPattern": "^((https:\/\/|http:\/\/)(www\\.)?(youtube|yimg|youtu)\\.([A-Za-z]{2,4}|[A-Za-z]{2}\\.[A-Za-z]{2})\/(watch\\?v=)?[A-Za-z0-9\\-_]{6,12}(&[A-Za-z0-9\\-_]{1,}=[A-Za-z0-9\\-_]{1,})*)|(youtu\\.be)\/[A-Za-z0-9\\-_]{6,12}:" },
		{ "urlPattern": "((https:\/\/|http:\/\/)(www\.)?(youtube|yimg|youtu)\.([A-Za-z]{2,4}|[A-Za-z]{2}\.[A-Za-z]{2})\/(watch\\?v=)?[A-Za-z0-9\-_]{6,12}(&[A-Za-z0-9\-_]{1,}=[A-Za-z0-9\\-_]{1,})*)|(youtu\.be)\/[A-Za-z0-9\-_]{6,12}" },
	];
function test(){
	var url = document.getElementById("url").value;
	console.log(url);
	for (var i = 0; i < myregex.length; i++) {
		var aux = url.match(myregex[i].urlPattern + "/g");
		console.log(myregex[i].urlPattern);
		console.log(aux);
	}
}
