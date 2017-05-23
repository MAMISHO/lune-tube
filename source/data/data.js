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

var youtube_api_url = "https://www.googleapis.com/youtube/v3/";

var currentOsPlatform = "webOS";

var myApiErrors={
	login:"Login required"
};


/*Instrucciones para obtener la localización del dispositivo*/

//var defaultRegionCode = getLocation();
var defaultRegionCode = null;
var loc = ilib.getLocale(); //other locations
var localeInfo = new ilib.LocaleInfo(loc);
var regionCode = defaultRegionCode.region;

function getLocation(){
    var language = window.navigator.userLanguage || window.navigator.language;
    if(language){

        if (typeof language === 'string') {
            var languageArray = language.split("-");
            var tempLocation = languageArray.pop();
            var tempLanguage = languageArray.pop();

            return new ilib.Locale(tempLanguage + "-" + tempLocation.toUpperCase()); 
        }else{
            return new ilib.Locale("en-US");    
        }

    }else{
        return new ilib.Locale("en-US");
    }
}