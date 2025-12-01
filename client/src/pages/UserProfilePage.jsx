import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { getUserByName } from '../data/users';
import { posts } from '../data/posts';
import { getAllCommentsByUser } from '../data/expandedData';
import { MessageSquare, Cake, Award } from 'lucide-react';
import '../styles/UserProfilePage.css';

const UserProfilePage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { username } = useParams();
  const user = getUserByName(username);
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>User not found</h2>
        <p>u/{username} doesn't exist</p>
      </div>
    );
  }

  const userPosts = posts.filter(p => p.author === user.username);
  const userComments = getAllCommentsByUser(user.username);

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
        
        <div style={{ flex: 1, padding: '20px 24px' }}>
          
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-banner" style={{ background: user.bannerColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            
            <div className="profile-info-container">
              <div className="profile-avatar-section">
                <img src={user.avatar} alt={user.username} className="profile-avatar-large" />
              </div>
              
              <div className="profile-details">
                <h1 className="profile-username">u/{user.username}</h1>
                <div className="profile-meta">
                  <span className="profile-meta-item">
                    <Cake size={16} />
                    Cake day: {user.cakeDay}
                  </span>
                  <span className="profile-meta-item">
                    <Award size={16} />
                    {user.karma} karma
                  </span>
                </div>
                {user.bio && <p className="profile-bio">{user.bio}</p>}
              </div>

              <div className="profile-actions">
                <button className="btn-profile-action btn-primary" onClick={onAuthAction}>
                  Follow
                </button>
                <button className="btn-profile-action btn-secondary" onClick={onAuthAction}>
                  Chat
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts ({userPosts.length})
            </button>
            <button 
              className={`profile-tab ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments ({userComments.length})
            </button>
          </div>

          {/* Content */}
          <div className="profile-content">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="profile-overview">
                <div className="overview-section">
                  <h3>Recent Posts</h3>
                  {userPosts.slice(0, 3).map(post => (
                    <Link to={`/post/${post.id}`} key={post.id} className="overview-item">
                      <div className="overview-item-header">
                        <span className="overview-subreddit">r/{post.subreddit}</span>
                        <span className="overview-time">{post.timeAgo}</span>
                      </div>
                      <h4 className="overview-title">{post.title}</h4>
                      <div className="overview-stats">
                        <span>{post.votes} upvotes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </Link>
                  ))}
                  {userPosts.length === 0 && <p className="empty-state">No posts yet</p>}
                </div>

                <div className="overview-section">
                  <h3>Recent Comments</h3>
                  {userComments.slice(0, 5).map(comment => (
                    <Link to={`/post/${comment.postId}`} key={comment.id} className="overview-item">
                      <div className="overview-item-header">
                        <span className="overview-subreddit">r/{comment.subreddit}</span>
                        <span className="overview-time">{comment.timeAgo}</span>
                      </div>
                      <p className="overview-comment">{comment.content}</p>
                      <div className="overview-stats">
                        <span>{comment.voteCount} upvotes</span>
                      </div>
                    </Link>
                  ))}
                  {userComments.length === 0 && <p className="empty-state">No comments yet</p>}
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="profile-posts">
                {userPosts.map(post => (
                  <Link to={`/post/${post.id}`} key={post.id} className="user-post-card">
                    <div className="post-card-header">
                      <span className="post-subreddit">r/{post.subreddit}</span>
                      <span className="post-time">{post.timeAgo}</span>
                    </div>
                    <h3 className="post-card-title">{post.title}</h3>
                    {post.type === 'text' && post.content && (
                      <p className="post-card-preview">{post.content.substring(0, 200)}...</p>
                    )}
                    {post.type === 'image' && (
                      <div className="post-card-image">
                        <img src={post.content} alt={post.title} />
                      </div>
                    )}
                    <div className="post-card-footer">
                      <span className="post-stat">{post.votes} upvotes</span>
                      <span className="post-stat">
                        <MessageSquare size={16} />
                        {post.comments} comments
                      </span>
                    </div>
                  </Link>
                ))}
                {userPosts.length === 0 && (
                  <div className="empty-state-large">
                    <p>u/{user.username} hasn't posted anything yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div className="profile-comments">
                {userComments.map(comment => (
                  <div key={comment.id} className="user-comment-card">
                    <div className="comment-card-header">
                      <Link to={`/r/${comment.subreddit}`} className="comment-subreddit">
                        r/{comment.subreddit}
                      </Link>
                      <span className="comment-separator">•</span>
                      <span className="comment-time">{comment.timeAgo}</span>
                    </div>
                    <Link to={`/post/${comment.postId}`} className="comment-post-title">
                      {comment.postTitle}
                    </Link>
                    <p className="comment-content">{comment.content}</p>
                    <div className="comment-card-footer">
                      <span className="comment-votes">{comment.voteCount} points</span>
                    </div>
                  </div>
                ))}
                {userComments.length === 0 && (
                  <div className="empty-state-large">
                    <p>u/{user.username} hasn't commented yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
