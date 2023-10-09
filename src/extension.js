const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "godot-dotnet-tools" is now active!');
}

function deactivate() {

}

module.exports = {
	activate,
	deactivate
}
