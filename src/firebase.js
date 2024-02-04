import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAUXktMPIz-pFi9ocUAywom0wGbm9HRVgU",
  authDomain: "pioneering-axe-407410.firebaseapp.com",
  projectId: "pioneering-axe-407410",
  storageBucket: "pioneering-axe-407410.appspot.com",
  messagingSenderId: "82435780480",
  appId: "1:82435780480:web:7eb8c629fce1c8671edb65",
  measurementId: "G-WRXDK4FY41"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);

export { db, auth, provider };