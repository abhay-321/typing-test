import React from 'react';

const TextDisplay = ({ text, input }) => {
  const getHighlightedText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      if (index < input.length) {
        className = input[index] === char ? 'correct-char' : 'incorrect-char';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <p className="text-display">
      {getHighlightedText()}
    </p>
  );
};

export default TextDisplay;
