import React, { useEffect, useState } from "react";
import axios from "axios";
import TextCard from "../components/TextCard";
import DictationTask from "../components/DictationTask";
import GeneralQuiz from "../components/GeneralQuiz";
import PronunciationPractice from "../components/PronunciationPractice";
import LearningStylesSurvey from "../components/LearningStylesSurvey";

const sampleSentences = [
  "I like to read books.",
  "She is going to the market.",
  "We will meet tomorrow.",
];

const App = () => {
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Anket sonucu
  const [surveyResult, setSurveyResult] = useState(null);

  const fetchTexts = async () => {
    if (!level || !type) {
      setTexts([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get_texts", {
        params: { level, type },
      });
      setTexts(response.data);
    } catch (error) {
      console.error("Veri alınamadı:", error);
      setTexts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTexts();
  }, [level, type]);

  const handlePlay = async (text) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tts",
        { text },
        { responseType: "blob" }
      );
      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Ses çalma hatası:", error);
    }
  };

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        padding: "2rem",
        backgroundColor: "#2e004f",
        backgroundImage: "linear-gradient(135deg, #2e004f 0%, #40e0d0 100%)",
        color: "#E0FFFF",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#40E0D0",
          textShadow: "0 0 5px #40E0D0",
        }}
      >
        English AI App
      </h1>

      {/* Seviye ve tür seçimi */}
      <div
        className="selectors"
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          aria-label="Seviye seçimi"
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            backgroundColor: "#fff",
            color: "#004d4d",
            border: "2px solid #40E0D0",
            fontWeight: "bold",
          }}
        >
          <option value="">Seviye Seç</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Tür seçimi"
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            backgroundColor: "#fff",
            color: "#004d4d",
            border: "2px solid #40E0D0",
            fontWeight: "bold",
          }}
        >
          <option value="">Tür Seç</option>
          <option value="story">Hikaye</option>
          <option value="dialogue">Diyalog</option>
          <option value="conversation">Konuşma</option>
          <option value="news">Haber</option>
        </select>
      </div>

      {/* Metin kartları */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>⏳ Yükleniyor...</p>
      ) : texts.length > 0 ? (
        texts.map((item, idx) => (
          <TextCard
            key={idx}
            title={item.title}
            text={item.text}
            onPlay={() => handlePlay(item.text)}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#aaa" }}>Uygun metin bulunamadı.</p>
      )}

      {/* 🎧 Dinleme ve Yazma */}
      <div
        className="dictation-section"
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          borderRadius: "10px",
          backgroundColor: "rgba(64, 224, 208, 0.18)",
          border: "1.5px solid #40E0D0",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#40E0D0" }}>
          🎧 Dinleme ve Yazma Egzersizi
        </h2>
        {sampleSentences.map((sentence, idx) => (
          <DictationTask key={idx} sentence={sentence} />
        ))}
      </div>

      {/* 🧠 Genel Quiz */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          borderRadius: "10px",
          backgroundColor: "rgba(64, 224, 208, 0.18)",
          border: "1.5px solid #40E0D0",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#40E0D0" }}>
          🧠 Genel İngilizce Testi (20 Soru)
        </h2>
        <GeneralQuiz />
      </div>

      {/* 🗣️ Telaffuz */}
      <div
        style={{
          marginTop: "3rem",
          marginBottom: "3rem",
          padding: "1.5rem",
          borderRadius: "10px",
          backgroundColor: "rgba(64, 224, 208, 0.18)",
          border: "1.5px solid #40E0D0",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#40E0D0" }}>
          🗣️ Telaffuz Çalışması
        </h2>
        <PronunciationPractice />
      </div>

      {/* ---------- Öğrenme Tarzları Anketi ve Sonuç ---------- */}
      {!surveyResult ? (
        <LearningStylesSurvey onComplete={(dominant, counts) => setSurveyResult({ dominant, counts })} />
      ) : (
        <div
          style={{
            backgroundColor: "rgba(64, 224, 208, 0.18)",
            border: "1.5px solid #40E0D0",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "2rem",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            color: "#40E0D0",
          }}
        >
          <h2>Öğrenme Tarzınız:</h2>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {surveyResult.dominant.join(", ")}
          </p>
          <p>
            <small>
              (Visual: {surveyResult.counts.Visual}, Auditory: {surveyResult.counts.Auditory}, Kinesthetic: {surveyResult.counts.Kinesthetic})
            </small>
          </p>
          <button
            onClick={() => setSurveyResult(null)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#40E0D0",
              border: "none",
              borderRadius: "6px",
              color: "#101820",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Anketi Yeniden Doldur
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
