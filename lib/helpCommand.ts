import { log } from "./log";

export default function helpCommand() {
	console.log(`\nUsage: kayak <command>

kayak version               displays the kayak version number
kayak dependencies          displays a list of dependencies in the current package`);
}
