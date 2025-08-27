import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 import auth

const firebaseConfig = {
  apiKey: "AIzaSyAES0pVLB1XlEd5hxijhg8pHnkpGFDDDJA",
  authDomain: "photogallery-ff74a.firebaseapp.com",
  projectId: "photogallery-ff74a",
  storageBucket: "photogallery-ff74a.appspot.com",
  messagingSenderId: "170260487952",
  appId: "1:170260487952:web:af9173a04c52c2ba6e4f95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const projectStorage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app); // 👈 auth instance

// Export
export { db, projectStorage, auth };
