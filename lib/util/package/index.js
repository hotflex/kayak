const path = require('path')
const fs = require('fs')
const toml = require('@iarna/toml')

const log = require('../../log')
const validatePackage = require('./validatePackage')
const migratePackage = require('./migratePackage')

const read = (filePath, isRotriever) => {
  let data = null
  try {
    data = toml.parse(fs.readFileSync(filePath).toString())
  } catch (err) {
    log.error(`Package unreadable due to an error:\n  ${err}\nThis is not an error with Kayak. There is likely additional information above.`)
    return false
  }

  if (isRotriever) {
    data = migratePackage(data)
  }

  const err = validatePackage(data)
  if (err !== true) {
    log.error(`Package \`${filePath}\` is not valid: ${err}`)
    return false
  }

  return data
}

module.exports = {
  getPackageFromDirectory: dir => {
    const kayakPath = path.join(dir, 'kayak.toml')
    const rotrieverPath = path.join(dir, 'rotriever.toml')

    if (fs.existsSync(kayakPath)) {
      return read(kayakPath, false)
    } else if (fs.existsSync(rotrieverPath)) {
      return read(rotrieverPath, true)
    } else {
      log.error(`Directory \`${dir}\` does not have a package file`)
      return false
    }
  }
}
