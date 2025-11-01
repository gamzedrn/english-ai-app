// frontend/src/components/DictationTask.jsx

import React, { useState } from "react";

const DictationTask = ({ sentence }) => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Cümleyi kontrol eden fonksiyon
  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === sentence.toLowerCase()) {
      setFeedback("✅ Doğru!");
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: "${sentence}"`);
    }
  };

  // Sesli okuma fonksiyonu
  const playAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tarayıcınız sesli okuma desteklemiyor.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        maxWidth: "600px",
      }}
    >
      <button onClick={playAudio} style={{ marginBottom: "0.5rem" }}>
        ▶ Dinle
      </button>
      <input
        type="text"
        placeholder="Duyduğun cümleyi yaz"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button onClick={checkAnswer} style={{ marginRight: "0.5rem" }}>
        Gönder
      </button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default DictationTask;
