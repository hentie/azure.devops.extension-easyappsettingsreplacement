import * as tl from 'azure-pipelines-task-lib/task';
import * as fs from 'fs';
import * as glob from 'glob';


let keyValuePairs: Array<[string, string]>;

async function run() {
    try {
        let filefilterString: string = tl.getInput('filefilterinput', false);
        if (filefilterString == null || filefilterString.trim() == '') {
            filefilterString = "**/*.config";
            console.log('No file filter was given, using default', filefilterString);
        }

        const replacementStrings: Array<string> = tl.getDelimitedInput('replacementinput', "\n", true);
        
        if (!isValidReplacementString(replacementStrings)) {
            tl.setResult(tl.TaskResult.Failed, 'Invalid replacements input.\nValid formats:\nkey1=123\n\'key2\'=\'123\'\n"key3"="123"\nkey4=""');
            return;
        }

        keyValuePairs = extractKeyValues(replacementStrings);
        glob(filefilterString, replaceAppSettingsInFiles);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function replaceAppSettingsInFiles(error: Error | null, files: string[]): void {

    console.log("Matched files for replacement:\n", files);

    for (let file of files) {
        console.log("Replacing AppSettings in", file);

        let content = fs.readFileSync(file).toString();

        for (let keyValuePair of keyValuePairs) {
            const appSettingFindRegex = new RegExp(`(<appSettings>[\\s\\S]*<add.*key="${keyValuePair[0]}".*value=")(.*)(".*/>[\\s\\S]*</appSettings>)`, "i");
            content = content.replace(appSettingFindRegex, `$1${keyValuePair[1]}$3`);
        }

        fs.writeFileSync(file, content);
    }
};

function extractKeyValues(input: Array<string>): Array<[string, string]> {
    const trimRegex = /^["']+|["']+$/g;
    const splitRegex = /=(.+)/;

    let keyValuePairs: Array<[string, string]> = [];

    for (let row of input) {
        if (row.trim() === "") //-- Skip empty lines
            continue;
        let keyRaw = row.split(splitRegex)[0];
        let valueRaw = row.split(splitRegex)[1];
        if (valueRaw == null)
            valueRaw = "";
        let key = keyRaw.replace(trimRegex, "");
        let value = valueRaw.replace(trimRegex, "");
        keyValuePairs.push([key, value]);
    }

    return keyValuePairs;
}

function isValidReplacementString(input:Array<string>): boolean {
    for (let row of input) {
        if (row.trim() === "") //-- skip empty lines
            continue;
        if (row.indexOf("=") < 1 && row.lastIndexOf("=") < 1) {
            return false;
        }
    }
    return true;
}

run();