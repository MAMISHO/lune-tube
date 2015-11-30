module.exports = function (grunt) {
	grunt.registerTask('build', [
		'deploy',
		'copy:build'
	]);
};