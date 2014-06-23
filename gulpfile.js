var gulp = require( 'gulp' );

// load plugins
var $ = require( 'gulp-load-plugins' )();
var fs = require( 'fs' );

gulp.task('styles', function() {
  gulp.src('./source/css/*.scss')
  .pipe($.compass({
    css: './source/css/',
    sass: './source/css/',
    require: ['breakpoint', 'susy']
  }))
  .pipe($.autoprefixer())
  .pipe($.minifyCss())
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
  .pipe($.mustache({
    partials: partialsArray
  }))
  .pipe($.size())
  .pipe(gulp.dest('../www/'));
});

gulp.task('watch', [], function() {
  var watcherStyles = gulp.watch('./source/css/**/*.scss', ['styles']);
  watcherStyles.on('change', function ( event ) {
    // added, changed, or deleted
    // The path of the modified file
    console.log( event.type + ' file: ' + event.path ); // added, changed, or deleted
  });

  var watcherPatternlab = gulp.watch('./source/patterns/**/*.mustache', ['patternlab']);
  watcherPatternlab.on('change', function ( event ) {
    // added, changed, or deleted
    // The path of the modified file
    console.log( event.type + ' file: ' + event.path ); // added, changed, or deleted
  });
});
