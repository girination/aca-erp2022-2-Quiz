import { useEffect, useState } from "react";
import { fetchQuestions, Question } from "../data/fetchQuestions";
import Summary from "./Summary";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestions().then((data) => {
      setQuestions(data);
      setAnswers(Array(data.length).fill(null));
    });
  }, []);

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
    return <Summary questions={questions} answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="quiz">
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((option) => (
          <li
            key={option}
            onClick={() => handleAnswer(option)}
            style={{
              backgroundColor: selectedOption === option ? "#dceeff" : undefined,
              cursor: selectedOption ? "not-allowed" : "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              margin: "5px 0",
              borderRadius: "5px",
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        {!selectedOption && <button onClick={handleSkip}>Skip</button>}
        {selectedOption && !isLast && <button onClick={handleNext}>Next</button>}
        {selectedOption && isLast && <button onClick={handleSubmit}>Submit Quiz</button>}
      </div>
    </div>
  );
}

