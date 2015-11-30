module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			},{
				expand: true,
				cwd: './api/app/deploy',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			},{
				expand: true,
				cwd: './api/app/', //quitar esta copia en el build
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: 'playground-code/enyo-ilib',
				src: ['**/*'],
				dest: 'deploy/lib/enyo-ilib'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};