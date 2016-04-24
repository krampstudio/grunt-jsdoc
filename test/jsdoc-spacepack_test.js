var testCase = require('./task');
var pkg = require('../package.json');
testCase.setUp = function(done){
    this.destination = 'doc/pack age/' + pkg.name + '/' + pkg.version;
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
