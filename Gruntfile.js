module.exports = function(grunt) {
    grunt.initConfig({
        sass:{
            build:{
                options:{
                    sourcemap:'none',
                    noCache  :true,
                    style    :'expanded'
                },
                files  :{
                    'public/css/app.css':'assets/scss/main.scss'
                }
            }
        },

        cssmin:{
            options:{
                mergeIntoShorthands:false,
                roundingPrecision  :-1
            },
            target :{
                files:{
                    'public/css/vendors.css':[
                        'assets/css/vendors/bootstrap.min.css',
                        'assets/css/vendors/font-awesome.min.css'
                    ],
                    'public/css/app.css'    :['public/css/app.css']
                }
            }
        },

        handlebars:{
            build:{
                options:{
                    partialRegex     :/.*/,
                    partialsPathRegex:/\/partials\/client\//,
                    namespace        :'tmpl',
                    processName      :function(filePath) {
                        return filePath.replace('views/partials/client', '').replace('.hbs', '');
                    }
                },
                files  :{
                    'public/js/tmpl.js':'views/partials/client/*.hbs'
                }
            }
        },

        uglify:{
            vendors:{
                options:{
                    mangle  :false,
                    compress:{
                        drop_console:false //eslint-disable-line camelcase
                    }
                },
                files  :{
                    'public/js/vendors.js':[
                        'assets/js/vendors/jquery.min.js',
                        'node_modules/handlebars/dist/handlebars.runtime.min.js',
                        'assets/js/vendors/bootstrap.min.js'
                    ],
                    'public/js/app.js'    :'public/js/app.js',
                    'public/js/tmpl.js'   :['public/js/tmpl.js']
                }
            }
        },

        browserify:{
            dist:{
                files:{
                    'public/js/app.js':'assets/js/app.js'
                }
            }
        },

        hashres:{
            options:{
                encoding      :'utf8',
                fileNameFormat:'${hash}.${name}.${ext}',
                renameFiles   :true
            },
            css    :{
                src :['public/css/app.css'],
                dest:['views/*.hbs']
            },
            js     :{
                src :['public/js/vendors.js', 'public/js/app.js'],
                dest:['views/*.hbs']
            }
        },

        watch:{
            scripts   :{
                files  :[
                    'assets/js/**/*.js', 'assets/js/*.js'
                ],
                tasks  :['browserify'],
                options:{
                    spawn:false
                }
            },
            css       :{
                files  :[
                    'assets/scss/**/*.scss', 'assets/scss/*.scss'
                ],
                tasks  :['sass'],
                options:{
                    spawn:false
                }
            },
            handlebars:{
                files  :'views/partials/client/*.hbs',
                tasks  :['handlebars'],
                options:{
                    spawn:false
                }
            }
        }
    });

    // Loads Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-hashres');

    grunt.registerTask('default', ['sass', 'cssmin', 'handlebars', 'browserify', 'uglify', 'watch']);
    grunt.registerTask('build', ['sass', 'cssmin', 'handlebars', 'browserify', 'uglify', 'hashres']);
};
