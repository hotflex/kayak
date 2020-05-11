const fs = require("fs")
const path = require("path")
const toml = require("toml")
const log = require("../../../log")

module.exports = (cd) => {
	const rotriever = path.join(cd, "rotriever.toml")

	if (fs.existsSync(rotriever)) {
		const data = toml.parse(fs.readFileSync(rotriever))
		if (!data.dependencies) {
			log.warn("No dependencies specified.")
			return false
		} else {
			return data
		}
	} else {
		log.error("Working directory does not have a rotriever.toml file")
		return false
	}
}
