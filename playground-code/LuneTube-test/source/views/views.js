/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "myapp.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Llamar a Lunetube"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Tap me", ontap: "helloWorldTap"},
			{kind: "onyx.Button", content: "Open with all params", ontap: "openLuneTube"},
			{name:"decorator", kind:"onyx.InputDecorator",components:[
				{kind: "onyx.Input", fit:true, name:"searchQuery", placeholder: "insert URI"}
			]},
			{kind: "onyx.Button", content: "Open with url", ontap: "openLuneTubeUrl"},
			{kind: "onyx.Button", content: "Open with videId", ontap: "openLuneTubeVideoId"},
			{kind: "onyx.Button", content: "Open other video", ontap: "openLuneTubeOtherVideo"},
			{kind: "onyx.Button", content: "Open LuneTube Service", ontap: "openLuneTubeService"}
		]},
		// {name: "launchApplicationService", kind: "enyo.LunaService", service: "enyo.palmServices.application", method: "open", onFailure: "gotResourceError"},
		{name: "service", kind: "enyo.LunaService", service: "luna://com.emsoft.lunetube.service", method: "hello", onComplete: "onComplete"},
		

		// Define PalmService or LuneService to launch app with parameters
		{name : "openLuneTube",
            kind : "enyo.LunaService",
            service : "palm://com.palm.applicationManager",
            // method : "open",
            method : "launch",
            onSuccess : "openLuneTubeSuccess",
            onFailure : "openLuneTubeFailure",
            onComplete: "openLuneTubeComplete",
            subscribe : true
         },
	],
	_youtubeURI: "https://www.youtube.com/watch?v=vPKIXiHf-rE&list=jshdkajshdkasj",
	_videoId: "vPKIXiHf-rE",
	helloWorldTap: function(inSender, inEvent) {
		this.$.main.addContent("The button was tapped.<br/>");
	},

	openLuneTube: function(inSender, inEvent){
		console.log("Se envia openLuneTube");
		var params= {
					params:{
						url: this._youtubeURI,
						videoId: this._videoId,
						video:{
							src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
							type: "video/mp4"
						}
					}
		};

		this.$.openLuneTube.send({ id: "com.emsoft.lunetube", params:params});
		this.$.main.addContent("send : " + JSON.stringify(params));
	},

	openLuneTubeUrl: function(inSender, inEvent){
		console.log("Se envia openLuneTubeUrl");
		var params= {
					params:{
						url:this._youtubeURI
					}
		};

		if(this.$.searchQuery.getValue().trim().length>0){
			/*var match = this.$.searchQuery.getValue().Match("MatchRegexExpression");
			if(match){
				params.params.url = this.$.searchQuery.getValue();
			}*/
			params.params.url = this.$.searchQuery.getValue(); //youtube url
		}

		this.$.openLuneTube.send({ id: "com.emsoft.lunetube", params:params});
		this.$.main.addContent("send : " + JSON.stringify(params));
	},
	openLuneTubeVideoId: function(inSender, inEvent){
		console.log("Se envia openLuneTubeVideoId");
		var params= {
					params:{
						videoId:this._videoId
					}
		};

		this.$.openLuneTube.send({ id: "com.emsoft.lunetube", params:params});
		this.$.main.addContent("send : " + JSON.stringify(params));
	},

	openLuneTubeOtherVideo: function(inSender, inEvent){
		console.log("Se envia openLuneTubeOtherVideo");
		var params= {
					params:{
						video:{
							src:"http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
							type: "video/mp4"
						}
					}
		};

		this.$.openLuneTube.send({ id: "com.emsoft.lunetube", params:params});
		this.$.main.addContent("send : " + JSON.stringify(params));
	},

	openLuneTubeComplete: function(inSender, inEvent){
		console.log("Success openLuneTubeComplete");
		console.log(inSender);
		console.log(inEvent);
	},

	/*LuneTube Service Test*/
	openLuneTubeService: function(inSender, inEvent){
		// make sure a name is sent to the service
		console.log("Se llama al servicio LuneTube");
        var name = "EMsaje desde Otra APP";
        this.$.service.send({name: name});
	},
	openLuneTubeSuccess: function(inSender, inEvent){
		console.log("Respuesta de openLuneTubeSuccess");
		console.log(inSender);
		console.log(inEvent);
	},
	openLuneTubeFailure: function(inSender, inEvent){
		console.log("Respuesta de openLuneTubeFailure");
		console.log(inSender);
		console.log(inEvent);
	},

	onComplete: function(inSender, inResponse) {
		console.log("responde al onComplete");
		console.log(inResponse);

        if (inResponse.returnValue) {
            this.set("title", inResponse.data);
            this.$.result.set("content", "Service response.");
        } else {
            this.$.result.set("content", "Oooops!  There is a problem with this service.");
        }
    }
});
