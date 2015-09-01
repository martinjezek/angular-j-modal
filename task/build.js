'use strict';

module.exports = function(gulp, plug) {

    // Build /task/
    // Build task creates a demo and distribution package.
    // $ gulp build
    //
    gulp.task('build', ['demo', 'dist']);

};
