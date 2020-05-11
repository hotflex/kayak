const path = require("path")
const fs = require("fs")
const progress = require("progress")
const shell = require("shelljs")
const rimraf = require("rimraf")
const log = require("../../../log")

function sanitize(string) {
	if (typeof string == "string") {
		return string.replace(/['"]+/g, "")
	} else {
		return string
	}
}

function clone(repo, dir, branch) {
	if (branch) {
		return `git clone "${repo}" "${dir}" -b "${branch}" --single-branch -q`
	} else {
		return `git clone "${repo}" "${dir}" -q`
	}
}

module.exports = (data, dependencyRoot, index) => {
	const total = Object.keys(data.dependencies).length
	log.notice(`Pulling ${total} ${total == 1 ? "Dependency" : "Dependencies"}`)

	const bar = new progress("  downloading [:bar] :rate/s :percent :etas", { total })

	/**
	 * I'm not totally sure if it defaults to process.cwd or not, doesn't matter anyway.
	 * This makes the git commands easier; but doesn't change the user's cwd.
	 */
	shell.cd(dependencyRoot)

	/**
	 * For loops are controversial with ES6, but imo this is a really clear
	 * method
	 *
	 * This for loop contains the bulk of the code, so is split into
	 * two parts
	 *
	 * Part one: Basic setup and puling the dependency files
	 * Part two: Setting up package links, lockfile, etc. for this dependency
	 *
	 * I would split these parts into two different functions, but it seems
	 * easier to me for them both to be in one place; also means I don't have to
	 * waste time transferring variables
	 */
	for (d in data.dependencies) {
		////////////////
		/// PART ONE ///
		////////////////

		const dependency = data.dependencies[d]

		/**
		 * An observation I've made with Rotriever is that you 'can' specify
		 * a 'rev' that seems to be branch? idk. Could be to do with proxies,
		 * I honestly don't know, but it shouldn't really impact Rotriever packages
		 */
		const repo = typeof dependency == "string" ? dependency : dependency.git
		const branch = typeof dependency == "string" ? undefined : dependency.rev

		/**
		 * Continue is, again, controversial; but this is the simplest way of doing
		 * this.
		 *
		 * In case you don't know what continue does, it's basically a 'skip' command,
		 * it instructs JS to skip this dependency and continue to the next one.
		 */
		if (repo == undefined) {
			log.warn(`Dependency '${d}' is not valid.`)
			continue
		}

		/**
		 * Our technique here is to pull the full dependency in a temporary
		 * directory, and then to copy the files we care about into our final
		 * directory.
		 *
		 * @todo Maybe have a different 'temp' directory? It's possible
		 * (although unlikely) that temporary files could get included with Rojo
		 */
		const thisTemp = path.join(dependencyRoot, `.__${d}`)
		const thisFinal = path.join(index, d)

		/**
		 * We want people to be able to add their own packages, so instead of
		 * emptying the entire directory- we just remove the directories that we
		 * are going to use.
		 */
		rimraf.sync(thisFinal)
		rimraf.sync(thisTemp)

		/**
		 * Probably the most complex line in this function.
		 * This just runs a git clone command. sanitize removes "s to stop code
		 * injection.
		 */
		shell.exec(clone(sanitize(repo), sanitize(thisTemp), sanitize(branch)))

		////////////////
		/// PART TWO ///
		////////////////

		/**
		 * What this part of the function does is check for a rotriever.toml file
		 * (which contains metadata on how the package should be treated). We need
		 * to ensure it exists; if it doesn't, we can skip this dependency and
		 * remove the temporary directory.
		 */
		const rotrieverPath = path.join(thisTemp, "rotriever.toml")
		if (!fs.existsSync(rotrieverPath)) {
			log.warn(`Dependency "${d}" does not have a rotriever.toml file`)
			rimraf(thisTemp)
			continue
		}

		/**
		 * Read and parse the configuration (which we now know exists)
		 * We also grab some core variables (such as content_root) from the
		 * rotriever.toml here
		 *
		 * @todo further validate the rotriever.toml file to ensure things like name exist
		 */
		const rotriever = toml.parse(fs.readFileSync(rotrieverPath))
		let contentPath = rotriever.package.content_root || ""
		let content = path.join(thisTemp, contentPath)

		/**
		 * @todo Do some magic:tm:
		 * Add package links, lockfiles, pulling all dependencies, etc.
		 * Right now (since this is still in developmetn) we're only handling the
		 * game's dependencies, and putting them into the index.
		 *
		 * This function will probably end up getting rewritten.
		 */

		/**
		 * Move our content (excluding non-code) to the final directory
		 * and remove the temporary directory
		 */
		fs.renameSync(content, thisFinal)
		rimraf.sync(thisTemp)

		/**
		 * Update the progress bar
		 */
		bar.tick()
	}

	log.success(`Successfully pulled ${total} ${total == 1 ? "Dependency" : "Dependencies"}.`)
}
