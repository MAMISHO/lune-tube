module.exports = function (grunt) {
	grunt.registerTask('build-android', [
		'deploy',
		'clean:build',
		'copy:build',
		'shell:android'
	]);
};