/**
 * @fileoverview This task helps you to run jsdoc3 to generate doc in your Grunt build sequence
 * @copyright Bertrand Chevrier 2012
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 * 
 * @module tasks/jsdoc-plugin
 */

/**
 * Register the jsdoc task and helpers to Grunt
 * @constructor
 * @param {Object} grunt - the grunt context
 */
module.exports = function jsDocTask(grunt) {
	'use strict';

	var util = require('util'),
	    errorCode = {
			generic : 1,
			task	: 3	
		};

	/**
     * Register the jsdoc task to Grunt
     * @memberOf module:tasks/jsdoc-plugin
     */
	function registerJsdocTask() {
		
		var exec		= require('child_process').exec,
		    fs			= require('fs'),
		    done		= grunt.task.current.async(),
			srcs		= grunt.file.expandFiles(grunt.task.current.file.src),
		    dest		= grunt.task.current.file.dest || 'doc',
		    config		= grunt.task.current.data.config,
			javaHome	= process.env.JAVA_HOME,
			timeout		= 60000,
			jsDoc;


		/**
		 * Build the jsdoc to execute.
		 * @memberOf module:tasks/jsdoc-plugin.registerJsdocTask
		 * @param {String} bin the path to the command
		 * @param {Array} sources the list of sources files 
		 * @param {String} destination the destination directory
		 * @param {String} [config] the path to a jsdoc config file
		 * @return {String} command the command ready to be executed
		 */
		var buildCmd = function(bin, sources, destination, config){
			var cmd = '"' + bin  + '"';
			if (config !== undefined) cmd += ' -c ' + config;
			cmd += ' -d ' + destination + ' ' + sources.join(' ');
			grunt.log.debug(cmd);
			return cmd;
		};

		/**
		 * Lookup for the jsdoc executable throught the different configurations
		 * @todo find a more elegant way to do that... 
		 * @memberOf module:tasks/jsdoc-plugin.registerJsdocTask
		 * @returns {String} the command path relative to the project root 
		 */
		var jsDocLookup = function(){
			
			var base = 'node_modules/jsdoc/jsdoc',
				paths = [ base, 'node_modules/grunt-jsdoc-plugin/' + base ],
				nodePath = process.env.NODE_PATH || '',
				_ = grunt.utils._;

			_.map(nodePath.split(':'), function(p){
				if(!/\/$/.test(p)){
					p += '/';
				}
				paths.push(p + base);
			});
		
			for(var i in paths){
				grunt.log.debug('look up jsdoc at ' + paths[i]);
				if(fs.existsSync(paths[i])){
					return paths[i];
				}
			}
		};
		jsDoc = jsDocLookup();
		
		//check if java is set
		if(!javaHome){
			grunt.log.error("JAVA_HOME is no set, but java is required by jsdoc to run.");
			grunt.fail.warn('Wrong installation/environnement', errorCode.generic);
		} else {
			grunt.log.debug("JAVA_HOME : " + javaHome);
		}

		//check if jsdoc npm module is installedz
		if(jsDoc === undefined){
			grunt.log.error('Unable to locate jsdoc');
			grunt.fail.warn('Wrong installation/environnement', errorCode.generic);
		}

		//check if there is sources to generate the doc for
		if(srcs.length === 0){
			grunt.log.error('No source files defined');
			grunt.fail.warn('Wrong configuration', errorCode.generic);
		}

		//check if jsdoc config file path is provided and does exist
		if (config !== undefined && !fs.existsSync(config)){
			grunt.log.error('jsdoc config file path does not exist');
			grunt.fail.warn('Wrong configuration', errorCode.generic);
		}

		fs.exists(dest, function(exists){
			//if the destination don't exists, we create it
			if(!exists){
				grunt.file.mkdir(dest);
			}

			//execution of the jsdoc command
			exec(buildCmd(jsDoc, srcs, dest, config), {timeout: timeout},  function (error, stdout, stderr) {
				grunt.log.debug('stdout: ' + stdout);
				grunt.log.debug('stderr: ' + stderr);
				if (error) {
					grunt.log.error('jsdoc error: ' + error);
					grunt.fail.warn('jsdoc failure', errorCode.task);
				}
				grunt.log.write('Documentation generated to : '+ dest);	
				
				done(true);
			});
		});
	}

	//bind the task to the grunt context
	grunt.registerMultiTask('jsdoc', 'Generates source documentation using jsdoc', registerJsdocTask);
};
