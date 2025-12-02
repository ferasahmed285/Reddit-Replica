import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { postsAPI } from '../../services/api';
import '../../styles/VoteButtons.css';

const UpArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-8 8h5v8h6v-8h5z"/>
  </svg>
);

const DownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 20l8-8h-5v-8h-6v8h-5z"/>
  </svg>
);

const VoteButtons = ({ postId, initialCount, initialVote, onVote, onVoteUpdate }) => {
  const [voteState, setVoteState] = useState(initialVote || null);
  const [count, setCount] = useState(initialCount || 0);
  const [isVoting, setIsVoting] = useState(false);
  const { currentUser } = useAuth();

  // Update state when props change
  useEffect(() => {
    setCount(initialCount || 0);
    setVoteState(initialVote || null);
  }, [initialCount, initialVote]);

  const handleVote = async (type) => {
    if (!currentUser) {
      if (onVote) onVote(); // Trigger auth modal if not logged in
      return;
    }

    if (!postId || isVoting) {
      if (!postId) console.error('No postId provided to VoteButtons');
      return;
    }

    // Optimistic update
    const previousVote = voteState;
    const previousCount = count;
    
    let newVote = type;
    let newCount = count;
    
    if (previousVote === type) {
      // Clicking same vote removes it
      newVote = null;
      newCount = type === 'up' ? count - 1 : count + 1;
    } else if (previousVote === null) {
      // No previous vote
      newCount = type === 'up' ? count + 1 : count - 1;
    } else {
      // Switching vote
      newCount = type === 'up' ? count + 2 : count - 2;
    }
    
    setVoteState(newVote);
    setCount(newCount);
    setIsVoting(true);

    try {
      const result = await postsAPI.vote(postId, type);
      // Update with server response
      setCount(result.voteCount);
      setVoteState(result.userVote);
      if (onVoteUpdate) {
        onVoteUpdate(result.voteCount, result.userVote);
      }
    } catch (error) {
      console.error('Vote error:', error);
      // Revert on error
      setVoteState(previousVote);
      setCount(previousCount);
    } finally {
      setIsVoting(false);
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
        disabled={isVoting}
      >
        <UpArrow />
      </button>
      <span className={`vote-count ${voteState === 'up' ? 'upvoted' : ''} ${voteState === 'down' ? 'downvoted' : ''}`}>
        {formatCount(count)}
      </span>
      <button 
        className={`vote-btn downvote ${voteState === 'down' ? 'active' : ''}`}
        onClick={() => handleVote('down')}
        aria-label="Downvote"
        disabled={isVoting}
      >
        <DownArrow />
      </button>
    </div>
  );
};

export default VoteButtons;
