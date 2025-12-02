import { useState, useEffect } from 'react';
import Post from './Post';
import { PostListSkeleton } from '../common/LoadingSkeleton';
import { postsAPI, communitiesAPI } from '../../services/api';
import { useLoading } from '../../context/LoadingContext';

const PostList = ({ filterBySubreddit, filterByAuthor, sortBy, onAuthRequired }) => {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        startLoading();
        const [postsData, communitiesData] = await Promise.all([
          postsAPI.getAll(filterBySubreddit),
          communitiesAPI.getAll()
        ]);
        setPosts(postsData);
        setCommunities(communitiesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    fetchData();
  }, [filterBySubreddit]);

  const handleVoteUpdate = (postId, newVoteCount) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        (post.id === postId || post._id === postId) ? { ...post, voteCount: newVoteCount } : post
      )
    );
  };

  const handlePostDeleted = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId && post._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        (post.id === updatedPost.id || post._id === updatedPost._id) ? { ...post, ...updatedPost } : post
      )
    );
  };

  if (loading) {
    return <PostListSkeleton count={5} />;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  // Filter by author if needed
  let displayPosts = [...posts];
  if (filterByAuthor) {
    displayPosts = displayPosts.filter(p => p.author === filterByAuthor);
  }

  // Sort
  if (sortBy === 'new') {
    displayPosts.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortBy === 'top') {
    displayPosts.sort((a, b) => b.voteCount - a.voteCount);
  }

  // Attach community icons
  const postsWithIcons = displayPosts.map(post => {
    const community = communities.find(c => 
      c.name === post.subreddit || 
      c.name === post.communityName ||
      c.name === `r/${post.subreddit}`
    );
    return {
      ...post,
      subredditIcon: community ? community.iconUrl : 'https://placehold.co/20/grey/white?text=r/',
      votes: post.voteCount || post.votes,
      comments: post.commentCount || post.comments,
    };
  });

  if (postsWithIcons.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>No posts found</div>;
  }

  return (
    <div className="post-list">
      {postsWithIcons.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          onAuthRequired={onAuthRequired}
          onVoteUpdate={handleVoteUpdate}
          onPostDeleted={handlePostDeleted}
          onPostUpdated={handlePostUpdated}
        />
      ))}
    </div>
  );
};

export default PostList;
