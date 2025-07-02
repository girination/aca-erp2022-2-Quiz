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
    explanation: "`git clone` is used to create a local copy of a remote repository. This was the first step in setting up your project.",
  },
  {
    question: "Which command creates a new React app with TypeScript support?",
    options: ["npx create-react-app my-app", "npx create-react-app my-app --template typescript", "npm install react-typescript", "npx create-ts-react-app"],
    correctAnswer: "npx create-react-app my-app --template typescript",
    explanation: "This command initializes a new React project pre-configured to use TypeScript.",
  },
  {
    question: "Which hook is used to manage local component state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    correctAnswer: "useState",
    explanation: "`useState` allows you to add state to functional components, essential for managing dynamic quiz answers.",
  },
  {
    question: "What is the purpose of `tsconfig.json` in a TypeScript project?",
    options: ["To define Git settings", "To configure CircleCI", "To customize React", "To configure TypeScript compiler options"],
    correctAnswer: "To configure TypeScript compiler options",
    explanation: "This file defines how the TypeScript compiler behaves, such as which files to include and the strictness of type-checking.",
  },
  {
    question: "Which React feature lets you render components conditionally?",
    options: ["JSX", "Props", "useState", "Ternary Operators / Conditional Rendering"],
    correctAnswer: "Ternary Operators / Conditional Rendering",
    explanation: "Conditional rendering lets you display different components or content based on state or props.",
  },
  {
    question: "What is the best way to persist data like quiz scores on the browser without a backend?",
    options: ["Redux", "Session storage", "Local storage", "Cookies"],
    correctAnswer: "Local storage",
    explanation: "`localStorage` allows you to save key-value pairs that persist even after the browser is closed. Ideal for saving quiz scores.",
  },
  {
    question: "How do you define a function component in TypeScript?",
    options: ["function MyComponent() {}", "const MyComponent = (): JSX.Element => {}", "React.createComponent(MyComponent)", "class MyComponent extends React.Component"],
    correctAnswer: "const MyComponent = (): JSX.Element => {}",
    explanation: "Using arrow functions with return type annotations ensures type safety in functional components.",
  },
  {
    question: "Which directory usually contains static assets like images and icons in a React project?",
    options: ["src", "node_modules", "public", "assets"],
    correctAnswer: "public",
    explanation: "The `public` folder is where you place files like favicon.ico or index.html that are directly served by the browser.",
  },
  {
    question: "Which service is used in this project for deployment and CI/CD?",
    options: ["Netlify", "CircleCI", "GitHub Actions", "Vercel"],
    correctAnswer: "Vercel",
    explanation: "Vercel is used for hosting and provides automatic deployment from your GitHub repo.",
  },
  {
    question: "Which Git command saves your changes to the local repository?",
    options: ["git push", "git pull", "git status", "git commit"],
    correctAnswer: "git commit",
    explanation: "`git commit` records your staged changes to the repo’s history. Used after staging files with `git add`.",
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    question: `Sample question ${i + 11}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
    explanation: `This is an explanation for sample question ${i + 11}, covering a concept used in the quiz app project.`,
  }))
];
