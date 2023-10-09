const vscode = require('vscode');
const path = require('path');

let context;
let rulesetPath;
let workspacePath;

function updatePaths() {
    rulesetPath = path.join(context.extensionPath, '/assets/ruleset.xml');

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        // Use the first workspace folder
        workspacePath = workspaceFolders[0].uri.fsPath;
        return true;
    }
    else {
        console.error('Error: No workspace folder found.');
        return false;
    }
}

module.exports = {
    updatePaths,
    get context() {
        return context
    },
    set context(_context) {
        context = _context;
    },
    get rulesetPath() {
        return rulesetPath
    },
    get workspacePath() {
        return workspacePath
    }
}