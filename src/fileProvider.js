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

function modifyLaunchFile(path) {
    try {
        // Read the JSON file
        const fileRead = fs.readFileSync(shared.launchPath, 'utf-8');
        const launchFile = JSON.parse(fileRead);

        // Update the program paths in the configurations array
        if (launchFile && launchFile.configurations && launchFile.configurations.length >= 2) {
            launchFile.configurations[0].program = path;
            launchFile.configurations[1].program = path;

            // Write the updated JSON string back to the file
            fs.writeFileSync(shared.launchPath, JSON.stringify(launchFile, null, 2));

            console.log('JSON file updated successfully.');
        } else {
            console.error('Invalid JSON file format or missing configurations.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    addTasks,
    addLaunch,
    addRuleset,
    addFolder,
    modifyLaunchFile
}