var gulp = require('gulp');
var concat = require("gulp-concat");
var babel = require('gulp-babel');
var server = require('gulp-express');

gulp.task('build', function () {
  return gulp.src(['./public/js/app/app.js', './public/js/app/**/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'], function () {
  server.run(['app.js']);

  // Restart the server when file changes
  gulp.watch(['views/**/*.jade'], server.notify);
  gulp.watch(['public/js/**/*.js'], server.notify);
  gulp.watch(['public/images/**/*'], server.notify);
  gulp.watch(['app.js'], [server.run]);
});
