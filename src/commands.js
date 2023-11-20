const vscode = require('vscode');
const csproj = require('./csproj');
const shared = require('./shared');
const fileProvider = require('./fileProvider');
const fileFinder = require('./fileFinder');
const os = require('os');

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
    
    // Create .vscode folder if it does not exist
    fileProvider.addFolder(".vscode");

    // Get configuration settings
    const config = vscode.workspace.getConfiguration('godot-dotnet-tools');
    const tasksSetting = config.get('generateTasksFile', true);
    const launchSetting = config.get('generateLaunchFile', true);
    const rulesetSetting = config.get('generateRulesetFile', true);
    const executablePath = config.get('executablePath', "");

    // Add tasks file
    if (tasksSetting == true) {
        generateTasksFile();
    }

    // Add ruleset & update csproj file
    if (rulesetSetting == true) {
        generateRulesetFile();
    }

    // Add launch file
    if (launchSetting == true) {
        // Check settings for valid exec path
        if (!fileFinder.findExecutable(executablePath)) {
            vscode.window.showInformationMessage('Please select your Godot executable.');

            // Default home directory
            const homeDir = vscode.Uri.file(os.homedir());

            const dialogOptions = {
                canSelectFiles: true, // Allow selecting files
                canSelectFolders: false, // Do not allow selecting folders
                canSelectMany: false, // Allow selecting multiple files
                openLabel: 'Select', // Label for the open button
                title: 'Select Godot Executable File', // Title of the dialog
                filters: {
                    // Specify file filters if needed
                    'Executable': ['exe', 'bin', 'app', 'cmd', 'sh', 'command', ''],
                    'All files': ['*'],
                },
                defaultUri: homeDir, // Default folder to open
            };

            // Choose path to Godot executable
            vscode.window.showOpenDialog(dialogOptions)
                .then(uris => {
                    // Handle selected URIs
                    if (uris && uris.length > 0) {
                        const filePath = uris[0].fsPath;
                        config.update('executablePath', filePath, vscode.ConfigurationTarget.Global);
                        generateLaunchFile();
                    } else {
                        vscode.window.showWarningMessage('Select a valid path to your Godot executable, and try again.');
                    }
                });
        }
        else {
            generateLaunchFile();
        }
    }
}

function generateTasksFile() {
    if (fileFinder.findFile('tasks.json')) {
        vscode.window
            .showInformationMessage("tasks.json file already exists in current workspace, would you like to replace it?", "Yes", "No")
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

function generateRulesetFile() {
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

function generateLaunchFile() {
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

function unregisterCommands() {
    // Unregister commands
    subscription.dispose();
}

module.exports = {
    registerCommands,
    unregisterCommands
}