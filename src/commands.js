const vscode = require('vscode');
const csproj = require('./csproj');
const ruleset = require('./ruleset');
const shared = require('./shared');

let subscription;

function init() {
    const comm = vscode.commands.registerCommand("godot.tools.generate", generateFiles);
    subscription = shared.context.subscriptions.push(comm);
}

function generateFiles() {
    // Update paths
    shared.updatePaths();
    // Add ruleset file
    ruleset.addRuleset();
    // Update csproj file
    csproj.updateCsproj();

    // Add tasks file
    // Add launch file

    vscode.window.showInformationMessage('Files Generated');
}

function dispose() {
    // does this work? I dont know...
    subscription.dispose();
}

module.exports = {
    init,
    dispose
}