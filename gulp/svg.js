import path from 'path';
import through from 'through2';
import gulp from 'gulp';
import rename from 'gulp-rename';
import symbols from 'gulp-svg-symbols';


let destDir = '';

gulp.task('svg', () => {
    gulp.src('core/local/**/assets-raw/svg/*.svg', {base: './', dot: true})
    .pipe(through.obj(function (file, enc, cb) {
        destDir =  path.dirname(file.path).replace('assets-raw', 'assets-done');
        cb(null, file);
    }))
    .pipe(symbols({
        title: false,
        id: 'icon_%f',
        className: '%f'
    }))
    .pipe(rename(function (path) {
        path.dirname = destDir;
    }))
    .pipe(gulp.dest('/'))
});
