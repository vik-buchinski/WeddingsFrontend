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
                    "release/admin/compiled-templates.js": ["admin/pages/**/*.html", "common/pages/**/*.html"]
                }
            }
        },
        watch: {
            pages: {
                files: ['user_part/pages/**/*', 'admin/pages/**/*', "common/pages/**/*"],
                tasks: ['devel'],
            },
            js: {
                files: [
                    'user_part/js/**/*.js',
                    'user_part/requireConfig.js',
                    'common/js/**/*.js',
                    'user_part/compiled-templates.js'
                ],
                tasks: ['requirejs:dev'],
            }
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
                            'admin/requireConfig.js',
                            'admin/index.html',
                            'common/js/**/*',
                        ],
                        dest: releaseFolder
                    }
                ]
            }
        },
        uglify: {
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
        requirejs: {
            release: {
                options: {
                    name : '../requireConfig',
                    baseUrl: './user_part/js',
                    mainConfigFile: './user_part/requireConfig.js',
                    out: releaseFolder + 'user_part/app.min.js',
                    generateSourceMaps: false,
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                }
            },
            dev: {
                options: {
                    name : '../requireConfig',
                    baseUrl: './user_part/js',
                    mainConfigFile: './user_part/requireConfig.js',
                    out: 'user_part/app.min.js',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    optimize: "none",
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('devel', ['jst:dev', 'requirejs:dev']);
    grunt.registerTask('default', ['devel', 'connect', 'watch:pages', 'watch:js']);
    grunt.registerTask('release', [
        'clean:release',
        'cssmin',
        'jst:dev',
        'requirejs:release',
        'uglify:admin',
        'copy',
        'jst:release'
    ]);
};
