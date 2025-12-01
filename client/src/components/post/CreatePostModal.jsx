import { useState } from 'react';
import { X, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react';
import { communities } from '../../data/communities';
import '../../styles/CreatePostModal.css';

const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [postType, setPostType] = useState('text');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCommunity || !title.trim()) {
      alert('Please select a community and enter a title');
      return;
    }

    const newPost = {
      id: Date.now(),
      subreddit: selectedCommunity,
      author: 'yourlocalap',
      timeAgo: 'just now',
      timestamp: Date.now(),
      title: title.trim(),
      type: postType,
      content: postType === 'text' ? content.trim() : postType === 'image' ? imageUrl : linkUrl,
      voteCount: 1,
      votes: '1',
      comments: '0',
    };

    onCreatePost(newPost);
    
    // Reset form
    setTitle('');
    setContent('');
    setImageUrl('');
    setLinkUrl('');
    setSelectedCommunity('');
    setPostType('text');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-create">
          <h2>Create a post</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Community Selector */}
          <div className="form-group">
            <label>Choose a community</label>
            <select 
              value={selectedCommunity} 
              onChange={(e) => setSelectedCommunity(e.target.value)}
              required
              className="community-select"
            >
              <option value="">Select a community</option>
              {communities.map(community => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>

          {/* Post Type Tabs */}
          <div className="post-type-tabs">
            <button
              type="button"
              className={`post-type-tab ${postType === 'text' ? 'active' : ''}`}
              onClick={() => setPostType('text')}
            >
              <FileText size={20} />
              <span>Text</span>
            </button>
            <button
              type="button"
              className={`post-type-tab ${postType === 'image' ? 'active' : ''}`}
              onClick={() => setPostType('image')}
            >
              <ImageIcon size={20} />
              <span>Image</span>
            </button>
            <button
              type="button"
              className={`post-type-tab ${postType === 'link' ? 'active' : ''}`}
              onClick={() => setPostType('link')}
            >
              <LinkIcon size={20} />
              <span>Link</span>
            </button>
          </div>

          {/* Title */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
              required
              className="post-title-input"
            />
            <div className="char-count">{title.length}/300</div>
          </div>

          {/* Content based on type */}
          {postType === 'text' && (
            <div className="form-group">
              <textarea
                placeholder="Text (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="post-content-textarea"
              />
            </div>
          )}

          {postType === 'image' && (
            <div className="form-group">
              <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="post-url-input"
              />
              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>
          )}

          {postType === 'link' && (
            <div className="form-group">
              <input
                type="url"
                placeholder="URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
                className="post-url-input"
              />
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-post">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
