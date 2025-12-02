import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/EditProfileModal.css';

const BANNER_PRESETS = [
  { name: 'Purple', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { name: 'Night', value: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)' },
  { name: 'Rose', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Midnight', value: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { name: 'Fire', value: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
];

const EditProfileModal = ({ isOpen, onClose, user, onProfileUpdated }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [bannerColor, setBannerColor] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
      setBannerColor(user.bannerColor || BANNER_PRESETS[0].value);
      setAvatar(user.avatar || '');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      showToast('Username is required', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          username: username.trim(),
          bio: bio.trim(),
          bannerColor,
          avatar: avatar.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update local auth context
      updateUser(data);
      
      const usernameChanged = user.username !== data.username;
      
      showToast('Profile updated successfully! ✨', 'success');
      onClose();
      
      if (onProfileUpdated) {
        onProfileUpdated(data);
      }

      // Navigate to new profile URL if username changed
      if (usernameChanged) {
        navigate(`/user/${data.username}`, { replace: true });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(`Failed to update: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="edit-profile-overlay" onClick={onClose}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-profile-header">
          <div className="header-icon">
            <User size={24} />
          </div>
          <h2>Edit Profile</h2>
          <button className="edit-profile-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Banner Preview */}
          <div className="banner-preview" style={{ background: bannerColor }}>
            <img src={avatar} alt="Avatar" className="avatar-preview" />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              maxLength={20}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              maxLength={200}
              disabled={loading}
            />
            <span className="char-count">{bio.length}/200</span>
          </div>

          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/avatar.png"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Banner Color</label>
            <div className="banner-presets">
              {BANNER_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  className={`banner-preset ${bannerColor === preset.value ? 'selected' : ''}`}
                  style={{ background: preset.value }}
                  onClick={() => setBannerColor(preset.value)}
                  title={preset.name}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <div className="edit-profile-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditProfileModal;
