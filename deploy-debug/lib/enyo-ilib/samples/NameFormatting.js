enyo.kind({
    name: "ilib.sample.NameFormatting",
    kind: "FittableRows",
    classes: "onyx ilib-onyx-sample enyo-fit",
    
    components: [
        {kind: "Scroller", fit: true, components: [
            {kind: "FittableColumns", components: [
                /* Header with selecting locale */
                {kind: "ilib.sample.ChooseLocale", name: "localeSelector"},
                {style: "width: 20px"},
                {kind: "onyx.Button", content: rb.getString("Apply"), ontap: "nameFormat", style: "vertical-align: bottom;", classes: "onyx-affirmative"},
                {fit: true}
            ]},
            {tag: "br"},
            
            {content: rb.getString("Length"), classes: "ilib-onyx-sample-divider"},
            {kind: "onyx.RadioGroup", name: "length", onActivate: "buttonActivated", components: [
                {content: "Short", active: true, name:"short"},
                {content: "Medium"},
                {content: "Long"}
            ]},
            
            {content: rb.getString("(or) Parts"), classes: "ilib-onyx-sample-divider"},
            {classes: "namepart", components: [
                {kind:"enyo.Checkbox", name: "prefixCbox", content: "Prefix ", onchange:"checkboxChanged"},
                {kind:"enyo.Checkbox", name: "givenCbox",  content: "Given ",  onchange:"checkboxChanged"},
                {kind:"enyo.Checkbox", name: "middleCbox", content: "Middle ", onchange:"checkboxChanged"},
                {kind:"enyo.Checkbox", name: "familyCbox", content: "Family ",  onchange:"checkboxChanged"},
                {kind:"enyo.Checkbox", name: "suffixCbox", content: "Suffix ",  onchange:"checkboxChanged"}
            ]},

            {components: [
                {content: rb.getString("Prefix"), classes: "ilib-onyx-sample-divider"},
                {kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
                    {kind: "onyx.Input", name: "prefixInput", placeholder: rb.getString("Prefix")}
                ]},
                {content: rb.getString("Given Name"), classes: "ilib-onyx-sample-divider"},
                {kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
                    {kind: "onyx.Input", name: "givenInput", placeholder: rb.getString("Given Name")}
                ]},
                {content: rb.getString("Middle Name"), classes: "ilib-onyx-sample-divider"},
                {kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
                    {kind: "onyx.Input", name: "middleInput", placeholder: rb.getString("Middle Name")}
                ]},
                {content: rb.getString("Family Name"), classes: "ilib-onyx-sample-divider"},
                {kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
                    {kind: "onyx.Input", name: "familyInput", placeholder: rb.getString("Family Name")}
                ]},
                {content: rb.getString("Suffix"), classes: "ilib-onyx-sample-divider"},
                {kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
                    {kind: "onyx.Input", name: "suffixInput", placeholder: rb.getString("Suffix")}
                ]}
            ]}
        ]},
        {tag: "br"},
        {kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
            {kind: "onyx.GroupboxHeader", content: rb.getString("Format result:")},
            {name: "rtlResult", fit: true, content: "-", style: "padding: 10px"}
        ]}
    ],
 
    buttonActivated: function(inSender, inEvent) {

        if (this.$.length.getActive().content === 'Short') {
            this.$.prefixCbox.setChecked(false);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(false);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(false);
        } else if (this.$.length.getActive().content === 'Medium') {
            this.$.prefixCbox.setChecked(false);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(true);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(false);
        } else if (this.$.length.getActive().content === 'Long') {
            this.$.prefixCbox.setChecked(true);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(true);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(true);
        }
    },

    checkboxChanged: function(inSender, inEvent) {
        if (!this.$.prefixCbox.getChecked() && !this.$.givenCbox.getChecked() && !this.$.middleCbox.getChecked() &&
            !this.$.familyCbox.getChecked() && !this.$.suffixCbox.getChecked()) {
            this.$.short.setActive(true);
        } else {
            this.$.length.setActive(false);
        }
    },

    nameFormat: function(inSender, inEvent) {

        // Processing parameters

        var nameLength = this.$.length.getActive().content;
        var parts = [];
    
        if (this.$.prefixCbox.getChecked()) {
            parts.push("p");
        }
        if (this.$.givenCbox.getChecked()) {
            parts.push("g");
        }
        if (this.$.middleCbox.getChecked()) {
            parts.push("m");
        }
        if (this.$.familyCbox.getChecked()) {
            parts.push("f");
        }
        if (this.$.suffixCbox.getChecked()) {
            parts.push("s");
        }

        var options = {
            locale : this.$.localeSelector.getValue()
        };
            
        if (nameLength) {
            options.style = nameLength;
        }

        if (parts.length > 0) {
            options.components = parts.join('');
        }
                
        var n = {
            prefix: this.$.prefixInput.getValue(),
            givenName: this.$.givenInput.getValue(),
            middleName: this.$.middleInput.getValue(),
            familyName: this.$.familyInput.getValue(),
            suffix: this.$.suffixInput.getValue(),
            locale: this.$.localeSelector.getValue()
        };
        // Formatting
        var name = new ilib.Name(n);
        var fmt = new ilib.NameFmt(options);
        var postFmtData = "The name is: " + fmt.format(name); 
        // Output results
        this.$.rtlResult.setContent(postFmtData);
    }
});
