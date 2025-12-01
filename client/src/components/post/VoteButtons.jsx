import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/VoteButtons.css';

const VoteButtons = ({ initialCount, onVote }) => {
  const [voteState, setVoteState] = useState(null); // null, 'up', or 'down'
  const [count, setCount] = useState(initialCount);
  const { currentUser } = useAuth();

  const handleVote = (type) => {
    if (!currentUser) {
      if (onVote) onVote(); // Trigger auth modal if not logged in
      return;
    }

    // User is authenticated, handle the vote
    if (voteState === type) {
      // Remove vote
      setVoteState(null);
      setCount(initialCount);
    } else if (voteState === null) {
      // Add vote
      setVoteState(type);
      setCount(type === 'up' ? count + 1 : count - 1);
    } else {
      // Change vote
      setVoteState(type);
      setCount(type === 'up' ? count + 2 : count - 2);
    }
  };

  const formatCount = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="vote-container">
      <button 
        className={`vote-btn upvote ${voteState === 'up' ? 'active' : ''}`}
        onClick={() => handleVote('up')}
        aria-label="Upvote"
      >
        ⬆
      </button>
      <span className="vote-count">{formatCount(count)}</span>
      <button 
        className={`vote-btn downvote ${voteState === 'down' ? 'active' : ''}`}
        onClick={() => handleVote('down')}
        aria-label="Downvote"
      >
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;