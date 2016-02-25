import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('default', () => (
    runSequence(
        'build',
        'server',
        'watch'
    )
));

gulp.task('build', () => (
    gulp.start(
        'php',
        'images',
        'styles',
        'scripts'
    )
));