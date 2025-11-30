import React from 'react';
import Post from './Post';
import { posts } from '../../data/posts';
import { communities } from '../../data/communities';

const PostList = ({ filterBySubreddit, filterByAuthor, sortBy, onAuthRequired }) => {
  
  // 1. Filter
  let displayPosts = [...posts]; // Copy array

  if (filterBySubreddit) {
    displayPosts = displayPosts.filter(p => p.subreddit.toLowerCase() === filterBySubreddit.toLowerCase());
  }
  if (filterByAuthor) {
    displayPosts = displayPosts.filter(p => p.author === filterByAuthor);
  }

  // 2. Sort
  if (sortBy === 'new') {
    displayPosts.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortBy === 'top') {
    displayPosts.sort((a, b) => b.voteCount - a.voteCount);
  }
  // 'hot' is default order in dummy data

  // 3. Attach Icons
  const postsWithIcons = displayPosts.map(post => {
    const community = communities.find(c => c.name === `r/${post.subreddit}`);
    return {
      ...post,
      subredditIcon: community ? community.iconUrl : 'https://placehold.co/20/grey/white?text=r/'
    };
  });

  return (
    <div className="post-list">
      {postsWithIcons.map((post) => (
        <Post key={post.id} post={post} onAuthRequired={onAuthRequired} />
      ))}
    </div>
  );
};

export default PostList;