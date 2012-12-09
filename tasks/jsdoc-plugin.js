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
		    done		= this.async(),
			srcs		= grunt.file.expandFiles(grunt.task.current.file.src),
		    dest		= grunt.task.current.file.dest || 'doc',
			javaHome	= process.env.JAVA_HOME,
			jsdocBin	= 'node_modules/jsdoc/jsdoc',
			timeout		= 60000;


		/**
		 * Build the jsdoc to execute.
		 * @memberOf module:tasks/jsdoc-plugin.registerJsdocTask
		 * @param {Array} sources
		 * @param {String} destination
		 * @return {String} command
		 */
		var buildCmd = function(sources, destination){
			var cmd= jsdocBin 
					+ ' -d ' + destination 		//set the output destination
					+ ' ' + sources.join(' ');	//list the sources to parse

			grunt.log.debug(cmd);
			
			return cmd;
		};

		//check if java is set
		if(!javaHome){
			grunt.log.error("JAVA_HOME is no set, but java is required by jsdoc to run.");
		} else {
			grunt.log.debug("JAVA_HOME : " + javaHome);
		}

		//@todo check if jsdoc npm module is installed

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
			exec(buildCmd(srcs, dest), {timeout: timeout},  function (error, stdout, stderr) {
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
