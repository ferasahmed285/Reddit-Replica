import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login/signup
        console.log('📥 Login response data:', data);
        console.log('📥 User data:', data.user);
        console.log('📥 Token:', data.token);
        login(data.user, data.token);
        setUsername('');
        setPassword('');
        onClose();
      } else {
        // Error from backend
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
          <p className="legal-text">
            By continuing, you agree to our <a href="#">User Agreement</a> and acknowledge that you understand the <a href="#">Privacy Policy</a>.
          </p>
        </div>

        <div className="auth-buttons">
          <button className="btn-auth">
            <span className="icon">📱</span> Continue With Phone Number
          </button>
          <button className="btn-auth">
            <span className="icon">G</span> Continue With Google
          </button>
          <button className="btn-auth">
            <span className="icon"></span> Continue With Apple
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
          
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username *" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password *" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {!isSignUp && (
            <div className="form-footer">
              <p>Forgot your <a href="#">username</a> or <a href="#">password</a>?</p>
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <div className="modal-footer">
          {isSignUp ? 'Already have an account?' : 'New to Reddit?'} <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>{isSignUp ? 'Log In' : 'Sign Up'}</a>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
