var testCase = require('./jsdoc-task_test');
testCase.setUp = function(done){
    this.destination = 'doc/basic';
    done();
};

exports.JsDocBasicTest = testCase;
