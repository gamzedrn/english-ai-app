import React, { useState } from "react";
import generalQuizData from "../data/generalQuizData.json";

const GeneralQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const correct = generalQuizData[current].correctAnswer === option;
    if (correct) setScore(score + 1);

    setAnswers([...answers, { question: generalQuizData[current].question, selected: option, correct }]);

    const next = current + 1;
    if (next < generalQuizData.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Test Bitti ✅</h2>
        <p>Toplam Skor: {score} / {generalQuizData.length}</p>
        <button onClick={resetQuiz}>Tekrar Dene</button>
      </div>
    );
  }

  const q = generalQuizData[current];

  return (
    <div className="general-quiz">
      <h2>Soru {current + 1} / {generalQuizData.length}</h2>
      <p>{q.question}</p>
      <ul>
        {q.options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => handleAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralQuiz;
