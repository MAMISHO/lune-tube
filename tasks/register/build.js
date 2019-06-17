module.exports = function (grunt) {
	grunt.registerTask('build', [
		// 'deploy',
		'clean:build',
		'copy:build',
		'shell:default'
	]);
};