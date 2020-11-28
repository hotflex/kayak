const VersionCommand = require('./version')
const DependenciesCommand = require('./dependencies')
const HelpCommand = require('./helpCommand')

const kayak = {}

kayak.commands = {
  version: VersionCommand,
  '-v': VersionCommand,
  dependencies: DependenciesCommand,
  help: HelpCommand
}

function cli (args) {
  const commandName = args.shift()
  if (typeof commandName === 'string' && kayak.commands[commandName]) {
    const command = kayak.commands[commandName]
    command(args)
  } else {
    HelpCommand()
  }
}

module.exports = cli
