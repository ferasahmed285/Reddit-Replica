import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Users } from 'lucide-react';
import { communitiesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import '../../styles/CreateCommunityModal.css';

const COMMUNITY_CATEGORIES = [
  'Entertainment',
  'Gaming',
  'News',
  'Sports',
  'Technology',
  'Q&As & Stories',
  'Art & Design',
  'Music',
  'Science',
  'Education',
  'Lifestyle',
  'Other'
];

const CreateCommunityModal = ({ isOpen, onClose, onCommunityCreated }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      showToast('Community name is required', 'error');
      return;
    }

    // Validate name format (alphanumeric and underscores only)
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      showToast('Name can only contain letters, numbers, and underscores', 'error');
      return;
    }

    if (!category) {
      showToast('Please select a category', 'error');
      return;
    }

    try {
      setLoading(true);
      const communityData = {
        name: name.trim(),
        title: title.trim() || name.trim(),
        description: description.trim(),
        category: category,
        iconUrl: iconUrl.trim() || `https://placehold.co/100/ff4500/white?text=${name.charAt(0).toUpperCase()}`,
        bannerUrl: bannerUrl.trim() || 'https://placehold.co/1200x200/0079d3/white?text=Community+Banner',
      };

      const newCommunity = await communitiesAPI.create(communityData);
      showToast(`r/${name} created successfully! 🎉`, 'success');
      
      // Reset form
      setName('');
      setTitle('');
      setDescription('');
      setCategory('');
      setIconUrl('');
      setBannerUrl('');
      
      onClose();
      if (onCommunityCreated) {
        onCommunityCreated(newCommunity);
      }
    } catch (error) {
      console.error('Error creating community:', error);
      showToast(`Failed to create community: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="create-community-overlay">
      <div className="create-community-modal">
        <div className="create-community-header">
          <div className="header-icon">
            <Users size={24} />
          </div>
          <h2>Create a Community</h2>
          <button className="create-community-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-community-form">
          <div className="form-group">
            <label>Name *</label>
            <div className="input-prefix-wrapper">
              <span className="input-prefix">r/</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="community_name"
                maxLength={21}
                disabled={loading}
              />
            </div>
            <span className="form-hint">Community names cannot be changed later</span>
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
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              className="category-select"
            >
              <option value="">Select a category</option>
              {COMMUNITY_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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

          <div className="create-community-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-create" disabled={loading || !name.trim()}>
              {loading ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateCommunityModal;
