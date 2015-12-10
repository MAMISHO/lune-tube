enyo.kind({
    name: "VideoList",
    kind: "Control",
    published: {
        videoList:[],
        searching: false,
        showMore: true
    },
    handlers: {
    },
    components: [
        {kind: "List", name:"list", fit: true, touch: true, onSetupItem: "setupItem", classes:"enyo-fit", components: [
            {name: "item", ontap: "selectedVideo", components: [
                {kind:"VideoListItem", name:"videoItem"}    
            ]},
            {name: "more", style:"width:100%;background-color:#333;position: relative;height: 58px",ontap: "loadMore", components: [
                {kind:"onyx.Button", content:"Load More +", classes:"list-load-more", components:[
                    {content:"Load More + "},
                    {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", style:"display: inline-block; position: absolute;top: 0"}
                ]}
            ]}
        ]}
    ],
    _isNewList:null,
    platformStyle:"",
    create:function() {
        this.inherited(arguments);
        /*El siguiente código es necesario para la compatibilidad con webos*/
        //descomentar antes de desplegar 

        var platform = navigator.userAgent.split("(")[1].split(";")[0];
        if(platform === "LuneOS"){
            this.platformStyle = "list-item";
        }else{
            this.platformStyle = "list-item-webos";
        }

    },

    videoListChanged: function(){
        // console.log(this.videoList);
        // console.log(this._isNewList[0].video_id);
        // console.log(this._isNewList);
        /*if(this._isNewList){
            console.log(this._isNewList.video_id);
        }*/
        this.$.searchSpinner.hide();
        this.$.list.setCount(this.videoList.length);
        if(this.videoList[0]){

            if(this._isNewList){ //entra en la segunda petición 
                if(this._isNewList.video_id === this.videoList[0].video_id){
                    this.$.list.refresh();
                }else{
                    this.selected = null;
                    this.$.list.reset();    
                }
            // }
            /*else if(this.videoList[0] === this._isNewList){
                this.$.list.refresh();*/
            }else{
                this.selected = null;
                this.$.list.reset();    
            }
            this._isNewList = this.videoList[0];
        }else{
            this.selected = null;
            this.$.list.reset();
        }

        if(this.selected){ //If was selected before, is selected now
            this.$.list.select(this.selected);
        }
    },


    selectedVideo: function(inSender, inEvent){
        console.log(inEvent.index);
        this.selected = inEvent.index;
        this.bubble("onStartVideo",this.videoList[inEvent.index]);
    },

    loadMore: function(inSender, inEvent){
        this.$.searchSpinner.show();
        this.bubble("onLoadMore",this);
    },

    searchingChanged: function(){
        this.$.searchSpinner.hide();
    },

    setupItem: function(inSender, inEvent) {
        var i = inEvent.index;
        var item = this.videoList[i];
        // console.log(item);
        // if(this.selected){
            this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));   
        // }
        // this.$.item.addRemoveClass("item-selected", inSender.isSelected(inEvent.index));
        this.$.videoItem.addClass(this.platformStyle);
        this.$.videoItem.setVideoId(item.video_id);
        this.$.videoItem.setChannelId(item.channel_id);
        this.$.videoItem.setChannel(item.chanel);
        this.$.videoItem.setImage(item.image);
        this.$.videoItem.setTitle(item.title);
        this.$.videoItem.setViews(item.views);
        this.$.videoItem.setTime(item.time);
        if(item.statistics){
            // console.log(item.statistics);
            this.$.videoItem.setStatistics(item);
        }
        this.$.more.canGenerate = !this.videoList[i+1] && this.showMore;
        // this.$.more.canGenerate = !this.videoList[i+1];
        return true;
    }
});