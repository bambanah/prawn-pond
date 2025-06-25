import { CreatedMemory, Image, Memory } from "@/shared/types";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import router from "next/router";
import { toast } from "react-toastify";
import { v4, validate } from "uuid";
import { PAGE_SIZE } from "./constants";

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
if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

// Initialise services
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const storage = firebase.storage();

//
// --- Auth ---
//

/**
 * Get the currently signed in user.
 * @returns The current user details
 */
export const getCurrentUser = () => auth.currentUser;

/**
 * Check if the current user is signed in.
 * @returns True if authenticated
 */
export const isAuthenticated = () => auth.currentUser !== null;

/**
 * Authenticate user with firebas auth
 * @param authProvider The auth provider to use. Must be either "google" or "facebook".
 * @returns The authenticated user
 */
export const signInWithProvider = async (
	authProvider: "google" | "facebook"
) => {
	await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

	let provider:
		| firebase.auth.GoogleAuthProvider
		| firebase.auth.FacebookAuthProvider;

	if (authProvider === "google") {
		provider = new firebase.auth.GoogleAuthProvider();
	} else if (authProvider === "facebook") {
		provider = new firebase.auth.FacebookAuthProvider();
	} else {
		// Invalid auth provider provided
		return null;
	}

	return auth
		.signInWithPopup(provider)
		.then((userCredential) => {
			const { redirect } = router.query;

			if (auth !== null) {
				if (redirect && !Array.isArray(redirect)) {
					router.push(redirect);
				} else {
					router.push("/");
				}
			}

			return userCredential.user;
		})
		.catch((error: firebase.auth.Error) => {
			console.error(error.message);
			toast.error("Couldn't sign in.");
			return null;
		});
};

/**
 * Creates an account with a given email and password
 * @param email Email of user
 * @param password Password of user
 * @param displayName The name of the user
 * @returns The created user
 */
export const registerWithEmailAndPassword = async (
	email: string,
	password: string,
	displayName: string
) =>
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Set displayname on created user
			firebase
				.auth()
				.currentUser?.updateProfile({
					displayName,
				})
				.then(() => {
					router.push("/");
					return userCredential.user;
				});
		})
		.catch((error: firebase.auth.Error) => {
			if (["auth/email-already-in-use"].includes(error.code)) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occured. Please try again later.");
				console.error(error);
			}

			return null;
		});

/**
 *	Authenticates a user with an email and password
 * @param email Email of user
 * @param password Password of user
 * @returns The authenticated user
 */
export const signInWithEmailAndPassword = async (
	email: string,
	password: string
) =>
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			router.push("/");

			return userCredential.user;
		})
		.catch((error: firebase.auth.Error) => {
			toast.error("An unknown error occured. Please try again later.");
			console.error(error);

			return null;
		});

/**
 * Sign out of firebase
 */
export const signOut = async () => {
	auth.signOut().catch((error) => {
		console.error(error.message);
	});
};

/**
 * Sends a password reset email to a user
 * @param email The email to send the email to
 * @returns Bool if sent
 */
export const sendPasswordResetEmail = async (email: string) =>
	auth
		.sendPasswordResetEmail(email)
		.then(() => {
			toast.info("Password reset email sent");
			return true;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});

//
// --- Firestore ---
//

export const getInitialMemories = async () => {
	const query = firestore
		.collection("memories")
		.orderBy("created", "desc")
		.limit(PAGE_SIZE);

	return fetchQuery(query);
};

export const getNextMemories = async (last: firebase.firestore.Timestamp) => {
	const query = firestore
		.collection("memories")
		.orderBy("created", "desc")
		.startAfter(last)
		.limit(PAGE_SIZE);

	return fetchQuery(query);
};

const fetchQuery = async (
	query: firebase.firestore.Query<firebase.firestore.DocumentData>
) => {
	const data = await query.get();

	const memoryPromises: Promise<Memory>[] = data.docs.map(async (doc) => {
		const data = doc.data() as CreatedMemory;

		const memory: Memory = {
			id: doc.id,
			description: data.description,
			categories: data.categories,
			created: data.created,
			imageIds: data.images ?? [],
		};

		return memory;
	});

	const result = await Promise.all(memoryPromises);
	return result;
};

export const createMemory = async (memory: CreatedMemory) => {
	if (!auth.currentUser) return null;

	memory.created = firebase.firestore.Timestamp.now();
	memory.owner = auth.currentUser.uid;

	return firestore
		.collection("memories")
		.add(memory)
		.then(() => {
			toast.success("Memories uploaded");
			return true;
		})
		.catch((error) => {
			toast.error("Error saving memory");
			console.error("Error writing document:", error);

			return null;
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
export const getImageData = async (
	imageId: string,
	getPreview = false,
	includeMetadata = false
): Promise<Image | null> => {
	if (!validate(imageId)) return null;

	const imageRef = storage.ref().child(imageId);

	const promises = [];

	promises.push(imageRef.getDownloadURL());
	if (includeMetadata) promises.push(imageRef.getMetadata());
	if (getPreview)
		promises.push(storage.ref().child(`thumb@800_${imageId}`).getDownloadURL());

	return Promise.allSettled(promises)
		.then((values) => {
			if (values[0].status !== "fulfilled") return null;

			const image: Image = {
				src: values[0].value,
			};

			if (includeMetadata && values[1].status === "fulfilled")
				image.metadata = values[1].value;
			if (getPreview && values[2]?.status === "fulfilled")
				image.src = values[2].value;

			return image;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};
