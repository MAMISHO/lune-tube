/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "Menu", name:"menu"},
		{kind: 'Panels', fit: true, classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false,realtimeFit:true, components: [
			{name: 'content_list', fit: true, components: [
				{kind: 'Scroller', classes: 'enyo-fit', touch: true, components: [
					{kind:"VideoList"},
					{classes: 'panels-sample-sliding-content', content: 'Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. '}
					
				]}
			]},
			{name: 'content_player', components: [
				{kind: "enyo.Scroller",touch: true, components: [
					{kind: "Player", name:"player"}
				]}
			]},
		]},
		{kind:"YoutubeApi", name: "youtube"}
	],
	create:function() {
        this.inherited(arguments);
        this.search();
    },

    search: function() {
		// this.$.spinner.setShowing(true);
		// var results = this.$.youtube.search("cats");
		this.$.youtube.search("cats").response(this, "receiveResults");
		// console.log(results);
	},

	receiveResults: function(inRequest, inResponse){
		console.log(inRequest);
		console.log(inResponse);
	}
});
