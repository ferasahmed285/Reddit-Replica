import React, { useState } from 'react'; // 1. Import useState
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import CommunityHeader from '../components/community/CommunityHeader';
import { getCommunityByName } from '../data/communities';
import '../styles/CommunityPage.css'; // Optional: Create this for the sort buttons

// 2. Accept onAuthAction prop
const CommunityPage = ({ onAuthAction }) => {
  const { subreddit } = useParams();
  const communityData = getCommunityByName(subreddit);
  
  // 3. State for sorting
  const [sortBy, setSortBy] = useState('hot');

  if (!communityData) return <div>Community not found</div>;

  return (
    <div className="community-page">
      
      <div style={{ display: 'flex', backgroundColor: '#DAE0E6', minHeight: '100vh' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'center' }}>
            
            <div style={{ display: 'block' }}> 
               <Sidebar />
            </div>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
                
                <CommunityHeader 
                  name={communityData.name}
                  title={communityData.title}
                  bannerUrl={communityData.bannerUrl}
                  iconUrl={communityData.iconUrl}
                  members={communityData.members}
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
                        
                        {/* Requirement: Trigger Login on Create Post */}
                        <button 
                          className="btn-sort" 
                          style={{ marginLeft: 'auto' }} 
                          onClick={onAuthAction} 
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