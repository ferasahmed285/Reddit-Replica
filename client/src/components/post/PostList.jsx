import { useState, useEffect } from 'react';
import Post from './Post';
import { postsAPI } from '../../services/api';
import { communities } from '../../data/communities';

const PostList = ({ filterBySubreddit, filterByAuthor, sortBy, onAuthRequired }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsAPI.getAll(filterBySubreddit);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filterBySubreddit]);

  const handleVoteUpdate = (postId, newVoteCount) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, voteCount: newVoteCount } : post
      )
    );
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading posts...</div>;
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
    const community = communities.find(c => c.name === `r/${post.subreddit}`);
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
        />
      ))}
    </div>
  );
};

export default PostList;
