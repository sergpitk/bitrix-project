import { create as browserSync } from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync('server');

const HOST = process.env.DEPLOY_HOST;

gulp.task('server', () => (
    bs.init({
        files: ['dist/**/*'],
        proxy: HOST,
        reloadDelay: 2500,
        startPath: "/"
    })
));