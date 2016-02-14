import gulp from 'gulp';
import browserify from 'browserify';
import globify from 'require-globify';
import babelify from 'babelify';
import source from 'vinyl-source-stream2';
import rename from 'gulp-rename';
import es from 'event-stream';
import glob from 'glob';


gulp.task('scripts', (done) => (
    glob('src/*/local/templates/*/*.js',  function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            console.log(entry);
            return browserify({
                entries: [entry]
            })
                .transform(babelify)
                .transform(globify)
                .bundle()
                .pipe(source({
                    path: entry,
                    cwd: 'src',
                    base: 'src'
                })
                )
                //.pipe(rename({
                //    extname: '.bundle.js'
                //}))
                .pipe(gulp.dest('dist'));
        });
        es.merge(tasks).on('end', done);
    })
));