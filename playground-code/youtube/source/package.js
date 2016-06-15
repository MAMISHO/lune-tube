// enyo.loader.loadScript("https://www.youtube.com/iframe_api");
enyo.depends(
	"$lib/layout",
	"$lib/onyx",	// To theme Onyx using Theme.less, change this line to $lib/onyx/source,
	//"Theme.less",	// uncomment this line, and follow the steps described in Theme.less
	"$lib/youtube",
	// "YouTube.js",
	"app.css",
	"App.js",
	"Viewer.js"
);
