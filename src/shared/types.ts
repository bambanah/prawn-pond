import firebase from "firebase";

export type MemoryCategory =
	| "photography_and_nature"
	| "young_sean"
	| "playful_sean"
	| "other"
	| "stories";

export type MemoryCategoryExtended =
	| "photography_and_nature"
	| "young_sean"
	| "playful_sean"
	| "other"
	| "stories"
	| "all";

type CategoryOption = { label: string; value: MemoryCategory };

export const categoryOptions: CategoryOption[] = [
	{
		label: "Sean's Photography and Nature",
		value: "photography_and_nature",
	},
	{
		label: "Young Sean",
		value: "young_sean",
	},
	{
		label: "Playful Sean",
		value: "playful_sean",
	},
	{
		label: "Stories",
		value: "stories",
	},
	{
		label: "Other",
		value: "other",
	},
];

export interface Memory {
	description: string;
	categories: MemoryCategory[];
	created?: firebase.firestore.Timestamp;
	images?: string[];
	owner?: string;
}

export interface MemoryImages {
	[id: string]: string[];
}

export interface MemoryObject {
	[id: string]: Memory;
}

export interface ImageMetadata {
	bucket: string;
	contentDisposition: string;
	contentEncoding: string;
	contentType: string;
	customMetadata: {
		filename: string;
	};
	fullPath: string;
	generation: string;
	md5Hash: string;
	name: string;
	size: number;
	type: string;
	timeCreated: string;
	updated: string;
}
