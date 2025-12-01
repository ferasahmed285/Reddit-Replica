import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import CommunityHeader from '../components/community/CommunityHeader';
import { getCommunityByName } from '../data/communities';
import '../styles/CommunityPage.css';

const CommunityPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { subreddit } = useParams();
  const communityData = getCommunityByName(subreddit);
  const [sortBy, setSortBy] = useState('hot');
  const { currentUser } = useAuth();

  if (!communityData) return <div>Community not found</div>;

  return (
    <div className="community-page">
      
      <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
                
                <CommunityHeader 
                  name={communityData.name}
                  title={communityData.title}
                  bannerUrl={communityData.bannerUrl}
                  iconUrl={communityData.iconUrl}
                  members={communityData.members}
                  onAuthRequired={onAuthAction}
                  communityId={subreddit}
                />

                <div style={{ display: 'flex', padding: '20px 24px', gap: '24px' }}>
                    <main style={{ flex: 1, maxWidth: '740px' }}>
                      
                      {/* 4. NEW: Sorting Controls & Create Post Trigger */}
                      <div className="feed-controls">
                        <button 
                          className={`btn-sort ${sortBy === 'hot' ? 'active' : ''}`} 
                          onClick={() => setSortBy('hot')}
                        >
                          🔥 Hot
                        </button>
                        <button 
                          className={`btn-sort ${sortBy === 'new' ? 'active' : ''}`} 
                          onClick={() => setSortBy('new')}
                        >
                          ✨ New
                        </button>
                        <button 
                          className={`btn-sort ${sortBy === 'top' ? 'active' : ''}`} 
                          onClick={() => setSortBy('top')}
                        >
                          ⬆ Top
                        </button>
                        
                        {/* Show Create Post button - triggers login if not authenticated */}
                        <button 
                          className="btn-sort" 
                          style={{ marginLeft: 'auto' }} 
                          onClick={currentUser ? () => {/* TODO: Open create post modal */} : onAuthAction} 
                        >
                          + Create Post
                        </button>
                      </div>

                      {/* 5. Pass props to PostList */}
                      <PostList 
                        filterBySubreddit={subreddit} 
                        sortBy={sortBy} 
                        onAuthRequired={onAuthAction} 
                      />
                    </main>

                    <div className="desktop-only" style={{ width: '312px' }}>
                        <RightSidebar communityData={communityData} />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityPage;