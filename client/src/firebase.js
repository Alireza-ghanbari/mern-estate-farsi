// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-farsi.firebaseapp.com",
  projectId: "estate-farsi",
  storageBucket: "estate-farsi.appspot.com",
  messagingSenderId: "908968442955",
  appId: "1:908968442955:web:fe29529ef5caf39bef21ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);