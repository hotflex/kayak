const chalk = require("chalk")

const prefix = chalk.bold.blue("kayak") + " "

const logLevels = {
	verbose: 0,
	notice: 1,
	success: 2,
	warn: 3,
	error: 4,
}

let level = logLevels.notice

module.exports = {
	setLevel: (newLevel) => {
		level = newLevel
	},

	levels: logLevels,

	verbose: (message) => {
		if (level <= logLevels.verbose) console.log(prefix + chalk.magenta("verbose"), message)
	},

	notice: (message) => {
		if (level <= logLevels.notice) console.log(prefix + chalk.blue("notice"), message)
	},

	success: (message) => {
		if (level <= logLevels.success) console.log(prefix + chalk.greenBright("success"), message)
	},

	warn: (message) => {
		if (level <= logLevels.warn) console.warn(prefix + chalk.yellow("WARN"), message)
	},

	error: (message) => {
		if (level <= logLevels.warn) console.error(prefix + chalk.red("ERR!"), message)
	},
}
