'use strict';

var gulp            = require('gulp'),
    plug            = {
        ngAnnotate  : require('gulp-ng-annotate'),
        ngTemplates : require('gulp-ng-templates'),
        wrap        : require('gulp-wrap'),
        jshint      : require('gulp-jshint'),
        jade        : require('gulp-jade'),
        bump        : require('gulp-bump'),
        sass        : require('gulp-sass'),
        rename      : require('gulp-rename'),
        concat      : require('gulp-concat'),
        minifyCSS   : require('gulp-minify-css'),
        connect     : require('gulp-connect'),
        uglify      : require('gulp-uglify'),
        header      : require('gulp-header'),
        jasmine     : require('gulp-jasmine-phantom'),
        runSequence : require('run-sequence'),
        changelog   : require('conventional-changelog'),
        exec        : require('child_process').exec,
        argv        : require('yargs').argv,
        copy        : require('ncp').ncp,
        del         : require('del'),
        fs          : require('fs')
    };

// dist
require('./task/dist/angular')(gulp, plug);
require('./task/dist/sass')(gulp, plug);
require('./task/dist/banner')(gulp, plug);
require('./task/dist/dist')(gulp, plug);

// demo
require('./task/demo/angular')(gulp, plug);
require('./task/demo/copy')(gulp, plug);
require('./task/demo/sass')(gulp, plug);
require('./task/demo/jade')(gulp, plug);
require('./task/demo/demo')(gulp, plug);

// start, watch, test, release
require('./task/start')(gulp, plug);
require('./task/build')(gulp, plug);
require('./task/watch')(gulp, plug);
require('./task/connect')(gulp, plug);
require('./task/release')(gulp, plug);
require('./task/test')(gulp, plug);
