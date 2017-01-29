import path from 'path';
import through from 'through2';
import gulp from 'gulp';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import postcssAssets from 'postcss-assets';
import postcssSprites from 'postcss-sprites';
import autoprefixer from 'autoprefixer';

let spritesCfg = {
    spritePath: null,
    stylesheetPath: null,
    filterBy: function(image) {
        if (image.url.indexOf('images/sprite') === -1) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    groupBy: function(image) {
        return Promise.resolve(path.basename(image.styleFilePath));
    }
}

gulp.task('styles', () => (
        gulp.src('core/local/**/assets-raw/styles/*.pcss', {base: './'})
            .pipe(through.obj(function (file, enc, cb) {
                spritesCfg.stylesheetPath = path.dirname(file.path).replace('assets-raw', 'assets-done');
                spritesCfg.spritePath = spritesCfg.stylesheetPath.replace('styles', 'images');
                cb(null, file);
            }))
            .pipe(postcss([
                postcssNested,
                postcssImport,
                postcssAssets,
                postcssSprites(spritesCfg),
                autoprefixer()
                ]
            ))
            .pipe(rename(function (path) {
                path.dirname = path.dirname.replace('assets-raw', 'assets-done')
                path.extname = '.css';
            }))
            .pipe(gulp.dest('./'))
));
