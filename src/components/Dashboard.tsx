import { CodeIcon, BrainIcon } from "lucide-react";
import "../components/Dashboard.css"; 

const topics = [
  { id: "react", label: "React", icon: <CodeIcon size={20} /> },
  { id: "python", label: "Python", icon: <BrainIcon size={20} /> },
];

export default function Dashboard({
  user,
  profile,
  onStartQuiz,
  onViewResults,
}: {
  user: any;
  profile: any;
  onStartQuiz: (topic: string) => void;
  onViewResults: () => void;
}) {
  return (
    <div className="dashboard">
      <h2 className="welcome-text">Welcome, {profile?.fullName || user.email}</h2>
      <p className="select-text">Select a quiz topic:</p>

      <div className="topic-buttons">
        {topics.map(({ id, label, icon }) => (
          <button key={id} className="topic-button" onClick={() => onStartQuiz(id)}>
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button className="view-results-button" onClick={onViewResults}>
        📊 View All Quiz Results
      </button>
    </div>
  );
}
