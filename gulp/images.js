import gulp from 'gulp';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';


gulp.task('images', () => {
    gulp.src([
            'core/local/**/assets-raw/images/**',
            '!**/images/sprite/*'
        ], {base: './', dot: true})
        .pipe(imagemin())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('assets-raw', 'assets-done')
        }))
        .pipe(gulp.dest('./'))
});
