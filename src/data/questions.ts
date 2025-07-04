export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const questions: Question[] = [
  {
    question: "What is the git command that downloads your repository from GitHub to your computer?",
    options: ["git push", "git commit", "git fork", "git clone"],
    correctAnswer: "git clone",
    explanation: "`git clone` is used to create a local copy of a remote repository.",
  },
  {
    question: "Which command creates a new React app with TypeScript support?",
    options: [
      "npx create-react-app my-app",
      "npx create-react-app my-app --template typescript",
      "npm install react-typescript",
      "npx create-ts-react-app"
    ],
    correctAnswer: "npx create-react-app my-app --template typescript",
    explanation: "This command initializes a new React project with TypeScript.",
  },
  {
    question: "Which hook is used to manage local component state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    correctAnswer: "useState",
    explanation: "`useState` lets you add state to functional components.",
  },
];

