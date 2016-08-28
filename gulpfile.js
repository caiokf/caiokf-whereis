var gulp = require('gulp');
var concat = require("gulp-concat");
var babel = require('gulp-babel');

gulp.task('build', function () {
  return gulp.src(['./public/js/app/app.js', './public/js/app/**/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  return gulp.run('build');
});
