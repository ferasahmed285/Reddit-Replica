import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flame, Sparkles, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import PostList from '../components/post/PostList';
import CommunityHeader from '../components/community/CommunityHeader';
import CreatePostModal from '../components/post/CreatePostModal';
import JoinPromptModal from '../components/community/JoinPromptModal';
import { PostListSkeleton } from '../components/common/LoadingSkeleton';
import { communitiesAPI } from '../services/api';
import '../styles/CommunityPage.css';

const CommunityPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { subreddit } = useParams();
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('hot');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isJoinPromptOpen, setIsJoinPromptOpen] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const data = await communitiesAPI.getById(subreddit);
        setCommunityData(data);
        
        // Check if user has joined this community
        if (currentUser) {
          try {
            const joinedCommunities = await communitiesAPI.getJoined();
            const isJoined = joinedCommunities.some(c => 
              c.name === subreddit || c.name === data.name
            );
            setHasJoined(isJoined);
          } catch (err) {
            console.error('Error checking join status:', err);
          }
        } else {
          setHasJoined(false);
        }
      } catch (error) {
        console.error('Error fetching community:', error);
        setCommunityData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [subreddit, currentUser]);

  const handleCreatePostClick = () => {
    if (!currentUser) {
      onAuthAction();
      return;
    }
    
    if (!hasJoined) {
      setIsJoinPromptOpen(true);
      return;
    }
    
    setIsCreatePostOpen(true);
  };

  const handleJoinAndPost = async () => {
    try {
      const result = await communitiesAPI.join(subreddit);
      if (result.joined) {
        setHasJoined(true);
        setIsJoinPromptOpen(false);
        setIsCreatePostOpen(true);
        showToast(`Joined r/${subreddit}! 🎉`, 'success');
      }
    } catch (error) {
      console.error('Error joining community:', error);
      showToast(`Failed to join: ${error.message}`, 'error');
    }
  };

  if (loading) {
    return (
      <div className="community-page">
        <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
          <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
              {/* Banner skeleton */}
              <div className="skeleton" style={{ height: '180px', width: '100%' }} />
              <div style={{ display: 'flex', padding: '20px 24px', gap: '24px' }}>
                <main style={{ flex: 1, maxWidth: '740px' }}>
                  <div className="skeleton" style={{ height: '40px', marginBottom: '16px', borderRadius: '8px' }} />
                  <PostListSkeleton count={4} />
                </main>
                <div className="desktop-only" style={{ width: '312px' }}>
                  <RightSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!communityData) return <div style={{ padding: '40px', textAlign: 'center' }}>Community not found</div>;

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
                  onAuthRequired={onAuthAction}
                  communityId={subreddit}
                  communityData={communityData}
                  onCommunityUpdated={() => window.location.reload()}
                />

                <div style={{ display: 'flex', padding: '20px 24px', gap: '24px' }}>
                    <main style={{ flex: 1, maxWidth: '740px' }}>
                      
                      {/* 4. NEW: Sorting Controls & Create Post Trigger */}
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
                        
                        {/* Show Create Post button - triggers login if not authenticated */}
                        <button 
                          className="btn-sort btn-create-post" 
                          style={{ marginLeft: 'auto' }} 
                          onClick={handleCreatePostClick} 
                        >
                          <Plus size={18} /> Create Post
                        </button>
                      </div>

                      {/* 5. Pass props to PostList */}
                      <PostList 
                        key={refreshKey}
                        filterBySubreddit={subreddit} 
                        sortBy={sortBy} 
                        onAuthRequired={onAuthAction} 
                      />

                      {/* Join Prompt Modal */}
                      <JoinPromptModal
                        isOpen={isJoinPromptOpen}
                        onClose={() => setIsJoinPromptOpen(false)}
                        communityName={subreddit}
                        onJoin={handleJoinAndPost}
                      />

                      {/* Create Post Modal */}
                      <CreatePostModal
                        isOpen={isCreatePostOpen}
                        onClose={() => setIsCreatePostOpen(false)}
                        subreddit={subreddit}
                        onPostCreated={() => setRefreshKey(prev => prev + 1)}
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