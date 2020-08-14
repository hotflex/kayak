import { log } from "./log";

import { readPackage } from "./util/readPackage";
import { parsePackage } from "./util/parsePackage";

function DependenciesCommand() {
	const rotriever = readPackage();
	if (typeof rotriever == "boolean") return false;

	const pack = parsePackage(rotriever);
}

export { DependenciesCommand };
