enyo.kind({
    name: "Menu",
    kind: "Control",
    handlers: {
        // onblur: "changedBlur"
    },
    published: {
        searching: false
    },
    components: [
        {classes:"header",components:[
            // {kind:"FittableColumns",components:[
                {kind: "Image", src: "assets/menu.png", ontap:"showMenu", style:"width: 25px;vertical-align: middle;"},
                {kind: "Image", src: "assets/yt_icon_1.png", ontap:"showMenu", style:"width: 48px;vertical-align: middle;"},
            // ]},
            {content:"Home", classes:"header-loc"}
        ]},
        {kind: "onyx.Toolbar", classes:"menu",  components:[
                    {name:"searchText", kind: "onyx.InputDecorator", classes:"search", components: [
                        {kind: "onyx.Input",name:"searchQuery", placeholder: "Just Type...", onchange:"inputChanged", selectOnFocus:true,
                        onkeypress: "inputKeypress"},
                        {name:"searchButton",kind: "Image", src: "assets/search-input-search.png", ontap:"searchAction", showing: true},
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
      this.bubble("onShowMenuOption", this.$.searchQuery.getValue());  
    }
});