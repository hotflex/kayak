export interface IRotriever {
	readonly package: {
		name: string;
		author?: string;
		license?: string;
		version: string;

		dependencies_root?: string; // required for games with dependencies
		content_root?: string; // required for packages
	};
	readonly dependencies?: Object; // dependencies is too complex :-(
	kayak?: {
		// todo: options defined in a kayak object
		type: "game" | "package";
	};
}
