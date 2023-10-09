const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const files = require('./files');

const propertyName = "CodeAnalysisRuleSet"

function update() {
    const csprojFile = findCsprojFile();

    if (csprojFile == null) {
        console.error('No .csproj file found.')
        return;
    }

    const rulesetPath = files.addRuleset();

    if (rulesetPath == null) {
        return;
    }

    try {
        // Read the content of the .csproj file as a string
        let xmlContent = fs.readFileSync(csprojFile, 'utf-8');

        // Find the check if ruleset already exists
        const codeAnalysisRegex = /<CodeAnalysisRuleSet>.*<\/CodeAnalysisRuleSet>/;
        const aMatch = xmlContent.match(codeAnalysisRegex);
        if (aMatch) {
            return;
        }

        // Find the TargetFramework line
        const targetFrameworkRegex = /<TargetFramework>.*<\/TargetFramework>/;
        const fMatch = xmlContent.match(targetFrameworkRegex);

        if (fMatch) {
            // Duplicate the entire TargetFramework line
            const duplicatedLine = fMatch[0];

            // Replace the new property in the duplicated line
            const newPropertyLine = `    <${propertyName}>${rulesetPath}</${propertyName}>`;
            const updatedLine = duplicatedLine.replace(/<\/TargetFramework>/, `</TargetFramework>\n${newPropertyLine}`);

            // Replace the original TargetFramework line with the updated line
            xmlContent = xmlContent.replace(targetFrameworkRegex, updatedLine);
        } else {
            console.error('Error: unexpected .csproj file formatting');
            return;
        }

        // Write the updated XML back to the file
        fs.writeFileSync(csprojFile, xmlContent, 'utf-8');
    }
    catch (err) {
        console.error('Error updating .csproj file:', err);
    }
}

function findCsprojFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

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
                const result = walkSync(filePath); // Recurse into subdirectories
                if (result) {
                    return result; // Return the result if found in subdirectory
                }
            } else if (path.extname(name) === extension) {
                return filePath; // Return the file path if it has the desired extension
            }
        }

        return null; // Return null if no matching file is found
    }

    return walkSync(rootPath);
}

module.exports = {
    update
}