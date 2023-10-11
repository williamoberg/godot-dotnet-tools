const vscode = require('vscode');
const csproj = require('./csproj');
const shared = require('./shared');
const fileProvider = require('./fileProvider');
const fileFinder = require('./fileFinder');

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
    if (generateTasksFile == true) {
        if (fileFinder.findFile('tasks.json')) {
            vscode.window
                .showInformationMessage("tasks.json file already exists in current workspace, would you like to replace it?" ,"Yes", "No")
                .then(answer => {
                    if (answer === "Yes") {
                        fileProvider.addTasks();
                    }
                })
        }
        else {
            fileProvider.addTasks();
        }
    }

    // Add launch file
    if (generateLaunchFile == true) {
        if (fileFinder.findFile('launch.json')) {
            vscode.window
                .showInformationMessage("launch.json file already exists in current workspace, would you like to replace it?", "Yes", "No")
                .then(answer => {
                    if (answer === "Yes") {
                        fileProvider.addLaunch();
                    }
                })
        }
        else {
            fileProvider.addLaunch();
        }
    }

    // Add ruleset & update csproj file
    if (generateRulesetFile == true) {
        if (fileFinder.findFile('ruleset.xml')) {
            vscode.window
                .showInformationMessage("ruleset.xml file already exists in current workspace, would you like to replace it?", "Yes", "No")
                .then(answer => {
                    if (answer === "Yes") {
                        csproj.update();
                    }
                })
        }
        else {
            csproj.update();
        }
    }

    // Success
    vscode.window.showInformationMessage('Project files generated.');
}

function unregisterCommands() {
    // Unregister commands
    subscription.dispose();
}

module.exports = {
    registerCommands,
    unregisterCommands
}