import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvS2Iv7cc4oF_PCpqXmew6NxFR8J_ZgoE",
  authDomain: "mybook-e1b6f.firebaseapp.com",
  databaseURL: "https://mybook-e1b6f-default-rtdb.firebaseio.com",
  projectId: "mybook-e1b6f",
  storageBucket: "mybook-e1b6f.appspot.com",
  messagingSenderId: "690880426218",
  appId: "1:690880426218:web:694c54465cd44c8110a793",
  measurementId: "G-XKF61NDB2D",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
