import React from "react";

const TextSelector = ({ level, type, onLevelChange, onTypeChange }) => {
  return (
    <div className="p-4 flex gap-4 justify-center">
      <select
        value={level}
        onChange={(e) => onLevelChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Seviye Seç</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
      </select>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Tür Seç</option>
        <option value="story">Story</option>
        <option value="dialogue">Dialogue</option>
        <option value="news">News</option>
        <option value="conversation">Conversation</option>
      </select>
    </div>
  );
};

export default TextSelector;
