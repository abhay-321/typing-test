import React from 'react';

const Results = ({ results }) => {
  return (
    <div className="results">
      <p>Time taken: {results.timeTaken.toFixed(2)} seconds</p>
      <p>Words per minute: {results.wpm.toFixed(2)} WPM</p>
      <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
    </div>
  );
};

export default Results;
