import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Settings } from 'lucide-react';
import { communitiesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import '../../styles/EditCommunityModal.css';

const EditCommunityModal = ({ isOpen, onClose, community, onCommunityUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (community) {
      setTitle(community.title || '');
      setDescription(community.description || '');
      setIconUrl(community.iconUrl || '');
      setBannerUrl(community.bannerUrl || '');
    }
  }, [community]);

  if (!isOpen || !community) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updateData = {
        title: title.trim(),
        description: description.trim(),
        iconUrl: iconUrl.trim(),
        bannerUrl: bannerUrl.trim(),
      };

      await communitiesAPI.update(community.id, updateData);
      showToast('Community updated successfully! ✨', 'success');
      onClose();
      if (onCommunityUpdated) {
        onCommunityUpdated();
      }
    } catch (error) {
      console.error('Error updating community:', error);
      showToast(`Failed to update: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="edit-community-overlay" onClick={onClose}>
      <div className="edit-community-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-community-header">
          <div className="header-icon">
            <Settings size={24} />
          </div>
          <h2>Edit Community</h2>
          <button className="edit-community-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-community-form">
          <div className="form-group">
            <label>Community Name</label>
            <input type="text" value={community.name} disabled className="disabled-input" />
            <span className="form-hint">Community names cannot be changed</span>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Display title for your community"
              maxLength={100}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is your community about?"
              rows={3}
              maxLength={500}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Icon URL</label>
            <input
              type="url"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              placeholder="https://example.com/icon.png"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Banner URL</label>
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://example.com/banner.png"
              disabled={loading}
            />
          </div>

          <div className="edit-community-actions">
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

export default EditCommunityModal;
