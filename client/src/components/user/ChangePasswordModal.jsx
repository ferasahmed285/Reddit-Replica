import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import '../../styles/EditProfileModal.css';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setOldPassword('');
      setNewPassword('');
      setShowOldPassword(false);
      setShowNewPassword(false);
    }
  }, [isOpen]);

  const handleCancel = () => {
    setEmail('');
    setOldPassword('');
    setNewPassword('');
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast('[Change Password] Email is required', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (!oldPassword) {
      showToast('Please enter your current password', 'error');
      return;
    }

    if (!newPassword) {
      showToast('Please enter a new password', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          email: email.trim(),
          oldPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      showToast('Password changed successfully', 'success');
      handleCancel();
    } catch (error) {
      console.error('Error changing password:', error);
      showToast(`Failed to change password: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal" style={{ maxWidth: '400px' }}>
        <div className="edit-profile-header">
          <div className="header-icon">
            <Lock size={24} />
          </div>
          <h2>Change Password</h2>
          <button className="edit-profile-close" onClick={handleCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Confirm your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input-wrapper">
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="edit-profile-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ChangePasswordModal;
