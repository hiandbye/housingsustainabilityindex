var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// Compiles all js into one file, minifys file, outputs to public/js
gulp.task('scripts', function() {
    return gulp.src('./js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

// Runs jshint on all js files
gulp.task('lint-js', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
})

// Compiles all scss files into one files, minifys file, outputs to public/css
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./public/css'));
});

// Default task - runs from command 'gulp' on CLI
gulp.task('default', ['scripts', 'sass']);

