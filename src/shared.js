const vscode = require('vscode');
const path = require('path');

let context;
let rulesetPath;
let tasksPath;
let launchPath;
let workspacePath;

function updatePaths() {
    rulesetPath = path.join(context.extensionPath, '/assets/ruleset.xml');
    tasksPath = path.join(context.extensionPath, '/assets/tasks.json');
    launchPath = path.join(context.extensionPath, '/assets/launch.json');

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        // Use the first workspace folder
        workspacePath = workspaceFolders[0].uri.fsPath;
        return true;
    }
    else {
        vscode.window.showErrorMessage('No workspace currently opened.');
        return false;
    }
}

module.exports = {
    updatePaths,
    get context() {
        return context;
    },
    set context(_context) {
        context = _context;
    },
    get rulesetPath() {
        return rulesetPath;
    },
    get tasksPath() {
        return tasksPath;
    },
    get launchPath() {
        return launchPath;
    },
    get workspacePath() {
        return workspacePath;
    }
}