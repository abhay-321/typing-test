import React from 'react';

const DifficultySelector = ({ onSelectLevel }) => {
  return (
    <div className="difficulty-selector">
      <h3>Please choose a level to begin...</h3>  
      <button onClick={() => onSelectLevel('Beginner')}>Beginner</button>
      <button onClick={() => onSelectLevel('Medium')}>Medium</button>
      <button onClick={() => onSelectLevel('Advanced')}>Advanced</button>
    </div>
  );
};

export default DifficultySelector;
