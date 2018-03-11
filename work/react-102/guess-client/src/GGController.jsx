import React from 'react';
import GGButton from './GGButton';



const GGControls = ({ mode, word, submitWord, onUpdateWord }) => {
  const checkForSubmit = (event) => {
    if(event.key === "Enter") {
      submitWord();
    }
  };

  const updateWord = (event) => {
    onUpdateWord(event.target.value);
  };

  return (
    <div className="gg-controls">
      <div>Word: <input value={word} onKeyPress={checkForSubmit} onChange={updateWord}/><GGButton text={mode} onClick={submitWord}/></div>
    </div>
  );

};

export default GGControls;
