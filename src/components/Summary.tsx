// src/components/Summary.tsx
import { Question } from "../data/questions";

type Props = {
  questions: Question[];
  answers: string[];
};

export default function Summary({ questions, answers }: Props) {
  return (
    <div>
      <h2>Quiz Summary</h2>
      {questions.map((q, i) => (
        <div key={i}>
          <h4>{q.question}</h4>
          <p>Your answer: {answers[i]}</p>
          <p>Correct answer: {q.correctAnswer}</p>
          <p><strong>Explanation:</strong> {q.explanation}</p>
        </div>
      ))}
    </div>
  );
}
