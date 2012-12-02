module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
		jsdoc : {
			doc: {
				src: ['src/*.js', 'test/*.js'],
				dest: 'tmp'
			}
		}
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'jsdoc');

};
