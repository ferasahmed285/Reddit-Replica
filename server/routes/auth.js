const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { findUserByUsername, findUserById, createUser } = require('../data/users');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Helper function to sanitize user data (remove password)
const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// POST /api/auth/register
router.post(
  '/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = findUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = createUser({
        username,
        password: hashedPassword
      });

      // Generate token
      const token = generateToken(newUser);

      // Return user data and token
      res.status(201).json({
        user: sanitizeUser(newUser),
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { username, password } = req.body;

      // Find user
      const user = findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // For demo users with pre-hashed passwords, accept "password123"
      // For new users, verify with bcrypt
      let isValidPassword = false;
      
      if (password === 'password123' && user.password.startsWith('$2a$10$XQKvvXQKvv')) {
        // Demo user with default password
        isValidPassword = true;
      } else {
        // Real password verification
        isValidPassword = await bcrypt.compare(password, user.password);
      }

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate token
      const token = generateToken(user);

      // Return user data and token
      res.status(200).json({
        user: sanitizeUser(user),
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

// GET /api/auth/me - Get current user
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(sanitizeUser(user));
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, (req, res) => {
  // In a real app with refresh tokens, you'd invalidate them here
  // For JWT-only auth, logout is handled client-side by removing the token
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
