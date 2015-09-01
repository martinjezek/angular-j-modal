'use strict';

module.exports = function(gulp, plugins) {

    // Sass /compiler/
    // Compile and minify Sass styles to the Demo folder.
    // $ gulp sass:demo
    //
    gulp.task('sass:demo', ['clean:demo-css'], function() {
        return gulp.src([
            './demo/src/styles/**/*.scss',
            './demo/src/styles/**/*.sass',
            '!./demo/src/styles/partials/*.*'
        ])
        .pipe(plugins.sass())
        .pipe(plugins.minifyCSS({ noAdvanced: true }))
        .pipe(gulp.dest('./demo/build/css/'))
        .pipe(plugins.connect.reload());
    });

    // Clean:demo-css /clean/
    // Clean task remove all CSS files from the Demo build folder.
    // $ gulp clean:demo-css
    gulp.task('clean:demo-css', function (done) {
        plugins.del([
            './demo/build/css/*'
        ], done);
    });

};
