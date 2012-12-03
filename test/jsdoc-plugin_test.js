/**
 * Requires grunt
 */
var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

/**
 * EXported tests
 * @class tests
 */
exports['jsdoc-plugin'] = {
	setUp: function(done) {
		grunt.loadNpmTasks('jsdoc');
		done();
	},
	'helper': function(test) {
		test.expect(1);
		test.equal(grunt.helper('jsdoc'), 'Running jsdoc-toolkit', 'should return the correct value.');
		test.done();
	},
	'task' : function(test){
		test.expect(1);
		grunt.npmTasks('jsdoc');
		test.ok(true);
		test.done();
	}
};
