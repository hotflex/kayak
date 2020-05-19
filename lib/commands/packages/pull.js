const CommandManager = require("../../CommandManager")

const getPackage = require("./_pull/getPackage")
const getDirectories = require("./_pull/getDirectories")
const dependencyLoop = require("./_pull/dependencyLoop")

/**
 * @todo readd the loading bar
 * @todo fix the operation not permitted errors
 * @todo delete temp directories
 */

CommandManager.registerCommand(
	"pull",
	{
		description: "Pulls all dependencies from rotriever.toml",
	},
	(_) => {
		const cd = process.cwd()

		/**
		 * Fetches the package
		 * If 'package' is equal to false, then a warn/err will be outputted in the
		 * console via the log module.
		 */
		const package = getPackage(cd)
		if (!package) return false

		/**
		 * Returns the dependency root and package index directories
		 * Also ensures that the index and dependency root directories exist
		 */
		const { dependencyRoot, index } = getDirectories(cd, package)

		dependencyLoop(cd, package, dependencyRoot, index)
	}
)
