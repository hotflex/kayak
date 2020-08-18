import * as fs from "fs";
import * as path from "path";
import * as toml from "@iarna/toml";
import { log } from "../log";

import { IRotriever } from "../IRotriever";

/**
 * Returns a rotriever.toml file's contents
 * @param {string} dir The directory to check for @default process.cwd()
 * @returns {IRotriever|Boolean} rotriever|false (if error)
 */
function readPackage(dir: string = process.cwd()): IRotriever | false {
	const rotriever = path.join(dir, "rotriever.toml");

	if (fs.existsSync(rotriever)) {
		try {
			//@ts-ignore // this sucks but y'know, i'm a ts beginner
			const data: IRotriever = toml.parse(fs.readFileSync(rotriever).toString());
			return data;
		} catch (err) {
			log.error(`Could not parse file \`${rotriever}\`: \`${err}\``);
			return false;
		}
	} else {
		log.error(`Working directory does not have a \`rotriever.toml\` file`);
		return false;
	}
}

export { readPackage };
