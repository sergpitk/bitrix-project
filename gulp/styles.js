import gulp from 'gulp';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';


gulp.task('styles', () => (
        gulp.src('core/local/**/assets-raw/styles/*.css', {base: './'})
            .pipe(postcss([postcssNested, postcssImport, autoprefixer()]))
            .pipe(rename(function (path) {
                path.dirname = path.dirname.replace('assets-raw', 'assets-done')
            }))
            .pipe(gulp.dest('./'))
));
