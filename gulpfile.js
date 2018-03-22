const gulp = require('gulp');
const sass = require('gulp-sass');
const autopref = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const csso = require('gulp-csso');

gulp.task('css', () => {
  return gulp.src('src/**/*.sass')
    .pipe(sass())
    .pipe(autopref({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(csso({
      restructure: false,
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/'));
});

gulp.task('sass-watch', ['css'], () => {
  gulp.watch('src/**/*.sass', ['css']);
});
