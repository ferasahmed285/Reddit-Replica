import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CommentList from '../components/comment/CommentList';
import VoteButtons from '../components/post/VoteButtons';
import { posts, allPosts } from '../data/posts';
import { getCommentsByPostId } from '../data/comments';
import { getCommunityByName } from '../data/communities';
import '../styles/PostDetailPage.css';

const PostDetailPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const allPostsArray = allPosts || posts;
  const post = allPostsArray.find(p => p.id === parseInt(postId));
  
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Post not found</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Go Home
        </button>
      </div>
    );
  }

  const comments = getCommentsByPostId(post.id) || [];
  const communityData = getCommunityByName(post.subreddit);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onAuthAction();
  };

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
        
        <div style={{ display: 'flex', flex: 1, padding: '20px 24px', gap: '24px' }}>
          <main style={{ flex: 1, maxWidth: '740px' }}>
            
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)} 
              className="back-button"
            >
              ← Back
            </button>

            {/* Post Detail Card */}
            <article className="post-detail-card">
              
              {/* Vote Section */}
              <div className="post-vote-section">
                <VoteButtons 
                  initialCount={post.voteCount || post.votes} 
                  onVote={onAuthAction}
                />
              </div>

              {/* Content Section */}
              <div className="post-content-section">
                
                {/* Header */}
                <div className="post-detail-header">
                  <div className="post-meta">
                    <Link to={`/r/${post.subreddit}`} className="subreddit-link">
                      r/{post.subreddit}
                    </Link>
                    <span className="separator">•</span>
                    <span className="post-time">Posted by</span>
                    <Link to={`/u/${post.author}`} className="author-link">
                      u/{post.author}
                    </Link>
                    <span className="separator">•</span>
                    <span className="post-time">{post.timeAgo}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="post-detail-title">{post.title}</h1>

                {/* Content */}
                <div className="post-detail-content">
                  {post.type === 'image' && (
                    <div className="post-image-container">
                      <img src={post.content} alt={post.title} />
                    </div>
                  )}
                  {post.type === 'text' && (
                    <p className="post-text-content">{post.content}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="post-detail-actions">
                  <button className="action-button">
                    <span>💬</span> {post.comments} Comments
                  </button>
                  <button className="action-button" onClick={onAuthAction}>
                    <span>🔖</span> Save
                  </button>
                  <button className="action-button">
                    <span>↪</span> Share
                  </button>
                  <button className="action-button">
                    <span>•••</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Comment Input */}
            <div className="comment-input-card">
              <p className="comment-as">
                Comment as <Link to="/u/guest">u/guest</Link>
              </p>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="comment-textarea"
                  placeholder="What are your thoughts?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onClick={onAuthAction}
                  rows="4"
                />
                <div className="comment-actions">
                  <button type="submit" className="btn-comment-submit">
                    Comment
                  </button>
                </div>
              </form>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <CommentList 
                comments={comments} 
                onAuthRequired={onAuthAction}
              />
            </div>
          </main>

          {/* Right Sidebar */}
          <div className="desktop-only" style={{ width: '312px' }}>
            <RightSidebar communityData={communityData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
