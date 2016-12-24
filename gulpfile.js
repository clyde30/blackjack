var gulp = require('gulp'),
  connect = require('gulp-connect');
  jshint = require('gulp-jshint');
  less = require('gulp-less');
  cleanCSS = require('gulp-clean-css');
  uglify = require('gulp-uglify');
  concat = require('gulp-concat');
  rename = require('gulp-rename');

gulp.task('webserver', function() {
  connect.server();
});

gulp.task('less', function() {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(uglify())
  .pipe(concat('app.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/js'))
});

gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('default', ['webserver', 'watch']);
