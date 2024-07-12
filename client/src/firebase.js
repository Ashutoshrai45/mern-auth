// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f954e.firebaseapp.com",
  projectId: "mern-auth-f954e",
  storageBucket: "mern-auth-f954e.appspot.com",
  messagingSenderId: "740534786558",
  appId: "1:740534786558:web:3dc0bcddd27bd99652c8af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
