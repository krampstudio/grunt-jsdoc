module.exports = function(grunt) {
	'use strict';

  // Project configuration.
  grunt.initConfig({
	clean : ['doc'],
    jsdoc : {
		dist: {
			src: ['tasks/**.js', 'tasks/lib/*.js'],
			options: {
				destination: 'doc'
			}
		}
	},
	nodeunit : {
		files : ['test/*_test.js']
	},
	jshint : {
		files : ['Gruntfile.js', 'tasks/*.js', 'tasks/lib/*.js', 'test/*.js'],
		options: {
			node : true,
			smarttabs : true
		}
	}
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

  grunt.registerTask('test', ['clean', 'jsdoc', 'nodeunit']);
};
