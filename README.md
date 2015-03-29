# karma-nodewebkit-launcher

> Launcher for node-webkit. 

---

This is a small but experimental launcher, based on the [Safari Launcher](https://github.com/karma-runner/karma-safari-launcher) by Vojta Jina and contributors, and not affiliated with any official or semi-official Karma plugins.

---


## Installation

The easiest way is to keep `karma-nodewebkit-launcher` as a devDependency in your `package.json`.


    {
      "devDependencies": {
        "karma": "~0.10",
        "karma-nodewebkit-launcher": "~0.0.6"
      }
    }


You can do it on the command line by:

    npm install karma-nodewebkit-launcher --save-dev

## Configuration

    // karma.conf.js
    module.exports = function(config) {
      config.set({
        browsers: ['NodeWebkit']
      });
    };


You can pass list of browsers as a CLI argument too:

    karma start --browsers NodeWebkit

## Locally-installed Node modules

If you're using locally-installed Node modules via `require` in your code in the `node_modules` directory, you should be able to just `require` them, and they should be found by the testing environment. If they are in another location, in order for the testing environment to find them, you have 2 options.

You can explicitly set `NODE_PATH` in the environment to the directory containing the modules.

    export NODE_PATH=/full/path/to/custom_node_modules

Alternatively, you can create a custom configuration in `karma.conf.js`:

    browsers: ['NodeWebkitWithCustomPath],

    customLaunchers: {
      'NodeWebkitWithCustomPath': {
        base: 'NodeWebkit',
        // Remember to include 'node_modules' if you have some modules there
        paths: ['relative/path/to/custom_node_modules', 'node_modules']
      }
    } 
    
## Avoid download of NodeWebkit binary on every build

The launcher depends on [`npm-installer`](https://github.com/nwjs/npm-installer) to download the NodeWebkit binary for your platform and achitecture. The default behaviour of this is to download on every `npm install`, which can take time. To avoid this you can download the file ahead of time, save it to a location accessibly by `http://` or `file://` URL, and set the `nwjs_urlbase` option of [`npm-installer`](https://github.com/nwjs/npm-installer) to retrieve the binary from this location.

You can do this on the command line

    npm install --nwjs_urlbase=file:///home/bilbo/my/own/mirror

via a line in a `.npmrc` file

    nwjs_urlbase=file:///home/bilbo/my/own/mirror

or by the environment variable `NWJS_URLBASE`

    export NWJS_URLBASE=file:///home/bilbo/my/own/mirror

## Custom node-webkit manifest

The default node-webkit [`package.json`](https://github.com/rogerwang/node-webkit/wiki/Manifest-format) that is used in the launcher is

    {
      "name": "karma-runner",
      "main": "index.html",
      "node-remote": "<local>"
    }
    
You can overwrite and add to these defaults by creating a custom configuration in `karma.conf.js`. For example, to run your tests in kiosk mode

    browsers: ['NodeWebkitKiosk'],

    customLaunchers: {
      'NodeWebkitKiosk': {
        base: 'NodeWebkit',
        options: {
          window: {
            'kiosk': true
          }
        }
      }
    }

The `options` in the above example are merged with the defaults, so the resulting `package.json` used in node-webkit is

    {
      "name": "karma-runner",
      "main": "index.html",
      "node-remote": "<local>",
      "window": {
        "kiosk": true
      }
    }



