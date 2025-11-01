import React from "react";

const TextDisplay = ({ texts }) => {
  if (texts.length === 0) return <p className="p-4 text-red-500">Bu seçime uygun metin bulunamadı.</p>;

  return (
    <div className="p-4 space-y-4">
      {texts.map((text, index) => (
        <div key={index} className="border rounded p-4 shadow">
          <h2 className="text-lg font-bold">{text.title}</h2>
          <p className="mt-2">{text.text}</p>
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
