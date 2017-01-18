var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var child = require('child_process');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();


var siteRoot = '_site';

var sassInput = './_includes/stylesheets/*.scss';
var sassOptions = {
  includePaths: ['./node_modules/foundation-sites/scss','./node_modules/font-awesome/scss' ],
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
};

gulp.task('sass', function() {
  return gulp
    .src(sassInput)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./css'));
});

gulp.task('icons', function() {
  return gulp.src('./node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./fonts'));
});

gulp.task('build', function() {
  return child.spawn('jekyll', ['build']);
});

gulp.task('jekyll', function() {
  const jekyll = child.spawn('jekyll', ['serve',
    '--watch'
    // ,'--incremental'
    // ,'--drafts'
  ]);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        gutil.log('Jekyll: ' + message)
      });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', function() {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(sassInput, ['sass']);
});

gulp.task('dev', ['sass', 'icons', 'jekyll', 'serve']);
gulp.task('default', ['sass', 'build']);
