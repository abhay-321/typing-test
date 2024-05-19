import React from 'react';

const InputArea = ({ input, onInputChange }) => {
  return (
    <textarea
      className="input-area"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Start typing here..."
    />
  );
};

export default InputArea;
