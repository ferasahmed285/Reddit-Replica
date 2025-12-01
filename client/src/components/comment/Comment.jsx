import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Comment.css';

const Comment = ({ comment, onAuthRequired, onReplyAdded, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [voteState, setVoteState] = useState(null);
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const { currentUser } = useAuth();

  const handleVote = (type) => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    // User is authenticated, handle the vote
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

  const handleReply = () => {
    if (!currentUser) {
      onAuthRequired();
    } else {
      setShowReplyForm(!showReplyForm);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);
      const { commentsAPI } = await import('../../services/api');
      const newReply = await commentsAPI.create({
        postId: comment.postId,
        content: replyText.trim(),
        parentId: comment.id
      });
      
      if (onReplyAdded) {
        onReplyAdded(comment.id, newReply);
      }
      
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert(`Failed to submit reply: ${error.message}`);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleShare = () => {
    if (!currentUser) {
      onAuthRequired();
    } else {
      // TODO: Open share modal
      console.log('Open share modal');
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
              <button className="comment-action-btn" onClick={handleReply}>
                Reply
              </button>
              <button className="comment-action-btn" onClick={handleShare}>
                Share
              </button>
              <button className="comment-action-btn">•••</button>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
              <form onSubmit={handleReplySubmit} className="reply-form">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows="3"
                  disabled={submittingReply}
                />
                <div className="reply-actions">
                  <button type="button" onClick={() => setShowReplyForm(false)} disabled={submittingReply}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submittingReply || !replyText.trim()}>
                    {submittingReply ? 'Replying...' : 'Reply'}
                  </button>
                </div>
              </form>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="comment-replies">
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onAuthRequired={onAuthRequired}
                    onReplyAdded={onReplyAdded}
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
