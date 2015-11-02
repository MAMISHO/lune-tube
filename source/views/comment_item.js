enyo.kind({
    name: "CommentItem",
    kind: "FittableColumns",
    classes:"comment",
    published: {
        image: "",
        comment:""
    },
    events: {
        
    },
    components: [
        // {tag:"div", components:[
            {tag:"img",name:"image", attributes:{src:""}},
        // ]},
        {tag:"p", name:"comment", content:"", allowHtml:true},
    ],
    create:function() {
        this.inherited(arguments);
        this.imageChanged();
        this.commentChanged();
    },
    imageChanged: function(){
		this.$.image.setAttribute("src", this.image);
	},
	commentChanged: function(){
		this.$.comment.setContent(this.comment);
	}
});