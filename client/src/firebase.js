// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8dfa5.firebaseapp.com",
  projectId: "mern-blog-8dfa5",
  storageBucket: "mern-blog-8dfa5.appspot.com",
  messagingSenderId: "113995992100",
  appId: "1:113995992100:web:d37bb907bd8d8249e45cb1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);