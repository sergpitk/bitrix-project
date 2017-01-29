import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream2';
import rename from 'gulp-rename';
import es from 'event-stream';
import glob from 'glob';


gulp.task('scripts', (done) => (
    glob('core/local/**/assets-raw/scripts/*.es6',  function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            console.log(entry);
            return browserify({
                entries: [entry]
            })
                .transform(babelify)
                .bundle()
                .pipe(source({
                    path: entry,
                    base: './'
                })
                )
                .pipe(rename(function (path) {
                    path.dirname = path.dirname.replace('assets-raw', 'assets-done');
                    path.extname = '.js';
                }))
                .pipe(gulp.dest('./'));
        });
        es.merge(tasks).on('end', done);
    })
));
