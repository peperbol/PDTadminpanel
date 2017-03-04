var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function(){
  return gulp.src('viewspug/*.pug')
    .pipe(pug().on('error', function(){}))
    .pipe(gulp.dest('views'))
});

gulp.task('css', function(){
  return gulp.src('stylesass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('style'))
});

gulp.task('default', function(){

  gulp.watch('stylesass/*.scss',[ 'css']);
  gulp.watch('viewspug/*.pug',[ 'html']);
});
