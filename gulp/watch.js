import gulp from 'gulp';
import runSequence from 'run-sequence';
import { get as browserSync } from 'browser-sync';
import watch from 'gulp-watch';

const bs = browserSync('server');

gulp.task('watch', () => {
    global.watch = true;
    watch('src/*/local/templates/**/*.styl', () => runSequence('styles', bs.reload));
    watch(['src/**/*.{jpg,png,gif}', '!src/*/local/*/sprites/**/*.*'], () => runSequence('images', bs.reload));
    watch('src/**/*.php', () => runSequence('php', bs.reload));
    watch('src/*/local/templates/**/*.js', () => runSequence('scripts', bs.reload));

});