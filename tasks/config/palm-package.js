// Run paml package when app is deployed
module.exports = function(grunt) {

    grunt.config.set('shell', {
        luneos: {
            command: [
                'palm-package deploy',
                'scp -P 5522 com.emsoft.lunetube_0.2.2_all.ipk root@localhost:/media/internal/downloads',
            ].join('&&')
        },
        webos: {
            // command: 'palm-package deploy'
            // command: [
            //     'palm-package deploy',
            //     function(v){
            //         return 'palm-package ' + 'com.emsoft.lunetube_' + v + '_all.ipk';   
            //     }
            // ].join('&&')
            command: [
                'palm-package deploy',
                'palm-install com.emsoft.lunetube_0.2.2_all.ipk'
            ].join('&&')
        },
        default:{
            command: 'palm-package deploy'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
}; 