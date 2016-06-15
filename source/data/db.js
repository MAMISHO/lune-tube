enyo.kind({
    name: "Auth",
    kind: enyo.Component,
    published: {
        
    },
    events: {
        
    },
    components: [
        {kind: "enyo.LunaService",
			 name: "saveToken",
		     service: "luna://com.palm.db/",
		     method: "put",
		     onSuccess: "putBffsSuccess",
		     onFailure: "dbFailure",
		     onResponse: "gotResponse",
		     // subscribe: true,
		     onComplete: "gotResponse"
		},
		{kind: "enyo.LunaService",
			 name: "getToken",
		     service: "luna://com.palm.db/",
		     method: "find",
		     onSuccess: "getTokenSuccess",
		     onFailure: "getTokenFailure",
		     onResponse: "gotResponse",
		     // subscribe: true,
		     onComplete: "gotResponse"
		},
		{kind: "enyo.LunaService",
			 name: "setDbKind",
		     service: "luna://com.palm.db/",
		     method: "find",
		     onSuccess: "getTokenSuccess",
		     onFailure: "getTokenFailure",
		     onResponse: "gotResponse",
		     // subscribe: true,
		     onComplete: "setDbKindComplete"
		}
    ],
    
    create:function() {
        this.inherited(arguments);
        
    },

    createDbKind: function(){
    	console.log("send createDbKind");
    	// this.$.setDbKind.send({owner:"com.emsoft.lunetube"});
    	 var obj = {
    	 	"id":"com.palm.schema.test:1",
       		"schema": {"id":"com.palm.schema.test:1", 
            "type": "object", 
            "properties" : { "_kind" : {"type": "string", "value":"com.palm.schema.test:1"}, 
                             "foo": {"type": "string", "description": "foo string"}, 
                             "bar": {"type": "string",  "description": "bar string"},
                             "isMember": {"type": "boolean", "description" : "Is member flag" }
                            }
             },
        	"owner":"com.palm.dbtest",
        	"indexes": [{
        				"name":"foo",
                      	"props":[{"name":"foo"}]
                      	},
                     	{
                     	"name":"barfoo",
                      	"props":[{"name":"bar"},{"name":"foo"}] 
                      }]

   			};
    	var indexes = [{"name":"lastname", props:[{"name": "lastname"}]},
                       {"name":"state", props:[{"name": "state"}]}];
        this.$.setDbKind.send(obj); // Create db8 kind
    },

    getToken: function(){
    	this.$.getToken.send({query:{"from":"com.emsoft.lunetube:1"}});
    	console.log("Auth -> getToken : Send enviado");
    },
    saveToken: function() {
         var  bff1 = { _kind: "com.emsoft.lunetube:1", lastname: "Syrup", firstname: "Mabel",
                       nickname: "Sticky", state: "CA",
                       emails:[{"value":"msyrup@gmail.com", "type":"home"},
                               {"value": "mabel.syrup@palm.com", "type":"work"}]};
         var  bff2 = { _kind: "enyo.bffs:1", lastname: "Wheels", firstname: "Helen", 
                       nickname: "Psycho", state: "OR",
                       emails:[{"value":"hwheels@gmail.com", "type":"home"},
                                {"value": "helen.wheels@palm.com", "type":"work"}]};
        var objs = [bff1, bff2];
        this.$.saveToken.send({objects: objs});
        console.log("Auth -> saveToken : Send enviado");
    },
    putBffsSuccess: function(inSender, inResponse) {
        console.log("Auth -> putBffsSuccess : Put success, results=" + enyo.json.stringify(inResponse));
    },
    // Log errors to the console for debugging
    dbFailure: function(inSender, inError, inRequest) {
    	console.log("Auth -> dbFailure: Hay erroes");
        console.log(enyo.json.stringify(inError));
    },

    getTokenSuccess: function(inSender, inResponse) {
        console.log("Simple find success, results=" + enyo.json.stringify(inResponse));
    },          
    // Log errors to the console for debugging
    getTokenFailure: function(inSender, inError, inRequest) {
        console.log(enyo.json.stringify(inError));
    },
    gotResponse: function(inRequest, inResponse){
    	console.log("Auth -> gotresponse: Hay respuesta");
    	console.log(inRequest);
    	console.log(inResponse);
    },

    setDbKindComplete: function(inRequest, inResponse){
    	console.log("Auth -> setDbKindComplete: response putDbKind");
    	console.log(inRequest);
    	console.log(inResponse);	
    }
}); 