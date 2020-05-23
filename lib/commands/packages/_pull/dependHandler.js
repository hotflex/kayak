const path = require("path")
const fs = require("fs")
const rimraf = require("rimraf")

const log = require("../../../log")

const createLink = require("./_link")

module.exports = (dependencyRoot, pullData, loop, isSubDependency) => {
	if (pullData == false) {
		return false
	}

	const {
		rotriever,
		packageName,
		specifiedName,
		final,
		content,
		commit,
		temp,
		repo,
		branch,
		finalContainer,
	} = pullData

	/**
	 * Create a package link
	 */
	const linkSource = createLink(packageName, specifiedName.toLowerCase(), isSubDependency)
	fs.writeFileSync(path.join(dependencyRoot, `${specifiedName}.lua`), linkSource)

	/**
	 * @todo handle dependencies of the package
	 */

	/**
	 * Move our content directory (which contains the lua code) to the final
	 * directory, and removing the temporary directory
	 * @todo filter out .spec.lua files (or have an option for it?)
	 */
	try {
		fs.renameSync(content, final)
	} catch (err) {
		log.error(`Could not move package \`${specifiedName}\`: ${err}`)
	}

	/**
	 * not sure why this won't work.. it's really annoying and basically the
	 * equivalent of putting a wait() in lua
	 *
	 * if you know how to fix this, please tell me
	 *
	 * @todo at the end of the command, remove any directory with '.__' at the start
	 */
	setTimeout(() => {
		rimraf.sync(temp)
	}, 100)

	let lock = {
		name: rotriever.package.name,
		version: rotriever.package.version,
		source: `git+${repo}${branch ? "#" + branch : ""}`,
		commit: commit,
	}

	/**
	 * @todo setup dependencies
	 * dependency format:
	 * 		key name commit url(#branch)
	 */
	if (rotriever.dependencies) {
		lock.dependencies = {}

		for (childD in rotriever.dependencies) {
			loop(childD, rotriever.dependencies[childD], finalContainer, true)
		}
	}

	return lock
}
