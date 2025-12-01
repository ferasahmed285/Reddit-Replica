// Comments database with reply support
let comments = [];
let nextId = 1;

const getCommentsByPostId = (postId) => {
  const postComments = comments.filter(c => c.postId === parseInt(postId));
  // Build tree structure for replies
  const topLevel = postComments.filter(c => !c.parentId);
  return topLevel.map(comment => ({
    ...comment,
    replies: getCommentReplies(comment.id)
  }));
};

const getCommentReplies = (commentId) => {
  const replies = comments.filter(c => c.parentId === commentId);
  return replies.map(reply => ({
    ...reply,
    replies: getCommentReplies(reply.id)
  }));
};

const getCommentsByUser = (username) => {
  return comments.filter(c => c.author === username);
};

const createComment = (commentData) => {
  const newComment = {
    id: nextId++,
    postId: commentData.postId,
    author: commentData.author,
    authorId: commentData.authorId,
    content: commentData.content,
    parentId: commentData.parentId || null,
    voteCount: 1,
    timeAgo: 'just now',
    timestamp: Date.now(),
  };
  comments.push(newComment);
  return newComment;
};

const voteComment = (commentId, userId, voteType) => {
  const comment = comments.find(c => c.id === parseInt(commentId));
  if (!comment) return null;

  if (voteType === 'up') {
    comment.voteCount++;
  } else if (voteType === 'down') {
    comment.voteCount--;
  }

  return comment;
};

const getCommentCountByPostId = (postId) => {
  return comments.filter(c => c.postId === parseInt(postId)).length;
};

module.exports = {
  getCommentsByPostId,
  getCommentsByUser,
  createComment,
  voteComment,
  getCommentCountByPostId,
};
