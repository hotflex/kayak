import { log } from "./log";

import { readPackage } from "./util/readPackage";
import { parsePackage } from "./util/parsePackage";

function DependenciesCommand() {
	const rotriever = readPackage();
	if (typeof rotriever == "boolean") return false;

	const pack = parsePackage(rotriever);

	if (pack.dependencies) {
		log.success(`Package "${pack.package.name}"'s dependencies:'`);
		for (let d in pack.dependencies) {
			const dependency = pack.dependencies[d];
			if (typeof dependency == "string") {
				log.notice(`[${d}] Repo: ${dependency}`);
			} else if (typeof dependency.git == "string" && typeof dependency.rev === "string") {
				log.notice(`[${d}] Repo: ${dependency.git}, Branch: ${dependency.rev}`);
			} else if (typeof dependency.git == "string") {
				log.notice(`[${d}] Repo: ${dependency.git}`);
			} else {
				log.warn(`Dependency "${d}" is not valid.`);
			}
		}
	} else {
		log.error(`Package "${pack.package.name}" has no dependencies`);
	}
}

export { DependenciesCommand };
