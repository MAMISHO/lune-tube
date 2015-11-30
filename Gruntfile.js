/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/
/*module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build', 'deploy'],
        'http-server': {
            'dev': {
                // the server root directory
                root: process.cwd(),
                port: 8282,
                host: '127.0.0.1',
                cache: 0,
                showDir : true,
                autoIndex: true,
                // server default file extension
                ext: 'html',
                // run in parallel with other tasks
                runInBackground:false
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            files:["."]
        }
    });

    // external tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');

    // custom tasks
    grunt.loadTasks('tasks');

    // defaults
    grunt.registerTask('default', ['deploy', 'concat']);
    grunt.registerTask('build', ['deploy', 'concat']);
    grunt.registerTask('serve', ['http-server']);
};*/
module.exports = function(grunt) {


    // Load the include-all library in order to require all of our grunt
    // configurations and task registrations dynamically.
    var includeAll;
    try {
        includeAll = require('include-all');
    } catch (e0) {
        try {
            includeAll = require('sails/node_modules/include-all');
        }
        catch(e1) {
            console.error('Could not find `include-all` module.');
            console.error('Skipping grunt tasks...');
            console.error('To fix this, please run:');
            console.error('npm install include-all --save`');
            console.error();

            grunt.registerTask('default', []);
            return;
        }
    }


    /**
     * Loads Grunt configuration modules from the specified
     * relative path. These modules should export a function
     * that, when run, should either load/configure or register
     * a Grunt task.
     */
    function loadTasks(relPath) {
        return includeAll({
            dirname: require('path').resolve(__dirname, relPath),
            filter: /(.+)\.js$/
        }) || {};
    }

    /**
     * Invokes the function from a Grunt configuration module with
     * a single argument - the `grunt` object.
     */
    function invokeConfigFn(tasks) {
        for (var taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](grunt);
            }
        }
    }




    // Load task functions
    var taskConfigurations = loadTasks('./tasks/config'),
        registerDefinitions = loadTasks('./tasks/register');

    // (ensure that a default task exists)
    if (!registerDefinitions.default) {
        registerDefinitions.default = function (grunt) { grunt.registerTask('default', []); };
    }

    // Run task functions to configure Grunt.
    invokeConfigFn(taskConfigurations);
    invokeConfigFn(registerDefinitions);

};
