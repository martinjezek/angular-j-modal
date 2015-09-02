'use strict';

module.exports = function(gulp, plug) {

    // Release /task/
    // Create a new version of the plugin.
    // $ gulp release --version [major|minor|patch|prerelease]
    //
    gulp.task('release', function(done) {
       plug.runSequence('test', 'bump', 'dist', 'changelog', 'commit-release', done);
    });

    // Bump /release/
    // Semantic Versioning - Increment a version number according to given --version [major|minor|patch|prerelease] flag.
    // $ gulp bump --version [major|minor|patch|prerelease]
    //
    gulp.task('bump', function() {
        var available = ['major', 'minor', 'patch', 'prerelease'],
            version   =  'patch';
        if (plug.argv.version && available.indexOf(plug.argv.version) != -1) {
            version = plug.argv.version;
        }
        return gulp.src([
                './package.json',
                './bower.json'
            ])
            .pipe(plug.bump({ type: version }))
            .pipe(gulp.dest('./'));
    });

    // Changelog /release/
    // The CHANGELOG.md file is a log of changes made to a project, such as bug fixes, new features, etc.
    // $ gulp changelog
    //
    gulp.task('changelog', function(done) {
        readPackageJSON(function (pkg) {
            plug.changelog({
                repository: pkg.repository,
                version: pkg.version
            }, function(err, log) {
                if (err) return done(err);
                plug.fs.writeFile('./CHANGELOG.md', log, 'utf-8', function(err) {
                    if (err) return done(err);
                    done();
                });
            });
        });
    });

    // Commit /release/
    // Commit all changes and add a new Git tag
    // $ gulp commit-release
    //
    gulp.task('commit-release', function(done) {
        readPackageJSON(function (pkg) {
            plug.exec('git add -A', function(err) {
                if (err) return done(err);
                plug.exec('git commit -m "chore: release v' + pkg.version + '"', function(err) {
                    if (err) return done(err);
                    plug.exec('git tag "v' + pkg.version + '"', function(err) {
                        if (err) return done(err);
                        done();
                    });
                });
            });
        });
    });

    function readPackageJSON(done) {
        plug.fs.readFile('./package.json', 'utf-8', function(err, data) {
            if (err) throw err;
            var pkg = JSON.parse(data);
            done(pkg);
        });
    }

};
