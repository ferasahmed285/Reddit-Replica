import React from 'react';

const VoteButtons = ({ initialCount }) => {
  return (
    <div className="vote-container">
      <button className="vote-btn upvote" aria-label="Upvote">
        ⬆
      </button>
      <span className="vote-count">{initialCount}</span>
      <button className="vote-btn downvote" aria-label="Downvote">
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;