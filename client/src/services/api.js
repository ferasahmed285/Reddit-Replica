const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('authToken');

const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

// Posts API
export const postsAPI = {
  getAll: (subreddit) => {
    const query = subreddit ? `?subreddit=${subreddit}` : '';
    return apiRequest(`/posts${query}`);
  },
  
  getById: (id) => apiRequest(`/posts/${id}`),
  
  create: (postData) => apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  
  vote: (postId, voteType) => apiRequest(`/posts/${postId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote: voteType }),
  }),
  
  save: (postId) => apiRequest(`/posts/${postId}/save`, {
    method: 'POST',
  }),
  
  getSaved: () => apiRequest('/posts/user/saved'),
};

// Comments API
export const commentsAPI = {
  getByPostId: (postId) => apiRequest(`/comments?postId=${postId}`),
  
  getByUser: (username) => apiRequest(`/comments/user/${username}`),
  
  create: (commentData) => apiRequest('/comments', {
    method: 'POST',
    body: JSON.stringify(commentData),
  }),
  
  vote: (commentId, voteType) => apiRequest(`/comments/${commentId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote: voteType }),
  }),
};

// Communities API
export const communitiesAPI = {
  getAll: () => apiRequest('/communities'),
  
  getById: (id) => apiRequest(`/communities/${id}`),
  
  create: (communityData) => apiRequest('/communities', {
    method: 'POST',
    body: JSON.stringify(communityData),
  }),
  
  join: (communityId) => apiRequest(`/communities/${communityId}/join`, {
    method: 'POST',
  }),
  
  getRecent: () => apiRequest('/communities/user/recent'),
  
  getJoined: () => apiRequest('/communities/user/joined'),
};

// Users API
export const usersAPI = {
  getByUsername: (username) => apiRequest(`/users/${username}`),
  
  follow: (username) => apiRequest(`/users/${username}/follow`, {
    method: 'POST',
  }),
  
  getFollowers: (username) => apiRequest(`/users/${username}/followers`),
  
  getFollowing: (username) => apiRequest(`/users/${username}/following`),
  
  isFollowing: (username) => apiRequest(`/users/${username}/is-following`),
};

// User Activity API
export const userActivityAPI = {
  getJoinedCommunities: () => apiRequest('/communities/user/joined'),
};
