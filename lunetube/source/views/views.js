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
		{kind: "onyx.Toolbar", content: "LuneTube"},
		{kind: 'Panels', fit: true, classes: 'panels-sample-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, components: [
			{name: 'left', components: [
				{kind: 'List', classes: 'enyo-fit', touch: true, count: 1000, onSetupItem: 'setupItem', item: 'item1', components: [
					{name: 'item1', classes: 'panels-sample-sliding-item'}
				]}
			]},
			{name: 'middle', components: [
				{kind: "enyo.Scroller", fit: true, components: [
					{name: "main", classes: "nice-padding", allowHtml: true}
				]}
			]},
			{name: 'body', fit: true, components: [
				{kind: "Player", name:"player"}
				/*{kind: 'Scroller', classes: 'enyo-fit', touch: true, components: [
					{classes: 'panels-sample-sliding-content', content: 'Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old.'}
				]}*/
			]}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Tap me", ontap: "helloWorldTap"},
			{kind: "onyx.Button", content: "|>", ontap: "playVideo"}
		]}
	],
	helloWorldTap: function(inSender, inEvent) {
		this.$.main.addContent("The button was tapped.<br/>");
	},

	setupItem: function(inSender, inEvent) {
		this.$[inSender.item].setContent('This is row number: ' + inEvent.index);
		return true;
	},

	playVideo: function(inSender, inEvent){
		this.$.player.webMovieBunny(inSender, inEvent);
	}
});
