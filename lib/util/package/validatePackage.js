// Validates and parses packages

const { join } = require('path')

module.exports = (pack) => {
  if (typeof pack.package.name !== 'string') return 'package.name is not a string'

  if (pack.package.type !== 'game' && pack.package.type !== 'library') return 'package.type is not one of `game`, `library`'

  // TODO: Validate with semver
  if (typeof pack.package.version !== 'string') return 'package.version is not a string'

  // TODO: Validate the actual paths
  if (pack.package.type === 'game' && typeof pack.package.dependencies_root !== 'string') return 'package is `game` but does not have a dependency root'
  if (pack.package.type === 'library' && typeof pack.package.content_root !== 'string') return 'package is `library` but does not have a content root'

  // Parse and update some stuff
  if (pack.package.dependencies_root) pack.package.dependencies_root = join(process.cwd(), pack.package.dependencies_root)
  if (pack.package.content_root) pack.package.content_root = join(process.cwd(), pack.package.content_root)

  return true

  // TODO: Add some more validation for things like dependencies' format
}
