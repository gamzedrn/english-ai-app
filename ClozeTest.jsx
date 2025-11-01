import React, { useState } from "react";

// Bu bileşen kullanıcıdan kelime boşluklarını doldurmasını ister
const ClozeTest = ({ originalText }) => {
  const words = originalText.split(" "); // metni kelimelere ayır

  const blanksIndex = [2, 5, 8]; // Hangi indeksler boşluk olacak

  const [inputs, setInputs] = useState(
    blanksIndex.reduce((acc, idx) => ({ ...acc, [idx]: "" }), {})
  );

  const [results, setResults] = useState({}); // Doğru yanlış sonucu

  const handleChange = (e, idx) => {
    setInputs({ ...inputs, [idx]: e.target.value });
  };

  const checkAnswers = () => {
    const newResults = {};
    blanksIndex.forEach((idx) => {
      newResults[idx] =
        inputs[idx].trim().toLowerCase() === words[idx].toLowerCase();
    });
    setResults(newResults);
  };

  return (
    <div className="cloze-test">
      <p>
        {words.map((word, idx) => {
          if (blanksIndex.includes(idx)) {
            return (
              <input
                key={idx}
                className="cloze-input"
                value={inputs[idx]}
                onChange={(e) => handleChange(e, idx)}
                placeholder="..."
              />
            );
          } else {
            return <span key={idx}> {word} </span>;
          }
        })}
      </p>

      <button className="btn-check" onClick={checkAnswers}>
        Cevapları Kontrol Et
      </button>

      <div className="feedback-container">
        {blanksIndex.map((idx) => (
          <div
            key={idx}
            className={`feedback ${
              results[idx] === undefined
                ? ""
                : results[idx]
                ? "correct"
                : "incorrect"
            }`}
          >
            {results[idx] === undefined
              ? ""
              : results[idx]
              ? `#${idx + 1} Doğru`
              : `#${idx + 1} Yanlış (Doğru: "${words[idx]}")`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClozeTest;
