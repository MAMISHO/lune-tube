module.exports = function(grunt) {

	grunt.config.set('clean', {
		build: ['deploy/lib/enyo-ilib']
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};