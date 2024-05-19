import React, { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import InputArea from './InputArea';
import Results from './Results';
import Keyboard from './Keyboard';
import DifficultySelector from './DifficultySelector';

const texts = {
  Beginner: [
    "This is a sample text for typing test.",
    "Simple text to start typing.",
    "Practice makes perfect.",
    "Typing can be fun.",
    "Just keep typing.",
    "Accuracy is important.",
    "Speed comes with practice.",
    "Focus on the screen.",
    "Don't look at the keyboard.",
    "You are doing great!"
  ],
  Medium: [
    "Typing tests are a great way to improve your typing speed and accuracy.",
    "Typing accurately is more important than typing fast.",
    "Keep your eyes on the screen.",
    "Your fingers should move automatically.",
    "Practice regularly to improve.",
    "Try not to make mistakes.",
    "A good typist is a fast typist.",
    "Consistency is key.",
    "Always strive to improve.",
    "You can do it!"
  ],
  Advanced: [
    "Advanced typing tests challenge your ability to type complex sentences quickly and accurately.",
    "Typing speed and accuracy are both important.",
    "Do not sacrifice accuracy for speed.",
    "Develop a typing rhythm.",
    "Stay focused on the task.",
    "Every keystroke matters.",
    "Improvement comes with time.",
    "Set realistic goals.",
    "Track your progress regularly.",
    "Never stop practicing."
  ]
};

const TypingTest = () => {
  const [level, setLevel] = useState(null);
  const [lesson, setLesson] = useState(0);
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (level !== null) {
      setSampleText(texts[level][lesson]);
      setInput("");
      setStartTime(null);
      setEndTime(null);
    }
  }, [level, lesson]);

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

  const handleNextLesson = () => {
    if (lesson < texts[level].length - 1) {
      setLesson(lesson + 1);
    } else {
      setLesson(0); // Reset to the first lesson if the last lesson is completed
    }
  };

  return (
    <div className="typing-test-container">
      {!level && <DifficultySelector onSelectLevel={setLevel} />}
      {level && (
        <>
          <TextDisplay text={sampleText} input={input} />
          <InputArea input={input} onInputChange={handleInputChange} />
          {results && <Results results={results} />}
          <Keyboard nextChar={nextChar} />
          {results && (
            <button className="next-lesson-button" onClick={handleNextLesson}>
              Next Lesson
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TypingTest;
