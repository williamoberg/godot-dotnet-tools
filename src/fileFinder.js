const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function findCsprojFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    // Look for csproj file in workspace folders
    for (const folder of workspaceFolders) {
        const csprojFile = findFileWithExtension(folder.uri.fsPath, '.csproj');
        if (csprojFile) {
            return csprojFile;
        }
    }
    console.log('No ".csproj" file found in the current workspace.');
    return null;
}

function findFile(fileName) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    // Look for file in workspace folders
    for (const folder of workspaceFolders) {
        const tasksFile = findFilePath(folder.uri.fsPath, fileName);
        if (tasksFile) {
            return true;
        }
    }
    return false;
}

function findFilePath(rootPath, fileName) {
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
            } else if (path.basename(name) === fileName) {
                // Return true if file is found
                return filePath;
            }
        }
        // Return null if no matching file is found
        return false;
    }
    return walkSync(rootPath);
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

function findExecutable(path) {
    return fs.existsSync(path);
}

module.exports = {
    findCsprojFile,
    findFile,
    findExecutable
}