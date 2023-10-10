const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const files = require('./files');

const propertyName = "CodeAnalysisRuleSet"

function update() {
    // Check for existing csproj file
    const csprojFile = findCsprojFile();
    if (csprojFile == null) {
        console.error('No .csproj file found.')
        return;
    }

    // Check for existing ruleset file
    const rulesetPath = files.addRuleset();
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

function findCsprojFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    // Look for csproj file in workspace folders
    for (const folder of workspaceFolders) {
        const csprojFile = findFileWithExtension(folder.uri.fsPath, '.csproj');
        if (csprojFile) {
            return csprojFile;
        }
    }
    vscode.window.showInformationMessage('No .csproj file found in the workspace.');
    return null;
}

function findFileWithExtension(rootPath, extension) {
    function walkSync(currentDirPath) {
        const files = fs.readdirSync(currentDirPath);

        for (const name of files) {
            const filePath = path.join(currentDirPath, name);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Recurse into subdirectories
                const result = walkSync(filePath); 
                if (result) {
                    // Return the result if found in subdirectory
                    return result; 
                }
            } else if (path.extname(name) === extension) {
                // Return the file path if it has the desired extension
                return filePath;
            }
        }
        // Return null if no matching file is found
        return null; 
    }
    return walkSync(rootPath);
}

module.exports = {
    update
}