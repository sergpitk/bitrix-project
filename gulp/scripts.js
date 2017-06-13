import gulp from 'gulp';
import errorHandler from 'gulp-plumber-error-handler';
import statsLogger from 'webpack-stats-logger';
import webpack from 'webpack';
import makeWebpackConfig from '../webpack.config.js';



const scriptsErrorHandler = errorHandler('Error in \'scripts\' task');


function runWebpack(watch = false) {
    return function (callback) {




        const webpackConfig = makeWebpackConfig({watch})


        return webpack(webpackConfig, (error, stats) => {
                const jsonStats = stats.toJson();
        if (jsonStats.errors.length) {
            jsonStats.errors.forEach(message => {
                scriptsErrorHandler.call({emit() {/* noop */}}, {message});
        });
        }
        statsLogger(error, stats);

        //solve the issue https://github.com/CSSSR/csssr-project-template/issues/169
        if (watch === false) {
            callback();
        }
    });
    };
}

gulp.task('scripts', runWebpack(false));

gulp.task('scripts:watch', runWebpack(true));