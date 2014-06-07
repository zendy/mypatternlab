var gulp = require( 'gulp' );

// load plugins
var $ = require( 'gulp-load-plugins' )();
var minifyCSS    = require( 'gulp-minify-css' );
var mustache = require( 'gulp-mustache' );
var fs = require( 'fs' );

gulp.task('styles', function() {
  gulp.src('./source/css/*.scss')
  .pipe($.compass({
    css: './source/css/',
    sass: './source/css/',
    require: ['breakpoint', 'susy']
  }))
  .pipe($.autoprefixer())
  .pipe(minifyCSS())
  .pipe($.size())
  .pipe(gulp.dest('../www/styles/'));
});

gulp.task('patternlab', function() {
  var partialsArray, cwd, patterns, pattern, patternName, patternFiles, patternFile, patternFileName, patternFileOutput;
  partialsArray = [];
  cwd = './source/patterns/';
  patterns = fs.readdirSync( cwd );


  for ( pattern in patterns ) {
    patternName = patterns[ pattern ];
    patternFiles = fs.readdirSync( cwd + patternName + '/' );

    for ( patternFile in patternFiles ) {
      patternFileName = patternFiles[ patternFile ];
      patternFileOutput = fs.readFileSync( cwd + patternName + '/' + patternFileName );
      partialsArray.push( {patternName: patternFileName.replace(/\.(.*)/g, ''), patternOutput: patternFileOutput} );
    }
  }

  gulp.src('./source/patternlab-files/styleguide.mustache')
  .pipe(mustache({
    partials: partialsArray
  }))
  .pipe(gulp.dest('../www/'));
});

gulp.task('watch', ['styles'], function() {
  gulp.watch('./source/css/**/*.scss', ['styles']);

  gulp.watch('./source/patterns/**/*.mustache' ['patternlab']);
});
