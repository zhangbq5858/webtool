import React from 'react';

const Button = ( {clickFunc, status}) => {

  const onClickFunc = (event) => {
    clickFunc(event);
  }

//  console.log("Button part ", status, clickFunc);

  return (
    <button onClick={onClickFunc} className="control-button">{status}</button>
  );
};
export default Button;
