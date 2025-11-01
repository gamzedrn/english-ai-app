import React from "react";
import ClozeTest from "./ClozeTest"; // Boşluk doldurma bileşeni

// Basit buton bileşeni
const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="btn-primary">
    {children}
  </button>
);

const TextCard = ({ title, text, onPlay }) => {
  return (
    <div className="text-card">
      <h3>{title}</h3>
      <p>{text}</p>

      {/* Dinleme butonu */}
      <div className="button-container">
        <Button onClick={onPlay}>▶ Dinle</Button>
      </div>

      {/* Boşluk doldurma bölümü */}
      <ClozeTest originalText={text} />
    </div>
  );
};

export default TextCard;
