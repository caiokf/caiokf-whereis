var gulp = require('gulp');
var concat = require("gulp-concat");

gulp.task('build', function () {
  return gulp.src(['./public/js/app/app.js', './public/js/app/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  return gulp.run('build');
});
