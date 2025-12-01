// Helper function to get all comments by a specific user
export const getAllCommentsByUser = (username) => {
  const allComments = [];
  
  // Flatten all comments from all posts
  Object.entries(comments).forEach(([postId, postComments]) => {
    const flattenComments = (commentList, postId) => {
      commentList.forEach(comment => {
        if (comment.author === username) {
          const post = posts.find(p => p.id === parseInt(postId));
          allComments.push({
            ...comment,
            postId: parseInt(postId),
            postTitle: post ? post.title : 'Unknown Post',
            subreddit: post ? post.subreddit : 'Unknown'
          });
        }
        if (comment.replies && comment.replies.length > 0) {
          flattenComments(comment.replies, postId);
        }
      });
    };
    flattenComments(postComments, postId);
  });
  
  return allComments;
};

// Import from existing files
import { posts } from './posts';
import { comments } from './comments';

export { posts, comments };
