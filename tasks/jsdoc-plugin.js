/*
 * grunt-jsdoc-plugin
 * https://github.com/krampstudio/grunt-jsdoc-plugin
 *
 * Copyright (c) 2012 Bertrand Chevrier
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	'use strict';

	var util = require('util');

	grunt.registerMultiTask('jsdoc', 'Generate Javascript Doc ', function() {
		grunt.log.write("Helper : " + grunt.helper('jsdoc'));
		var exec	= require('child_process').exec,
			done	= this.async();

		grunt.log.write("\nData : " + util.inspect(grunt.task.current));
	
		//./node_modules/jsdoc/jsdoc -r -d tmp/ ../removablearea/src
		exec("node_modules/jsdoc/jsdoc -h", function (error, stdout, stderr) {
			grunt.log.write('stdout: ' + stdout + '\n');
			grunt.log.write('stderr: ' + stderr + '\n');
			if (error) {
				grunt.log.write('exec error: ' + error);
			}
		});
		grunt.log.write("\n" + process.cwd() + "\n");
	});

  grunt.registerHelper('jsdoc', function() {
    return 'Running jsdoc-toolkit';
  });

};
