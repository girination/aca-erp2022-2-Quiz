// src/data/seed.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { questions } from "./QuestionsData.js";

<<<<<<< HEAD
//  Firebase config
=======
>>>>>>> 2ba7cc5 (Updated to support database capturing of logged in users and record results)
const firebaseConfig = {
  apiKey: "AIzaSyBhij5xFuhj7lcNs-OyEH4HKI_2CVS_rSk",
  authDomain: "aca-quizapp-f4dee.firebaseapp.com",
  projectId: "aca-quizapp-f4dee",
  storageBucket: "aca-quizapp-f4dee.appspot.com",
  messagingSenderId: "996349462838",
  appId: "1:996349462838:web:02f6656c4fdf41374f4b97"
};

<<<<<<< HEAD
//  Init Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  Seed function with duplicate check
=======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

>>>>>>> 2ba7cc5 (Updated to support database capturing of logged in users and record results)
async function seedQuestions() {
  const colRef = collection(db, "questions");
  const existingSnapshot = await getDocs(colRef);
  const existingQuestions = existingSnapshot.docs.map(doc => doc.data().question);

  for (const q of questions) {
    if (!existingQuestions.includes(q.question)) {
      await addDoc(colRef, q);
      console.log(` Added: ${q.question}`);
    } else {
      console.log(`⚠Skipped (already exists): ${q.question}`);
    }
  }

  console.log(" Seeding complete.");
}

seedQuestions().catch((err) => {
  console.error(" Seeding failed:", err);
});
