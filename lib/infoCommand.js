const log = require('./log')

const { getPackageFromDirectory } = require('./util/package')

function InfoCommand () {
  const pack = getPackageFromDirectory(process.cwd())
  if (!pack) return false

  let info = `Package name: ${pack.package.name}`
  info += `\nPackage version: ${pack.package.version}`
  if (pack.package.author) info += `\nPackage author: ${pack.package.author}`
  if (pack.package.license) info += `\nPackage license: ${pack.package.license}`
  if (pack.package.type) info += `\nPackage type: ${pack.package.type}`

  if (pack.package.dependencies_root) info += `\nDependency root: ${pack.package.dependencies_root}`
  if (pack.package.content_root) info += `\nContent root: ${pack.package.content_root}`

  const dependencyCount = Object.keys(pack.dependencies).length
  if (dependencyCount > 0) {
    info += `\nDependencies (${dependencyCount} total):`

    for (const d in pack.dependencies) {
      const dependency = pack.dependencies[d]
      if (typeof dependency === 'string') {
        info += `\n- [${d}] Repo: ${dependency}`
      } else if (typeof dependency.git === 'string' && typeof dependency.rev === 'string') {
        info += `\n- [${d}] Repo: ${dependency.git}, Branch: ${dependency.rev}`
      } else if (typeof dependency.git === 'string') {
        info += `\n- [${d}] Repo: ${dependency.git}`
      } else {
        info += `\n!! Dependency \`${d}\` is not valid!`
      }
    }
  } else {
    info += '\nDependencies (0 total)'
  }

  log.success(info)
}

module.exports = InfoCommand
