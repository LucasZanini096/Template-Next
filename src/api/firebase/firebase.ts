import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuvvY6s2X8zO3e_rNarpBdgWhsQIdygVU",
  authDomain: "templatenext-8fbe1.firebaseapp.com",
  projectId: "templatenext-8fbe1",
  storageBucket: "templatenext-8fbe1.appspot.com",
  messagingSenderId: "153091891526",
  appId: "1:153091891526:web:c1ed068e3536c552ebc547",
  measurementId: "G-0BC730D00Y"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bucket = getStorage(app);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, bucket, db };