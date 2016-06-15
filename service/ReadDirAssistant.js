var ReadDirAssistant = function() {
};

ReadDirAssistant.prototype.run = function(future) {
	var fs = IMPORTS.require("fs");
	var path = this.controller.args.path;

	
	fs.readdir(path, function(err, files) {
		future.result = { path: path, files: files }; 
		return feature;
	});
};