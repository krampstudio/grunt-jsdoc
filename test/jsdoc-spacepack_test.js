var testCase = require('./task');
var package = require('../package.json');
testCase.setUp = function(done){
    this.destination = 'doc/pack age/' + package.name + '/' + package.version;
    this.expectedFiles = [
        'index.html',
        'jsdoc-plugin.js.html',
        'module-tasks_jsdoc-plugin.html',
        'lib_exec.js.html',
        'module-exec.html'
    ];
    done();
};

exports.JsDocSpacepackTest = testCase;
