import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAES0pVLB1XlEd5hxijhg8pHnkpGFDDDJA",
  authDomain: "photogallery-ff74a.firebaseapp.com",
  projectId: "photogallery-ff74a",
  storageBucket: "photogallery-ff74a.appspot.com",
  messagingSenderId: "170260487952",
  appId: "1:170260487952:web:af9173a04c52c2ba6e4f95",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectFirestore, projectStorage, timestamp };
