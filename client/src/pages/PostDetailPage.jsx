import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CommentList from '../components/comment/CommentList';
import VoteButtons from '../components/post/VoteButtons';
import { postsAPI, commentsAPI } from '../services/api';
import { getCommunityByName } from '../data/communities';
import '../styles/PostDetailPage.css';

const PostDetailPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          postsAPI.getById(postId),
          commentsAPI.getByPostId(postId)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleSavePost = async () => {
    try {
      const result = await postsAPI.save(postId);
      setSaved(result.saved);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      onAuthAction();
      return;
    }

    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      const commentData = {
        postId: parseInt(postId),
        content: commentText.trim()
      };
      // Only add parentId if it exists
      // Don't send null as it fails validation
      
      const newComment = await commentsAPI.create(commentData);
      
      setComments(prev => [...prev, newComment]);
      setCommentText('');
      
      // Update post comment count
      setPost(prev => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1
      }));
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert(`Failed to submit comment: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

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

  const communityData = getCommunityByName(post.subreddit);

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
                    <span>💬</span> {post.commentCount || 0} Comments
                  </button>
                  <button className="action-button" onClick={currentUser ? handleSavePost : onAuthAction}>
                    <span>🔖</span> {saved ? 'Unsave' : 'Save'}
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
                Comment as <Link to={currentUser ? `/u/${currentUser.username}` : '#'}>
                  u/{currentUser ? currentUser.username : 'guest'}
                </Link>
              </p>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="comment-textarea"
                  placeholder="What are your thoughts?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onFocus={!currentUser ? onAuthAction : undefined}
                  rows="4"
                  disabled={submitting}
                />
                <div className="comment-actions">
                  <button type="submit" className="btn-comment-submit" disabled={submitting || !commentText.trim()}>
                    {submitting ? 'Posting...' : 'Comment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <CommentList 
                comments={comments} 
                onAuthRequired={onAuthAction}
                onReplyAdded={(parentId, newReply) => {
                  // Add reply to the comments tree
                  setComments(prev => {
                    const addReplyToComment = (commentsList) => {
                      return commentsList.map(comment => {
                        if (comment.id === parentId) {
                          return {
                            ...comment,
                            replies: [...(comment.replies || []), newReply]
                          };
                        } else if (comment.replies) {
                          return {
                            ...comment,
                            replies: addReplyToComment(comment.replies)
                          };
                        }
                        return comment;
                      });
                    };
                    return addReplyToComment(prev);
                  });
                  
                  // Update post comment count
                  setPost(prev => ({
                    ...prev,
                    commentCount: (prev.commentCount || 0) + 1
                  }));
                }}
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
