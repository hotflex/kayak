const rimraf = require("rimraf")
const CommandManager = require("../../CommandManager")

const getPackage = require("./_pull/getPackage")
const getDirectories = require("./_pull/getDirectories")
const loadDependencies = require("./_pull/loadDependencies")

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

		/**
		 * We have this so if the code execution stops, the index is cleared
		 * (removing temporary directories).
		 *
		 * This is just a temporary solution.
		 * @todo write a bit of code that'll erase the dependency root.
		 */
		process.on("beforeExit", () => {
			rimraf.sync(dependencyRoot)
		})

		/**
		 * The main function; pulls all the packages and sorts them out nicely.
		 * In the future, it'll probably have "sub functions" to further modularize
		 * the process.
		 *
		 * This doesn't return anything; it'll log any data through the progress
		 * and log modules.
		 */
		loadDependencies(package, dependencyRoot, index)
	}
)
