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
                    "user_part/compiled-templates.js": ["user_part/pages/**/*.html", "common/pages/**/*.html"],
                    "admin/compiled-templates.js": ["admin/pages/**/*.html", "common/pages/**/*.html"]
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
                    "release/user_part/compiled-templates.js": ["user_part/pages/**/*.html", "common/pages/**/*.html"],
                    "release/admin/compiled-templates.js": ["admin/pages/**/*.html", "common/pages/**/*.html"]
                }
            }
        },
        watch: {
            files: ['user_part/pages/**/*', 'admin/pages/**/*', "common/pages/**/*"],
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
                            'lib/**/*',
                            'Web.config',
                            'user_part/requireConfig.js',
                            'admin/requireConfig.js',
                            'admin/index.html'
                        ],
                        dest: releaseFolder
                    }
                ]
            }
        },
        uglify: {
            user_part: {
                files: [{
                    expand: true,
                    src: ['user_part/js/**/*.js', 'common/js/**/*.js'],
                    dest: releaseFolder
                }]
            },
            admin: {
                files: [{
                    expand: true,
                    src: ['admin/js/**/*.js'],
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
    grunt.registerTask('release', ['clean:release', 'cssmin', 'uglify:user_part','uglify:admin', 'copy', 'jst:release']);
};
