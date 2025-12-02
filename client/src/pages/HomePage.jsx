import { useState } from 'react';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import '../styles/CommunityPage.css';

const HomePage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const [sortBy, setSortBy] = useState('hot');

  return (
    <div className="home-page">
      
      <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            
            {/* Left Sidebar */}
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />

            {/* Main Content + Right Sidebar */}
            <div style={{ display: 'flex', flex: 1, padding: '20px 24px', gap: '24px' }}>
                <main style={{ flex: 1, maxWidth: '740px' }}>
                  
                  {/* Sorting Controls */}
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

                  {/* 4. Post List with Props */}
                  <PostList 
                    sortBy={sortBy} 
                    onAuthRequired={onAuthAction} 
                  />
                </main>

                {/* Right Sidebar */}
                <div className="desktop-only" style={{ width: '312px' }}>
                   <RightSidebar />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;