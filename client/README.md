# Reddit Clone - Client

A modern, professional Reddit-style web application built with React, featuring a clean UI, smooth animations, and interactive components.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

### Core Functionality
- **Browse Posts**: View posts from different communities
- **Post Details**: Click any post to view full content and comments
- **Comments**: Nested comment threads with collapse/expand functionality
- **Voting**: Interactive upvote/downvote system with visual feedback
- **Communities**: Browse and filter by subreddit
- **User Profiles**: View user posts and information
- **Authentication**: Login modal for protected actions

### UI/UX Highlights
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional Polish**: Consistent design system with shadows, spacing, and colors
- **Interactive Elements**: Real-time feedback for all user actions
- **Loading States**: Elegant loading indicators
- **Empty States**: Friendly messages when content is unavailable

## 📁 Project Structure

```
client/
├── src/
│   ├── api/              # API service layer
│   ├── assets/           # Images and icons
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── comment/      # Comment components
│   │   ├── common/       # Reusable components
│   │   ├── community/    # Community components
│   │   ├── layout/       # Layout components
│   │   └── post/         # Post components
│   ├── context/          # React context providers
│   ├── data/             # Mock data
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: `#ff4500` (Reddit Orange)
- **Blue**: `#0079d3` (Links and actions)
- **Background**: `#dae0e6`
- **Card**: `#ffffff`
- **Text Primary**: `#1c1c1c`
- **Text Secondary**: `#7c7c7c`

### Components
- **Posts**: Clickable cards with hover effects
- **Comments**: Threaded discussions with voting
- **Buttons**: Consistent styling with smooth transitions
- **Modals**: Animated overlays with backdrop blur
- **Forms**: Clean inputs with focus states

## 🛠️ Technologies

- **React 19** - UI library with React Compiler enabled
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with CSS variables

## 📱 Pages

- **Home** (`/`) - Main feed with all posts
- **Popular** (`/r/popular`) - Top posts across all communities
- **Community** (`/r/:subreddit`) - Posts from specific community
- **Post Detail** (`/post/:postId`) - Individual post with comments
- **User Profile** (`/u/:username`) - User's posts and info

## 🎯 Key Features Explained

### Post Interaction
Click any post card to view the full post with all comments. The post detail page includes:
- Full post content (text or image)
- Vote buttons
- Comment section
- Share and save options

### Comment System
- **Nested Replies**: Comments can have multiple levels of replies
- **Collapsible**: Click the thread line to collapse/expand
- **Voting**: Upvote/downvote individual comments
- **Reply**: Add replies to any comment (requires login)

### Authentication Flow
Protected actions (voting, commenting, posting) trigger a login modal:
- Clean, modern design
- Multiple login options
- Smooth animations
- Easy to dismiss

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate folder
2. Add routes in `App.jsx`
3. Create corresponding CSS file
4. Use CSS variables for consistency

### Styling Guidelines
- Use CSS variables from `global.css`
- Follow BEM naming convention
- Add hover states for interactive elements
- Include transitions for smooth UX

## 📝 Mock Data

Currently using mock data from:
- `src/data/posts.js` - Post data
- `src/data/comments.js` - Comment data
- `src/data/communities.js` - Community data
- `src/data/users.js` - User data

Replace with API calls when backend is ready.

## 🚀 Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains production-ready files
# Deploy to your hosting service (Vercel, Netlify, etc.)
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using React and Vite
