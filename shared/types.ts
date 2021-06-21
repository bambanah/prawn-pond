import firebase from "firebase";

export interface Memory {
	description: string;
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
