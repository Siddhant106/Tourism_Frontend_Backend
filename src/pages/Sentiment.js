import React, { useState } from "react";
import "./Sentiment.css";

function Sentiment() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = () => {
    if (text.includes("good") || text.includes("amazing") || text.includes("love")) {
      setResult("Positive 😄");
    } else if (text.includes("bad") || text.includes("worst") || text.includes("poor")) {
      setResult("Negative 😡");
    } else {
      setResult("Neutral 😐");
    }
  };

  return (
    <div className="sentiment-container">
      <h1>Sentiment Analyzer 💬</h1>
      <p>Type a review and analyze its sentiment (frontend simulation)</p>

      <textarea
        placeholder="Type your review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button onClick={analyzeSentiment}>Analyze</button>

      {result && (
        <div className={`result ${result.includes("Positive") ? "pos" : result.includes("Negative") ? "neg" : "neu"}`}>
          Sentiment: {result}
        </div>
      )}
    </div>
  );
}

export default Sentiment;
