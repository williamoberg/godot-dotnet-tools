const vscode = require('vscode');
const commands = require('./commands');
const shared = require('./shared');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	shared.context = context;
	commands.init();
}

function deactivate() {
	commands.dispose();
}

module.exports = {
	activate,
	deactivate
}