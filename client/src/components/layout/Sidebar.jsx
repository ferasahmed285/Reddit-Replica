import { useState, useEffect } from 'react';
import { 
  Home, TrendingUp, Compass, ChevronRight, ChevronLeft, 
  Clock, Plus, Settings, HelpCircle, Briefcase, FileText, Users, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { communitiesAPI } from '../../services/api';
import CreateCommunityModal from '../community/CreateCommunityModal';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { currentUser } = useAuth();
  const [recentCommunities, setRecentCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleCommunityCreated = (newCommunity) => {
    setJoinedCommunities(prev => [newCommunity, ...prev]);
  };

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
        
        {/* Main Navigation */}
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
          
          {/* Start Community - Only for logged in users */}
          {currentUser && (
            <button 
              className="sidebar-link sidebar-btn" 
              data-tooltip="Start Community"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={20} className="sidebar-icon" />
              {!isCollapsed && <span className="sidebar-text">Start Community</span>}
            </button>
          )}
        </div>

        {!isCollapsed && <hr className="sidebar-divider" />}

        {/* Recent Section - Only show if user is logged in */}
        {!isCollapsed && currentUser && recentCommunities.length > 0 && (
          <>
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
            <hr className="sidebar-divider" />
          </>
        )}

        {/* Communities Section */}
        {!isCollapsed && (
          <>
            <div className="sidebar-section">
              <h3 className="sidebar-title">COMMUNITIES</h3>
              
              {/* Manage Communities - Only for logged in users */}
              {currentUser && (
                <Link to="/manage-communities" className="sidebar-link">
                  <Settings size={18} className="sidebar-icon" />
                  <span className="sidebar-text">Manage Communities</span>
                  {joinedCommunities.length > 0 && (
                    <span className="sidebar-badge">{joinedCommunities.length}</span>
                  )}
                </Link>
              )}
            </div>
            <hr className="sidebar-divider" />
          </>
        )}

        {/* Resources Section */}
        {!isCollapsed && (
          <>
            <div className="sidebar-section">
              <h3 className="sidebar-title">RESOURCES</h3>
              <Link to="/about" className="sidebar-link">
                <FileText size={18} className="sidebar-icon" />
                <span className="sidebar-text">About Reddit</span>
              </Link>
              <Link to="/help" className="sidebar-link">
                <HelpCircle size={18} className="sidebar-icon" />
                <span className="sidebar-text">Help</span>
              </Link>
              <Link to="/blog" className="sidebar-link">
                <FileText size={18} className="sidebar-icon" />
                <span className="sidebar-text">Blog</span>
              </Link>
              <Link to="/careers" className="sidebar-link">
                <Briefcase size={18} className="sidebar-icon" />
                <span className="sidebar-text">Careers</span>
              </Link>
            </div>
            <hr className="sidebar-divider" />
          </>
        )}

        {/* All Communities Link */}
        {!isCollapsed && (
          <>
            <div className="sidebar-section">
              <Link to="/communities" className="sidebar-link communities-expand-btn">
                <Users size={18} className="sidebar-icon" />
                <span className="sidebar-text">Communities</span>
                <ChevronDown size={16} className="expand-icon" />
              </Link>
            </div>
            <hr className="sidebar-divider" />
          </>
        )}

        {/* Footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <p>
              <Link to="/rules">Reddit Rules</Link> · <Link to="/privacy">Privacy Policy</Link>
            </p>
            <p>© 2025 Reddit, Inc.</p>
          </div>
        )}

      </nav>

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCommunityCreated={handleCommunityCreated}
      />
    </aside>
  );
};

export default Sidebar;
