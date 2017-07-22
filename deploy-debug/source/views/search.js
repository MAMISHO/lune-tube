enyo.kind({
    name: "LuneTube.Search",
    kind: "Control",
    handlers: {
        // onblur: "changedBlur"
    },
    published: {
        searching: false,
        searchTerm: ""
    },
    components: [
        {kind: "onyx.Toolbar", classes:"topbar",  components:[
                {kind: "Image", src: "assets/yt_icon_1.png", ontap:"showMenu"},
                {name:"acid", kind:"AutoCompleteInputDecorator", onInputChanged:"inputChanged", onValueSelected: "searchAction", components:[
                    {kind: "onyx.Input",fit:true, name:"searchQuery", placeholder: "Just Type...", onchange: "inputChanged", selectOnFocus:true, defaultFocus:false, onkeypress: "inputKeypress"},
                    {name:"searchButton",kind: "Image", src: "assets/search-input-search.png", ontap:"searchAction", showing: true, classes: "search-input-image"},
                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false, style:"width:20px"}
                ]}
        ]},
        {kind: "Signals", onkeyup: "inputKeypress"},
    ],
    results: [],
    create: function() {
        this.inherited(arguments);
        // this.$.searchQuery.focus();
    },
    inputKeypress: function(inSender, inEvent) {
        if (inEvent.keyCode === 13 || inEvent.keyIdentifier == "Enter") {
            this.searchAction();
        }
    },

    searchingChanged: function() {
        if (this.searching) {
            this.$.searchButton.setShowing(false);
            this.$.searchSpinner.setShowing(true);
        } else {
            this.$.searchButton.setShowing(true);
            this.$.searchSpinner.setShowing(false);
        }
    },

    searchTermChanged: function() {
        this.$.searchQuery.setValue(this.searchTerm);
    },

    searchAction: function(inSender, inEvent) {
        this.setSearching(true);
        var url = this.isYoutubeURL(this.$.searchQuery.getValue());
        if (url) {
            this.bubble("onSearchFromUrl", url);
        } else {
            this.bubble("onSearchEvent", this.$.searchQuery.getValue());
        }

        this.$.acid.completeSearch();
        this.$.searchQuery.blur();
        return true;
    },

    showMenu: function(inSender, inEvent) {
        this.bubble("onHomeRequest", this);
    },

    inputChanged: function(source, inEvent) {
        if (inEvent.value !== "" && typeof inEvent.value !== "undefined") {
            this.autoComplete(inEvent.value);
            this.$.acid.setValues(this.results);
        }

    },

    autoComplete: function(query) {
        var url_base = "https://suggestqueries.google.com/";
        var method = "complete/search";
        var params = {
            key: "AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg",
            ds: "yt",
            client: "youtube",
            hjson: "t",
            cp: 1,
            q: query,
            format: 5,
            alt: "json",
            callback: "?"
        };

        var request = new enyo.Ajax({
            url: url_base + method,
            method: "GET",
            dataType: 'jsonp',
            cacheBust: false,
            callbackName: null,
            overrideCallback: null
        });

        request.response(enyo.bind(this, "autoCompleteResults"));
        request.error(enyo.bind(this, "autoCompleteResultsError"));
        return request.go(params);
    },

    autoCompleteResults: function(inRequest, inResponse) {
        if (!inResponse) return;
        this.results = inResponse[1].map(function(item) {
            return item[0];
        });
    },

    autoCompleteResultsError: function(inRequest, inResponse) {
        if (!inResponse) return;
        console.log(inRequest);
        console.log(inRequest.xhrResponse.body);
    },

    isYoutubeURL: function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
            return match[7];
        } else {
            return false;
        }
    }
});


enyo.kind({
    name: "AutoCompleteInputDecorator",
    classes: "search-input-decorator",
    kind: "onyx.InputDecorator",
    handlers: {
        oninput: "input",
        onSelect: "itemSelected",
    },
    published: {
        values: "",
        delay: 100,
        //* private ... needed to support Menu ...
        active: false
    },
    events: {
        onInputChanged: "",
        onValueSelected: ""
    },
    create: function() {
        this.inherited(arguments);
        this.createComponent({
            name: "popup",
            kind: "onyx.Menu",
            floating: true,
            owner: this,
            classes: "search-autocomplete"
        });
    },
    input: function(source, inEvent) {
        // cache input instance. means we only support a single input but that's probably okay. works around a bug where originator is Menu rather than Input
        this.inputField = this.inputField || inEvent.originator;
        enyo.job(null, enyo.bind(this, "fireInputChanged"), this.delay);
    },
    fireInputChanged: function() {
        this.doInputChanged({
            value: this.inputField.getValue()
        });
    },
    valuesChanged: function() {
        if (!this.values || this.values.length === 0) {
            this.waterfall("onRequestHideMenu", {
                activator: this
            });
            return;
        }

        this.$.popup.destroyClientControls();
        var c = [];
        for (var i = 0; i < this.values.length; i++) {
            c.push({
                content: this.values[i]
            });
        }
        this.$.popup.createComponents(c);
        this.$.popup.render();

        this.waterfall("onRequestShowMenu", {
            activator: this
        });
    },
    itemSelected: function(source, inEvent) {
        this.inputField.setValue(inEvent.content);
        this.doValueSelected({
            query: inEvent.content
        });
        return true;
    },

    completeSearch: function() {
        this.$.popup.hide();
    }
});