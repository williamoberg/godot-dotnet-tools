const fs = require('fs');
const shared = require('./shared');
const path = require('path');

function addTasks() {
    try {
        const xmlFileName = path.basename(shared.tasksPath);
        const destinationPath = path.join(shared.workspacePath, '.vscode', xmlFileName);

        // Read the content of the XML file
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

        // Read the content of the XML file
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

        // Read the content of the XML file
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
    addRuleset
}