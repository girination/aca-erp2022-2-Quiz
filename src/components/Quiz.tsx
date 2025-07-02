import { useState } from "react";
import { questions } from "../data/questions";
import Summary from "./Summary";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = questions[currentQuestion];
  const isCorrect = selectedOption === question.correctAnswer;

  const handleAnswer = (option: string) => {
    if (!selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    setAnswers([...answers, selectedOption!]);
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleRetry = () => {
    setSelectedOption(null);
  };

  if (currentQuestion >= questions.length) {
    return <Summary questions={questions} answers={answers} />;
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
              backgroundColor:
                selectedOption === option
                  ? option === question.correctAnswer
                    ? "lightgreen"
                    : "salmon"
                  : undefined,
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

      {selectedOption && (
        <div className="summary-card">
          <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
          <p><strong>Your answer:</strong> {selectedOption}</p>
          <p><strong>Explanation:</strong> {question.explanation}</p>
          {isCorrect ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleRetry}>Try Again</button>
          )}
        </div>
      )}
    </div>
  );
}
