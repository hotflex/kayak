const CommandManager = require("./CommandManager")
const log = require("./log")
const CommandLoader = require("./CommandLoader")

let commandsLoaded = false

async function kayak(args) {
	if (!commandsLoaded) {
		await CommandLoader()
	}

	let commandName = args.shift()
	if (commandName == undefined) {
		// Run the help command if a command name is not specified
		commandName = "help"
	}

	const command = CommandManager.getCommand(commandName)
	if (typeof command == "undefined") {
		log.error(
			`Command '${commandName}' does not exist. Run 'kayak help' for a list of available commands.`
		)
		return process.exit(43841)
	}

	try {
		command.callback(args)
	} catch (err) {
		log.error(`An error occurred while running command '${commandName}'.\n    ${err}`)
		throw err
	}
}

module.exports = kayak
