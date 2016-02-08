import gulp from 'gulp';


gulp.task('php', () => (
    gulp.src('src/**/*.php', {base: 'src'})

    .pipe(gulp.dest('dist'))
));