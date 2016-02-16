/**
	For simple applications, you might define all of your models, collections,
	and sources in this file.  For more complex applications, you might choose to separate
	these kind definitions into multiple files under this folder.
*/

var myApiKey = {
		url_base: "https://accounts.google.com/o/oauth2/auth",
    	client_id : "588965728760-7v9hac1gcppmkqcnktesvvj6qt079296.apps.googleusercontent.com",
    	client_secret : "ylXYTO5pxK--WuCtFIFroxLs",
    	redirect_uri : "urn:ietf:wg:oauth:2.0:oob",
    	scope : "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
    	response_type : "code",
    	access_type : "offline",
    	grant_type: "authorization_code",
    	access_token:"",
    	refresh_token: "",
    	login:false
};

var currentOsPlatform = "webOS";

var myApiErrors={
	login:"Login required"
};

var defaultRegionCode = new ilib.Locale("en-US");
var loc = ilib.getLocale(); //other locations
var localeInfo = new ilib.LocaleInfo(loc);
// var regionCode = loc.split("-").pop().toUpperCase();
var regionCode = defaultRegionCode.region;

/*if(webos){ //tested on webos && LuneOS
    regionCode = webos.locales.UI.region;
}*/