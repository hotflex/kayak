const fs = require('fs')
const path = require('path')
const toml = require('@iarna/toml')
const log = require('../log')

/**
 * Returns a rotriever.toml file's contents
 * @param {string} dir The directory to check for @default process.cwd()
 * @returns {IRotriever|Boolean} rotriever|false (if error)
 */
function readPackage (dir = process.cwd()) {
  const rotriever = path.join(dir, 'rotriever.toml')

  if (fs.existsSync(rotriever)) {
    try {
      const data = toml.parse(fs.readFileSync(rotriever).toString())
      return data
    } catch (err) {
      log.error(`Could not parse file \`${rotriever}\`: \`${err}\``)
      return false
    }
  } else {
    log.error('Working directory does not have a `rotriever.toml` file')
    return false
  }
}

module.exports = readPackage
