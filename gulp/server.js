import { create as browserSync } from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync('server');

const HOST = process.env.HOST;

gulp.task('server', () => (
    bs.init({
        files: ['core/local/assets-done/**/*'],
        proxy: HOST,
        reloadDelay: 2500,
        startPath: "/"
    })
));