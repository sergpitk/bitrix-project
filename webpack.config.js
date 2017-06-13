var path = require('path');
var glob = require('glob');
var WebpackAssetsManifest = require('webpack-assets-manifest');
var files = glob.sync('./core/local/**/assets-raw/scripts/*.es6');
var entries = {};



export default function makeWebpackConfig({
    watch = true
}) {

    for (var i = 0; i < files.length; i++) {
        var entry = files[i];
        entries[entry.replace('assets-raw', 'assets-done').replace('.es6', '.js')] = entry;
    }


    console.log(entries);

    const vueLoaderConfig = {
        loaders: {css: ['css-loader']},
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]

    }

    return {
        entry: entries,
        watch,
        output: {
            chunkFilename: '.core/local/resources/common/scripts/[chunkhash].chunk.js',
            filename: '[name]',
            path: __dirname,
            publicPath: './core/'
        },
        externals: {
            jquery: 'jQuery',
            BX: 'BX'
        },
        devtool: "cheap-source-map",
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                }
            ]
        }
    };

}
