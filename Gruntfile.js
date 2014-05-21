module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['./public/patterns'],
    copy: {
      main: {
        files: [
          // { expand: true, cwd: './source/js/', src: '*', dest: '../www/scripts/'},
          // { expand: true, cwd: './source/css/', src: ['style.css', 'patternlab.css'], dest: '../www/styles/' },
          // { expand: true, cwd: './source/images/', src: '*', dest: '../www/images/' },
          // { expand: true, cwd: './source/fonts/', src: '*', dest: '../www/fonts/'}
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
      compass: {
        files: [
          'source/css/**/*.{scss,sass}'
        ],
        tasks: ['compass', 'autoprefixer']
      },
      mustache: {
        files: ['source/_patterns/**/*.mustache'],
        tasks: ['patternlab-styleguide']
      },
      data: {
        files: ['source/_patterns/**/*.json'],
        tasks: ['default']
      }
    },
    compass: {
      build: {
        options: {
          cssDir: './source/css/',
          sassDir: './source/css/',
          force: true,
          outputStyle: 'expanded',
          bundleExec: true,
          require: ['breakpoint', 'susy']
        }
      }
    },
    autoprefixer: {
      options: {
        // Task-specific options go here.
      },

      // prefix all files
      multiple_files: {
        expand: true,
        flatten: true,
        src: './source/css/*.css', // -> src/css/file1.css, src/css/file2.css
        dest: '../www/styles/' // -> dest/css/file1.css, dest/css/file2.css
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  //load the patternlab task
  grunt.task.loadTasks('./builder/');

  //if you choose to use scss, or any preprocessor, you can add it here
  // grunt.registerTask('default', ['clean', 'patternlab', 'sass', 'copy']);
  grunt.registerTask('default', ['clean', 'patternlab', 'copy']);
  // grunt.registerTask('dev', ['connect', 'watch']);
  // grunt.registerTask('styleguide', ['patternlab-styleguide', 'compass', 'copy', 'watch']);
  grunt.registerTask('styleguide', ['patternlab-styleguide', 'compass', 'autoprefixer', 'watch']);
};
