import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Settings, Link, Upload } from 'lucide-react';
import { communitiesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import '../../styles/EditCommunityModal.css';

// Compress image using canvas
const compressImage = (file, maxWidth, maxHeight, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to compressed base64
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const EditCommunityModal = ({ isOpen, onClose, community, onCommunityUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [iconMode, setIconMode] = useState('url');
  const [bannerMode, setBannerMode] = useState('url');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (community) {
      setTitle(community.title || '');
      setDescription(community.description || '');
      setIconUrl(community.iconUrl || '');
      setBannerUrl(community.bannerUrl || '');
      setIconMode('url');
      setBannerMode('url');
    }
  }, [community]);

  // Handle file upload for icon (compress to 200x200)
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Icon file size must be less than 5MB', 'error');
        return;
      }
      try {
        const compressed = await compressImage(file, 200, 200, 0.8);
        setIconUrl(compressed);
      } catch {
        showToast('Failed to process image', 'error');
      }
    }
  };

  // Handle file upload for banner (compress to 1200x400)
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Banner file size must be less than 10MB', 'error');
        return;
      }
      try {
        const compressed = await compressImage(file, 1920, 600, 0.92);
        setBannerUrl(compressed);
      } catch {
        showToast('Failed to process image', 'error');
      }
    }
  };

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
      showToast('Community updated successfully', 'success');
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
            <label>Community Icon</label>
            <div className="image-mode-tabs">
              <button
                type="button"
                className={`image-mode-tab ${iconMode === 'url' ? 'active' : ''}`}
                onClick={() => { setIconMode('url'); setIconUrl(community.iconUrl || ''); }}
              >
                <Link size={16} />
                URL
              </button>
              <button
                type="button"
                className={`image-mode-tab ${iconMode === 'upload' ? 'active' : ''}`}
                onClick={() => { setIconMode('upload'); setIconUrl(''); }}
              >
                <Upload size={16} />
                Upload
              </button>
            </div>
            
            {iconMode === 'url' ? (
              <input
                type="url"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://example.com/icon.png"
                disabled={loading}
              />
            ) : (
              <div className="file-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="file-input"
                  id="edit-icon-upload"
                  disabled={loading}
                />
                <label htmlFor="edit-icon-upload" className="file-upload-label">
                  <Upload size={24} />
                  <span>Click to upload icon</span>
                  <span className="file-hint">PNG, JPG, GIF up to 5MB</span>
                </label>
              </div>
            )}
            
            {iconUrl && (
              <div className="image-preview icon-preview">
                <img src={iconUrl} alt="Icon Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Community Banner</label>
            <div className="image-mode-tabs">
              <button
                type="button"
                className={`image-mode-tab ${bannerMode === 'url' ? 'active' : ''}`}
                onClick={() => { setBannerMode('url'); setBannerUrl(community.bannerUrl || ''); }}
              >
                <Link size={16} />
                URL
              </button>
              <button
                type="button"
                className={`image-mode-tab ${bannerMode === 'upload' ? 'active' : ''}`}
                onClick={() => { setBannerMode('upload'); setBannerUrl(''); }}
              >
                <Upload size={16} />
                Upload
              </button>
            </div>
            
            {bannerMode === 'url' ? (
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://example.com/banner.png"
                disabled={loading}
              />
            ) : (
              <div className="file-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="file-input"
                  id="edit-banner-upload"
                  disabled={loading}
                />
                <label htmlFor="edit-banner-upload" className="file-upload-label">
                  <Upload size={24} />
                  <span>Click to upload banner</span>
                  <span className="file-hint">PNG, JPG, GIF up to 10MB</span>
                </label>
              </div>
            )}
            
            {bannerUrl && (
              <div className="image-preview banner-preview">
                <img src={bannerUrl} alt="Banner Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
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
