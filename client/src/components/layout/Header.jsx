import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link for navigation
import '../../styles/Header.css';

// You can replace these with actual SVGs from your src/assets/icons folder later
const LogoIcon = () => <span className="logo-text">reddit</span>;

const Header = ({ onSearch, onLoginClick }) => {
  return (
    <header className="header-container">
      {/* Left: Logo */}
      <div className="header-left">
        {/* 2. Wrap logo in Link to redirect to Home */}
        <Link to="/" className="logo-wrapper" style={{ textDecoration: 'none' }}>
          <LogoIcon />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="header-center">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Find anything" 
              aria-label="Search Reddit"
              className="search-input"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Right: Actions */}
      <div className="header-right">
        <button className="btn btn-secondary" aria-label="Get App">
          <span className="icon-mobile"></span> Get App
        </button>
        
        {/* 3. ATTACH THE CLICK EVENT HERE */}
        <button className="btn btn-primary" onClick={onLoginClick}>
          Log In
        </button>
        
        <button className="btn btn-icon" aria-label="Options">
          •••
        </button>
      </div>
    </header>
  );
};

export default Header;