'use strict';

module.exports = function(gulp, plugins) {

    // Sass /compiler/
    // Compile, concate and minify Sass styles to the Dist folder.
    // $ gulp sass:dist
    //
    gulp.task('sass:dist', ['clean:dist-css'], function() {
        var pkg = require('./../../package.json');
        return gulp.src([
            './src/styles/**/*.scss',
            './src/styles/**/*.sass',
            '!./src/styles/partials/*.*'
        ])
        .pipe(plugins.sass())
        .pipe(plugins.concat(pkg.name + '.css'))
        .pipe(plugins.minifyCSS({ noAdvanced: true, keepSpecialComments: 0 }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.header(plugins.banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(plugins.connect.reload());
    });

    // Clean:dist-css /clean/
    // Clean task remove all CSS files from the Dist folder.
    // $ gulp clean:dist-css
    gulp.task('clean:dist-css', function (done) {
        plugins.del([
            './dist/css/*'
        ], done);
    });

};
