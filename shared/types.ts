import firebase from "firebase";

export type MemoryCategory =
  | "photography_and_nature"
  | "young_sean"
  | "playful_sean"
  | "other"
  | "stories";

export interface Memory {
  description: string;
  category: MemoryCategory;
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
