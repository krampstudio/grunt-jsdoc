module.exports = function(grunt) {

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
	}
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
