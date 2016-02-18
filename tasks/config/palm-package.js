// Run paml package when app is deployed
module.exports = function(grunt) {

    grunt.config.set('shell', {
        multiple: {
            // command: 'palm-package deploy'
            command: [
                'palm-package deploy',
                'scp -P 5522 com.emsoft.lunetube_0.2.0_all.ipk root@localhost:/media/internal/downloads',
            ].join('&&')
        }
    });

    grunt.loadNpmTasks('grunt-shell');
}; 