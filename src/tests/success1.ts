import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('replacementinput', 'key1="value-has-changed"\r\nkey - from - build - variable="this-value-comes-from-pipeline-variable"\r\nkey - value - empty=value - has - changed\r\nkey -with-equal= value - has - changed=');

tmr.run();