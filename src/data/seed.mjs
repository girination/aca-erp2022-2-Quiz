// src/data/seed.mjs
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { questions } from './QuestionsData.js'; // Make sure this exports an array of questions

//  Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBU5vKphT7sukQzryw9BVO02qxKCGPzAxk",
  authDomain: "aca-quiz-app.firebaseapp.com",
  projectId: "aca-quiz-app",
  storageBucket: "aca-quiz-app.appspot.com",
  messagingSenderId: "826810795259",
  appId: "1:826810795259:web:f83c695cf379b92bd90d1"
};

//  Init Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  Seed function with duplicate check
async function seedQuestions() {
  const colRef = collection(db, 'questions');

  // Fetch existing questions
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

// 🚀 Run the seeding
seedQuestions().catch((err) => {
  console.error(" Seeding failed:", err);
});
