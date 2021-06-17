import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { toast } from "react-toastify";
import { Memory } from "@Shared/types";
import { v4 } from "uuid";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// If no firebase app is initialised, initialise the app
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

//
// --- Auth ---
//

export const getCurrentUser = () => auth.currentUser;

export const isAuthenticated = () => auth.currentUser !== null;

export const signIn = async () => {
	try {
		await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

		const provider = new firebase.auth.GoogleAuthProvider();
		return await auth.signInWithPopup(provider);
	} catch (err) {
		console.error(err.message);
		toast.error("Couldn't sign in.");
		return null;
	}
};

export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (err) {
		console.error(err.message);
	}
};

//
// --- Firestore ---
//

/**
 * Initialise a memory stream to auto-update the fetched memories when
 * a new one is created
 * @param observer A single object containing next and error callbacks.
 * @returns An unsubscribe function that can be called to cancel the snapshot listener.
 */
export const streamMemories = (observer: any) =>
	firestore
		.collection("memories")
		.orderBy("created", "desc")
		.onSnapshot(observer);

/**
 * Creates a memory in firestore.
 * @param memory The memory to create
 */
export const createMemory = async (memory: Memory) => {
	memory.created = firebase.firestore.Timestamp.now();

	firestore
		.collection("memories")
		.add(memory)
		.then(() => {
			if (location.hostname === "localhost") toast.success("[DEBUG] Created");
		})
		.catch((error) => {
			toast.error("Error");
			console.error("Error writing document: ", error);
		});
};

//
// --- Storage ---
//

/**
 * Uploads a file to firebase, replacing the filename with a UUID so that
 * it can be uniquely identified. Returns the new filename of the file
 * so that it can be stored elsewhere (like in a document).
 * @param file File object to upload
 * @returns File Id (uuid) string
 */
export const uploadFile = async (file: File): Promise<string> => {
	// Rename file with UUID
	const fileId = v4();

	// Add real file name as metadata
	const metadata: firebase.storage.UploadMetadata = {
		customMetadata: {
			filename: file.name,
		},
	};

	// Upload file to firebase
	const fileRef = storage.ref().child(fileId);
	await fileRef.put(file, metadata);

	// Return UUID of uploaded file to attach to document
	return fileId;
};

/**
 * Takes in an imageId and returns download URL
 * @param imageId UUID of image in storage
 * @returns Download URL
 */
export const getImageUrl = async (imageId: string): Promise<string | null> => {
	if (
		!imageId ||
		!imageId.match(
			/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
		)
	)
		return null;

	const imageRef = storage.ref().child(imageId);

	return imageRef
		.getDownloadURL()
		.then((url) => {
			if (typeof url === "string") return url;
			return null;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};
