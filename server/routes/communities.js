const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { 
  getAllCommunities,
  getCommunityById,
  createCommunity,
  joinCommunity,
  leaveCommunity,
} = require('../data/communities');

const router = express.Router();

// GET /api/communities/user/recent - Get recent communities (protected) - MUST BE BEFORE /:id
router.get('/user/recent', authenticateToken, (req, res) => {
  try {
    const { getRecentCommunities } = require('../data/userActivity');
    const recentIds = getRecentCommunities(req.user.id);
    const recentCommunities = recentIds.map(id => getCommunityById(id)).filter(Boolean);
    
    res.status(200).json(recentCommunities);
  } catch (error) {
    console.error('Get recent communities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/communities/user/joined - Get joined communities (protected)
router.get('/user/joined', authenticateToken, (req, res) => {
  try {
    const { getJoinedCommunities } = require('../data/userActivity');
    const joinedIds = getJoinedCommunities(req.user.id);
    const joinedCommunities = joinedIds.map(id => getCommunityById(id)).filter(Boolean);
    
    res.status(200).json(joinedCommunities);
  } catch (error) {
    console.error('Get joined communities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/communities - Get all communities
router.get('/', (req, res) => {
  try {
    const communities = getAllCommunities();
    res.status(200).json(communities);
  } catch (error) {
    console.error('Get communities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/communities/:id - Get single community
router.get('/:id', (req, res) => {
  try {
    const community = getCommunityById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Track visit if user is authenticated
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const { addRecentCommunity } = require('../data/userActivity');
        addRecentCommunity(user.id, req.params.id);
      } catch (err) {
        // Ignore auth errors for this endpoint
      }
    }
    
    res.status(200).json(community);
  } catch (error) {
    console.error('Get community error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/communities - Create new community (protected)
router.post(
  '/',
  authenticateToken,
  [
    body('name')
      .trim()
      .isLength({ min: 3, max: 21 })
      .withMessage('Community name must be 3-21 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Community name can only contain letters, numbers, and underscores'),
    body('title')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be 1-100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
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

      const { name, title, description } = req.body;

      // Check if community already exists
      const existing = getCommunityById(name);
      if (existing) {
        return res.status(409).json({ message: 'Community already exists' });
      }

      const newCommunity = createCommunity({
        name,
        title,
        description: description || '',
        creatorId: req.user.id,
      });

      res.status(201).json(newCommunity);
    } catch (error) {
      console.error('Create community error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/communities/:id/join - Join/leave community (protected)
router.post('/:id/join', authenticateToken, (req, res) => {
  try {
    const { toggleJoinCommunity } = require('../data/userActivity');
    const community = getCommunityById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const result = toggleJoinCommunity(req.user.id, req.params.id);
    
    // Update community member count
    if (result.joined) {
      joinCommunity(req.params.id, req.user.id);
    } else {
      leaveCommunity(req.params.id, req.user.id);
    }

    res.status(200).json({
      joined: result.joined,
      community: getCommunityById(req.params.id),
      message: result.joined ? 'Joined community' : 'Left community'
    });
  } catch (error) {
    console.error('Join/leave community error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
