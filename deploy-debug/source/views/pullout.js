enyo.kind({
	name: "Pullout",
	kind: "enyo.Slideable",
	overMoving: false,
	events: {
		// onDropPin: "",
		// onShowTraffic: "",
		// onMapTypeSelect: "",
		// onBookmarkSelect: ""
	},
	components: [
		{name: "shadow", classes: "pullout-shadow"},
		{kind: "onyx.Grabber", classes: "pullout-grabbutton", ontap:"toggle"},
		// {kind: "FittableRows", classes: "enyo-fit", components: [
			// {name: "client", classes: "pullout-toolbar"},
      
			/*{fit: true, style: "position: relative;", components: [
      
				{name: "info", kind: "Scroller",fit:true, classes: "enyo-fit", components: [
        			{content:"SlindingPanel"},
				]},
			]}*/
		// ]}
	],
	//max: 90,
  	min: -98,
	value: -98,
	unit: "%", 
	toggle: function(inPanelName) {
		if (this.isAtMin()){
    		this.animateToMax();
	    }else{
	    	this.animateToMin();
	    }
	},
	
	valueChanged: function() {
		this.inherited(arguments);
		this.$.shadow.setShowing(this.value !== this.min);
	},

	hide: function(inSender, inEvent){
		this.min = -110;
		this.animateToMin();
	},
	show: function(inSender, inEve){
		this.min = -98;
		this.animateToMin();
	}
});