/**
 * @fileoverview This task helps you to run jsdoc3 to generate doc in your Grunt build sequence
 * @module tasks/jsdoc
 *
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 */

/**
 * Register the jsdoc task and helpers to Grunt
 * @function jsDocTask
 * @requires jsdoc
 *
 * @param {Object} grunt - the grunt context
 *
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
     * @function registerJsdocTask
     */
	grunt.registerMultiTask('jsdoc', 'Generates source documentation using jsdoc', function registerJsdocTask() {
		
		//grunt.log.write(" src:  " + grunt.config.get('file'));
		//grunt.log.write("Helper : " + grunt.helper('jsdoc'));
		
		var exec		= require('child_process').exec,
		    fs			= require('fs'),
		    done		= this.async(),
			srcs		= grunt.file.expandFiles(grunt.task.current.file.src),
		    dest		= grunt.task.current.file.dest || 'doc',
			jsdocBin	= 'node_modules/jsdoc/jsdoc';


		/**
		 * Build the jsdoc to execute.
		 * @function buildCmd
		 * @param {Array} sources
		 * @param {String} destination
		 * @return {String} command
		 */
		var buildCmd = function(sources, destination){
			var cmd= jsdocBin 
					+ ' -r '					//recursive by default 
					+ ' -d ' + destination 		//set the output destination
					+ ' ' + sources.join(' ');	//list the sources to parse

			grunt.log.debug(cmd);
			
			return cmd;
		};

		//check if jsdoc npm module is installed
	//	if(require('node_modules/jsdoc/jsdoc') === undefined){
	//		grunt.log.error('jsdoc module is not found, please install dependencies');
	//		grunt.fail.warn('Missing dependency', errorCode.generic);
	//	}

		//check if there is sources to generate the doc for
		if(srcs.length === 0){
			grunt.log.error('No source files defined');
			grunt.fail.warn('Wrong configuration', errorCode.generic);
		}
		
		fs.exists(dest, function(exists){
			//if the destination don't exists, we create it
			if(!exists){
				grunt.file.mkdir(dest);
			}

			//execution of the jsdoc command
			exec(buildCmd(srcs, dest), function (error, stdout, stderr) {
				grunt.log.debug('stdout: ' + stdout + '\n');
				grunt.log.debug('stderr: ' + stderr + '\n');
				if (error) {
					grunt.log.error('jsdoc error: ' + error);
					grunt.fail.warn('jsdoc failure', errorCode.task);
				}
				grunt.log.write('Documentation generated to '+ dest);	
				
				done(true);
			});
		});
	});
};
