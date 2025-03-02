import React, { useState } from 'react';

function FlashcardCard({ title, content }) {
  const [showSolution, setShowSolution] = useState(false);

  const formatContent = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
        <br />
      </React.Fragment>
    ));
  };


  return (
    <div >
      <h2><span className="highlight">{title}</span></h2>
      <button onClick={() => setShowSolution(!showSolution)}  className="button">
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </button>
      {showSolution && <div className="card"><span className="Cardtext">{formatContent(content)}</span></div>}
    </div>
  );
}

export default FlashcardCard;
