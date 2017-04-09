// Run paml package when app is deployed
module.exports = function(grunt) {

    grunt.config.set('shell', {
        luneos: {
            command: [
                'palm-package deploy',
                'scp -P 5522 com.emsoft.lunetube_0.4.1_all.ipk root@localhost:/media/internal/downloads',
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
                'palm-install com.emsoft.lunetube_0.4.1_all.ipk',
                'palm-launch com.emsoft.lunetube',
                'palm-log -f com.emsoft.lunetube'
            ].join('&&')
        },
        android: {
            command: [
                'rm -r /Users/developer/Desarrollo/movil/lune-tube/platforms/android/assets/www/build/',
                'cp -r ./deploy/build/ /Users/developer/Desarrollo/movil/lune-tube/platforms/android/assets/www/build/'
            ].join('&&')
        },
        default:{
            command: 'sh ./tools/deploy.sh'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
}; 