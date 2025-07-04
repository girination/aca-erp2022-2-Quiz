import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./data/firebase";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import ResultsDashboard from "./components/ResultsDashboard";
import AuthForm from "./components/AuthForm";
import "./App.css";

function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setProfile(userDoc.exists() ? userDoc.data() : null);
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <AuthForm onAuth={() => navigate("/dashboard")} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/aca1.png" alt="ACA Logo" className="logo" />
        <h1 className="title">ACA React Quiz App</h1>
        <button onClick={() => signOut(auth)}>Log out</button>
      </header>

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              profile={profile}
              onStartQuiz={(topic) => {
                setSelectedTopic(topic);
                navigate("/quiz");
              }}
              onViewResults={() => navigate("/results")}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            selectedTopic ? (
              <Quiz
                user={user}
                topic={selectedTopic}
                onBack={() => navigate("/dashboard")}
              />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/results"
          element={<ResultsDashboard user={user} onBack={() => navigate("/dashboard")} />}
        />
      </Routes>
    </div>
  );
}

export default App;
