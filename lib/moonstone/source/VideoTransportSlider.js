(function (enyo, scope) {
	/**
	* The parameter [object]{@glossary Object} used when displaying a {@link moon.VideoFeedback}
	* control.
	*
	* @typedef {Object} moon.VideoTransportSlider~FeedbackParameterObject
	* @property {Number} [playbackRate] - The playback rate.
	* @property {Number} [jumpSize] - The jump size.
	* @public
	*/

	/**
	* Fires when user starts dragging the video position knob. No additional data is
	* provided in this event.
	*
	* @event moon.VideoTransportSlider#onSeekStart
	* @type {Object}
	* @public
	*/

	/**
	* Fires when user changes the video position by tapping the bar.
	*
	* @event moon.VideoTransportSlider#onSeek
	* @type {Object}
	* @property {Number} value - The position to seek to.
	* @public
	*/

	/**
	* Fires when user stops dragging the video position knob.
	*
	* @event moon.VideoTransportSlider#onSeekFinish
	* @type {Object}
	* @property {Number} value - The position to seek to.
	* @public
	*/

	/**
	* Fires when cursor enters the tap area.
	*
	* @event moon.VideoTransportSlider#onEnterTapArea
	* @type {Object}
	* @public
	*/

	/**
	* Fires when cursor leaves the tap area.
	*
	* @event moon.VideoTransportSlider#onLeaveTapArea
	* @type {Object}
	* @public
	*/

	/**
	* {@link moon.VideoTransportSlider} extends {@link moon.Slider}, adding specialized
	* behavior related to video playback.
	*
	* ```javascript
	* {kind: 'moon.VideoTransportSlider', value: 30}
	* ```
	*
	* The [onSeekStart]{@link moon.VideoTransportSlider#onSeekStart} event is fired while
	* the control knob is being dragged, the
	* [onSeekFinish]{@link moon.VideoTransportSlider#onSeekFinish} event is fired when the
	* drag finishes, and the [onSeek]{@link moon.VideoTransportSlider#onSeek} event is fired
	* when the position is set by tapping the bar.
	*
	* @class moon.VideoTransportSlider
	* @extends moon.Slider
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends moon.VideoTransportSlider.prototype */ {

		/**
		* @private
		*/
		name: 'moon.VideoTransportSlider',

		/**
		* @private
		*/
		kind: 'moon.Slider',
		
		/**
		* @private
		*/
		spotlight: false,

		/**
		* @private
		*/
		classes: 'moon-video-transport-slider',
		
		/**
		* @private
		* @lends moon.VideoTransportSlider.prototype
		*/
		published: {

			/**
			* Starting point of slider.
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			rangeStart: 0,

			/**
			* Ending point of slider.
			*
			* @type {Number}
			* @default 100
			* @public
			*/
			rangeEnd: 100,
			
			/**
			* The position where the slider begins, expressed as a number between `0` and `1`.
			*
			* @type {Number}
			* @default 0.0625
			* @public
			*/
			beginPosition: 0.01,
			// beginPosition: 0.0625,
			
			/**
			* The position where the slider ends, expressed as a number between `0` and `1`.
			*
			* @type {Number}
			* @default 0.9375
			* @public
			*/
			endPosition: 0.99,
			// endPosition: 0.9375,
			
			/**
			* Controls the slider draw.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			syncTick: true,
			
			/**
			* Determines whether the dummy area is shown.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			showDummyArea: true,
			
			/**
			* When `true`, label is shown at the start and end positions.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			showTickText: true,
			
			/**
			* When `true`, tick bar is shown at the start and end positions.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			showTickBar: true,
			
			/**
			* When `true`, progress may extend past the hour markers.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			liveMode: false,

			/**
			* CSS classes to apply to background progress bar.
			*
			* @type {String}
			* @default 'moon-video-transport-slider-bg-bar'
			* @public
			*/
			bgBarClasses: 'moon-video-transport-slider-bg-bar',
			
			/**
			* CSS classes to apply to progress bar.
			*
			* @type {String}
			* @default 'moon-video-transport-slider-bar-bar'
			* @public
			*/
			barClasses: 'moon-video-transport-slider-bar-bar',
			
			/**
			* CSS classes to apply to popup label.
			*
			* @type {String}
			* @default 'moon-video-transport-slider-popup-label'
			* @public
			*/
			popupLabelClasses: 'moon-video-transport-slider-popup-label',
			
			/**
			* CSS classes to apply to knob.
			*
			* @type {String}
			* @default 'moon-video-transport-slider-knob'
			* @public
			*/
			knobClasses: 'moon-video-transport-slider-knob',
			
			/**
			* CSS classes to apply to tap area.
			*
			* @type {String}
			* @default 'moon-video-transport-slider-taparea'
			* @public
			*/
			tapAreaClasses: 'moon-video-transport-slider-taparea lunetube-fix-touch',
			
			/**
			* Color of value popup
			*
			* @type {String}
			* @default '#fff'
			* @public
			*/
			popupColor: '#fff',
			
			/**
			* Popup offset in pixels.
			*
			* @type {Number}
			* @default 25
			* @public
			*/
			popupOffset: 0,
			
			/**
			* Threshold value (percentage) for using animation effect on slider progress change.
			*
			* @type {Number}
			* @default 1
			* @public
			*/
			smallVariation: 1,
			
			/**
			* Popup height in pixels.
			*
			* @type {Number}
			* @default 67
			* @public
			*/
			popupHeight: 20,

			/*
			 * Current quality
			 * @type {String}
			 * @public
			 * values [ SD-MP4 | HD-MP4 ]
			 * defaulut - SD-MP4
			 */
			 quality: "SD-MP4"
		},
		
		/**
		* @private
		*/
		handlers: {
			onTimeupdate: 'timeUpdate',
			onresize: 'handleResize'
		},
		
		/**
		* @private
		*/
		events: {
			onSeekStart: '',
			onSeek: '',
			onSeekFinish: '',
			onEnterTapArea: '',
			onLeaveTapArea: '',
			onFullScreen: '',
			onLoadSD: '',
			onLoadHD: '',
			onChangeResolution:''
		},
		
		/**
		* @private
		*/
		tickComponents: [
			{name: 'startWrapper', classes: 'moon-video-transport-slider-indicator-wrapper start', components: [
				// {name: 'beginTickText', content: '00:00', classes:"video-time-indicaror"},
				{name: 'beginTickBar', classes: 'moon-video-transport-slider-indicator-bar-left'}
			]},
			{name: 'endWrapper', classes: 'moon-video-transport-slider-indicator-wrapper end', components: [
				{name: 'endTickBar', classes: 'moon-video-transport-slider-indicator-bar-right'},
				// {name: 'endTickText',content: '00:00', classes:"video-time-indicaror"}
				
			]},
			
			{name: 'time', classes:"moon-video-transport-slider-indicator-text", components:[
					{name: 'beginTickText', content: '00:00', classes:"video-time-indicaror"},
					{name: 'divider', content: '  /  ', classes:"video-time-indicaror video-time-divider"},
					{name: 'endTickText',content: '00:00', classes:"video-time-indicaror"}
			]},
			{tag: "div", style:"position: absolute;right: 0;top: 20px", components:[
				{kind: "onyx.MenuDecorator", classes:"player-resolution", name:"picker", onSelect: "itemSelected", components: [
					{content: "", name:"currentResolution"},
					{kind: "onyx.Menu", name:"pickerItem", scrolling:false,
					 style:"min-width: 100px;",
					 components: [
						// {content: "HD", active: true},
						{content: "HD"},
						{content: "SD", active: true}
					]}
				]},
				/*{kind: "onyx.PickerDecorator", classes: "player-resolution", name:"picker", onSelect: "itemSelected", components: [
					{},
					{kind: "onyx.Picker", name:"pickerItem",components: [
						{content: "SD", active: true},
						{content: "HD"}
					]}
				]},*/
				{name:"fullScreen",kind: "moon.IconButton", classes:"fullscreen-button", ontap:"fullScreen", components:[
						{name:"imageFullscreen", kind:"Image", src:"assets/video-player/icon_screen_full.png", fullscreen:false, style:"vertical-align: bottom;"}
				]}
			]}
		],

		/**
		* @private
		*/
		popupLabelComponents: [
			{name: 'feedback', kind:'moon.VideoFeedback', style:"display:none"},
			{name: 'popupLabelText', style:"display:none"}
		],

		/**
		* @private
		*/
		_previewMode: false,

		/**
		* @private
		*/
		create: function() {
			this.inherited(arguments);
			this.$.popup.setAutoDismiss(false);		//* Always showing popup
			this.$.popup.captureEvents = false;		//* Hot fix for bad originator on tap, drag ...
			// this.$.popup.setStyle("display:none");
			this.$.tapArea.onmove = 'preview';
			this.$.tapArea.onenter = 'enterTapArea';
			this.$.tapArea.onleave = 'leaveTapArea';
			//* Extend components
			this.createTickComponents();
			this.createPopupLabelComponents();
			this.showTickTextChanged();
			this.showTickBarChanged();

			if (window.ilib) {
				this.durfmt = new ilib.DurFmt({length: 'medium', style: 'clock', useNative: false});
				this.$.beginTickText.setContent(this.formatTime(0));

				var loc = new ilib.Locale(),
					language = loc.getLanguage(),
					// Hash of languages and the additional % widths they'll need to not run off the edge.
					langWidths = {
						ja: 0.05,
						pt: 0.05
					};

				if (langWidths[language]) {
					this.set('beginPosition', this.get('beginPosition') + langWidths[language] );
					this.set('endPosition', this.get('endPosition') - langWidths[language] );
				}
			}

			this.beginPositionChanged();
			this.endPositionChanged();


			this.$.pickerItem.removeClass("onyx-popup");
		},

		/**
		* @private
		*/
		createTickComponents: function() {
			this.createComponents(this.tickComponents, {owner: this, addBefore: this.$.tapArea});
		},

		/**
		* @private
		*/
		createPopupLabelComponents: function() {
			this.$.popupLabel.createComponents(this.popupLabelComponents, {owner: this});
			this.currentTime = 0;
		},

		setQuality: function(val){
			/*this.quality = val;
			// console.log("cambia");
			// console.log(val);
			if(this.quality === "SD-MP4"){
				// this.$.pickerItem.setSelected(this.$.menuItem);
				// this.$.pickerItem.setSelected(this.$.menuItem);
				// console.log(this.$.menuItem);
				this.$.currentResolution.setContent("SD");
			}*/
			if(val !== this.quality){
				this.quality = val;
				this.$.currentResolution.setContent(val);
			}
		},

		setAvailableQualities: function(qualities){
			var q = Object.keys(qualities);

			this.$.pickerItem.destroyClientControls();
			enyo.forEach(q, this.addQualitySelector, this);
			this.$.pickerItem.render();
		},

		addQualitySelector: function(item, index){
	        // var text = Object.keys( item ).pop();
	        if(item === "Auto") return;
	        
	        this.createComponent({
	            kind: "onyx.MenuItem",
	            container: this.$.pickerItem,
	            content: item,
	            classes: "quality-resolutions"
	        });
		},

		/**
		* @fires enyo.VideoTransportSlider#onEnterTapArea
		* @private
		*/
		enterTapArea: function(sender, e) {
			if (!this.disabled) {
				this.addClass('visible');
				this.startPreview();
				this.doEnterTapArea();
			}
		},

		/**
		* @fires enyo.VideoTransportSlider#onLeaveTapArea
		* @private
		*/
		leaveTapArea: function(sender, e) {
			this.removeClass('visible');
			this.endPreview();
			this.doLeaveTapArea();
		},

		/**
		* @private
		*/
		preview: function(sender, e) {
			if (!this.disabled && !this.dragging) {
				var v = this.calcKnobPosition(e);
				this.currentTime = this.transformToVideo(v);
				this._updateKnobPosition(this.currentTime);
			}
		},

		/**
		* @private
		*/
		startPreview: function(sender, e) {
			this._previewMode = true;
			this.$.feedback.setShowing(false);
		},

		/**
		* @private
		*/
		endPreview: function(sender, e) {
			this._previewMode = false;
			this.currentTime = this._currentTime;
			this._updateKnobPosition(this.currentTime);
			if (this.$.feedback.isPersistShowing()) {
				this.$.feedback.setShowing(true);
			}
		},

		/**
		* @private
		*/
		isInPreview: function(sender, e) {
			return this._previewMode;
		},

		/**
		* @private
		*/
		handleResize: function() {
			this.inherited(arguments);
			this.updateSliderRange();
		},

		/**
		* @private
		*/
		updateSliderRange: function() {
			this.beginTickPos = (this.max-this.min) * this.get('beginPosition');
			this.endTickPos = (this.max-this.min) * this.get('endPosition');

			if(this.showDummyArea) {
				this.setRangeStart(this.beginTickPos);
				this.setRangeEnd(this.endTickPos);
			} else {
				this.setRangeStart(this.min);
				this.setRangeEnd(this.max);
			}
			this.updateKnobPosition(this.value);
		},

		/**
		* @private
		*/
		setMin: function() {
			this.inherited(arguments);
			this.updateSliderRange();
		},

		/**
		* @private
		*/
		setMax: function() {
			this.inherited(arguments);
			this.updateSliderRange();
		},

		/**
		* @private
		*/
		setRangeStart: function(val) {
			this.rangeStart = this.clampValue(this.getMin(), this.getMax(), val);
			this.rangeStartChanged();
		},

		/**
		* @private
		*/
		setRangeEnd: function(val) {
			this.rangeEnd = this.clampValue(this.getMin(), this.getMax(), val);
			this.rangeEndChanged();
		},

		/**
		* @private
		*/
		beginPositionChanged: function() {
			// Set the width of the wrapper to twice the amount of it's position from the start.
			this.$.startWrapper.applyStyle('width', (this.get('beginPosition') * 200) + '%');
			this.updateSliderRange();
		},

		/**
		* @private
		*/
		endPositionChanged: function() {
			// Set the width of the wrapper to twice the amount of it's position from the end.
			this.$.endWrapper.applyStyle('width', ((this.get('endPosition') - 1) * -200) + '%');
			this.updateSliderRange();
		},

		/**
		* @private
		*/
		showTickTextChanged: function() {
			this.$.beginTickText.setShowing(this.getShowTickText());
			this.$.endTickText.setShowing(this.getShowTickText());
		},

		/**
		* @private
		*/
		showTickBarChanged: function() {
			if(this.showDummyArea) {
				this.showTickBar = true;
			}
			this.$.beginTickBar.setShowing(this.getShowTickBar());
			this.$.endTickBar.setShowing(this.getShowTickBar());
		},

		/**
		* @private
		*/
		rangeStartChanged: function() {
			this.updateInternalProperty();
			var p = this._calcPercent(this.rangeStart),
				property = 'margin-left';
			if (this.liveMode) {
				property = 'padding-left';
			}
			this.$.bar.applyStyle(property, p + '%');
			this.$.bgbar.applyStyle(property, p + '%');
		},

		/**
		* @private
		*/
		rangeEndChanged: function() {
			this.updateInternalProperty();
		},

		/**
		* @private
		*/
		updateInternalProperty: function() {
			this.updateScale();
			this.progressChanged();
			this.bgProgressChanged();
		},
		//* Sets value of hidden variable, _scaleFactor_.
		updateScale: function() {
			this.scaleFactor = (this.rangeEnd-this.rangeStart)/(this.max-this.min);
		},

		/**
		* @private
		*/
		calcPercent: function(val) {
			return (this.calcRatio(val) * 100) * this.scaleFactor;
		},

		/**
		* @private
		*/
		_calcPercent: function(val) {
			return this.calcRatio(val) * 100;
		},

		/**
		* @private
		*/
		calcVariationRatio: function(val) {
			return (val - this.value) / (this.max - this.min);
		},

		/**
		* @private
		*/
		calcVariationPercent: function(val) {
			return this.calcVariationRatio(val) * 100;
		},

		/**
		* @private
		*/
		updateKnobPosition: function(val) {
			if (!this.dragging && this.isInPreview()) { return; }
			this._updateKnobPosition(val);
		},

		/**
		* @private
		*/
		_updateKnobPosition: function(val) {
			var p = this.clampValue(this.min, this.max, val);
			p = this._calcPercent(p);
			var slider = this.inverseToSlider(p);
			this.$.knob.applyStyle('left', slider + '%');
			this.$.popup.addRemoveClass('moon-slider-popup-flip-h', slider > 50);
			this.$.popupLabel.addRemoveClass('moon-slider-popup-flip-h', slider > 50);
			if(this.currentTime !== undefined) {
				this.$.popupLabelText.setContent(this.formatTime(this.currentTime));
				this.$.beginTickText.setContent(this.formatTime(this.currentTime));
			}
		},

		/**
		* @private
		*/
		inverseToSlider: function(percent) {
			var val = this.scaleFactor * percent + this._calcPercent(this.rangeStart);
			return val;
		},

		/**
		* @private
		*/
		transformToVideo: function(val) {
			if (this.showDummyArea && (val < this.beginTickPos)) {
				val = this.rangeStart;
			}
			if (this.showDummyArea && (val > this.endTickPos)) {
				val = this.rangeEnd;
			}
			return (val - this.rangeStart) / this.scaleFactor;
		},
		
		/**
		* If user presses `this.$.tapArea`, seeks to that point.
		*
		* @private
		*/
		tap: function(sender, e) {
			var cmp = e.originator.name;
			var originator = e.originator.parent.name;
			/*console.log("took");
			console.log(cmp);
			console.log(sender.name);*/

			if(originator === 'pickerItem') return true;
			if(sender.name === "picker" || sender.name === "button") return true;

			if(cmp === 'pickerButton' || cmp === 'menuItem' || cmp === 'menuItem2' || cmp === "button" || cmp === "currentResolution") return true;

			if(cmp === "fullScreen" || cmp === 'imageFullscreen'){
				this.$.imageFullscreen.fullscreen = !this.$.imageFullscreen.fullscreen;
				if(this.$.imageFullscreen.fullscreen){
					this.$.imageFullscreen.setSrc("assets/video-player/icon_screen_normal.png");
				}else{
					this.$.imageFullscreen.setSrc("assets/video-player/icon_screen_full.png");
				}
				this.doFullScreen(this);
				return true;
			}

			if (this.tappable && !this.disabled) {
				var v = this.calcKnobPosition(e);

				v = this.transformToVideo(v);
				this.sendSeekEvent(v);

				if (this.isInPreview()) {
					//* This will move popup position to playing time when preview move is end
					this._currentTime = v;
				}
				return true;
			}
		},

		itemSelected: function(inSender, inEvent) {
			// console.log(inEvent.selected.content);
			this.$.currentResolution.setContent(inEvent.selected.content);
			/*if( inEvent.selected.content === 'SD'){
				this.doLoadSD(this);
			}else{
				this.doLoadHD(this);
			}*/
			if(this.quality !== inEvent.selected.content){
				this.quality = inEvent.selected.content;
				this.doChangeResolution(this);	
			}
			
			return true;
			// console.log(inEvent.selected.content);
		},

		/**
		* @private
		*/
		setValue: function(val) {
			if(Math.abs(this.calcVariationPercent(val)) > this.smallVariation) {
				this.inherited(arguments);
			} else {
				this._setValue(val);
			}
		},

		/**
		* If `dragstart`, bubbles [onSeekStart]{@link moon.VideoTransportSlider#onSeekStart}
		* event.
		*
		* @fires moon.VideoTransportSlider#onSeekStart
		* @private
		*/
		dragstart: function(sender, e) {
			if (this.disabled) {
				return; // return nothing
			}
			if (e.horizontal) {
				var v = this.calcKnobPosition(e);
				if( this.showDummyArea && (v < this.beginTickPos || v > this.endTickPos) ) {
					// TODO : action in dummy area
					this.dummyAction = true;
				} else {
					// the call to the super class freezes spotlight, so it needs to be unfrozen in dragfinish
					var dragstart = this.inherited(arguments);
					if (dragstart) {
						this.doSeekStart();
					}
					this.dummyAction = false;
				}
				return true;
			}

			return true;
		},
		
		/**
		* If `drag`, bubbles [onSeek]{@link moon.VideoTransportSlider#onSeek} event and
		* overrides parent `drag` handler.
		*
		* @private
		*/
		drag: function(sender, e) {
			if (this.dragging) {
				var v = this.calcKnobPosition(e);

				//* Default behavior to support elastic effect
				v = this.transformToVideo(v);
				if (this.constrainToBgProgress === true) {
					v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
					var ev = this.bgProgress + (v-this.bgProgress)*0.4;
					v = this.clampValue(this.min, this.bgProgress, v);
					this.elasticFrom = (this.elasticEffect === false || this.bgProgress > v) ? v : ev;
					this.elasticTo = v;
				} else {
					v = (this.increment) ? this.calcIncrement(v) : v;
					v = this.clampValue(this.min, this.max, v);
					this.elasticFrom = this.elasticTo = v;
				}
				this.currentTime = v;
				this.updateKnobPosition(this.elasticFrom);

				if (this.lockBar) {
					this.setProgress(this.elasticFrom);
					this.sendChangingEvent({value: this.elasticFrom});
					this.sendSeekEvent(this.elasticFrom);
				}
				return true;
			}
		},

		/**
		* If `dragfinish`, bubbles
		* [onSeekFinish]{@link moon.VideoTransportSlider#onSeekFinish} event and overrides
		* parent `dragfinish` handler.
		*
		* @fires moon.VideoTransportSlider#onSeekFinish
		* @private
		*/
		dragfinish: function(sender, e) {
			if (this.disabled) {
				return;
			}
			if(!this.dummyAction) {
				var v = this.calcKnobPosition(e);
				v = this.transformToVideo(v);
				var z = this.elasticTo;
				if (this.constrainToBgProgress === true) {
					z = (this.increment) ? this.calcConstrainedIncrement(z) : z;
					this.animateTo(this.elasticFrom, z);
					v = z;
				} else {
					v = (this.increment) ? this.calcIncrement(v) : v;
					this._setValue(v);
				}
				e.preventTap();
				// this.hideKnobStatus();
				this.doSeekFinish({value: v});
				enyo.Spotlight.unfreeze();
			}
			this.$.knob.removeClass('active');
			this.dummyAction = false;
			this.dragging = false;
			return true;
		},

		/**
		* Sends [onSeek]{@link moon.VideoTransportSlider#onSeek} event.
		*
		* @fires moon.VideoTransportSlider#onSeek
		* @private
		*/
		sendSeekEvent: function(val) {
			this.doSeek({value: val});
		},

		/**
		* During time update, updates buffered progress, canvas, video currentTime, and duration.
		*
		* @private
		*/
		timeUpdate: function(sender, e) {
			this._currentTime = sender._currentTime;
			if (!this.dragging && this.isInPreview()) { return; }
			this._duration = sender.duration;
			this.currentTime = this._currentTime;
			this.duration = this._duration;
			this.$.endTickText.setContent(this.formatTime(this.duration));
		},

		/**
		* Properly formats time.
		*
		* @private
		*/
		formatTime: function(val) {
			var hour = Math.floor(val / (60*60));
			var min = Math.floor((val / 60) % 60);
			var sec = Math.floor(val % 60);
			if (this.durfmt) {
				var time = {minute: min, second: sec};
				if (hour) {
					time.hour = hour;
				}
				return this.durfmt.format(time);
			} else {
				return (hour ? this.padDigit(hour) + ':' : '') + this.padDigit(min) + ':' + this.padDigit(sec);
			}
		},

		/**
		* Time formatting helper.
		*
		* @private
		*/
		padDigit: function(val) {
			return (val) ? (String(val).length < 2) ? '0'+val : val : '00';
		},
		
		/**
		* Sends current status to [feedback]{@link moon.VideoFeedback} control in response to
		* user input.
		*
		* @param {String} - msg The string to display.
		* @param {moon.VideoTransportSlider~FeedbackParameterObject} params - A
		*	[hash]{@glossary Object} of parameters that accompany the message.
		* @param {Boolean} persist - If `true`, the [feedback]{@link moon.VideoFeedback} control will
		*	not be automatically hidden.
		* @param {String} leftSrc - The source url for the image displayed on the left side of
		*	the feedback control.
		* @param {String} rightSrc - The source url for the image displayed on the right side
		*	of the feedback control.
		* @public
		*/
		feedback: function(msg, params, persist, leftSrc, rightSrc) {
			this.showKnobStatus();
			this.$.feedback.feedback(msg, params, persist, leftSrc, rightSrc, this.isInPreview());
		}
	});

})(enyo, this);
