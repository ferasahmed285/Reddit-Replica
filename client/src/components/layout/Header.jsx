import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { communities } from '../../data/communities';
import { users } from '../../data/users';
import '../../styles/Header.css';

const LogoIcon = () => <span className="logo-text">reddit</span>;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Get suggestions based on query
  const getSuggestions = () => {
    if (!searchQuery.trim()) return { communities: [], users: [] };
    
    const query = searchQuery.toLowerCase();
    const matchingCommunities = communities
      .filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.title.toLowerCase().includes(query)
      )
      .slice(0, 5);
    
    const matchingUsers = users
      .filter(u => u.username.toLowerCase().includes(query))
      .slice(0, 3);
    
    return { communities: matchingCommunities, users: matchingUsers };
  };

  const suggestions = getSuggestions();
  const hasSuggestions = suggestions.communities.length > 0 || suggestions.users.length > 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <form className="search-form" onSubmit={handleSearch}>
        <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Reddit" 
            aria-label="Search Reddit"
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (searchQuery) setShowSuggestions(true);
            }}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && searchQuery && (isFocused || hasSuggestions) && (
        <div className="search-suggestions">
          {hasSuggestions ? (
            <>
              {/* Communities */}
              {suggestions.communities.length > 0 && (
                <div className="suggestions-section">
                  <div className="suggestions-header">Communities</div>
                  {suggestions.communities.map(community => (
                    <Link
                      key={community.id}
                      to={`/r/${community.id}`}
                      className="suggestion-item"
                      onClick={() => {
                        setShowSuggestions(false);
                        setIsFocused(false);
                        setSearchQuery('');
                      }}
                    >
                      <img src={community.iconUrl} alt="" className="suggestion-icon" />
                      <div className="suggestion-info">
                        <div className="suggestion-name">{community.name}</div>
                        <div className="suggestion-meta">{community.members} members</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Users */}
              {suggestions.users.length > 0 && (
                <div className="suggestions-section">
                  <div className="suggestions-header">Users</div>
                  {suggestions.users.map(user => (
                    <Link
                      key={user.username}
                      to={`/user/${user.username}`}
                      className="suggestion-item"
                      onClick={() => {
                        setShowSuggestions(false);
                        setIsFocused(false);
                        setSearchQuery('');
                      }}
                    >
                      <img src={user.avatar} alt="" className="suggestion-icon" />
                      <div className="suggestion-info">
                        <div className="suggestion-name">u/{user.username}</div>
                        <div className="suggestion-meta">{user.karma} karma</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-suggestions">
              <Search size={20} />
              <span>Search for "{searchQuery}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Header = ({ onSearch, onLoginClick, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="header-container">
      {/* Left: Logo */}
      <div className="header-left">
        <Link to="/" className="logo-wrapper" style={{ textDecoration: 'none' }}>
          <LogoIcon />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="header-center">
        <SearchBar />
      </div>

      {/* Right: Actions */}
      <div className="header-right">
        <button 
          className="btn btn-icon" 
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Light mode" : "Dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="btn btn-secondary" aria-label="Get App">
          Get App
        </button>
        
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