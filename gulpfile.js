var gulp = require('gulp'),
  connect = require('gulp-connect');
  jshint = require('gulp-jshint');
  less = require('gulp-less');
  cleanCSS = require('gulp-clean-css');
  uglify = require('gulp-uglify');
  concat = require('gulp-concat');
  rename = require('gulp-rename');
  ngAnnotate = require('gulp-ng-annotate');
  imagemin = require('gulp-imagemin');
  cache = require('gulp-cache');

gulp.task('webserver', function() {
  connect.server({
    root:'public',
    livereload:true
  })
});

gulp.task('html', function () {
  return gulp.src('src/index.html')
  .pipe(gulp.dest('public'))
  .pipe(connect.reload())
})

gulp.task('less', function() {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload())
});

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(concat('app.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('public/js'))
  .pipe(connect.reload())
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('public/images'))
});

gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
});

gulp.task('start', ['webserver', 'watch']);
gulp.task('build', ['jshint', 'js', 'less', 'html', 'images']);
