import { useState } from 'react';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import usePageTitle from '../hooks/usePageTitle';
import '../styles/CommunityPage.css';

const HomePage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const [sortBy, setSortBy] = useState('hot');
  
  usePageTitle('Home');

  return (
    <div className="home-page page-layout">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
      
      <div className="page-content-wrapper">
        <div className="page-content">
          <div className="page-main-area">
            <main className="page-main-content">
              <div className="feed-controls">
                <button 
                  className={`btn-sort ${sortBy === 'hot' ? 'active' : ''}`} 
                  onClick={() => setSortBy('hot')}
                >
                  <Flame size={18} /> Hot
                </button>
                <button 
                  className={`btn-sort ${sortBy === 'new' ? 'active' : ''}`} 
                  onClick={() => setSortBy('new')}
                >
                  <Sparkles size={18} /> New
                </button>
                <button 
                  className={`btn-sort ${sortBy === 'top' ? 'active' : ''}`} 
                  onClick={() => setSortBy('top')}
                >
                  <TrendingUp size={18} /> Top
                </button>
              </div>

              <PostList 
                sortBy={sortBy} 
                onAuthRequired={onAuthAction} 
              />
            </main>

            <div className="desktop-only page-right-sidebar">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;