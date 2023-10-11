const fs = require('fs');
const fileProvider = require('./fileProvider');
const fileFinder = require('./fileFinder');
const vscode = require('vscode');

const propertyName = "CodeAnalysisRuleSet"

function update() {
    // Check for existing csproj file
    const csprojFile = fileFinder.findCsprojFile();
    if (csprojFile == null) {
        vscode.window.showErrorMessage('ruleset.xml was not added. No .csproj file found in current workspace.');
        return;
    }

    // Check for existing ruleset file
    const rulesetPath = fileProvider.addRuleset();
    if (rulesetPath == null) {
        return;
    }

    try {
        // Read the content of the .csproj file as a string
        let xmlContent = fs.readFileSync(csprojFile, 'utf-8');

        // Check if ruleset already exists
        const codeAnalysisRegex = /<CodeAnalysisRuleSet>.*<\/CodeAnalysisRuleSet>/;
        const aMatch = xmlContent.match(codeAnalysisRegex);
        if (aMatch) {
            return;
        }

        // Find the TargetFramework line
        const targetFrameworkRegex = /<TargetFramework>.*<\/TargetFramework>/;
        const fMatch = xmlContent.match(targetFrameworkRegex);

        if (fMatch) {
            // Duplicate line
            const duplicatedLine = fMatch[0];

            // Modify line
            const newPropertyLine = `    <${propertyName}>${rulesetPath}</${propertyName}>`;
            const updatedLine = duplicatedLine.replace(/<\/TargetFramework>/, `</TargetFramework>\n${newPropertyLine}`);

            // Replace the original TargetFramework line with the updated line
            xmlContent = xmlContent.replace(targetFrameworkRegex, updatedLine);
        } else {
            console.error('Error: unexpected .csproj file formatting');
            return;
        }

        // Write the updated content back to the file
        fs.writeFileSync(csprojFile, xmlContent, 'utf-8');
    }
    catch (err) {
        console.error('Error updating .csproj file:', err);
    }
}



module.exports = {
    update
}