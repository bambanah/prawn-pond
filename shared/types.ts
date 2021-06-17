import firebase from "firebase";

export interface Memory {
	description: string;
	created?: firebase.firestore.Timestamp;
	images?: string[];
}

export interface MemoryObject {
	[id: string]: Memory;
}
