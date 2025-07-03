import React from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/aca1.png" alt="ACA Logo" className="logo" />
        <h1 className="title">ACA React Quiz App</h1>
      </header>
      <Quiz />
    </div>
  );
}

export default App;
