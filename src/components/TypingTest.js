import React, { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import InputArea from './InputArea';
import Results from './Results';
import Keyboard from './Keyboard';
import DifficultySelector from './DifficultySelector';

const texts = {
    Beginner: [
      "This is a sample text for typing test. Start slowly and focus on accuracy.",
      "Simple text to start typing. Remember to maintain a steady pace and avoid errors.",
      "Practice makes perfect. Keep practicing to improve your typing speed and accuracy.",
      "Typing can be fun. Enjoy the process of learning and mastering typing skills.",
      "Just keep typing. Consistency is key to becoming a proficient typist.",
      "Accuracy is important. Aim for precision rather than speed in the beginning.",
      "Speed comes with practice. As you practice more, your typing speed will naturally increase.",
      "Focus on the screen. Avoid looking at your keyboard while typing to improve your touch typing skills.",
      "Don't look at the keyboard. Trust your muscle memory to find the keys without looking down.",
      "You are doing great! Celebrate your progress and keep challenging yourself with new texts."
    ],
    Medium: [
      "Typing tests are a great way to improve your typing speed and accuracy. Keep challenging yourself with longer and more complex texts.",
      "Typing accurately is more important than typing fast. Focus on minimizing errors even as the texts get longer.",
      "Keep your eyes on the screen. Avoid distractions and maintain concentration as the difficulty increases.",
      "Your fingers should move automatically. Let your muscle memory guide your typing, especially with longer texts.",
      "Practice regularly to improve. Consistent practice leads to significant progress, especially with challenging texts.",
      "Try not to make mistakes. Pay close attention to your typing accuracy even as the texts become more complex.",
      "A good typist is a fast typist. Strive to increase your typing speed while maintaining high accuracy.",
      "Consistency is key. Make typing practice a regular part of your routine, even with longer and more challenging texts.",
      "Always strive to improve. Set goals and work towards becoming a better typist with each practice session.",
      "You can do it! Believe in yourself and your ability to master typing, even with the most difficult texts."
    ],
    Advanced: [
      "Advanced typing tests challenge your ability to type complex sentences quickly and accurately. Push yourself to the next level with longer and more intricate texts.",
      "Typing speed and accuracy are both important. Aim for a balance between speed and precision, especially with the most challenging texts.",
      "Do not sacrifice accuracy for speed. Focus on maintaining high accuracy even at faster speeds, especially with the most complex texts.",
      "Develop a typing rhythm. Find a comfortable pace and rhythm that allows you to type efficiently, even with the most demanding texts.",
      "Stay focused on the task. Minimize distractions and concentrate fully on your typing, especially with the longest and most difficult texts.",
      "Every keystroke matters. Pay attention to every character you type to avoid errors, especially with intricate and technical texts.",
      "Improvement comes with time. Be patient and persistent in your typing practice, especially when tackling the most challenging texts.",
      "Set realistic goals. Break down your typing goals into achievable milestones, especially when working with the most extensive texts.",
      "Track your progress regularly. Monitor your typing speed and accuracy to measure improvement, especially with the most challenging texts.",
      "Never stop practicing. Continuous practice is essential for maintaining and improving typing skills, especially with the most advanced texts."
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
