// `any` sucks, but this seems to be the best way to do this
let kayak: any = {};

import { log } from "./log";

import { VersionCommand } from "./version";
import { DependenciesCommand } from "./dependencies";
import HelpCommand from "./helpCommand";
import helpCommand from "./helpCommand";

kayak.commands = {
	version: VersionCommand,
	"-v": VersionCommand,
	dependencies: DependenciesCommand,
	help: HelpCommand,
};

function cli(args: Array<String>) {
	const commandName: String | undefined = args.shift();
	if (typeof commandName == "string" && kayak.commands[commandName]) {
		const command: Function = kayak.commands[commandName];
		command(args);
	} else {
		/**
		 * @todo just run 'help' similar to npm
		 */
		log.error(`Command \`${commandName}\` does not exist`);
	}
}

export { cli as kayak };