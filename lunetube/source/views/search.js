/*enyo.kind({
    name: "SearchControl",
    kind: "Control",
    handlers: {
        // onblur: "changedBlur"
    },
    published: {
        
    },
    components: [
        // {classes: "enyo-fit header", style: "height: 39px;", components: [
        //         {classes: "enyo-fit", style: "right: 39px;", components: [
        //             {classes: "enyo-fit", components: [
        //                 {name: "input", classes: "enyo-view-fit search-input", tag: "input", onkeypress: "inputKeypress"}
        //             ]},
        //             {name: "spinner", tag: "img", src: "images/spinner.gif", showing: false, classes: "search-spinner"}
        //         ]},
        //         {classes: "enyo-fit search-button", style: "left: auto; width: 39px;", tag: "img", src: "images/search-button.png", ontap: "search"}
        // ]},
        
    	{kind: "onyx.Toolbar",classes:"menu",  components:[
            {content:"home"},
            {content:"suscriptions"},
            {content:"perfil"},
            {kind: "onyx.MenuDecorator", onSelect: "itemSelected", components: [
                {kind: "onyx.IconButton", src: "assets/search-input-search.png"},
                {kind: "onyx.Menu", components: [
                    {name:"searchText", kind: "onyx.InputDecorator", classes:"search", components: [
                        {kind: "onyx.Input",name:"searchQuery", placeholder: "Buscar...", onchange:"inputChanged", selectOnFocus:true,
                        // attributes:{"onblur":enyo.bubbler},
                        onkeypress: "inputKeypress"},
                        {kind: "Image", src: "assets/search-input-search.png", ontap:"searchAction"}
                    ]},
                ]}
            ]},
    	]}
    ],
    create:function() {
        this.inherited(arguments);
        // this.$.searchText.hide();
        // enyo.dispatcher.listen(document, "DOMFocusOut");
    },

    findVideo: function(inSender, inEvent){
        this.$.searchText.show();
        this.$.searchText.focus(true);
        // this.bubble("onfindVideo",this);
    },

    changedBlur: function(inSender, inEvent){
        console.log("pierde el foco");
        console.log(inEvent);
        this.$.searchText.hide();
        // return true;
        inEvent.preventDefault();
    },

    inputKeypress: function(inSender, inEvent) {
        if (inEvent.keyCode == 13) {
            inEvent.preventDefault();
            this.searchAction();
        }
    },

    searchAction: function(inSender, inEvent){
        console.log("enviar a buscar" + this.$.searchQuery.getValue());
    }
});*/