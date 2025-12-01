import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Post from '../components/post/Post';
import { allPosts } from '../data/posts';
import { communities } from '../data/communities';
import { users } from '../data/users';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search in posts
  const matchingPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(query.toLowerCase())) ||
    post.author.toLowerCase().includes(query.toLowerCase()) ||
    post.subreddit.toLowerCase().includes(query.toLowerCase())
  );

  // Search in communities
  const matchingCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(query.toLowerCase()) ||
    community.title.toLowerCase().includes(query.toLowerCase()) ||
    community.description.toLowerCase().includes(query.toLowerCase())
  );

  // Search in users
  const matchingUsers = users.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    (user.bio && user.bio.toLowerCase().includes(query.toLowerCase()))
  );

  const totalResults = matchingPosts.length + matchingCommunities.length + matchingUsers.length;

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
        
        <div style={{ flex: 1, padding: '20px 24px' }}>
          <div className="search-header">
            <h1 className="search-title">Search results for "{query}"</h1>
            <p className="search-count">{totalResults} results found</p>
          </div>

          {totalResults === 0 && (
            <div className="no-results">
              <h2>No results found</h2>
              <p>Try different keywords or check your spelling</p>
            </div>
          )}

          {/* Communities Results */}
          {matchingCommunities.length > 0 && (
            <div className="search-section">
              <h2 className="section-title">Communities ({matchingCommunities.length})</h2>
              <div className="communities-results">
                {matchingCommunities.map(community => (
                  <Link to={`/r/${community.id}`} key={community.id} className="community-result">
                    <img src={community.iconUrl} alt={community.name} className="community-result-icon" />
                    <div className="community-result-info">
                      <h3>{community.name}</h3>
                      <p>{community.description}</p>
                      <span className="community-members">{community.members} members</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Users Results */}
          {matchingUsers.length > 0 && (
            <div className="search-section">
              <h2 className="section-title">Users ({matchingUsers.length})</h2>
              <div className="users-results">
                {matchingUsers.map(user => (
                  <Link to={`/user/${user.username}`} key={user.username} className="user-result">
                    <img src={user.avatar} alt={user.username} className="user-result-avatar" />
                    <div className="user-result-info">
                      <h3>u/{user.username}</h3>
                      <p>{user.bio}</p>
                      <span className="user-karma">{user.karma} karma</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts Results */}
          {matchingPosts.length > 0 && (
            <div className="search-section">
              <h2 className="section-title">Posts ({matchingPosts.length})</h2>
              <div className="posts-results">
                {matchingPosts.map(post => {
                  const community = communities.find(c => c.name === `r/${post.subreddit}`);
                  const postWithIcon = {
                    ...post,
                    subredditIcon: community ? community.iconUrl : 'https://placehold.co/20/grey/white?text=r/'
                  };
                  return (
                    <Post key={post.id} post={postWithIcon} onAuthRequired={onAuthAction} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
