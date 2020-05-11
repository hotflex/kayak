const path = require("path")
const fs = require("fs")

module.exports = (cd, data) => {
	const dependencyRoot = data.package.dependencies_root
		? path.join(cd, "packages")
		: path.join(cd, data.package.dependencies_root)

	if (!fs.existsSync(dependencyRoot)) fs.mkdirSync(dependencyRoot)

	const index = path.join(dependencyRoot, "__index")
	if (!fs.existsSync(index)) fs.mkdirSync(index)

	return {
		dependencyRoot,
		index,
	}
}
