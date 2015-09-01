'use strict';

module.exports = function(gulp, plug) {

    gulp.task('angular:demo', function(done) {
        plug.runSequence('clean:angular-demo', 'angular:demo-app', done);
    });

    // Angular-Demo /build/
    // Prepare and concat all Angular APP files to Build folder
    // $ gulp angular:demo-app
    //
    gulp.task('angular:demo-app', function() {
        return gulp.src([
            './demo/src/**/*.js'
        ])
        .pipe(plug.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(plug.concat('app.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest('./demo/build/js/'));
    });

    // Clean:angular-demo /clean/
    // Clean task remove all Angular files from Build folder.
    // $ gulp clean:angular-demo
    gulp.task('clean:angular-demo', function (done) {
        plug.del([
            './demo/build/js/*'
        ], done);
    });

};
