process.env.NODE_PATH = __dirname + '/core/local';
require('module').Module._initPaths();
require('require-dir')('gulp', {recurse: true});