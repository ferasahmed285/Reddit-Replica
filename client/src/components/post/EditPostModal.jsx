import { useState } from 'react';
import { X } from 'lucide-react';
import { postsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import '../../styles/EditPostModal.css';

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isOpen || !post) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      showToast('Title cannot be empty', 'error');
      return;
    }

    try {
      setLoading(true);
      const updatedPost = await postsAPI.update(post.id, {
        title: title.trim(),
        content: content.trim(),
      });
      
      showToast('Post updated successfully! ✏️', 'success');
      onPostUpdated(updatedPost);
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      showToast(`Failed to update: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-post-overlay" onClick={onClose}>
      <div className="edit-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-post-header">
          <h2>Edit Post</h2>
          <button className="edit-post-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-title-input"
              maxLength={300}
              disabled={loading}
            />
            <span className="char-count">{title.length}/300</span>
          </div>

          {post.type === 'text' && (
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="edit-content-textarea"
                rows={8}
                disabled={loading}
              />
            </div>
          )}

          {post.type === 'image' && (
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="edit-url-input"
                disabled={loading}
              />
              {content && (
                <div className="image-preview">
                  <img src={content} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>
          )}

          <div className="edit-post-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading || !title.trim()}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
