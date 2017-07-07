var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('html', function() {
  return gulp.src('src/templates/*')
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('./src/js/*')
       .pipe(gulp.dest('./build/js/'));
});


gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*')
  .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('images', function() {
   return gulp.src('./src/images/*')
       .pipe(gulp.dest('./build/images/'));
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
})

// MERGE COPY TASKS
//
// gulp.task('copy', function () {
//     gulp.src([
//         './src/images/*',
//         './src/js/result-sets/*.json',
//         './src/fonts/*',
//         './src/robots.txt'
//     ],{"base" : "./src"})
//         .pipe(gulp.dest('./build/'));
// });


gulp.task('clean', function() {
  return del.sync('build');
})


gulp.task('watch', ['browserSync'], function(){
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/templates/*.html', ['html']);
  gulp.watch('src/js/*.js', ['js']);
})


gulp.task('default', function (callback) {
  runSequence('clean', ['html', 'sass', 'js', 'fonts', 'images'], 'watch',
    callback
  )
})
