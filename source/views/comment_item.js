enyo.kind({
    name: "CommentItem",
    kind: "FittableColumns",
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
        // {tag:"div", components:[
            {tag:"img",name:"image", attributes:{src:""}},
        // ]},
        {kind:"FittableRows", classes:"comment-text", components:[
            {tag:"p", name:"user", classes:"comment-user", content:""},
            {tag:"p", name:"comment", content:"", allowHtml:true}
        ]}
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