const fs = require("fs")
const path = require("path")
const log = require("./log")
const walk = require("../helpers/walk")

const commandsDir = path.join(__dirname, ".", "commands")

/**
 * Reads through the 'commands' directory,
 * requiring any modules.
 *
 * It is up to the module itself to properly load and require the
 * command manager.
 */
module.exports = async () => {
	for await (const file of walk(commandsDir)) {
		try {
			require(file)
		} catch (err) {
			log.error(`Could not load command ${file}.\n    ${err}`)
		}
	}
}
