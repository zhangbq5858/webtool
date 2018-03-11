import React from 'react';

const GGBody = ({ history }) => {

  const historyList = history.map( ({ word, count, round }, index) => {
    return (<li key={index}> Round {round} -> {word} has {count} in common</li>);
  });
  return (
    <div className="gg-body">
      <ul>
        {historyList}
      </ul>
    </div>
  );
};


export default GGBody;
