/**
 * Highland Garni — Firebase configuration (DISABLED placeholder).
 *
 * To activate Firebase:
 *   1) bun add firebase
 *   2) Fill in the firebaseConfig object below with your project credentials
 *      (Project settings → General → Your apps → Web).
 *   3) Uncomment the initialization block.
 *   4) Replace the stub exports at the bottom of this file with the real ones.
 *   5) Uncomment the Firestore calls in `src/services/reservationService.ts`.
 */

// import { initializeApp, type FirebaseApp } from "firebase/app";
// import { getFirestore, type Firestore } from "firebase/firestore";
// import { getAuth, type Auth } from "firebase/auth";

// export const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "highland-garni.firebaseapp.com",
//   projectId: "highland-garni",
//   storageBucket: "highland-garni.appspot.com",
//   messagingSenderId: "0000000000",
//   appId: "1:0000000000:web:xxxxxxxxxxxx",
// };

// export const app: FirebaseApp = initializeApp(firebaseConfig);
// export const db: Firestore = getFirestore(app);
// export const auth: Auth = getAuth(app);

/** Stub exports so the codebase compiles without Firebase. Remove once enabled. */
export const app = null as unknown as never;
export const db = null as unknown as never;
export const auth = null as unknown as never;

/** Feature flag — flip to true once Firebase is wired up. */
export const FIREBASE_ENABLED = false;
