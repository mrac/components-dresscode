'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function () {
    gulp.src('./bower_components/dress-code/dist/sass/toolkit.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});


