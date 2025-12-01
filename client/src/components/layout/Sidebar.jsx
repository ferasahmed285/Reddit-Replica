import { Home, TrendingUp, Compass, ChevronRight, ChevronLeft, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { communityItems } from '../../data/sidebar';
import { communities } from '../../data/communities';

const Sidebar = ({ isCollapsed, onToggle }) => {
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
        </div>

        {!isCollapsed && <hr className="sidebar-divider" />}

        {/* Recent Section */}
        {!isCollapsed && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">RECENT</h3>
            {communityItems.slice(0, 3).map((item) => (
              <Link 
                to={item.link} 
                key={item.name} 
                className="sidebar-link community-link"
                data-tooltip={item.name}
              >
                <Clock size={18} className="sidebar-icon" />
                <span className="sidebar-text">{item.name}</span>
              </Link>
            ))}
          </div>
        )}

        {!isCollapsed && <hr className="sidebar-divider" />}

        {/* Communities Section */}
        <div className="sidebar-section">
          {!isCollapsed && <h3 className="sidebar-title">COMMUNITIES</h3>}
          {!isCollapsed && (
            <button className="sidebar-create-btn">
              <Plus size={18} />
              <span className="create-text">Create Community</span>
            </button>
          )}
          {isCollapsed ? (
            <button 
              className="sidebar-create-btn collapsed-create"
              data-tooltip="Create Community"
            >
              <Plus size={20} />
            </button>
          ) : (
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