// Run paml package when app is deployed
module.exports = function(grunt) {
    
    var appinfo = require('../../appinfo.json'); //cargamos el fichero para leer la versión
    grunt.config.set('shell', {
        luneos: {
            command: [
                'palm-package deploy',
                'scp -P 5522 com.emsoft.lunetube_' + appinfo.version + '_all.ipk root@localhost:/media/internal/downloads',
            ].join('&&')
        },
        webos: {
            command: [
                
                'palm-package deploy',
                'palm-install com.emsoft.lunetube_' + appinfo.version + '_all.ipk',
                'palm-launch com.emsoft.lunetube',
                'palm-log -f com.emsoft.lunetube'

            ].join('&&')
        },
        webosdebug: {
            command: [
                'rm -rf ./deploy-debug',
                'mkdir ./deploy-debug',
                'cp -r ./appinfo.json ./deploy-debug',
                'cp -r ./framework_config.json ./deploy-debug',
                'cp -r ./icon.png ./deploy-debug',
                'cp -r ./debug.html ./deploy-debug',
                'mv ./deploy-debug/debug.html ./deploy-debug/index.html',
                'cp -r ./preferences.json ./deploy-debug',
                'cp -r ./package.js ./deploy-debug',
                'cp -r ./enyo ./deploy-debug',
                'cp -r ./assets ./deploy-debug',
                'cp -r ./lib ./deploy-debug',
                'cp -r ./source ./deploy-debug',
                'palm-package deploy-debug',
                'palm-install com.emsoft.lunetube_0.5.2_all.ipk',
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