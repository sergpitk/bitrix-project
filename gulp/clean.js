import gulp from 'gulp';
import rimraf from 'gulp-rimraf';


gulp.task('clean', () => (
    gulp.src('core/local/**/assets-done', {read: 'false'})
        .pipe(rimraf())
));