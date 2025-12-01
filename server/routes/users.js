const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { findUserById, findUserByUsername } = require('../data/users');
const { 
  toggleFollowUser, 
  getFollowing, 
  getFollowers, 
  isFollowing 
} = require('../data/userActivity');

const router = express.Router();

// GET /api/users/:username - Get user profile
router.get('/:username', (req, res) => {
  try {
    const user = findUserByUsername(req.params.username);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send password
    const { password, ...userWithoutPassword } = user;
    
    // Add follower/following counts
    const followers = getFollowers(user.id);
    const following = getFollowing(user.id);
    
    res.status(200).json({
      ...userWithoutPassword,
      followerCount: followers.length,
      followingCount: following.length,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/:username/follow - Follow/unfollow user (protected)
router.post('/:username/follow', authenticateToken, (req, res) => {
  try {
    const userToFollow = findUserByUsername(req.params.username);
    
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToFollow.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const result = toggleFollowUser(req.user.id, userToFollow.id);
    
    res.status(200).json({
      following: result.following,
      message: result.following ? 'User followed' : 'User unfollowed'
    });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:username/followers - Get user's followers
router.get('/:username/followers', (req, res) => {
  try {
    const user = findUserByUsername(req.params.username);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followerIds = getFollowers(user.id);
    const followers = followerIds.map(id => {
      const follower = findUserById(id);
      if (follower) {
        const { password, ...userWithoutPassword } = follower;
        return userWithoutPassword;
      }
      return null;
    }).filter(Boolean);
    
    res.status(200).json(followers);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:username/following - Get users that this user follows
router.get('/:username/following', (req, res) => {
  try {
    const user = findUserByUsername(req.params.username);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followingIds = getFollowing(user.id);
    const following = followingIds.map(id => {
      const followedUser = findUserById(id);
      if (followedUser) {
        const { password, ...userWithoutPassword } = followedUser;
        return userWithoutPassword;
      }
      return null;
    }).filter(Boolean);
    
    res.status(200).json(following);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:username/is-following - Check if current user follows this user (protected)
router.get('/:username/is-following', authenticateToken, (req, res) => {
  try {
    const userToCheck = findUserByUsername(req.params.username);
    
    if (!userToCheck) {
      return res.status(404).json({ message: 'User not found' });
    }

    const following = isFollowing(req.user.id, userToCheck.id);
    
    res.status(200).json({ following });
  } catch (error) {
    console.error('Check following error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
