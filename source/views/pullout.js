enyo.kind({
	name: "Pullout",
	kind: "enyo.Slideable",
	events: {
		onDropPin: "",
		onShowTraffic: "",
		onMapTypeSelect: "",
		onBookmarkSelect: ""
	},
	components: [
		{name: "shadow", classes: "pullout-shadow"},
		{kind: "onyx.Grabber", classes: "pullout-grabbutton", ontap:"openMenu"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{name: "client", classes: "pullout-toolbar"},
			{fit: true, style: "position: relative;", components: [
				{name: "info", kind: "Scroller", classes: "enyo-fit", components: [
					/*{kind: "onyx.Groupbox", classes: "settings", components: [
							{kind: "onyx.GroupboxHeader", content: "General"},
						{name: "mapType", kind: "Group", classes: "onyx-groupbox settings", highlander: true, onchange: "mapTypeChange", components: [
							{kind: "onyx.GroupboxHeader", content: "Map Type"},
						]}
					]},
					{name: "bookmark", kind: "FittableRows", showing: false, classes: "enyo-fit", components: [
						{kind: "onyx.RadioGroup", classes: "bookmark-header", components: [
							{content: "Saved", active: true},
							{content: "Recents"}
						]},
						{fit: true, kind: "Scroller", classes: "bookmark-scroller", components: [
							//{kind: "BookmarkList", onItemSelect: "itemSelect"}
						]}
					]}*/
				]}
			]}
		]}
	],
  	max: -315,
	min:-415,
	value: -415,
	unit: "%", 
	toggle: function(inPanelName) {
		var t = this.$[inPanelName];
		if (t.showing && this.isAtMin()) {
			this.animateToMax();
		} else {
			this.animateToMin();
			this.$.info.hide();
			this.$.bookmark.hide();
			t.show();
			t.resized();
		}
	},
	valueChanged: function() {
		this.inherited(arguments);
		this.$.shadow.setShowing(this.value !== this.max);
	},
	dropPinChange: function(inSender) {
		this.doDropPin({value: inSender.getValue()});
	},
	showTrafficChange: function(inSender) {
		this.doShowTraffic({value: inSender.getValue()});
	},
	mapTypeChange: function(inSender, inEvent) {
		var o = inEvent.originator;
		this.doMapTypeSelect({mapType: o.parent.mapType});
	},
	itemSelect: function(inSender, inEvent) {
		this.doBookmarkSelect({item: inEvent.item});
	},
	openMenu: function(inSender, inEvent){
		this.animateToMax();
	}
});