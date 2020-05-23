const { resolve } = require("path")
const { readdir } = require("fs").promises

async function* walk(dir) {
	const dirents = await readdir(dir, { withFileTypes: true })
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name)
		if (dirent.isDirectory()) {
			if (!dirent.name.startsWith("_")) yield* walk(res)
		} else {
			yield res
		}
	}
}

module.exports = walk
