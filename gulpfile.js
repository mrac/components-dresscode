'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');


gulp.task('sass', function () {
    gulp.src('./sass/all.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});


