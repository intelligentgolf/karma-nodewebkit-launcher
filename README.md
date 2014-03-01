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
        "karma-safari-launcher": "git://github.com/intelligentgolf/karma-nodewebkit-launcher.git"
      }
    }


You can do it on the command line by:

    npm install git://github.com/intelligentgolf/karma-nodewebkit-launcher.git --save-dev

At the moment, this plugin is not registered with npm, so you use the GitHub URL.

## Configuration

    // karma.conf.js
    module.exports = function(config) {
      config.set({
        browsers: ['NodeWebkit']
      });
    };


You can pass list of browsers as a CLI argument too:

    karma start --browsers NodeWebkit

