enyo.kind({
    name: "infoVersion",
    kind: "Control",
    published: {
        info : {}
    },
    events: {
        
    },
    components: [
        {tag: "h2", content: "There is a new version", classes:"info-title"},
        {tag: "h3", classes:"info-title", components:[
        	{tag:"a", name:"enlace", classes:"info-get-version", content:"LuneTube v", attributes:{href: "#", target:"_blank"}}
        ]},
        {tag: "div", classes: "box-center box", components:[
        	{tag: "ul", name:"lista", components:[

        	]}
        ]}
    ],
    create:function() {
        this.inherited(arguments);
        this.infoChanged();
    },

    infoChanged: function () {
    	if (!this.info.version) return true;

    	var version = this.info.version;
		var new_version = this.info.versions[version];
		var urls = new_version.url;
		var changelog = new_version.changelog;
		var url = "";

    	this.$.enlace.setContent("LuneTube v" + version);

    	if(enyo.platform.webos){
			this.$.enlace.setAttribute("href", urls.ipk);
		}else if(enyo.platform.android){
			this.$.enlace.setAttribute("href", urls.apk);
		}else{
			this.$.enlace.setAttribute("href", "https://app.box.com/lunetube-latest");
		}

		if(changelog.length > 0){

			for (var i = 0; i < changelog.length; i++) {
				this.createComponent({
					tag: "li",
					container: this.$.lista,
					content: changelog[i]
				});
			}
		}

		// this.$.lista.render();
    }
});