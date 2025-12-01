import { useState, useEffect } from 'react';
import { Home, TrendingUp, Compass, ChevronRight, ChevronLeft, Clock, Plus, Bookmark, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { communitiesAPI } from '../../services/api';
import '../../styles/Sidebar.css';
import { communities } from '../../data/communities';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { currentUser } = useAuth();
  const [recentCommunities, setRecentCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!currentUser) {
        setRecentCommunities([]);
        setJoinedCommunities([]);
        return;
      }

      try {
        const [recent, joined] = await Promise.all([
          communitiesAPI.getRecent().catch(() => []),
          communitiesAPI.getJoined().catch(() => [])
        ]);
        setRecentCommunities(recent);
        setJoinedCommunities(joined);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, [currentUser]);
  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* Toggle Button */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={onToggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <nav className="sidebar-nav">
        
        {/* Top Section */}
        <div className="sidebar-section">
          <Link to="/" className="sidebar-link" data-tooltip="Home">
            <Home size={20} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-text">Home</span>}
          </Link>
          <Link to="/r/popular" className="sidebar-link" data-tooltip="Popular">
            <TrendingUp size={20} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-text">Popular</span>}
          </Link>
          <Link to="/explore" className="sidebar-link" data-tooltip="Explore">
            <Compass size={20} className="sidebar-icon" />
            {!isCollapsed && <span className="sidebar-text">Explore</span>}
          </Link>
          {currentUser && (
            <Link to="/saved" className="sidebar-link" data-tooltip="Saved">
              <Bookmark size={20} className="sidebar-icon" />
              {!isCollapsed && <span className="sidebar-text">Saved</span>}
            </Link>
          )}
        </div>

        {!isCollapsed && <hr className="sidebar-divider" />}

        {/* Recent Section - Only show if user is logged in */}
        {!isCollapsed && currentUser && recentCommunities.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">RECENT</h3>
            {recentCommunities.slice(0, 3).map((community) => (
              <Link 
                to={`/r/${community.id}`} 
                key={community.id} 
                className="sidebar-link community-link"
                data-tooltip={community.name}
              >
                <Clock size={18} className="sidebar-icon" />
                <span className="sidebar-text">{community.name}</span>
              </Link>
            ))}
          </div>
        )}

        {!isCollapsed && currentUser && recentCommunities.length > 0 && <hr className="sidebar-divider" />}

        {/* Joined Communities Section */}
        {!isCollapsed && currentUser && joinedCommunities.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">YOUR COMMUNITIES</h3>
            {joinedCommunities.map((community) => (
              <Link 
                to={`/r/${community.id}`} 
                key={community.id} 
                className="sidebar-link community-link"
                data-tooltip={community.name}
              >
                <Users size={18} className="sidebar-icon" />
                <span className="sidebar-text">{community.name}</span>
              </Link>
            ))}
          </div>
        )}

        {!isCollapsed && <hr className="sidebar-divider" />}

        {/* Communities Section */}
        <div className="sidebar-section">
          {!isCollapsed && <h3 className="sidebar-title">COMMUNITIES</h3>}
          {currentUser && !isCollapsed && (
            <button className="sidebar-create-btn">
              <Plus size={18} />
              <span className="create-text">Create Community</span>
            </button>
          )}
          {currentUser && isCollapsed ? (
            <button 
              className="sidebar-create-btn collapsed-create"
              data-tooltip="Create Community"
            >
              <Plus size={20} />
            </button>
          ) : null}
          {!isCollapsed && (
            communities.map((community) => (
              <Link 
                to={`/r/${community.id}`}
                key={community.id} 
                className="sidebar-link community-link"
                data-tooltip={community.name}
              >
                <div className="community-avatar">{community.name.charAt(2)}</div>
                <span className="sidebar-text">{community.name}</span>
              </Link>
            ))
          )}
        </div>

        {/* ... Resources and Footer sections remain the same ... */}
        
        {!isCollapsed && (
          <>
            <hr className="sidebar-divider" />
            <div className="sidebar-footer">
              <p>Reddit Rules · Privacy Policy</p>
              <p>© 2025 Reddit, Inc.</p>
            </div>
          </>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;