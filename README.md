# grunt-jsdoc-plugin

This plugin enables you to integrate generation of comment based documentation into your Grunt build.

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jsdoc-plugin`

Then configure the plugin to your project's `grunt.js` gruntfile:

1. add the `jsdoc` entry to the `initConfig` method 
2. load the plugin

```javascript
grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['src/*.js', 'test/*.js'],
            dest: 'doc'
        }
    }
});
grunt.loadNpmTasks('grunt-jsdoc-plugin');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
_(Coming soon)_

## Contributing

## Release History

 * 0.1.0 First release, include basic support of [jsdoc3]

## License
Copyright (c) 2012 Bertrand Chevrier  
Licensed under the MIT license.
