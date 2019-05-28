import * as ma from 'azure-pipelines-task-lib/mock-answer';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import path from 'path';

let taskPath = path.join(__dirname, '', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('replacementinput', '"key123"="value123"\nkey2=\'test2\'');

tmr.run();