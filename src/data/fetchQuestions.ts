import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
};

export async function fetchQuestions(): Promise<Question[]> {
  const snapshot = await getDocs(collection(db, "questions"));
  return snapshot.docs.map((doc) => doc.data() as Question);
}

export async function fetchQuestionsByTopic(topic: string): Promise<Question[]> {
  const q = query(collection(db, "questions"), where("topic", "==", topic));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Question);
}
