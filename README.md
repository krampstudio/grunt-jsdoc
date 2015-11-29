# grunt-jsdoc [![Build Status](https://travis-ci.org/krampstudio/grunt-jsdoc.png)](https://travis-ci.org/krampstudio/grunt-jsdoc) [![NPM version](https://badge.fury.io/js/grunt-jsdoc.png)](http://badge.fury.io/js/grunt-jsdoc) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Npm Downloads](https://nodei.co/npm/grunt-jsdoc.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-jsdoc.png?downloads=true&stars=true)

This plugin enables you to integrate the generation of comments based documentation into your Grunt build.

## Compatibility

### :warning: Migrate from `0.x.x` to `1.x.x` branch :

I have removed the direct dependency to [ink-docstrap](https://www.npmjs.com/package/ink-docstrap). If you still want it, grab the dependency by yourself (`npm install --save-dev ink-docstrap`)


## Generate your documentation

### Install

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsdoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsdoc');
```

### Configuration

First, add the `jsdoc` entry to the options of the `initConfig` method of your Gruntfile.js :

```javascript
grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['src/*.js', 'test/*.js'],
            options: {
                destination: 'doc'
            }
        }
    }
});
```

The supported options are

 * `src` : an array of pattern that matches the files to extract the documentation from. You can also [include a README](http://usejsdoc.org/about-including-readme.html).
 * `dest` : (alias to `options.destination`) set up the destination folder, the grunt way
 * `jsdoc`: (optional) the path to the jsdoc bin (needed only for some border line cases)
 * `options` : options used by jsdoc
   * `destination`: the folder where the doc is generated
   * ... All jsdoc options are available (see [usejsdocCli](http://usejsdoc.org/about-commandline.html) documentation).
   * `ignoreWarnings` : (optional) do not show jsdoc warnings

### Code Documentation

This plugin is a wrapper around [jsdoc3](https://github.com/jsdoc3/jsdoc). Please refer to the [documentation](http://usejsdoc.org) for the documentation details.

### Templates

The plugin includes only the jsdoc3 template but you can configure any other jsdoc3 template. For example you can use [ink-docstrap](https://www.npmjs.com/package/ink-docstrap).

```
npm install --save-dev ink-docstrap
```

And in your `Gruntfile.js` :

```javascript
jsdoc : {
    dist : {
        src: ['src/**/*.js', 'README.md'],
        options: {
            destination : 'doc',
               template : "node_modules/ink-docstrap/template",
              configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
    }
}
```

## Generation

To generate the documentation, you need to call the `jsdoc` task :

```bash
$> grunt jsdoc
```

or integrate it to your build sequence :

```javascript
grunt.registerTask('default', ['lint', 'test', 'jsdoc']);
```

## Contributions

Every contribution is more than welcomed. You can:
 - [report issues](https://github.com/krampstudio/grunt-jsdoc/issues)
 - Fix, improve the configuration, add new features. The best is to fork and submit a pull request
 - Test and adapt to other OS
 - Fix my English mistakes
 - Update the documentation
 - Create a better logo
 - [Offer me a coffee](https://gratipay.com/~krampstudio/) (I'm maintaining this plugin on my free time)

### Upstream issues

*For documentation related issues, please use the [jsdoc issue tracker](https://github.com/jsdoc3/jsdoc/issues)*

To be sure the issue comes from the Grunt plugin, you can check by comparing the results with a jsdoc command. Run the task with the `--debug` flag to retrieve the jsdoc command to run.

## Release History
 * _1.1.0_ update to jsdoc 3.4.0 and make dest optional if a config file is set.
 * _1.0.0_ remove direct dependency to docstrap
 * _0.6.0_ jsdoc 3.0.0
    * _0.6.4_ first stable using jsdoc 3.3.0
    * _0.6.5_ code refactoring, docstrap 0.5.3, PR [#120](https://github.com/krampstudio/grunt-jsdoc/pull/120), better path management
    * _0.6.6_ fix failing test
    * _0.6.7_ Fix bug [#136](https://github.com/krampstudio/grunt-jsdoc/issues/136) and add more tests
    * _0.6.8_ Fix bug [#140](https://github.com/krampstudio/grunt-jsdoc/issues/140), [#143](https://github.com/krampstudio/grunt-jsdoc/issues/143),
    * _0.6.9_ Fix bug [#144](https://github.com/krampstudio/grunt-jsdoc/issues/144)
    * _0.6.10_ Revert wrong moving away docstrap dep
* _0.5.0_ Move to NPM dependencies instead of git, jsdoc 3.2.2 (Fix [#65](https://github.com/krampstudio/grunt-jsdoc/issues/65))
   * _0.5.1_ Update repo name to prevent confusion with previous version
   * _0.5.2_ Upgrade to Grunt 0.4.3 (PR [#74](https://github.com/krampstudio/grunt-jsdoc/pull/74))
   * _0.5.3_ Fix peer deps issue
   * _0.5.4_ Fix peer deps issue
   * _0.5.5_ Update docstrap version
   * _0.5.6_ Fix dependencies version and bug [#87](https://github.com/krampstudio/grunt-jsdoc/issues/87)
   * _0.5.7_ Update readme, docstrap version
   * _0.5.8_ Fix bug [#116](https://github.com/krampstudio/grunt-jsdoc/issues/116)
 * _0.4.0_ Update to jsdoc 3.2.0 stable, Fix [#37](https://github.com/krampstudio/grunt-jsdoc/issues/37), add integration tests
   * _0.4.1_ Fix [#53](https://github.com/krampstudio/grunt-jsdoc/issues/53) and [#54](https://github.com/krampstudio/grunt-jsdoc/issues/54)
   * _0.4.2_ Fix [#57](https://github.com/krampstudio/grunt-jsdoc/issues/57)
   * _0.4.3_ Grunt 0.4.2 compliance, upgrade to jsdoc 3.2.2 and undeprecate the `dest` option ([#60](https://github.com/krampstudio/grunt-jsdoc/issues/60), [#63](https://github.com/krampstudio/grunt-jsdoc/issues/63) and [#66](https://github.com/krampstudio/grunt-jsdoc/issues/66))
 * _0.3.0_ Partial rewrite, Fix [#29](https://github.com/krampstudio/grunt-jsdoc/pull/30) and minor typos fixs
   * _0.3.1_ Fix [#29](https://github.com/krampstudio/grunt-jsdoc/issues/29)
   * _0.3.2_ Fix [#32](https://github.com/krampstudio/grunt-jsdoc/issues/32)
   * _0.3.3_ Fix [#34](https://github.com/krampstudio/grunt-jsdoc/issues/34) and [#36](https://github.com/krampstudio/grunt-jsdoc/issues/34)
 * _0.2.0_ Migrate to grunt 0.4
   * _0.2.1_ Fix [#10](https://github.com/krampstudio/grunt-jsdoc/issues/10)
   * _0.2.2_ Fix [#11](https://github.com/krampstudio/grunt-jsdoc/issues/11)
   * _0.2.3_ Fix [#14](https://github.com/krampstudio/grunt-jsdoc/pull/14) and [#15](https://github.com/krampstudio/grunt-jsdoc/issues/15)
   * _0.2.4_ Fix Jsdoc 3 dependency to 3.1.1 tag, enables jsdoc options [#19](https://github.com/krampstudio/grunt-jsdoc/issues/19), enable to add jsdoc path [#13](https://github.com/krampstudio/grunt-jsdoc/issues/13) and add peerDependencies
 * _0.1.0_ First release, includes basic support of [jsdoc3]
   * _0.1.1_ Fix [#2](https://github.com/krampstudio/grunt-jsdoc/issues/2)
   * _0.1.2_ Fix [#4](https://github.com/krampstudio/grunt-jsdoc/issues/4)
   * _0.1.3_ Fix [#7](https://github.com/krampstudio/grunt-jsdoc/pull/7), Add [feature #8](https://github.com/krampstudio/grunt-jsdoc/pull/8)
   * _0.1.4_ Use `child_process.spawn` instead of `exec` to run the command


## License

Copyright (c) 2012 Bertrand Chevrier
Licensed under the MIT license.

