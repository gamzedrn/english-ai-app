import React, { useState } from "react";

const questions = [
  {
    question: "Öğrenirken görsel materyaller kullanmayı tercih ederim.",
    type: "Visual",
  },
  {
    question: "Bir şeyleri dinleyerek daha iyi öğrenirim.",
    type: "Auditory",
  },
  {
    question: "Ellerimi ve bedenimi kullanarak öğrenmek isterim.",
    type: "Kinesthetic",
  },
  {
    question: "Grafikler ve tablolar öğrenmemi kolaylaştırır.",
    type: "Visual",
  },
  {
    question: "Konuşarak ve tartışarak daha iyi anlarım.",
    type: "Auditory",
  },
  {
    question: "Deneyimleyerek ve uygulayarak öğrenirim.",
    type: "Kinesthetic",
  },
  {
    question: "Resimler ve renkler öğrenmemi destekler.",
    type: "Visual",
  },
  {
    question: "Sesli anlatımlar ve müzikle daha iyi öğrenirim.",
    type: "Auditory",
  },
  {
    question: "Hareket ederek ve yaparak daha iyi anlarım.",
    type: "Kinesthetic",
  },
];

const LearningStylesSurvey = ({ onComplete }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.some((a) => a === null)) {
      alert("Lütfen tüm soruları yanıtlayınız.");
      return;
    }
    // Her türün toplam puanı
    const totals = { Visual: 0, Auditory: 0, Kinesthetic: 0 };
    answers.forEach((val, idx) => {
      totals[questions[idx].type] += val;
    });
    // En yüksek puana sahip türler
    const maxScore = Math.max(...Object.values(totals));
    const dominant = Object.keys(totals).filter((k) => totals[k] === maxScore);
    onComplete(dominant, totals);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "rgba(64, 224, 208, 0.15)",
        padding: "1rem",
        borderRadius: "12px",
        color: "#004d4d",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#40E0D0" }}>
        Öğrenme Tarzları Anketi
      </h2>
      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            borderBottom: "1px solid #40E0D0",
          }}
        >
          <p>{q.question}</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[1, 2, 3, 4, 5].map((val) => (
              <label key={val} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name={"q" + i}
                  value={val}
                  checked={answers[i] === val}
                  onChange={() => handleAnswer(i, val)}
                  required
                />
                {val}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#40E0D0",
          border: "none",
          borderRadius: "8px",
          color: "#101820",
          fontWeight: "bold",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Gönder
      </button>
    </form>
  );
};

export default LearningStylesSurvey;
