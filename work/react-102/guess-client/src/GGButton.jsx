import React from 'react';


const GGButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};
export default GGButton;
