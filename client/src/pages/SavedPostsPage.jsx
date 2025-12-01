import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Post from '../components/post/Post';
import { allPosts } from '../data/posts';
import { communities } from '../data/communities';
import { Bookmark } from 'lucide-react';
import '../styles/SavedPostsPage.css';

const SavedPostsPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const [savedPostIds, setSavedPostIds] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    setSavedPostIds(saved);
  }, []);

  const savedPosts = allPosts.filter(post => savedPostIds.includes(post.id));

  const postsWithIcons = savedPosts.map(post => {
    const community = communities.find(c => c.name === `r/${post.subreddit}`);
    return {
      ...post,
      subredditIcon: community ? community.iconUrl : 'https://placehold.co/20/grey/white?text=r/'
    };
  });

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
        
        <div style={{ flex: 1, padding: '20px 24px' }}>
          <div className="saved-header">
            <div className="saved-title-section">
              <Bookmark size={28} />
              <h1>Saved Posts</h1>
            </div>
            <p className="saved-count">{savedPosts.length} saved posts</p>
          </div>

          {savedPosts.length === 0 ? (
            <div className="no-saved-posts">
              <Bookmark size={64} />
              <h2>No saved posts yet</h2>
              <p>Posts you save will appear here</p>
              <Link to="/" className="btn-browse">
                Browse Posts
              </Link>
            </div>
          ) : (
            <div className="saved-posts-list">
              {postsWithIcons.map(post => (
                <Post key={post.id} post={post} onAuthRequired={onAuthAction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPostsPage;
