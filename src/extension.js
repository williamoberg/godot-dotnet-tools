const commands = require('./commands');
const shared = require('./shared');

function activate(context) {
	shared.context = context;
	commands.registerCommands();
}

function deactivate() {
	commands.unregisterCommands();
}

module.exports = {
	activate,
	deactivate
}
