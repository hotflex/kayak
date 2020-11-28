/**
 * Parses a Rotriever file and 'fills in the gaps'
 * @param {IRotriever} rotriever A 'Rotriever'.toml object
 * @returns {IRotriever} The transformed Rotriever object
 */
function parsePackage (rotriever) {
  let type = rotriever.kayak && rotriever.kayak.type

  if (!type) type = rotriever.package.content_root ? 'package' : 'game'

  if (type === 'game' && rotriever.package.content_root) { throw new Error('Package unreadable: Type is fixed to game, but has content root') }
  if (type === 'package' && rotriever.package.dependencies_root) { throw new Error('Package unreadable: Type is fixed to package, but has dependencies root') }

  if (!rotriever.kayak) rotriever.kayak = { type }
  else rotriever.kayak.type = type

  return rotriever
}

module.exports = parsePackage
