import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import PopularPage from './pages/PopularPage';
import UserProfile from './pages/UserProfile';
import Header from './components/layout/Header';
import LoginModal from './components/auth/LoginModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <Router>
      <div className="app">
        <Header onLoginClick={openLogin} />

        <Routes>
          <Route path="/" element={<HomePage onAuthAction={openLogin} />} />
          <Route path="/r/popular" element={<PopularPage onAuthAction={openLogin} />} />
          <Route path="/r/:subreddit" element={<CommunityPage onAuthAction={openLogin} />} />
          <Route path="/u/:username" element={<UserProfile onAuthAction={openLogin} />} />
        </Routes>

        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </div>
    </Router>
  );
}

export default App;