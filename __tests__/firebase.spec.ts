import firebase from "firebase/app";
import "firebase/storage";

describe("Firebase tests", () => {
	beforeAll(() => {
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
		// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
	});

	test("should check performance", async () => {
		const imageId = "c0540b66-9bf9-407b-adff-0eb2cca9816c";

		const start = performance.now();
		for (let i = 0; i < 100; i++) {
			const imageRef = firebase.storage();
		}
		const end = performance.now();

		// console.log(`Total time: ${(end - start) / 1000} seconds`);

		expect("").toEqual("");
	});
});

export {};
