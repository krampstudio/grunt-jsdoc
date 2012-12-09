module.exports = function(grunt) {
	'use strict';

  // Project configuration.
  grunt.initConfig({
	jsdoc : {
		dist : {
			src: ['tasks/*.js', 'test/*_test.js'],
			dest: 'doc'
		}
	},
	test : {
		files : ['test/*_test.js']
	},
	lint : {
		files : ['grunt.js', 'tasks/*.js', 'test/*.js']
	},
	jshint : {
		options: {
			node : true,
			smarttabs : true
		}
	}
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
