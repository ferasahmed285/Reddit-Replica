import { useState, useContext, createContext, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { communitiesAPI, customFeedsAPI } from '../services/api';

const SidebarContext = createContext();

// Cache sidebar data in localStorage for instant load
const getCachedSidebarData = () => {
  try {
    const cached = localStorage.getItem('sidebarData');
    if (cached) {
      const data = JSON.parse(cached);
      // Check if cache is less than 5 minutes old
      if (Date.now() - data.timestamp < 5 * 60 * 1000) {
        return data;
      }
    }
  } catch {}
  return null;
};

const setCachedSidebarData = (recent, joined, feeds) => {
  try {
    localStorage.setItem('sidebarData', JSON.stringify({
      recent,
      joined,
      feeds,
      timestamp: Date.now()
    }));
  } catch {}
};

const clearCachedSidebarData = () => {
  try {
    localStorage.removeItem('sidebarData');
  } catch {}
};

export const SidebarProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  
  // Initialize with cached data for instant load
  const cachedData = currentUser ? getCachedSidebarData() : null;
  const [recentCommunities, setRecentCommunities] = useState(cachedData?.recent || []);
  const [joinedCommunities, setJoinedCommunities] = useState(cachedData?.joined || []);
  const [customFeeds, setCustomFeeds] = useState(cachedData?.feeds || []);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(!!cachedData);

  const fetchSidebarData = useCallback(async (force = false) => {
    if (!currentUser) {
      setRecentCommunities([]);
      setJoinedCommunities([]);
      setCustomFeeds([]);
      clearCachedSidebarData();
      hasFetched.current = false;
      return;
    }

    // Skip if already fetched and not forced
    if (hasFetched.current && !force) {
      return;
    }

    try {
      setLoading(true);
      
      const [recent, joined, feeds] = await Promise.all([
        communitiesAPI.getRecent().catch(() => []),
        communitiesAPI.getJoinedCached().catch(() => []),
        customFeedsAPI.getAll().catch(() => [])
      ]);
      
      setRecentCommunities(recent);
      setJoinedCommunities(joined);
      setCustomFeeds(feeds);
      
      // Cache for instant load on next visit
      setCachedSidebarData(recent, joined, feeds);
      hasFetched.current = true;
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch immediately if we have a user (even from cache), don't wait for auth loading
    if (currentUser) {
      fetchSidebarData();
    } else if (!authLoading) {
      // Only clear data when auth is done and no user
      setRecentCommunities([]);
      setJoinedCommunities([]);
      setCustomFeeds([]);
    }
    
    // Auto-refresh sidebar data every 30 seconds when user is logged in
    if (currentUser) {
      const interval = setInterval(() => {
        fetchSidebarData(true);
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [fetchSidebarData, authLoading, currentUser]);

  const addCustomFeed = (newFeed) => {
    setCustomFeeds(prev => {
      const updated = [newFeed, ...prev];
      setCachedSidebarData(recentCommunities, joinedCommunities, updated);
      return updated;
    });
  };

  const updateCustomFeed = (updatedFeed) => {
    setCustomFeeds(prev => {
      const updated = prev.map(f => f._id === updatedFeed._id ? updatedFeed : f);
      setCachedSidebarData(recentCommunities, joinedCommunities, updated);
      return updated;
    });
  };

  const removeCustomFeed = (feedId) => {
    setCustomFeeds(prev => {
      const updated = prev.filter(f => f._id !== feedId);
      setCachedSidebarData(recentCommunities, joinedCommunities, updated);
      return updated;
    });
  };

  const toggleFeedFavorite = async (feedId) => {
    try {
      await customFeedsAPI.toggleFavorite(feedId);
      setCustomFeeds(prev => {
        const updated = prev.map(f => f._id === feedId ? { ...f, isFavorite: !f.isFavorite } : f);
        setCachedSidebarData(recentCommunities, joinedCommunities, updated);
        return updated;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const addJoinedCommunity = (community) => {
    setJoinedCommunities(prev => {
      const updated = [community, ...prev];
      setCachedSidebarData(recentCommunities, updated, customFeeds);
      return updated;
    });
  };

  const value = {
    recentCommunities,
    joinedCommunities,
    customFeeds,
    loading,
    refreshSidebarData: () => fetchSidebarData(true),
    addCustomFeed,
    updateCustomFeed,
    removeCustomFeed,
    toggleFeedFavorite,
    addJoinedCommunity,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
