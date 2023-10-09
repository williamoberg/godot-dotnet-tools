const fs = require('fs');
const path = require('path');
const shared = require('./shared');

function addRuleset() {
    try {
        const xmlFileName = path.basename(shared.rulesetPath);
        const destinationPath = path.join(shared.workspacePath, '.vscode', xmlFileName);

        // Read the content of the XML file
        const xmlContent = fs.readFileSync(shared.rulesetPath, 'utf-8');

        // Write the content to the workspace directory
        fs.writeFileSync(destinationPath, xmlContent, 'utf-8');

        console.log(`Copied ${shared.rulesetPath} to ${destinationPath}`);
    }
    catch (err) {
        console.error('Error copying ruleset file to workspace:', err);
    }
}

module.exports = {
    addRuleset
}