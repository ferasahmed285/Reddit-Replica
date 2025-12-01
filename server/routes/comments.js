const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { 
  getCommentsByPostId,
  getCommentsByUser,
  createComment,
  voteComment,
} = require('../data/comments');
const { incrementCommentCount } = require('../data/posts');

const router = express.Router();

// GET /api/comments/user/:username - Get comments by user (MUST be before /:id routes)
router.get('/user/:username', (req, res) => {
  try {
    const comments = getCommentsByUser(req.params.username);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get user comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/comments?postId=:id - Get comments for a post
router.get('/', (req, res) => {
  try {
    const { postId } = req.query;
    
    if (!postId) {
      return res.status(400).json({ message: 'postId is required' });
    }
    
    const comments = getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/comments - Create new comment (protected)
router.post(
  '/',
  authenticateToken,
  [
    body('postId').isInt().withMessage('Valid postId is required'),
    body('content').trim().isLength({ min: 1, max: 10000 }).withMessage('Comment must be 1-10000 characters'),
    body('parentId').optional({ nullable: true }).isInt().withMessage('parentId must be an integer'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { postId, content, parentId } = req.body;

      const newComment = createComment({
        postId: parseInt(postId),
        content,
        author: req.user.username,
        authorId: req.user.id,
        parentId: parentId ? parseInt(parentId) : null,
      });

      // Increment post comment count
      incrementCommentCount(postId);

      res.status(201).json(newComment);
    } catch (error) {
      console.error('Create comment error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/comments/:id/vote - Vote on comment (protected)
router.post(
  '/:id/vote',
  authenticateToken,
  [
    body('vote').isIn(['up', 'down', 'none']).withMessage('Invalid vote type'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg 
        });
      }

      const { vote } = req.body;
      const updatedComment = voteComment(req.params.id, req.user.id, vote);

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      console.error('Vote comment error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
