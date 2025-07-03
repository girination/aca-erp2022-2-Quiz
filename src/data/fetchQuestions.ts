import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export async function fetchQuestions(): Promise<Question[]> {
  const snapshot = await getDocs(collection(db, "questions"));
  return snapshot.docs.map((doc) => doc.data() as Question);
}
