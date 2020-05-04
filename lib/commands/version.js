const CommandManager = require("../CommandManager")
const log = require("../log")

CommandManager.registerCommand(
	"-v",
	{
		description: "Returns the version of turtle",
		hideInHelp: true,
	},
	(_) => {
		// Pull the version from the package.json
		const package = require("../../package.json")
		const version = package.version
		console.log(version)
	}
)
