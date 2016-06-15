module.exports = function (grunt) {
	grunt.registerTask('build-luneos', [
		'deploy',
		'clean:build',
		'copy:build',
		'shell:luneos'
	]);
};