'use strict';

module.exports = function(gulp, plug) {

    // Development Server /server/
    // The gulp plugin for connect server and watch the changes on files.
    // $ gulp start
    //
    gulp.task('start', ['build', 'watch'], function () {

        // server options
        plug.connect.server({
            root: ['./demo/build', './dist'],
            port: 9001,
            livereload: false
        });

    });

};
