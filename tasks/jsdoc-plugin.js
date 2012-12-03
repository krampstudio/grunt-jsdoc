/**
 * @class exports
 * grunt-jsdoc-plugin
 * https://github.com/krampstudio/grunt-jsdoc-plugin
 *
 * Copyright (c) 2012 Bertrand Chevrier
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
	'use strict';

	var util = require('util');

	grunt.registerMultiTask('jsdoc', 'Generates source documentation using jsdoc', function() {
		
		//grunt.log.write(" src:  " + grunt.config.get('file'));
		//grunt.log.write("Helper : " + grunt.helper('jsdoc'));
		
		var exec	= require('child_process').exec,
		    fs		= require('fs'),
		    done	= this.async(),
		    srcFiles	= grunt.file.expandFiles(grunt.task.current.file.src),
		    dest	= grunt.task.current.file.dest || 'doc';

		if(srcFiles.length === 0){
			grunt.log.error('No source files defined');
			grunt.fail.warn('Wrong configuration', 50);
		}
		


		fs.exists(dest, function(exists)){
			if(!exists){
				grunt.file.mkdir(dest);
			}
	


			//./node_modules/jsdoc/jsdoc -r -d tmp/ ../removablearea/src
			exec("node_modules/jsdoc/jsdoc -h", function (error, stdout, stderr) {
				grunt.log.debug('stdout: ' + stdout + '\n');
				grunt.log.debug('stderr: ' + stderr + '\n');
				if (error) {
					grunt.log.error('jsdoc error: ' + error);
				}
				
				done(true);
			});
		});
	});

  grunt.registerHelper('jsdoc', function() {
    return 'Running jsdoc-toolkit';
  });

};
