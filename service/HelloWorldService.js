var HelloCommandAssistant = function() {
};

HelloCommandAssistant.prototype.run = function(future) {
    console.log("***************Hello "+ this.controller.args.name);
    future.result = {reply: "Hello " + this.controller.args.name + "! From lunetube"};
};