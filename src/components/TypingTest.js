import React, { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import InputArea from './InputArea';
import Results from './Results';

const sampleText = "This is a sample text for typing test.";

const TypingTest = () => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleInputChange = (value) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInput(value);

    if (value === sampleText) {
      setEndTime(Date.now());
    }
  };

  const calculateResults = () => {
    if (!endTime) return null;
    const timeTaken = (endTime - startTime) / 1000;
    const words = sampleText.split(" ").length;
    const wpm = (words / timeTaken) * 60;

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === sampleText[i]) {
        correctChars++;
      }
    }
    const accuracy = (correctChars / sampleText.length) * 100;

    return { timeTaken, wpm, accuracy };
  };

  const results = calculateResults();

  return (
    <div className="typing-test-container">
      <TextDisplay text={sampleText} />
      <InputArea input={input} onInputChange={handleInputChange} />
      {results && <Results results={results} />}
    </div>
  );
};

export default TypingTest;
