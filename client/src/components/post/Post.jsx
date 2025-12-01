import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ShareModal from './ShareModal';
import '../../styles/Post.css';

const Post = ({ post, onAuthRequired, onVoteUpdate }) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [voteState, setVoteState] = useState(null);
  const [localVoteCount, setLocalVoteCount] = useState(post.voteCount || post.votes);
  const [joined, setJoined] = useState(false);
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  
  // Handle voting
  const handleVote = async (e, voteType) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    try {
      const { postsAPI } = await import('../../services/api');
      const updatedPost = await postsAPI.vote(post.id, voteType);
      setLocalVoteCount(updatedPost.voteCount);
      setVoteState(voteType);
      if (onVoteUpdate) {
        onVoteUpdate(post.id, updatedPost.voteCount);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  // Handle join
  const handleJoin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    try {
      const { communitiesAPI } = await import('../../services/api');
      const result = await communitiesAPI.join(post.subreddit);
      setJoined(result.joined);
      showToast(
        result.joined ? `Joined r/${post.subreddit}! 🎉` : `Left r/${post.subreddit}`,
        'success'
      );
      // Refresh page after short delay to update sidebar
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Join error:', error);
      showToast(`Failed to join: ${error.message}`, 'error');
    }
  };

  // Navigate to post detail
  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  // Handle share button click
  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  return (
    <article className="post-card" onClick={handlePostClick}>
      {/* 1. Header: Subreddit, User, Time */}
      <div className="post-header-row">
        {post.subredditIcon && <img src={post.subredditIcon} alt="" className="post-sub-icon" />}
        
        <div className="post-meta-text">
          <Link to={`/r/${post.subreddit}`} className="post-subreddit-link">
            r/{post.subreddit}
          </Link>
          <span className="separator">•</span>
          <span className="post-time">{post.timeAgo}</span>
          <span className="separator">•</span>
          <Link to={`/u/${post.author}`} className="post-user-link">
            {post.author}
          </Link>
        </div>
        
        <button className={`btn-join-sm ${joined ? 'joined' : ''}`} onClick={handleJoin}>
          {joined ? 'Joined' : 'Join'}
        </button>
        <button className="btn-options">•••</button>
      </div>

      {/* 2. Title */}
      <h3 className="post-title-new">{post.title}</h3>

      {/* 3. Content (Image or Text) */}
      <div className="post-content-new">
        {post.type === 'image' && (
           <div className="media-container">
             <img src={post.content} alt={post.title} />
           </div>
        )}
        {post.type === 'text' && (
           <p className="text-preview">{post.content}</p>
        )}
      </div>

      {/* 4. Footer Actions (Pills) */}
      <div className="post-footer-new">
        
        {/* Vote Pill */}
        <div className="action-pill">
          <button 
            className={`icon-btn up ${voteState === 'up' ? 'active' : ''}`}
            onClick={(e) => handleVote(e, 'up')}
          >
            ⬆
          </button>
          <span className="vote-count-text">{localVoteCount}</span>
          <button 
            className={`icon-btn down ${voteState === 'down' ? 'active' : ''}`}
            onClick={(e) => handleVote(e, 'down')}
          >
            ⬇
          </button>
        </div>

        {/* Comment Pill */}
        <div className="action-pill">
          <span className="icon-msg">💬</span>
          <span className="action-text">{post.commentCount || post.comments || 0}</span>
        </div>

        {/* Share/Award Pills */}
        <button className="action-pill btn-share" onClick={handleShareClick}>
          <span className="icon-share">↪</span> Share
        </button>
        
        <button className="action-pill btn-award">
           💎
        </button>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postId={post.id}
        postTitle={post.title}
      />
    </article>
  );
};

export default Post;