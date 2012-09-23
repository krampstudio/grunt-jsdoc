/*
 * grunt-jsdoc-plugin
 * https://github.com/krampstudio/grunt-jsdoc-plugin
 *
 * Copyright (c) 2012 Bertrand Chevrier
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	'use strict';

	grunt.registerTask('jsdoc', 'Generate Javascript Doc ', function() {
		grunt.log.write(grunt.helper('jsdoc'));
		
		var exec	= require('child_process').exec,
			done	= this.async();
	
		exec("pwd", function (error, stdout, stderr) {
			grunt.log.write('stdout: ' + stdout);
			grunt.log.write('stderr: ' + stderr);
			if (error) {
				grunt.log.write('exec error: ' + error);
			}
		});
		grunt.log.write("\ntest");
	});

  grunt.registerHelper('jsdoc', function() {
    return 'Running jsdoc-toolkit';
  });

};
