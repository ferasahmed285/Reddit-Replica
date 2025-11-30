import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import '../styles/CommunityPage.css'; // Reusing the sort button styles we created

const HomePage = ({ onAuthAction }) => {
  // 1. State for sorting
  const [sortBy, setSortBy] = useState('hot');

  return (
    <div className="home-page">
      
      <div style={{ display: 'flex', backgroundColor: '#DAE0E6', minHeight: '100vh' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'center' }}>
            
            {/* Left Sidebar */}
            <div style={{ display: 'block' }}> 
               <Sidebar />
            </div>

            {/* Main Content + Right Sidebar */}
            <div style={{ display: 'flex', flex: 1, padding: '20px 24px', gap: '24px' }}>
                <main style={{ flex: 1, maxWidth: '740px' }}>
                  
                  {/* 2. "Create Post" Input Bar (Triggers Login) */}
                  <div style={{ 
                    background: '#fff', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    border: '1px solid #ccc' 
                  }}>
                      <div style={{ marginRight: '8px' }}>
                         <img 
                           src="https://placehold.co/38/edeff1/878a8c?text=Snoo" 
                           alt="User" 
                           style={{ width: '38px', height: '38px', borderRadius: '50%' }}
                         />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Create Post" 
                        style={{ 
                          flex: 1, 
                          background: '#f6f7f8', 
                          border: '1px solid #edeff1', 
                          borderRadius: '4px', 
                          padding: '10px 16px',
                          outline: 'none',
                          cursor: 'text'
                        }}
                        onClick={onAuthAction} // Trigger Login Modal
                      />
                      <button onClick={onAuthAction} style={{ border: 'none', background: 'none', fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }}>🖼️</button>
                      <button onClick={onAuthAction} style={{ border: 'none', background: 'none', fontSize: '20px', marginLeft: '8px', cursor: 'pointer' }}>🔗</button>
                  </div>

                  {/* 3. Sorting Controls */}
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