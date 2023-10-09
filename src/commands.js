const vscode = require('vscode');
const csproj = require('./csproj');
const shared = require('./shared');
const files = require('./files');

let subscription;

function registerCommands() {
    const comm = vscode.commands.registerCommand("godot-dotnet-tools.generate", generateFiles);
    subscription = shared.context.subscriptions.push(comm);
}

function generateFiles() {
    // Update paths
    if (shared.updatePaths() == false) {
        return;
    }
    // Get configuration settings
    const configuration = vscode.workspace.getConfiguration('godot-dotnet-tools');
    const generateTasksFile = configuration.get('generateTasksFile', true);
    const generateLaunchFile = configuration.get('generateLaunchFile', true);
    const generateRulesetFile = configuration.get('generateRulesetFile', true);

    // Add tasks file
    if (generateTasksFile == true) { files.addTasks(); }

    // Add launch file
    if (generateLaunchFile == true) { files.addLaunch(); }

    // Update csproj file
    if (generateRulesetFile == true) { csproj.update(); }

    vscode.window.showInformationMessage('Project files generated');
}

function dispose() {
    subscription.dispose();
}

module.exports = {
    registerCommands,
    dispose
}