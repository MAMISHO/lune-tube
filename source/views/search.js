enyo.kind({
    name: "LuneTube.Search",
    kind: "Control",
    handlers: {
        // onblur: "changedBlur"
    },
    published: {
        searching: false
    },
    components: [
        {kind: "onyx.Toolbar", classes:"topbar",  components:[
                // {kind: "Image", src: "assets/menu.png", ontap:"showMenu"},
                {kind: "Image", src: "assets/yt_icon_1.png", ontap:"showMenu", style:"padding: 0 16px 0 16px"},
                    {name:"searchText", kind: "onyx.InputDecorator", classes:"search-input-decorator", components: [
                        {kind: "onyx.Input",fit:true, name:"searchQuery", placeholder: "Just Type...", onchange: "inputChanged", selectOnFocus:true, onkeypress: "inputKeypress"},
                        {name:"searchButton",kind: "Image", src: "assets/search-input-search.png", ontap:"searchAction", showing: true, style:"width:20px"},
                        {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false, style:"width:20px"}
                    ]},
        ]}
    ],
    create:function() {
        this.inherited(arguments);
    },
    inputKeypress: function(inSender, inEvent) {
        if (inEvent.keyCode === 13) {
            this.searchAction();
        }
    },

    searchingChanged: function(){
        if(this.searching){
            this.$.searchButton.setShowing(false);
            this.$.searchSpinner.setShowing(true);
        }else{
            this.$.searchButton.setShowing(true);
            this.$.searchSpinner.setShowing(false);
        }
    },

    searchAction: function(inSender, inEvent){
        this.setSearching(true);
        this.bubble("onSearchEvent", this.$.searchQuery.getValue());
    },

    showMenu: function(inSender, inEvent){
      // this.bubble("onShowMenuOption", this.$.searchQuery.getValue());
      this.bubble("onHomeRequest", this);
    }
});