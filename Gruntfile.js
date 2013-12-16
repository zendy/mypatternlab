module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['./public/patterns'],
    copy: {
      main: {
        files: [
          { expand: true, cwd: './source/js/', src: '*', dest: './public/scripts/'},
          { expand: true, cwd: './source/css/', src: ['style.css', 'pattern.css'], dest: './public/styles/' },
          { expand: true, cwd: './source/images/', src: '*', dest: './public/images/' },
          { expand: true, cwd: './source/images/sample/', src: '*', dest: './public/images/sample/'},
          { expand: true, cwd: './source/fonts/', src: '*', dest: './public/fonts/'}
        ]
      }
    },
    jshint: {
      options: {
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "undef": true,
        "forin": true,
        //"unused": true,
        "node": true
      },
      patternlab: ['Gruntfile.js', './builder/lib/patternlab.js']
    },
    watch: {
      scss: { //scss can be watched if you like
       files: ['source/css/**/*.scss', 'public/styleguide/styles/*.scss'],
       tasks: ['default']
      },
      compass: {
        files: [
          'source/css/**/*.{scss,sass}'
        ],
        tasks: ['compass', 'default']
      },
      mustache: {
        files: ['source/_patterns/**/*.mustache'],
        tasks: ['default']
      },
      data: {
        files: ['source/_patterns/**/*.json'],
        tasks: ['default']
      }
    },
    sass: {
      build: {
        options: {
          style: 'expanded',
          precision: 8
        },
        files: {
          './source/css/style.css': './source/css/style.scss',
          './source/css/pattern.css': './source/css/pattern.scss',
          './public/styleguide/styles/static.css': './public/styleguide/styles/static.scss',
          './public/styleguide/styles/styleguide.css': './public/styleguide/styles/styleguide.scss'
        }
      }
    },
    compass: {
      build: {
        options: {
          cssDir: './source/css/',
          sassDir: './source/css/',
          force: true,
          outputStyle: 'expanded',
        }
      }
    },
    connect: {
      server: {
        options: {
          base: 'public/',
          port: 3000,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');

  //load the patternlab task
  grunt.task.loadTasks('./builder/');

  //if you choose to use scss, or any preprocessor, you can add it here
  // grunt.registerTask('default', ['clean', 'patternlab', 'sass', 'copy']);
  grunt.registerTask('default', ['clean', 'patternlab', 'copy']);
  grunt.registerTask('dev', ['connect', 'watch']);
};
