import { useState } from "react";
import { auth } from "../data/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuth();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "5rem auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <img
        src="/aca1.png"
        alt="ACA Logo"
        style={{ width: "80px", marginBottom: "1rem" }}
      />
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>
        {isSignup ? "Create Account" : "Log In"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        {isSignup ? "Already have an account?" : "No account?"}{" "}
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
            fontSize: "0.95rem",
          }}
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
};
