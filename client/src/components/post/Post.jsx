import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Post.css';

const Post = ({ post, onAuthRequired }) => {
  const navigate = useNavigate();
  
  // Restricted Action Handler
  const handleRestrictedAction = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop click from opening post details
    onAuthRequired(); // Trigger login modal
  };

  // Navigate to post detail
  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
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
        
        <button className="btn-join-sm" onClick={handleRestrictedAction}>Join</button>
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
          <button className="icon-btn up" onClick={handleRestrictedAction}>
            ⬆
          </button>
          <span className="vote-count-text">{post.votes}</span>
          <button className="icon-btn down" onClick={handleRestrictedAction}>
            ⬇
          </button>
        </div>

        {/* Comment Pill */}
        <div className="action-pill">
          <span className="icon-msg">💬</span>
          <span className="action-text">{post.comments}</span>
        </div>

        {/* Share/Award Pills */}
        <button className="action-pill btn-share">
          <span className="icon-share">↪</span> Share
        </button>
        
        <button className="action-pill btn-award">
           💎
        </button>
      </div>
    </article>
  );
};

export default Post;