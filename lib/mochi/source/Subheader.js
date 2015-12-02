(function (enyo, scope) {
	/**
	 * `mochi.ToggleButton` is a mochi-styled Subheader control that extends {@link enyo.Control}. This will display a
	 * single line of text.
	 *
	 * ```
	 * {kind: 'mochi.Subheader', content: 'This is a subheader'}
	 * ```
	 *
	 * @class mochi.Subheader
	 * @extends enyo.Control
	 * @ui
	 * @public
	 */

	enyo.kind(
		/** @lends mochi.Subheader.prototype */ {

		/**
		 * @private
		 */
		name: 'mochi.Subheader',

		/**
		 * @private
		 */
		kind: 'enyo.Control',

		/**
		 * @private
		 */
		classes: 'mochi-subheader',

		/**
		 * @private
		 */
		components: [
			{name: 'subheaderContent', classes: 'mochi-subheader-content'},
		],

		/**
		 * @private
		 */
		contentChanged: function () {
			this.$.subheaderContent.setContent(this.content);
		},

		/**
		 * @private
		 */
		resizeHandler: function () {
			this.inherited(arguments);
			this.adjustContent();
		},

		/**
		 * @private
		 */
		adjustContent: function () {
			var padding = this.hasNode() ? enyo.dom.calcPaddingExtents(this.node) : {};
			var pw = padding.left + padding.right;
			var contentWidth = this.getBounds().width - pw;

			this.$.subheaderContent.applyStyle('max-width', contentWidth + 'px');
		}
	});

})(enyo, this);
