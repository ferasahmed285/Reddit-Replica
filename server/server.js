require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const communitiesRoutes = require('./routes/communities');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/communities', communitiesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`\n📍 Auth endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/auth/me`);
  console.log(`   POST http://localhost:${PORT}/api/auth/logout`);
  console.log(`\n📍 Posts endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/posts`);
  console.log(`   POST http://localhost:${PORT}/api/posts (protected)`);
  console.log(`   POST http://localhost:${PORT}/api/posts/:id/vote (protected)`);
  console.log(`\n📍 Communities endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/communities`);
  console.log(`   POST http://localhost:${PORT}/api/communities (protected)`);
  console.log(`   POST http://localhost:${PORT}/api/communities/:id/join (protected)`);
  console.log(`\n📍 Comments endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/comments?postId=:id`);
  console.log(`   POST http://localhost:${PORT}/api/comments (protected)`);
  console.log(`   POST http://localhost:${PORT}/api/comments/:id/vote (protected)`);
  console.log(`\n💡 Demo credentials:`);
  console.log(`   Username: CodeNinja`);
  console.log(`   Password: password123\n`);
});

module.exports = app;
