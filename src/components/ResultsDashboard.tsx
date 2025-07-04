import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ResultsDashboard({
  user,
  onBack,
}: {
  user: any;
  onBack: () => void;
}) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const col = collection(db, "users", user.uid, "results");
        const snapshot = await getDocs(col);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResults();
  }, [user.uid]);

  const validResults = results
    .filter((r) => r.timestamp?.seconds) 
    .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      {/* 🧭 Back button */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#0e61b9",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px 16px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h2 style={{ marginBottom: "1.5rem" }}>📊 My Quiz Results</h2>

      {loading ? (
        <p>Loading...</p>
      ) : validResults.length === 0 ? (
        <p>No valid quiz results found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {validResults.map((r) => (
            <li
              key={r.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "1rem",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>
                <strong>Topic:</strong> {r.topic?.toUpperCase() || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {r.timestamp?.seconds
                  ? new Date(r.timestamp.seconds * 1000).toLocaleString()
                  : "Unknown"}
              </p>
              <p>
                <strong>Score:</strong> {r.correct}/{r.total}
              </p>
              <p>
                <strong>Percentage:</strong>{" "}
                {Math.round((r.correct / r.total) * 100)}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
