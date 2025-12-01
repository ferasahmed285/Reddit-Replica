const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { 
  getAllPosts, 
  getPostById, 
  getPostsBySubreddit,
  createPost,
  votePost,
} = require('../data/posts');

const router = express.Router();

// GET /api/posts/user/saved - Get saved posts (protected) - MUST BE BEFORE /:id
router.get('/user/saved', authenticateToken, (req, res) => {
  try {
    const { getSavedPosts } = require('../data/userActivity');
    const savedPostIds = getSavedPosts(req.user.id);
    const savedPosts = savedPostIds.map(id => getPostById(id)).filter(Boolean);
    
    res.status(200).json(savedPosts);
  } catch (error) {
    console.error('Get saved posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts - Get all posts
router.get('/', (req, res) => {
  try {
    const { subreddit, author } = req.query;
    
    let posts = getAllPosts();
    
    if (subreddit) {
      posts = getPostsBySubreddit(subreddit);
    }
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', (req, res) => {
  try {
    const post = getPostById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts - Create new post (protected)
router.post(
  '/',
  authenticateToken,
  [
    body('subreddit').trim().notEmpty().withMessage('Subreddit is required'),
    body('title').trim().isLength({ min: 1, max: 300 }).withMessage('Title must be 1-300 characters'),
    body('type').isIn(['text', 'image', 'link']).withMessage('Invalid post type'),
    body('content').optional(),
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

      const { subreddit, title, type, content } = req.body;

      const newPost = createPost({
        subreddit,
        title,
        type,
        content: content || '',
        author: req.user.username,
        authorId: req.user.id,
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/posts/:id/vote - Vote on post (protected)
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
      const updatedPost = votePost(req.params.id, req.user.id, vote);

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Vote post error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/posts/:id/save - Save/unsave post (protected)
router.post('/:id/save', authenticateToken, (req, res) => {
  try {
    const { toggleSavePost, isPostSaved } = require('../data/userActivity');
    const result = toggleSavePost(req.user.id, parseInt(req.params.id));
    
    res.status(200).json({
      saved: result.saved,
      message: result.saved ? 'Post saved' : 'Post unsaved'
    });
  } catch (error) {
    console.error('Save post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
