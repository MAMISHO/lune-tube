enyo.kind({
    name: "CommentItem",
    kind: "FittableRows",
    classes:"comment",
    fit:true,
    published: {
        image: "",
        comment:"",
        user:""
        // last: false
    },
    events: {
        
    },
    components: [
        {kind:"FittableColumns", classes:"comment-text", components:[
            {tag:"img",name:"image", attributes:{src:""}, draggable:false},
            {tag:"p", name:"user", classes:"comment-user", content:""},
        ]},
        {tag:"p", name:"comment", content:"", allowHtml:true, style:"padding: 0;margin: 0"}

    ],
    create:function() {
        this.inherited(arguments);
        this.imageChanged();
        this.commentChanged();
        this.userChanged();
    },
    imageChanged: function(){
		this.$.image.setAttribute("src", this.image);
	},
	commentChanged: function(){
		this.$.comment.setContent(this.comment);
	},
    userChanged: function(){
        this.$.user.setContent(this.user);
    }
});