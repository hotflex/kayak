const fs = require("fs")
const path = require("path")
const toml = require("toml")
const CommandManager = require("../../CommandManager")
const log = require("../../log")

function assert(condition, err) {
	if (!condition) throw new Error(err)
}

CommandManager.registerCommand(
	"validate",
	{
		description: "Validates the working directory's rotriever.toml file",
	},
	(args) => {
		const cd = process.cwd()
		const rotriever = path.join(cd, "rotriever.toml")

		if (fs.existsSync(rotriever)) {
			try {
				const data = toml.parse(fs.readFileSync(rotriever))
				// Assertions
				assert(typeof data.package.author == "string", "Package Author is not a string")
				assert(typeof data.package.name == "string", "Package Name is not a string")
				assert(typeof data.package.version == "string", "Package Version is not a string")

				log.success("File exists and was successfully parsed!")

				if (args.includes("-o") || args.includes("-O")) {
					log.notice(`Package name: ${data.package.name}`)
					log.notice(`Package author: ${data.package.author}`)
					log.notice(`Package version: ${data.package.version}`)
					log.notice(`Package licence: ${data.package.license}`)

					if (data.package.content_root) {
						const conRoot = path.join(cd, data.package.content_root)
						log.notice(`Package content root: ${conRoot}`)
					}
					if (data.package.dependencies_root) {
						const depRoot = path.join(cd, data.package.dependencies_root)
						log.notice(`Package dependency root: ${depRoot}`)
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
