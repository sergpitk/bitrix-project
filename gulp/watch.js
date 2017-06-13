import gulp from 'gulp';
import runSequence from 'run-sequence';
import { get as browserSync } from 'browser-sync';
import watch from 'gulp-watch';

const bs = browserSync('server');

const path = 'core/local/**/assets-raw';

gulp.task('watch', () => {
    global.watch = true;

watch([
    path + '/styles/**/*.pcss'
], () => {
    runSequence('styles', bs.reload);
});

watch([
    path + '/images/**/*.*'
], () => runSequence('images', bs.reload));

watch([
    path + '/svg/*.svg'
], () => runSequence('svg', bs.reload));

gulp.start('scripts:watch');

});
