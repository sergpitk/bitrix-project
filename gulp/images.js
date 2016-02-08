import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';

gulp.task('images', () => (
    gulp.src(['src/**/*.{jpg,png,gif}', '!src/local/*/sprites/**/*.*'], {base: 'src'})
        .pipe(changed('dist'))
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist'))
));