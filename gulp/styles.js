import gulp from 'gulp';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import rupture from 'rupture';
import nib from 'nib';

gulp.task('styles', () => (
    gulp.src('src/local/templates/*/*.styl', {base: 'src'})
        .pipe(plumber())
        .pipe(stylus({
            use: [
                rupture(),
                nib()
            ],
            'include css': true
        }))
        .pipe(autoprefixer(['last 2 versions', 'safari 5']))
        .pipe(gulp.dest('dist'))
));