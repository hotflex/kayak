const prompt = require("prompt")

const CommandManager = require("../CommandManager")
const log = require("../log")
const config = require("../config")

const properties = [
	{
		name: "choice",
		description: "Continue? [y/N]",
	},
]

function onError(err) {
	if (err.message == "canceled") {
		log.notice("Aborted")
	} else {
		throw err
	}
}

CommandManager.registerCommand(
	"scram",
	{
		description: "Clears the configuration",
	},
	() => {
		log.notice("This command will wipe your kayak configuration.")
		log.notice(
			"This is an irreversible factory reset - make sure you have backed up your settings."
		)

		prompt.start()

		prompt.get(properties, (err, result) => {
			if (err) return onError(err)
			const choice = result.choice || ""
			if (choice.toLowerCase() == "y") {
				config.clear()
				log.notice("Configuration was reset.")
			} else {
				log.notice("Aborted")
			}
		})
	}
)
