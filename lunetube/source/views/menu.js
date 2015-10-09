enyo.kind({
    name: "Menu",
    kind: "Control",
    published: {
        
    },
    components: [
    	{kind: "onyx.Toolbar", classes:"menu", components:[
    		{content:"home"},
    		{content:"suscriptions"},
    		{content:"perfil"},
    	]}
    ],
    create:function() {
        this.inherited(arguments);
    }
});