import React from 'react';

const DifficultySelector = ({ onSelectLevel }) => {
  return (
    <div className="difficulty-selector">
      <button onClick={() => onSelectLevel('Beginner')}>Beginner</button>
      <button onClick={() => onSelectLevel('Medium')}>Medium</button>
      <button onClick={() => onSelectLevel('Advanced')}>Advanced</button>
    </div>
  );
};

export default DifficultySelector;
