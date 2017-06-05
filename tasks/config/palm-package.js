// Run paml package when app is deployed
module.exports = function(grunt) {

    grunt.config.set('shell', {
        luneos: {
            command: [
                'palm-package deploy',
                'scp -P 5522 com.emsoft.lunetube_0.5.1_all.ipk root@localhost:/media/internal/downloads',
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
                'palm-install com.emsoft.lunetube_0.5.1_all.ipk',
                'palm-launch com.emsoft.lunetube',
                'palm-log -f com.emsoft.lunetube'

            ].join('&&')
        },
        android: {
            command: [

                'rm -r /Users/Developer/Desarrollo/movil/lune-tube/www/*',
                'cp -r ./deploy/* /Users/Developer/Desarrollo/movil/lune-tube/www/'
                // '(cd /Users/Developer/Desarrollo/movil/lune-tube; cordova build android)',
                // '(cd /Users/Developer/Desarrollo/movil/lune-tube; cordova run android)'

            ].join('&&')
        },
        default:{
            command: 'sh ./tools/deploy.sh'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
}; 