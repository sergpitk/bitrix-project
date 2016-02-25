process.env.NODE_PATH = __dirname + '/src';
require('module').Module._initPaths();
var dotenv = require('dotenv');
dotenv.load();
require('require-dir')('gulp', {recurse: true});