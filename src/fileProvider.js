const fs = require('fs');
const shared = require('./shared');
const path = require('path');

function addFolder(folderName) {
    const folderPath = path.join(shared.workspacePath, folderName);
    const folders = fs.readdirSync(shared.workspacePath, 'utf-8');

    for (let i = 0; i < folders.length; i++) {
        if (folders[i] == '.vscode') {
            return;
        }
    }
    fs.mkdirSync(folderPath);
}

function addTasks() {
    try {
        const xmlFileName = path.basename(shared.tasksPath);
        const destinationPath = path.join(shared.workspacePath, '.vscode', xmlFileName);

        // Read the content of the file
        const fileContent = fs.readFileSync(shared.tasksPath, 'utf-8');

        // Write the content to the workspace directory
        fs.writeFileSync(destinationPath, fileContent, 'utf-8');

        console.log('tasks.json added to workspace.');
        return true;
    }
    catch (err) {
        console.error('Error adding tasks.json to workspace:', err);
        return false;
    }
}

function addLaunch() {
    try {
        const fileName = path.basename(shared.launchPath);
        const destinationPath = path.join(shared.workspacePath, '.vscode', fileName);

        // Read the content of the file
        const fileContent = fs.readFileSync(shared.launchPath, 'utf-8');

        // Write the content to the workspace directory
        fs.writeFileSync(destinationPath, fileContent, 'utf-8');

        console.log('launch.json added to workspace.');
        return true;
    }
    catch (err) {
        console.error('Error adding launch.json to workspace:', err);
        return false;
    }
}

function addRuleset() {
    try {
        const fileName = path.basename(shared.rulesetPath);
        const destinationPath = path.join(shared.workspacePath, '.vscode', fileName);

        // Read the content of the file
        const fileContent = fs.readFileSync(shared.rulesetPath, 'utf-8');

        // Write the content to the workspace directory
        fs.writeFileSync(destinationPath, fileContent, 'utf-8');

        console.log('ruleset.xml added to workspace.');
        return destinationPath;
    }
    catch (err) {
        console.error('Error adding ruleset.xml to workspace:', err);
        return null;
    }
}

module.exports = {
    addTasks,
    addLaunch,
    addRuleset,
    addFolder
}