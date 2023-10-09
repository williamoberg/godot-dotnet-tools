const vscode = require('vscode');
const fs = require('fs');
const shared = require('./shared');
const path = require('path');

const propertyName = "CodeAnalysisRuleSet"

function updateCsproj() {
    const csprojFile = findCsprojFile();

    if (csprojFile == null) {
        console.error('No .csproj file found.')
        return;
    }

    try {
        // Read the content of the .csproj file as a string
        let xmlContent = fs.readFileSync(csprojFile, 'utf-8');

        // Find the TargetFramework line
        const targetFrameworkRegex = /<TargetFramework>.*<\/TargetFramework>/;
        const match = xmlContent.match(targetFrameworkRegex);

        if (match) {
            // Duplicate the entire TargetFramework line
            const duplicatedLine = match[0];

            // Replace the new property in the duplicated line
            const newPropertyLine = `    <${propertyName}>${shared.rulesetPath}</${propertyName}>`;
            const updatedLine = duplicatedLine.replace(/<\/TargetFramework>/, `</TargetFramework>\n${newPropertyLine}`);

            // Replace the original TargetFramework line with the updated line
            xmlContent = xmlContent.replace(targetFrameworkRegex, updatedLine);
        } else {
            console.error('Error: TargetFramework line not found in .csproj file.');
            return;
        }

        // Write the updated XML back to the file
        fs.writeFileSync(csprojFile, xmlContent, 'utf-8');
        console.log(`Added line to ${csprojFile}`);
    } catch (err) {
        console.error('Error updating .csproj file:', err);
    }
}

function findCsprojFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace opened.');
        return;
    }

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
    updateCsproj,
}