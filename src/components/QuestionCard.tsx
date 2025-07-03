import "./QuestionsCard.css";

type Props = {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  onAnswer: (answer: string) => void;
  current: number;
  total: number;
};

export default function QuestionCard({ question, onAnswer, current, total }: Props) {
  return (
    <div className="question-card">
      <h2>Question {current} of {total}</h2>
      <p className="question-text">{question.question}</p>
      <div className="options">
        {question.options.map((opt) => (
          <button key={opt} onClick={() => onAnswer(opt)} className="option-button">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
