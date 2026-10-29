import { Timestamp } from "firebase/firestore";
import { FullMetadata } from "firebase/storage";

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
		label: "Photography and Nature",
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

export interface CreatedMemory {
	description: string;
	categories: MemoryCategory[];
	images?: string[];
	created?: Timestamp;
	owner?: string;
}

export interface Memory {
	description: string;
	categories: MemoryCategory[];
	imageIds: string[];
	id?: string;
	created?: Timestamp;
	owner?: string;
}

export interface Image {
	src: string;
	metadata?: FullMetadata;
	width?: number;
	height?: number;
}

export interface MemoryImages {
	[id: string]: string[];
}

export interface MemoryObject {
	[id: string]: Memory;
}
