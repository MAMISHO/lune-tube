enyo.kind({
    name: "Icon.Component",
    kind: "Control",
    published: {
        type: "image", //[icon| image]
        srcs: [] 
    },
    events: {
        
    },
    components: [
        
    ],
    create:function() {
        this.inherited(arguments);

    },

    typeChanged: function(){
    	if (this.type !== "" && this.type !== null) {
    		for (var i = 0; this.srcs.length; i++) {
    			
    		}
    	}
    }
});