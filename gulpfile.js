var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    sass: ['./scss/**/*.scss'],
    tsc: ['./app/**/*.ts']
};



gulp.task('default', ['sass','tsc']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.tsc, ['tsc']);
});


gulp.task('tsc', function() {    
  var sourcemaps = require("gulp-sourcemaps");
  var ts = require('gulp-typescript');
  var tsProject = ts.createProject('tsconfig.json');
	return tsProject
    .src('app')
    .pipe(sourcemaps.init())      
		.pipe(ts(tsProject))
    .js
    .pipe(sourcemaps.write('./', 
      {
        includeContent:true, 
        sourceRoot: function(file) {
          return file.cwd + '\\js';
        }          
      }))
	  .pipe(gulp.dest('www/js/'));
});