import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBhijsXfUjh7lcNs-OyEH4HKI_2CVS_rSk",
  authDomain: "aca-quizapp-f4dee.firebaseapp.com",
  projectId: "aca-quizapp-f4dee",
  storageBucket: "aca-quizapp-f4dee.appspot.com",
  messagingSenderId: "996349462838",
  appId: "1:996349462838:web:02f6656c4fdf41374f4b97",
  measurementId: "G-ZE80FR5V1M",
};

// 🔥 Initialize Firebase app and export the Firestore and Auth instances
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
