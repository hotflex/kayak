const fs = require("fs")
const path = require("path")
const toml = require("@iarna/toml")
const CommandManager = require("../../CommandManager")
const log = require("../../log")

CommandManager.registerCommand(
	"dependencies",
	{
		description: "Outputs dependencies of the working directory",
	},
	(_) => {
		const cd = process.cwd()
		const rotriever = path.join(cd, "rotriever.toml")

		if (fs.existsSync(rotriever)) {
			try {
				const data = toml.parse(fs.readFileSync(rotriever))
				if (!data.dependencies) {
					log.warn("No dependencies specified.")
				}

				for (d in data.dependencies) {
					const dependency = data.dependencies[d]
					if (typeof dependency == "string") {
						log.notice(`[${d}] Repo: ${dependency}`)
					} else if (dependency.rev) {
						log.notice(`[${d}] Repo: ${dependency.git}, Branch: ${dependency.rev}`)
					} else if (typeof dependency.git == "string") {
						log.notice(`[${d}] Repo: ${dependency.git}`)
					} else {
						log.warn(`Dependency '${d}' is not valid.`)
					}
				}
			} catch (err) {
				log.error(`Could not parse file. ${err}`)
			}
		} else {
			log.error("Working directory does not have a rotriever.toml file")
		}
	}
)
