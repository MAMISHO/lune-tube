module.exports = function (grunt) {
	grunt.registerTask('build-webos', [
		//'deploy',
		'clean:build',
		'copy:build',
		'shell:webos'
	]);
};