enyo.kind({
	name: "PlayerConfig",
	kind: "FittableRows",
	// classes: "enyo-fit",
	published:{
		options:{
			repeat: false,
			sleep: false,
			timeSleep: [5, 10, 15, 30, 60], //minutes
			speed: [0.25, 0.5, 1, 1.25, 2.5, 1.75, 2]

		}
	},
	components:[
		{kind: "FittableColumns", classes: "config-item", components:[
			{kind: "Control", content: "Repeat", fit: true},
			{kind: "mochi.ToggleButton", onChange: "loopChanged", colorActive: "#69cdff", colorInactive: "#ff4a4a", style: "width: 80px"},
		]},
		{kind: "FittableColumns", classes: "config-item", components:[
			{kind: "Control", content: "Sleep", fit: true},
			{kind: "onyx.PickerDecorator", components: [
		        {name: "timeSleep1"}, // this uses the defaultKind property of PickerDecorator to inherit from PickerButton
		        {kind: "onyx.IntegerPicker", name:"timeSleep", min: 1, max: 30, value: 5, onChange: "timeSleepChanged"}
		    ]},
		    {kind: "mochi.ToggleButton", name:"sleepToggle", onChange: "sleepChanged", colorActive: "#69cdff", colorInactive: "#ff4a4a", style: "width: 80px"},
		]},

		{kind: "FittableColumns", classes: "config-item", components:[
			{kind: "Control", content: "speed", fit: true},
			{name: "speedBadge", kind: "mochi.Badge", content: "Normal"},
		]},
		
		{classes: "mochi-sample-tools config-item", name:"sliderContent", components: [
				{kind: "luneSlider", name: "slider", onSpeedChange: "speedChange"},
		]},
		// {kind: "lune.Slider"}
	],
	loop: false,
	sleep: false,
	create:function() {
		this.inherited(arguments);
	},

	loopChanged: function(inSender, inEvent){
			this.loop = inSender.getValue();
			this.bubble("onLoopChanged", this);	
	},

	speedChange: function(inSender, inEvent){
		this.$.speedBadge.setContent(inEvent.originator.speed);
	},

	sleepChanged: function(inSender, inEvent){
		console.log("vamos a dormir");
		this.sleep = inSender.getValue();
		this.timeSleepChanged();
		return true;
	},

	timeSleepChanged: function(inSender, inEvent){
		// this.sendToSleep();
		if(this.sleep){
			var time = 0;
			time = this.$.timeSleep1.getContent();
			this.startJob("sleepApp", enyo.bind(this, "sendToSleep") , (time * 1000), 1);
			return true;
		}
	},

	sendToSleep: function(){
		console.log("Se envia a dormir");
		this.$.sleepToggle.setValue(false);
		this.bubble("onSleepApp", this);
	}
});

	/*timeSleepChanged: function(inSender, inEvent){
		this.sendToSleep();
		if(this.sleep){
			var time = 0;
			time = this.$.timeSleep1.getContent();
			this.startJob("sleepApp", enyo.bind(this, "checkupdates") , time, 1);
			return true;
		}else{
			return true;
		}
		return true;
	},

	sendToSleep: function(){
		this.bubble("onSleepApp", this)
	}*/




enyo.kind({
	name: "PlayerPanel",
	kind: "enyo.Slideable",
	overMoving: false,
	components: [
		{name: "shadow", classes: "player-panel-shadow"},
		{kind: "onyx.Grabber", classes: "player-panel-grabbutton", ontap:"toggle"},


	],
	max: 100,
	value: 100,
	unit: "%", 
	
	create:function() {
		this.inherited(arguments);
	},

	toggle: function(inPanelName) {

		// var t = this.$[inPanelName];
		if (this.isAtMin()) {
			this.animateToMax();
		} else {
			this.animateToMin();
		}
	},
	
	valueChanged: function() {
		this.inherited(arguments);
		this.$.shadow.setShowing(this.value !== this.max);
	},

	hide: function(inSender, inEvent){
		this.max = 115;
		this.animateToMax();
	},
	show: function(inSender, inEve){
		this.max = 100;
		this.animateToMax();
	}
});


enyo.kind({
	name: "luneSlider",
	kind: "Control",
	classes: "mochi-sample-tools",
	components: [
		{kind: "mochi.Slider", name: "slider", onChanging:"sliderChanging", onChange:"sliderChanging",
			increment:1,
			value: 2,
			max:6,
			min:0
		}
	],
	currentPosition:0,
	speed: 0,

	create: function(){
		this.inherited(arguments);
		this.currentPosition = this.$.slider.getValue();
	},

	sliderChanging: function(inSender, inEvent){
		if(inSender.getValue() != this.currentPosition){
			this.currentPosition = inSender.getValue();

			switch(this.currentPosition){
				case 0:
					this.speed = '0.75';
				break;
				case 1:
					this.speed = '0.9';
				break;
				case 2:
					this.speed = 'Normal';
				break;
				case 3:
					this.speed = '1.25';
				break;
				case 4:
					this.speed = '1.5';
				break;
				case 5:
					this.speed = '1.75';
				break;
				default:
					this.speed = '2';

			}
			this.$.slider.$.popupLabel.setContent(this.speed);
			// console.log(this.currentPosition);
			this.bubble("onSpeedChange",this);
		}
		
	}
});