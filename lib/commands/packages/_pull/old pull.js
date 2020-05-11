const fs = require("fs")
const path = require("path")
const shell = require("shelljs")
const rimraf = require("rimraf")
const progress = require("progress")
const toml = require("toml")
const CommandManager = require("../../CommandManager")
const log = require("../../log")

function sanitize(string) {
	if (typeof string == "string") {
		return string.replace(/['"]+/g, "")
	} else {
		return string
	}
}

function empty(dirName, cd) {
	const dir = path.join(cd, dirName)
	rimraf.sync(dir)
}

function clone(repo, dir, branch) {
	if (branch) {
		return `git clone "${repo}" "${dir}" -b "${branch}" --single-branch -q`
	} else {
		return `git clone "${repo}" "${dir}" -q`
	}
}

console.warn("old pull.js was required.")

CommandManager.registerCommand(
	"oldpull",
	{
		description: "Pulls all dependencies from rotriever.toml",
	},
	(_) => {
		const cd = process.cwd()
		const rotriever = path.join(cd, "rotriever.toml")

		if (fs.existsSync(rotriever)) {
			try {
				const data = toml.parse(fs.readFileSync(rotriever))
				if (!data.dependencies) {
					return log.warn("No dependencies specified.")
				}

				let dependencyRoot = path.join(cd, "packages")
				if (data.package.dependencies_root) {
					dependencyRoot = path.join(cd, data.package.dependencies_root)
				}

				const index = path.join(dependencyRoot, "__index")
				if (!fs.existsSync(index)) fs.mkdirSync(index)

				/**
				 * @todo this is *really* messy and needs to be rewritten
				 * @todo maybe implement switch statements here and in a few other places
				 */

				/**
				 * Currently, this is pulling the repository; however, we also need to
				 * filter it down to *just* the bits we care about.
				 */

				const total = Object.keys(data.dependencies).length
				log.notice(`Pulling ${total} ${total == 1 ? "Dependency" : "Dependencies"}`)

				const bar = new progress("  downloading [:bar] :rate/s :percent :etas", { total })

				if (!fs.existsSync(dependencyRoot)) fs.mkdirSync(dependencyRoot)
				shell.cd(dependencyRoot)

				for (d in data.dependencies) {
					const dependency = data.dependencies[d]

					const repo = typeof dependency == "string" ? dependency : dependency.git
					const branch = typeof dependency == "string" ? undefined : dependency.rev

					if (repo == undefined) {
						log.warn(`Dependency '${d}' is not valid.`)
						continue
					}

					const thisTemp = path.join(dependencyRoot, `.${d}`)
					const thisFinal = path.join(index, d)

					if (fs.existsSync(thisFinal)) {
						rimraf.sync(thisFinal)
					}

					rimraf.sync(thisTemp)
					shell.exec(clone(sanitize(repo), thisTemp, sanitize(branch)))

					// Validation
					const confPath = path.join(thisTemp, "rotriever.toml")
					if (!fs.existsSync(confPath)) {
						log.warn(`Dependency ${d} does not have a rotriever.toml file`)
						rimraf(thisTemp)
						continue
					}

					// Pull the data
					const conf = toml.parse(fs.readFileSync(confPath))
					let contentRoot = conf.package.content_root
					if (!contentRoot) contentRoot = ""
					const contentPath = path.join(thisTemp, contentRoot)

					fs.renameSync(contentPath, thisFinal)
					rimraf.sync(thisTemp)

					bar.tick()
				}

				empty(".kayaktemp", dependencyRoot)

				log.success(`Successfully pulled ${total} ${total == 1 ? "Dependency" : "Dependencies"}.`)
			} catch (err) {
				log.error(`Could not parse file. ${err}`)
			}
		} else {
			log.error("Working directory does not have a rotriever.toml file")
		}
	}
)
