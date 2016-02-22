var ReadFileAssistant = function() {
};

ReadFileAssistant.prototype.run = function(future) {
	var fs = IMPORTS.require("fs");
	var path = this.controller.args.path;
	
	fs.readFile(path, 'utf8', function(err,data) {
		future.result = { path: path, content: data }; 
		return feature;
	});
};