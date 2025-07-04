import { useEffect, useState } from "react";
import { fetchQuestionsByTopic, Question } from "../data/fetchQuestions";
import Summary from "./Summary";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../data/firebase";
import { useNavigate } from "react-router-dom";

export default function Quiz({
  user,
  topic,
  onBack,
}: {
  user: any;
  topic: string;
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionsByTopic(topic).then((data) => {
      setQuestions(data);
      setAnswers(Array(data.length).fill(null));
    });
  }, [topic]);

  const question = questions[currentQuestion];
  const selectedOption = answers[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;

  const handleAnswer = (option: string) => {
    if (!selectedOption) {
      const updated = [...answers];
      updated[currentQuestion] = option;
      setAnswers(updated);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSkip = () => {
    const updated = [...answers];
    updated[currentQuestion] = null;
    setAnswers(updated);
    handleNext();
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    saveResults();
  };

  const saveResults = async () => {
    const correct = questions.filter(
      (q, i) => q.correctAnswer === answers[i]
    ).length;
    const total = questions.length;

    try {
      await addDoc(collection(db, "users", user.uid, "results"), {
        correct,
        total,
        topic,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error saving results:", err);
    }
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setIsSubmitted(false);
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  if (isSubmitted) {
    return (
      <div>
        <Summary questions={questions} answers={answers} onRestart={handleRestart} />
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button className="quiz-button" onClick={handleRestart}>
            🔁 Restart Quiz
          </button>
          <button className="quiz-button" onClick={() => navigate("/dashboard")}>
            🏠 Dashboard
          </button>
          <button className="quiz-button" onClick={() => navigate("/results")}>
            📊 View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz" style={{ padding: "1.5rem" }}>
      <button onClick={onBack} className="quiz-button" style={{ marginBottom: 16 }}>
        ← Back to Dashboard
      </button>
      <h2>{topic.toUpperCase()} Quiz</h2>
      <h3>
        Question {currentQuestion + 1} of {questions.length}
      </h3>
      <h4 style={{ marginBottom: "1rem" }}>{question.question}</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.options.map((option) => (
          <li
            key={option}
            onClick={() => handleAnswer(option)}
            style={{
              backgroundColor: selectedOption === option ? "#cdefff" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              cursor: selectedOption ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        {!selectedOption && (
          <button className="quiz-button" onClick={handleSkip}>
            ⏭️ Skip
          </button>
        )}
        {selectedOption && !isLast && (
          <button className="quiz-button" onClick={handleNext}>
            ➡️ Next
          </button>
        )}
        {selectedOption && isLast && (
          <button className="quiz-button" onClick={handleSubmit}>
            ✅ Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
