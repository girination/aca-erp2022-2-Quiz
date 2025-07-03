import { Question } from "../data/questions";

type Props = {
  questions: Question[];
  answers: (string | null)[];
  onRestart: () => void;
};

export default function Summary({ questions, answers, onRestart }: Props) {
  const correctCount = questions.filter((q, i) => q.correctAnswer === answers[i]).length;
  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= 70;

  return (
    <div>
      <h2>Quiz Summary</h2>

      {passed ? (
        <h3 style={{ color: "green" }}>
          🎉 You passed! Score: {correctCount}/{total} ({percentage}%)
        </h3>
      ) : (
        <h3 style={{ color: "red" }}>
          😢 You failed. Score: {correctCount}/{total} ({percentage}%)
        </h3>
      )}

      <button onClick={onRestart} style={{ marginTop: "1rem" }}>
        Restart Quiz
      </button>

      <hr />

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h4>{q.question}</h4>
          <p><strong>Your answer:</strong> {answers[i] ?? "Skipped"}</p>
          <p><strong>Correct answer:</strong> {q.correctAnswer}</p>
          <p><strong>Explanation:</strong> {q.explanation}</p>
        </div>
      ))}
    </div>
  );
}
