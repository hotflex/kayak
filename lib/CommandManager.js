class CommandManager {
	/**
	 * Creates a new CommandManager
	 * @hideconstructor
	 */
	constructor() {
		/**
		 * Map containing all commands
		 * @type Map<string commandName: function commandExecutor>
		 * @private
		 */
		this._commands = new Map()
	}

	/**
	 * Registers a new command
	 * @param {string} name The name of the command
	 * @param {Object} options Various options (e.g. description)
	 * @param {function} callback The command executor
	 * @returns void
	 */
	registerCommand(name, options, callback) {
		if (this._commands.has(name.toLowerCase()))
			throw new Error(`Command '${name.toLowerCase()}' already exists.`)
		if (typeof name != "string") throw new Error("Command name must be string")
		if (typeof callback != "function") throw new Error("Command callback must be function")

		options.callback = callback
		this._commands.set(name.toLowerCase(), options)
	}

	/**
	 * Returns a command executor, if it exists
	 * @param {string} name The name of the command
	 * @returns function | undefined
	 */
	getCommand(name) {
		if (typeof name != "string") throw new Error("Command name must be string")
		return this._commands.get(name)
	}

	/**
	 * Returns all commands
	 */
	getAllCommands() {
		return this._commands
	}
}

const manager = new CommandManager()
module.exports = manager
