'use strict';

module.exports = function(gulp, plugins) {

    // Watch /watch/
    // Plugin creates watcher that will spy on files for changes and call certain tasks when it happens.
    // $ gulp watch
    //
    gulp.task('watch', function () {
        // demo
        gulp.watch(['./demo/src/views/**/*.jade'], ['jade:demo']);
        gulp.watch(['./demo/src/styles/**/*.scss', './demo/src/sass/**/*.sass'], ['sass:demo']);
        gulp.watch(['./demo/src/**/*.js'], ['angular:demo']);
        gulp.watch(['./demo/src/data/**/*.*'], ['copy:demo-data']);
        // dist
        gulp.watch(['./src/styles/**/*.scss', './src/styles/**/*.sass'], ['sass:dist']);
        gulp.watch(['./src/**/*.js', './src/**/*.jade'], ['angular:dist']);
    });

};
