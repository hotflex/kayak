const { version } = require('../package.json')

function VersionCommand () {
  console.log(version)
}

module.exports = VersionCommand
