// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cjayestate.firebaseapp.com",
  projectId: "cjayestate",
  storageBucket: "cjayestate.appspot.com",
  messagingSenderId: "287634106959",
  appId: "1:287634106959:web:d2e1e5345ee384cb81583a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);