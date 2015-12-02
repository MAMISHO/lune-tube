enyo.kind({
    name: "mochi.GroupButton",
    kind: "Control",
    published: {
        
    },
    events: {
        
    },
    components: [
    	{kind: "enyo.Group", onActivate: "tabActivated", classes: "mochi-group-button", components:[
			{name:"infoTab", classes:"mochi-group-button-tab-inactive", tag:"div", ontap:"infoTab", index:0, components:[
				{name:"commentButton", classes:"mochi-group-button-inactive button-active-1", content: "Comments"},
			]},
			{name:"commentTab", classes:"mochi-group-button-tab-active", tag:"div", ontap:"commentTab", index:1, components:[
				{name:"infoButton", classes:"mochi-group-button-active button-inactive-2", content: "Info", active: true}
			]}
		]}
    ],
    create:function() {
        this.inherited(arguments);
    },
    tabActivated: function(inSender, inEvent) {
    	
		/*if (inEvent.originator.getParent().getActive()) {
			// this.updateResult({content: "The \"" + inEvent.originator.getParent().getActive().getContent() + "\" button is selected."});
			console.log(inEvent.originator.getParent().getActive().getContent() + "\" button is selected.");
		}*/
	},
	infoTab: function(inSender, inEvent){
		// console.log(inSender.index);
		this.$.commentButton.removeClass("button-inactive-1");
		this.$.commentButton.addClass("button-active-1");
		this.$.infoButton.removeClass("button-active-2");
		this.$.infoButton.addClass("button-inactive-2");
		this.bubble("onActiveTab", inSender);
	},
	commentTab: function(inSender, inEvent){
		// console.log(inSender.index);
		this.$.commentButton.removeClass("button-active-1");
		this.$.commentButton.addClass("button-inactive-1");
		this.$.infoButton.removeClass("button-inactive-2");
		this.$.infoButton.addClass("button-active-2");
		this.bubble("onActiveTab", inSender);
	}
});