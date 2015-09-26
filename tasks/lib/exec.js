var path  = require('path');
var spawn = require('child_process').spawn;
var isWin = process.platform === 'win32';

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
	 * @param {Object} params - the list of cli flags
	 * @return {ChildProcess} from the spawn
	 */
	buildSpawned : function(grunt, script, sources, params){

        var flag;
		var cmd = (isWin) ? 'cmd' : script;
		var args = (isWin) ? ['/c', script.slice(-2) === 'js' ? 'node ' + script : script] : [];


         // handle paths that contain spaces
        var quote = function quote(path){
            if(isWin && path.indexOf(' ') !== -1){
                return '"' + path + '"';
            }
            return path;
        };

		// Compute JSDoc options
		for (flag in params) {
			if (params.hasOwnProperty(flag)) {
                if (params[flag] !== false){
			        args.push('--' + flag);
                }
                if (typeof params[flag] === 'string') {
                    args.push(quote(params[flag]));
                }
            }
		}

		if(!Array.isArray(sources)){
			sources = [sources];
		}
		args = args.concat(sources.map(quote));

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
            __dirname + '/../../node_modules/jsdoc/jsdoc.js',
            __dirname + '/../../../jsdoc/jsdoc.js'
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
			if(grunt.file.exists(binPath) && grunt.file.isFile(binPath)){
				return binPath;
			}
		}

		return;
	}
};
