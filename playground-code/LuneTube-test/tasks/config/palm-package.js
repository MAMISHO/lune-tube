// Run paml package when app is deployed
module.exports = function(grunt) {

    grunt.config.set('shell', {
        multiple: {
            command: 'palm-package deploy'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
}; 