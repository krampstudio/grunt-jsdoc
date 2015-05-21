'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Provides utility methods to execute a command
 * @module exec
 */
module.exports = {

	/**
	 * Build and execute a child process using the spawn function
	 * @param {Object} grunt - the grunt context
	 * @param {String} script - the script to run
	 * @param {Array} sources - the list of sources files
	 * @param {Object} options - the list of cli flags
	 * @return {ChildProcess} from the spawn
	 */
	buildSpawned : function(grunt, script, sources, options){

		var util = require('util'),
			isWin = process.platform === 'win32',
			cmd = (isWin) ? 'cmd' : script,
			args = (isWin) ? ['/c', script] : [],
			spawn = require('child_process').spawn;

		// Compute JSDoc options
		for (var optionName in options) {
			var option = options[optionName];
			grunt.log.debug("Reading option: " + optionName);
			args.push('--' + optionName);
			if (options.hasOwnProperty(optionName) && typeof option === 'string') {
				grunt.log.debug("                > " + option);
				args.push(option);
			}
		}

		if(!util.isArray(sources)){
			sources = [sources];
		}
		args.push.apply(args, sources);

		// handle paths that contain spaces
		if (isWin) {
			// Windows: quote paths that have spaces
			args = args.map(function(item){
				if (item.indexOf(' ')>=0) {
                    return '"' + item + '"';
                } else {
                    return item;
                }
			});
		} else {
            // Unix: escape spaces in paths
            args = args.map(function(item){
                return item.replace(' ', '\\ ');
            });
        }
		grunt.log.debug("Running : "+ cmd + " " + args.join(' '));

		return spawn(cmd, args, {
            windowsVerbatimArguments: isWin // documentation PR is pending: https://github.com/joyent/node/pull/4259
        });
	},

	/**
	 * Lookup file or path into node modules
	 * @param {Object} grunt - the grunt context
	 * @returns {String} the first matching resolved path or nothing if not found
	 */
	lookup : function(grunt){
         var i, binPath, paths;
		 var nodePath = process.env.NODE_PATH || '';

		//check first the base path into the cwd
		paths = [
            __dirname + '/../../node_modules/.bin/jsdoc',
            __dirname + '/../../node_modules/jsdoc/jsdoc.js'
        ];

        //fall back on global if not found at the usual location
		nodePath.split(path.delimiter).forEach(function(p){
			if(!/\/$/.test(p)){
				p += '/';
			}
			paths.push(p + '/jsdoc/jsdoc.js');
		});

		for(i in paths){
            binPath = path.resolve(paths[i]);
			if(fs.existsSync(binPath) && fs.statSync(binPath).isFile() === true){
				return binPath;
			}
		}

		return;
	}
};
