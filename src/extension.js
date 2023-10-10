const commands = require('./commands');
const shared = require('./shared');

function activate(context) {
	shared.context = context;
	commands.registerCommands();
}

function deactivate() {
	commands.dispose();
}

module.exports = {
	activate,
	deactivate
}
