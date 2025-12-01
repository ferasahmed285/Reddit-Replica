// Track user activity - recent communities visited, saved posts, etc.
const userActivity = {};

// Get or create user activity
const getUserActivity = (userId) => {
  if (!userActivity[userId]) {
    userActivity[userId] = {
      recentCommunities: [],
      savedPosts: [],
      joinedCommunities: [],
      following: [],
      followers: [],
    };
  }
  return userActivity[userId];
};

// Add recent community visit
const addRecentCommunity = (userId, communityId) => {
  const activity = getUserActivity(userId);
  
  // Remove if already exists
  activity.recentCommunities = activity.recentCommunities.filter(c => c !== communityId);
  
  // Add to front
  activity.recentCommunities.unshift(communityId);
  
  // Keep only last 5
  if (activity.recentCommunities.length > 5) {
    activity.recentCommunities = activity.recentCommunities.slice(0, 5);
  }
  
  return activity.recentCommunities;
};

// Get recent communities
const getRecentCommunities = (userId) => {
  const activity = getUserActivity(userId);
  return activity.recentCommunities;
};

// Save/unsave post
const toggleSavePost = (userId, postId) => {
  const activity = getUserActivity(userId);
  const index = activity.savedPosts.indexOf(postId);
  
  if (index > -1) {
    // Unsave
    activity.savedPosts.splice(index, 1);
    return { saved: false };
  } else {
    // Save
    activity.savedPosts.push(postId);
    return { saved: true };
  }
};

// Get saved posts
const getSavedPosts = (userId) => {
  const activity = getUserActivity(userId);
  return activity.savedPosts;
};

// Check if post is saved
const isPostSaved = (userId, postId) => {
  const activity = getUserActivity(userId);
  return activity.savedPosts.includes(postId);
};

// Join/leave community
const toggleJoinCommunity = (userId, communityId) => {
  const activity = getUserActivity(userId);
  const index = activity.joinedCommunities.indexOf(communityId);
  
  if (index > -1) {
    // Leave
    activity.joinedCommunities.splice(index, 1);
    return { joined: false };
  } else {
    // Join
    activity.joinedCommunities.push(communityId);
    return { joined: true };
  }
};

// Get joined communities
const getJoinedCommunities = (userId) => {
  const activity = getUserActivity(userId);
  return activity.joinedCommunities;
};

// Check if user joined community
const hasJoinedCommunity = (userId, communityId) => {
  const activity = getUserActivity(userId);
  return activity.joinedCommunities.includes(communityId);
};

// Follow/unfollow user
const toggleFollowUser = (followerId, followingId) => {
  const followerActivity = getUserActivity(followerId);
  const followingActivity = getUserActivity(followingId);
  
  const index = followerActivity.following.indexOf(followingId);
  
  if (index > -1) {
    // Unfollow
    followerActivity.following.splice(index, 1);
    const followerIndex = followingActivity.followers.indexOf(followerId);
    if (followerIndex > -1) {
      followingActivity.followers.splice(followerIndex, 1);
    }
    return { following: false };
  } else {
    // Follow
    followerActivity.following.push(followingId);
    if (!followingActivity.followers.includes(followerId)) {
      followingActivity.followers.push(followerId);
    }
    return { following: true };
  }
};

// Get following list
const getFollowing = (userId) => {
  const activity = getUserActivity(userId);
  return activity.following;
};

// Get followers list
const getFollowers = (userId) => {
  const activity = getUserActivity(userId);
  return activity.followers;
};

// Check if user is following another user
const isFollowing = (followerId, followingId) => {
  const activity = getUserActivity(followerId);
  return activity.following.includes(followingId);
};

module.exports = {
  addRecentCommunity,
  getRecentCommunities,
  toggleSavePost,
  getSavedPosts,
  isPostSaved,
  toggleJoinCommunity,
  getJoinedCommunities,
  hasJoinedCommunity,
  toggleFollowUser,
  getFollowing,
  getFollowers,
  isFollowing,
};
