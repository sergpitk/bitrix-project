import gulp from 'gulp';
import rimraf from 'gulp-rimraf';


gulp.task('clean', () => (
    gulp.src('core/local/**/assets-done', {dot: true, read: 'false'})
        .pipe(rimraf())
));