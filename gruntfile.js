var releaseFolder = "release/";
module.exports = function (grunt) {

    grunt.initConfig({
        jst: {
            dev: {
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
            },
            release: {
                options: {
                    //namespace: "anotherNameThanJST",      //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {

                    },
                },
                files: {
                    "release/compiled-templates.js": ["pages/**/*.html"]
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
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: releaseFolder + 'css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                  {
                      expand: true,
                      src: [
                          'css/*.min.css',
                          'css/*.map',
                          'css/*.eot',
                          'css/*.svg',
                          'css/*.ttf',
                          'css/*.woff',
                          'css/*.woff2',
                          'img/**/*',
                          'locales/translation-pl.json',
                          'index.html',
                          'requireConfig.js',
                          'lib/**/*',
                          'Web.config'
                      ],
                      dest: releaseFolder
                  }
                ]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    src: 'js/**/*.js',
                    dest: releaseFolder
                }]
            }
        },
        clean: {
            release: [releaseFolder]
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('devel', ['jst:dev']);
    grunt.registerTask('default', ['devel', 'connect', 'watch']);
    grunt.registerTask('release', ['clean:release', 'cssmin', 'uglify', 'copy', 'jst:release']);
};
