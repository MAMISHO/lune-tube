/*jslint sloppy: true, nomen: true, browser: true */
/*global PalmSystem, webos: true, enyo */
/**
	A collection of static variables and functions core to webOS functionality
	and the webOS feature-set. A large amount of PalmSystem bindings combined
	with some utility functions.
*/

//* @public
webos = {
	/**
		Returns an object containing the "appID" and "process" identifiers of
		the current-running application.
	*/
	identifier: function () {
		var tokens = PalmSystem.identifier.split(" ");
		return {
			appID: tokens[0],
			process: tokens[1]
		};
	},
	//* Returns an object containing the application's launch parameters.
	launchParams: function () {
		return enyo.json.parse(PalmSystem.launchParams || "{}") || {};
	},
	/**
		Returns an object containing device information such as:

		* `bluetoothAvailable`
		* `carrierName`
		* `coreNaviButton`
		* `keyboardAvailable`
		* `keyboardSlider`
		* `keyboardType`
		* `maximumCardWidth`
		* `maximumCardHeight`
		* `minimumCardWidth`
		* `minimumCardHeight`
		* `modelName`
		* `modelNameAscii`
		* `platformVersion`
		* `platformVersionDot`
		* `platformVersionMajor`
		* `platformVersionMinor`
		* `screenWidth`
		* `screenHeight`
		* `serialNumber`
		* `touchableRows`
		* `wifiAvailable`
	*/
	deviceInfo: function () {
		if (!this._deviceInfo) {
			if (!window.PalmSystem) {
				this._deviceInfo = {
					platfromVersionMajor: "",
					modelName: "Browser"
				};
			} else {
				this._deviceInfo = enyo.json.parse(PalmSystem.deviceInfo);
			}
		}
		return this._deviceInfo;
	},
	/*
	 * Returns true if device is legacy webOS phone.
	 */
	isPhone: function () {
		return this.deviceInfo().platformVersionMajor <= 2;
	},
	isTablet: function () {
		return this.deviceInfo().platformVersionMajor === 3;
	},
	isLuneOS: function () {
		return (this.deviceInfo().modelName.indexOf("Lune") >= 0);
	},
	//* Returns the full URI path the application is running from.
	fetchAppRootPath: function () {
		var base = window.location.href, baseTags, match;
		if (window.document.baseURI) {
			base = window.document.baseURI;
		} else {
			baseTags = window.document.getElementsByTagName("base");
			if (baseTags.length > 0) {
				base = baseTags[0].href;
			}
		}
		match = base.match(new RegExp(".*:\/\/[^#]*\/"));
		if (match) {
			return match[0];
		}
		return "";
	},
	/**
		Synchronously fetchs, parses, and returns the appinfo.json file of
		the running application.
	*/
	fetchAppInfo: function () {
		if (!webos.appInfo) {
			try {
				var appInfoJSON, appInfoPath = webos.fetchAppRootPath() + "appinfo.json";
				if (window.palmGetResource) {
					appInfoJSON = window.palmGetResource(appInfoPath);
				} else {
					appInfoJSON = enyo.xhr.request({url: appInfoPath, sync: true}).responseText;
				}
				webos.appInfo = enyo.json.parse(appInfoJSON);
			} catch (e) {
				webos.appInfo = undefined;
			}
		}
		return webos.appInfo;
	},
	//* Returns an object containing the _"locale"_, _"localeRegion"_, and _"phoneRegion"_.
	localeInfo: function () {
		if (!window.PalmSystem) {
			return {
				locale: "en",
				localeRegion: "US",
				phoneRegion: "001"
			};
		}
		return {
			locale: PalmSystem.locale,
			localeRegion: PalmSystem.localeRegion,
			phoneRegion: PalmSystem.phoneRegion
		};
	},
	//* Whether or not the device is in 12-hour format.
	isTwelveHourFormat: function () {
		if (!window.PalmSystem) {
			return true;
		}
		return (PalmSystem.timeFormat === "HH12");
	},
	//* Pastes any content in the clipboard.
	pasteClipboard: function () {
		if (!window.PalmSystem) {
			return;
		}
		PalmSystem.paste();
	},
	/**
		Returns the current device orientation; one of _"up"_, _"down"_, _"left"_,
		or _"right"_.
	*/
	getWindowOrientation: function () {
		if (!window.PalmSystem) {
			return "up";
		}
		//Returns one of 'up', 'down', 'left' or 'right'.
		return PalmSystem.screenOrientation;
	},
	/**
		Sets the device orientation. Acceptable values include _"up"_, _"down"_,
		_"left"_, _"right"_, and _"free"_.
	*/
	setWindowOrientation: function (inOrientation) {
		if (!window.PalmSystem) {
			return;
		}
		//inOrientation is one of 'up', 'down', 'left', 'right', or 'free'
		PalmSystem.setWindowOrientation(inOrientation);
	},
	//* Enables or disables fullscreen mode.
	setFullScreen: function (inMode) {
		if (!window.PalmSystem) {
			return;
		}
		PalmSystem.enableFullScreenMode(inMode);
	},
	/**
		New content management with LED notifications. Pass _true_ to
		indicate new content, pass _false_ to remove indications.
	*/
	indicateNewContent: function (hasNew) {
		if (!window.PalmSystem) {
			return true;
		}
		if (webos._throbId) {
			PalmSystem.removeNewContentIndicator(webos._throbId);
			webos._throbId = undefined;
		}
		if (hasNew) {
			webos._throbId = PalmSystem.addNewContentIndicator();
		}
	},
	/**
		Returns _true_ or _false_ depending if the given window is activated.
		If no _inWindow_ is specified, `window` is used.
	*/
	isActivated: function (inWindow) {
		inWindow = inWindow || window;
		if (inWindow.PalmSystem) {
			return inWindow.PalmSystem.isActivated;
		}
		return false;
	},
	/**
		Activates a given window. If no _inWindow_ is specified, `window`
		is used.
	*/
	activate: function (inWindow) {
		inWindow = inWindow || window;
		if (inWindow.PalmSystem) {
			inWindow.PalmSystem.activate();
		}
	},
	/**
		Deactivates a given window. If no _inWindow_ is specified, `window`
		is used.
	*/
	deactivate: function (inWindow) {
		inWindow = inWindow || window;
		if (inWindow.PalmSystem) {
			inWindow.PalmSystem.deactivate();
		}
	},
	/**
		Adds a banner message; it will be displayed briefly before disappearing.
		Returns the banner ID.

		* `inMessage`: (required) message to display
		* `inJson`: (required) JSON-formatted string re-launch parameters
		* `inIcon`: icon to display
		* `inSoundClass`: sound class to play
		* `inSoundPath`: path to sound to play
		* `inSoundDuration`: duration of sound to play
	*/
	addBannerMessage: function (inMessage, inJson, inIcon, inSoundClass, inSoundPath, inSoundDuration) {
		if (!window.PalmSystem) {
			return 0;
		}
		return PalmSystem.addBannerMessage.apply(PalmSystem, arguments);
	},
	//* Removes a banner message by a given banner ID.
	removeBannerMessage: function (inId) {
		if (!window.PalmSystem) {
			return;
		}
		PalmSystem.removeBannerMessage.apply(PalmSystem, arguments);
	},
	/**
		Set webOS system properties of a given window.

		Properties are an object and can contain the following settings:

		* `blockScreenTimeout` (Boolean)
		* `setSubtleLightbar` (Boolean)
		* `fastAccelerometer` (Boolean)
	*/
	setWindowProperties: function (inWindow, inProps) {
		if (arguments.length === 1) {
			inProps = inWindow;
			inWindow = window;
		}
		if (inWindow.PalmSystem) {
			inWindow.PalmSystem.setWindowProperties(inProps);
		}
	},

	/**
		Searches _inText_ for URLs (web and mailto) and emoticons (if supported),
		and returns a new string with those entities replaced by HTML links and
		images (respectively).

		Passing false for an  _inOptions_ field will prevent LunaSysMgr from
		HTML-izing that text type.

		Default option values:

		* `phoneNumber: true,`
		* `emailAddress: true,`
		* `webLink: true,`
		* `schemalessWebLink: true,`
		* `emoticon: true`
	*/
	runTextIndexer: function (inText, inOptions) {
		if (inText && inText.length > 0 && window.PalmSystem && PalmSystem.runTextIndexer) {
			return PalmSystem.runTextIndexer(inText, inOptions);
		}
		return inText;
	},
	ready: function () {
		// FIXME: calling stageReady on a slight delay appears to
		// fix apps starting with a blank screen. Hypothesis: we need to
		// yield the thread between dom changes and stageReady.
		setTimeout(function () {
			PalmSystem.stageReady();
		}, 1);
	},

	/**
		Copies inText to system clipboard
	 */
	setClipboard: function (inText) {
		if (!this._clipboardTextArea) {
			this._clipboardTextArea = document.createElement("textarea");
		}
		this._clipboardTextArea.value = inText;
		document.body.appendChild(this._clipboardTextArea);
		enyo.webos.keyboard.setManualMode(true); //suspend keyboard
		this._clipboardTextArea.select();
		document.execCommand("cut");
		this._clipboardTextArea.blur();
		enyo.webos.keyboard.setManualMode(false);
		document.body.removeChild(this._clipboardTextArea);
	},

	/**
		Gets what is stored in system clipboard and calls the supplied callback.
	 */
	getClipboard: function (inCallback) {
		if (!this._clipboardTextArea) {
			this._clipboardTextArea = document.createElement("textarea");
		}
		document.body.appendChild(this._clipboardTextArea);
		this._clipboardTextArea.value = "";
		enyo.webos.keyboard.setManualMode(true); //suspend keyboard
		this._clipboardTextArea.select();
		this._clipboardTextArea.oninput = function () {
			inCallback(this._clipboardTextArea.value);
			// "hide the textarea until it is needed again.
			this._clipboardTextArea.value = "";
			this._clipboardTextArea.blur();
			enyo.webos.keyboard.setManualMode(false);
			document.body.removeChild(this._clipboardTextArea);
		}.bind(this);

		if (window.PalmSystem) {
			PalmSystem.paste();
		} else {
			document.execCommand("paste");
		}
	}
};

if (window.PalmSystem) {
	window.addEventListener("load", webos.ready, false);
}

//* Reference pointing for convenience
enyo.webos = webos;
