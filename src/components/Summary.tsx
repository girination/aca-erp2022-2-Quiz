import { Question } from "../data/questions";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div className="summary-container">
     
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button className="quiz-button" onClick={onRestart}>🔁 Restart Quiz</button>
        <button className="quiz-button" onClick={() => navigate("/dashboard")}>🏠 Dashboard</button>
        <button className="quiz-button" onClick={() => navigate("/results")}>📊 View Results</button>
      </div>

      {/* Score */}
      <h2 className="summary-title">Quiz Summary</h2>
      <h3 style={{ color: passed ? "green" : "red", textAlign: "center", fontWeight: "bold" }}>
        {passed ? "🎉 You passed!" : "😢 You failed."} Score: {correctCount}/{total} ({percentage}%)
      </h3>

      <hr style={{ margin: "2rem 0" }} />

      {/* Per-question feedback */}
      <div className="summary-list">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;
          return (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                border: `2px solid ${isCorrect ? "#4caf50" : "#f44336"}`,
              }}
            >
              <h4 style={{ marginBottom: "0.5rem" }}>{q.question}</h4>
              <p>
                <strong>Your answer:</strong>{" "}
                <span style={{ color: isCorrect ? "#4caf50" : "#f44336" }}>
                  {answers[i] ?? "Skipped"}
                </span>
              </p>
              <p>
                <strong>Correct answer:</strong>{" "}
                <span style={{ color: "#4caf50" }}>{q.correctAnswer}</span>
              </p>
              <p>
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
