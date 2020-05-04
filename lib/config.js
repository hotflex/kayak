// Proxy for configstore

const Configstore = require("configstore")
const package = "kayak@elliottlmz"

const defaultConfig = {}

const config = new Configstore(package, defaultConfig)

module.exports = config
