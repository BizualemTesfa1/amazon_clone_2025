import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYKqz0nuUt0IYjGIDspTD3RSRAEpzXHeU",
  authDomain: "clone-35f9a.firebaseapp.com",
  projectId: "clone-35f9a",
  storageBucket: "clone-35f9a.appspot.com", // ✅ fixed
  messagingSenderId: "725854019575",
  appId: "1:725854019575:web:5b06f2072e0c011b5298f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
