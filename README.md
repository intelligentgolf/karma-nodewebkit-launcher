# karma-nodewebkit-launcher

> Launcher for node-webkit. 

---

> This is a small but experimental launcher, based on the [Safari Launcher](https://github.com/karma-runner/karma-safari-launcher) by Vojta Jina and contributors, and not affiliated with any official or semi-official Karma plugins.

---


## Installation

The easiest way is to keep `karma-nodewebkit-launcher` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-safari-launcher": "https://github.com/intelligentgolf/karma-nodewebkit-launcher"
  }
}
```

At the moment, this plugin is not registered with npm

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['NodeWebkit']
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers NodeWebkit
```
