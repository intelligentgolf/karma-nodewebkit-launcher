var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;

var NodeWebkitBrowser = function(baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = function(url) {
    var self = this;
    var SOURCE_PATH = path.normalize(__dirname + '/runner.nw');
    var STATIC_PATH = path.normalize(self._tempDir + '/runner.nw');
    var INDEX_HTML = '/index.html';
    
    ncp(SOURCE_PATH, STATIC_PATH, function(err) {
      fs.readFile(STATIC_PATH + INDEX_HTML, function(err, data) {
        var content = data.toString().replace('%URL%', url);

        fs.writeFile(STATIC_PATH + INDEX_HTML, content, function(err) {
          self._execCommand(self._getCommand(), [STATIC_PATH]);
        });
      });
    });
  };
};

NodeWebkitBrowser.prototype = {
  name: 'node-webkit',

  DEFAULT_CMD: {
    linux: path.normalize(__dirname + '/../.bin/nodewebkit'),
    darwin: path.normalize(__dirname + '/../.bin/nodewebkit'),
    win32: path.normalize(__dirname + '/../.bin/nodewebkit.exe')
  },

  ENV_CMD: 'NODEWEBKIT_BIN'
};

NodeWebkitBrowser.$inject = ['baseBrowserDecorator'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:NodeWebkit': ['type', NodeWebkitBrowser]
};
