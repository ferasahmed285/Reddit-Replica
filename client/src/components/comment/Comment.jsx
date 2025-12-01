import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Comment.css';

const Comment = ({ comment, onAuthRequired, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [voteState, setVoteState] = useState(null);
  const [voteCount, setVoteCount] = useState(comment.voteCount);

  const handleVote = (type) => {
    if (onAuthRequired) {
      onAuthRequired();
      return;
    }

    if (voteState === type) {
      setVoteState(null);
      setVoteCount(comment.voteCount);
    } else if (voteState === null) {
      setVoteState(type);
      setVoteCount(type === 'up' ? voteCount + 1 : voteCount - 1);
    } else {
      setVoteState(type);
      setVoteCount(type === 'up' ? voteCount + 2 : voteCount - 2);
    }
  };

  const formatCount = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="comment-container" style={{ marginLeft: depth > 0 ? '24px' : '0' }}>
      <div className="comment-thread-line" onClick={() => setIsExpanded(!isExpanded)} />
      
      <div className="comment-content">
        <div className="comment-header">
          <Link to={`/user/${comment.author}`} className="comment-author">
            u/{comment.author}
          </Link>
          <span className="comment-time">{comment.timeAgo}</span>
        </div>

        {isExpanded && (
          <>
            <div className="comment-body">
              <p>{comment.content}</p>
            </div>

            <div className="comment-actions">
              <button 
                className={`comment-vote-btn ${voteState === 'up' ? 'active-up' : ''}`}
                onClick={() => handleVote('up')}
              >
                ⬆
              </button>
              <span className="comment-vote-count">{formatCount(voteCount)}</span>
              <button 
                className={`comment-vote-btn ${voteState === 'down' ? 'active-down' : ''}`}
                onClick={() => handleVote('down')}
              >
                ⬇
              </button>
              <button className="comment-action-btn" onClick={onAuthRequired}>
                Reply
              </button>
              <button className="comment-action-btn" onClick={onAuthRequired}>
                Share
              </button>
              <button className="comment-action-btn">•••</button>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="comment-replies">
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onAuthRequired={onAuthRequired}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {!isExpanded && (
          <button 
            className="expand-comment-btn"
            onClick={() => setIsExpanded(true)}
          >
            [+] Show comment
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
