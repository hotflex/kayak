const CommandManager = require("../CommandManager")
const log = require("../log")

CommandManager.registerCommand(
	"help",
	{
		description: "Returns available commands",
	},
	(_) => {
		log.notice("Available commands:")
		CommandManager.getAllCommands().forEach((data, name) => {
			if (data.hideInHelp) {
				// This should skip to the next
				// item in the loop.
				return
			}
			log.notice(`឵        ${name}		${data.description ? data.description : ""}`)
		})
	}
)
