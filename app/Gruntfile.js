module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js_general: {
                src: [
                    './js/*.js'
                ],
                dest: './production/js/app.general.js'
            },
            css_files:{
                src:['./css/style.css','./css/style-external.css','./css/costum.css'],
                dest:'./production/css/style.css'
            }

        },
        uglify: {
            options: {
                mangle: false,
                removeComments: true,
                collapseWhitespace: true
            },
            app: {
                files: {
                    './production/js/app.general.min.js': ['./production/js/app.general.js']
                }
            }
        },

        cssmin: {
            css_frontend: {
                src: './production/css/style.css',
                dest: './production/css/style.min.css'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    src: './index.prod.html',
                    dest: './production/index.html'
                }]
            }
        },
        copy: {
            main:{
                files:[
                    {expand: true, src: ['./LESS/**'], dest: './production/'},
                    {expand: true, src: ['./img/**'], dest: './production/'},
                    {expand: true, src: ['./locals/**'], dest: './production/'},
                    {expand: true, src: ['./font-awesome/**'], dest: './production/'},
                    {expand: true, src: ['./css/patterns/**'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/datapicker/datapicker3.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/footable/footable.core.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/toastr/toastr.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/cropper/cropper.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/switchery/switchery.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/sweetalert/sweetalert.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/animate.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/animate.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/bootstrap.min.css'], dest: './production/'},
                    {expand: true, src: ['./css/style-print.css'], dest: './production/'},
                    {expand: true, src: ['./lib/jquery-2.1.1.js'], dest: './production/'},
                    {expand: true, src: ['./lib/bootstrap.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/inspinia.js'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/metisMenu/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/slimscroll/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/jquery-ui/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/gritter/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/toastr/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/datapicker/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/footable/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/cropper/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/switchery/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/jasny/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins/sweetalert/**'], dest: './production/'},
                    {expand: true, src: ['./lib/plugins-external/jquery.select2/**'], dest: './production/'},
                    {expand: true, src: ['./lib/angular/angular.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/angular/angular-route.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/angular/angular-resource.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/angular/angular-cookies.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/angular/angular-sanitize.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/node_modules/clipboard/dist/clipboard.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/node_modules/textangular/dist/textAngular-rangy.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/node_modules/textangular/dist/textAngular.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/node_modules/textangular/dist/textAngular-sanitize.min.js'], dest: './production/'},
                    {expand: true, src: ['./lib/node_modules/textangular/dist/textAngular.css'], dest: './production/'},
                    {expand: true, src: ['./partials/**'], dest: './production/'}
                ]
            }
        }
    });

    //plugin loading
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat:js_general','concat:css_files', 'uglify:app', 'newer:htmlmin', 'cssmin:css_frontend',"copy:main"]);
};
