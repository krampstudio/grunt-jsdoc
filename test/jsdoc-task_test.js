/**
 * @fileoverview NodeUnit test 
 * @copyright Bertrand Chevrier 2012
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 * 
 * @module test/jsdoc-task_test
 */


/**
 * NodeUnit group of test that check the result once the task has been launched
 * 
 * @see https://github.com/caolan/nodeunit/
 * 
 * @class JsdocTaskTest
 */
exports.JsdocTaskTest = {
	
	/**
	 * Set up context parameters
	 * @memberOf JsdocTaskTest
	 * @param {Function} done - to call once the setup is done.
	 */
	setUp: function(done) {
		'use strict';

		this.destination = 'doc';
        this.expectedFiles = ['index.html', 'task.html'];
		done();
	},

	/**
	 * Check the destination directory exists
	 * @memberOf JsdociTaskTest
	 * @param {Object} test - the node unit test context
	 */
	'destination check' : function(test){
		'use strict';	

        var fs = require('fs');
        
        test.expect(1);

        fs.exists(this.destination, function(result){
            test.ok(result === true, 'The documentation destination should exists');
            test.done();
        });
	}, 

};
