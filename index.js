var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
var async = require('async');
var merge = require('merge');
var findpath = require('nw').findpath;

var NodeWebkitBrowser = function(baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  var customOptions = args.options || {};
  var searchPaths = (args.paths || ['node_modules']).map(function(searchPath) {
    return path.join(process.cwd(), searchPath);
  });
  searchPaths.unshift(process.env.NODE_PATH);

  this._start = function(url) {
    var self = this;
    var SOURCE_PATH = path.normalize(__dirname + '/runner.nw');
    var STATIC_PATH = path.normalize(self._tempDir + '/runner.nw');
    var INDEX_HTML = '/index.html';
    var PACKAGE_JSON = '/package.json';

    async.auto({
      'directory': function(callback) {
        ncp(SOURCE_PATH, STATIC_PATH, callback);
      },
      'index.html:read': ['directory', function(callback) {
        fs.readFile(STATIC_PATH + INDEX_HTML, callback);
      }],
      'index.html:write': ['index.html:read', function(callback, results) {
        var content = results['index.html:read'].toString().replace('%URL%', url);
        fs.writeFile(STATIC_PATH + INDEX_HTML, content, callback);
      }],
      'package.json:read': ['directory', function(callback) {
        fs.readFile(STATIC_PATH + PACKAGE_JSON, callback);
      }],
      'package.json:write': ['package.json:read', function(callback, results) {
        var options = JSON.parse(results['package.json:read'].toString());
        options = merge(true, options, customOptions);
        fs.writeFile(STATIC_PATH + PACKAGE_JSON, JSON.stringify(options), callback);
      }],
      'exec': ['index.html:write', 'package.json:write', function(callback) {
        process.env.NODE_PATH = searchPaths.join(path.delimiter);
        self._execCommand(self._getCommand(), [STATIC_PATH]);
      }]
    });
  };
};

NodeWebkitBrowser.prototype = {
  name: 'node-webkit',

  DEFAULT_CMD: {
    linux: findpath(),
    darwin: findpath(),
    win32: findpath()
  },

  ENV_CMD: 'NODEWEBKIT_BIN'
};

NodeWebkitBrowser.$inject = ['baseBrowserDecorator', 'args'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:NodeWebkit': ['type', NodeWebkitBrowser]
};
