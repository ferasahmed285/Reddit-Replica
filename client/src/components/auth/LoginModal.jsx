import React, { useState } from 'react';
import '../../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop click propagation so clicking inside the modal doesn't close it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2>Log In</h2>
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
            <span className="icon"></span> Continue With Apple
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Email or username *" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password *" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-footer">
            <p>Forgot your <a href="#">username</a> or <a href="#">password</a>?</p>
          </div>

          <button type="submit" className="btn-submit">
            Log In
          </button>
        </form>

        <div className="modal-footer">
          New to Reddit? <a href="#">Sign Up</a>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;