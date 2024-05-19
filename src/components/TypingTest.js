import React, { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import InputArea from './InputArea';
import Results from './Results';
import Keyboard from './Keyboard';
import DifficultySelector from './DifficultySelector';

const texts = {
  Beginner: "This is a sample text for typing test.",
  Medium: "Typing tests are a great way to improve your typing speed and accuracy.",
  Advanced: "Advanced typing tests challenge your ability to type complex sentences quickly and accurately."
};

const TypingTest = () => {
  const [level, setLevel] = useState(null);
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (level) {
      setSampleText(texts[level]);
      setInput("");
      setStartTime(null);
      setEndTime(null);
    }
  }, [level]);

  const handleInputChange = (value) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (value.length <= sampleText.length) {
      setInput(value);
    }

    if (value.length === sampleText.length) {
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
  const nextChar = sampleText[input.length] || '';

  return (
    <div className="typing-test-container">
      {!level && <DifficultySelector onSelectLevel={setLevel} />}
      {level && (
        <>
          <TextDisplay text={sampleText} input={input} />
          <InputArea input={input} onInputChange={handleInputChange} />
          {results && <Results results={results} />}
          <Keyboard nextChar={nextChar} />
        </>
      )}
    </div>
  );
};

export default TypingTest;
