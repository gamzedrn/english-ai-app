import React, { useState } from "react";

const wordData = [
  { word: "architecture", image: "/images/architecture.jpg" },
  { word: "environment", image: "/images/environment.jpg" },
  { word: "responsibility", image: "/images/responsibility.jpg" },
  { word: "technology", image: "/images/technology.jpg" },
  { word: "imagination", image: "/images/imagination.jpg" },
  { word: "independent", image: "/images/independent.jpg" },
  { word: "opportunity", image: "/images/opportunity.jpg" },
  { word: "communication", image: "/images/communication.jpg" },
  { word: "development", image: "/images/development.jpg" },
  { word: "consequence", image: "/images/consequence.jpg" },
];

const PronunciationPractice = () => {
  const [feedback, setFeedback] = useState("");
  const [listeningWord, setListeningWord] = useState("");

  const handleListen = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    setListeningWord(word);
    setFeedback("");
  };

  const handleRecord = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback("⚠️ Tarayıcınız ses tanımayı desteklemiyor.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      if (spokenText.includes(listeningWord.toLowerCase())) {
        setFeedback("✅ Doğru telaffuz!");
      } else {
        setFeedback(`❌ Yanlış telaffuz. Algılanan: "${spokenText}"`);
      }
    };

    recognition.onerror = () => {
      setFeedback("⚠️ Mikrofon hatası oluştu.");
    };
  };

  return (
    <div className="pronunciation-container">
      <h2 className="text-2xl font-bold my-4">🗣️ Telaffuz Çalışması</h2>
      {wordData.map((item, idx) => (
        <div
          key={idx}
          className="word-card mb-6 p-4 border rounded shadow-md"
          style={{ maxWidth: "300px" }}
        >
          <img
            src={item.image}
            alt={item.word}
            style={{
              width: "150px",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          />
          <h3 className="text-lg font-semibold">{item.word}</h3>
          <button
            onClick={() => handleListen(item.word)}
            className="btn-primary mr-2"
          >
            🔊 Dinle
          </button>
          <button onClick={handleRecord} className="btn-secondary">
            🎙️ Söyle
          </button>
          {listeningWord === item.word && (
            <p style={{ marginTop: "8px" }}>{feedback}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PronunciationPractice;
