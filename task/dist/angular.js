'use strict';

module.exports = function(gulp, plug) {

    gulp.task('angular:dist', function(done) {
        plug.runSequence('clean:angular-dist', 'angular:dist-views', 'angular:dist-app', 'angular:dist-concat', 'angular:dist-clean', done);
    });

    // Angular-App /build/
    // Concat all files.
    // $ gulp angular:dist-app
    //
    gulp.task('angular:dist-concat', function() {
        var pkg = require('./../../package.json');
        return gulp.src([
            './dist/js/*.js'
        ])
        .pipe(plug.concat('loading-layer.min.js'))
        .pipe(plug.header(plug.banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/js/'));
    });

    // Angular-App /build/
    // Clean build folder.
    // $ gulp angular:dist-clean
    //
    gulp.task('angular:dist-clean', function(done) {
        plug.del([
            './dist/js/*',
            '!./dist/js/loading-layer.min.js'
        ], done);
    });

    // Angular-App /build/
    // Compile all Angular Jade templates as one pre-cached.
    // $ gulp angular:dist-app
    //
    gulp.task('angular:dist-app', function() {
        return gulp.src([
            './src/**/controllers/index.js',
            './src/**/*.js'
        ])
        .pipe(plug.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(plug.concat('app.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest('./dist/js/'));
    });

    // Angular-Views /build/
    // Compile all Angular Jade templates as one pre-cached.
    // $ gulp angular:dist-views
    //
    gulp.task('angular:dist-views', function() {
        return gulp.src([
            './src/views/**/*.jade'
        ])
        .pipe(plug.jade())
        .pipe(plug.ngTemplates({
            module: 'external.components.loading-layer.views',
            path: function (path, base) {
                return '/external/components/loading-layer/' + path.replace(base, '');
            }
        }))
        .pipe(plug.concat('views.js'))
        .pipe(plug.wrap(
            '(function(){' +
                '\'use strict\';' +
                '<%= contents %>' +
            '})();'
        ))
        .pipe(plug.uglify())
        .pipe(gulp.dest('./dist/js/'));
    });

    // Clean:build-views /clean/
    // Clean task remove all Angular files from Dist folder.
    // $ gulp clean:build-views
    gulp.task('clean:angular-dist', function (done) {
        plug.del([
            './dist/js/*'
        ], done);
    });

};
