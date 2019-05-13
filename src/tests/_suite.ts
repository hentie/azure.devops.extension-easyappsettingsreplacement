import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('EasyAppSettingsReplacement tests', function () {

    before( function() {

    });

    after(() => {

    });

    itShouldSucceed("with one valid key-value", "success0.js");
    itShouldSucceed("with multiple valid key-values", "success1.js");
    itShouldSucceed("when a value contains '='", "success2.js");
    itShouldSucceed("when a value is empty", "success3.js");
    itShouldSucceed("when replacementinput contains empty lines", "success4.js");
    
    itShouldFail("if a key-value is key1:value1", 'failure.js');


});

function itShouldSucceed(description: string, scriptfile: string) {
    it('should succeed ' + description, function (done: MochaDone) {
        this.timeout(1000);

        let tp = path.join(__dirname, scriptfile);
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        done();
    });
}

function itShouldFail(description:string, scriptfile:string) {
    it('it should fail ' + description, function (done: MochaDone) {
        this.timeout(1000);

        let tp = path.join(__dirname, scriptfile);
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, false, 'should have failed');
        assert.equal(tr.warningIssues, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
        assert.equal(tr.errorIssues[0].startsWith("Invalid replacements input"), true, 'error issue output');

        done();
    });
}