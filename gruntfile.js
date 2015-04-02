module.exports = function(grunt) {

    grunt.initConfig({
        jst: {
            compile: {
                options: {
                    //namespace: "anotherNameThanJST",      //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                        
                    },
                },
                files: {
                    "compiled-templates.js": ["pages/**/*.html"]
                }
            }
        },
        watch: {
            files: ['pages/**/*'],
            tasks: ['devel'],
        },
        connect: {
            server: {
                options: {
                    hostname: "localhost",
                    port: 9000,
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('devel', ['jst']);
    grunt.registerTask('default', ['devel', 'connect', 'watch']);
};
