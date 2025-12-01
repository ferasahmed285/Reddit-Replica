import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import PopularPage from './pages/PopularPage';
import UserProfile from './pages/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import ExplorePage from './pages/ExplorePage';
import SearchResultsPage from './pages/SearchResultsPage';
import Header from './components/layout/Header';
import LoginModal from './components/auth/LoginModal';
import './styles/global.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      return newValue;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue));
      return newValue;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="app">
        <Header 
          onLoginClick={openLogin} 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        <Routes>
          <Route path="/" element={<HomePage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/r/popular" element={<PopularPage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/explore" element={<ExplorePage isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/search" element={<SearchResultsPage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/r/:subreddit" element={<CommunityPage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/user/:username" element={<UserProfilePage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/u/:username" element={<UserProfile onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          <Route path="/post/:postId" element={<PostDetailPage onAuthAction={openLogin} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
        </Routes>

        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </div>
    </Router>
  );
}

export default App;