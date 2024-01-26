// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs6vWpponpF6-mH9f3DDNpDk63OSDY2Nc",
  authDomain: "recbooks-c9cce.firebaseapp.com",
  databaseURL: "https://recbooks-c9cce-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recbooks-c9cce",
  storageBucket: "recbooks-c9cce.appspot.com",
  messagingSenderId: "397282753798",
  appId: "1:397282753798:web:710d54a063203888d53287",
  measurementId: "G-7VCS4M8Z64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);

export { auth, db };