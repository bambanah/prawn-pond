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
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
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

export const streamMemories = (observer: any) =>
  firestore
    .collection("memories")
    .orderBy("created", "desc")
    .onSnapshot(observer);

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

// Storage helper functions go here

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
      filename: file.name
    }
  };

  // Upload file to firebase
  const fileRef = storage.ref().child(fileId);
  await fileRef.put(file, metadata);

  // Return UUID of uploaded file to attach to document
  return fileId;
};

/**
 * Gets a downloaded file URL from firebase, given a file ID. This will be the UUID
 * of the file that was assigned when it was created aka the file name.
 * @param fileId UUID associated with file - this is actually the name of the file
 * @returns A URL that can be used to either download the file, or placed inside a src prop for display
 */
export const getFileUrl = async (fileId: string): Promise<string> => {
  const fileUrl = await storage
    .refFromURL(
      `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${fileId}`
    )
    .getDownloadURL();
  return fileUrl;
};
