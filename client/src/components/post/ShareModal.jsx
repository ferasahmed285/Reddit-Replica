import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import '../../styles/ShareModal.css';

const ShareModal = ({ isOpen, onClose, postId, postTitle }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/post/${postId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToReddit = () => {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(postTitle)}`, '_blank');
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share post</h3>
          <button className="share-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="share-options">
          <button className="share-option" onClick={copyToClipboard}>
            <div className="share-icon-wrapper copy">
              {copied ? <Check size={24} /> : <Copy size={24} />}
            </div>
            <span className="share-option-label">Copy Link</span>
          </button>

          <button className="share-option" onClick={shareToTwitter}>
            <div className="share-icon-wrapper twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </div>
            <span className="share-option-label">Twitter</span>
          </button>

          <button className="share-option" onClick={shareToFacebook}>
            <div className="share-icon-wrapper facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </div>
            <span className="share-option-label">Facebook</span>
          </button>

          <button className="share-option" onClick={shareToReddit}>
            <div className="share-icon-wrapper reddit">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="12" r="1.5"/>
                <circle cx="15" cy="12" r="1.5"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 11.5c-.3.3-.7.5-1.2.5-.4 0-.8-.2-1-.5-.3-.3-.3-.7 0-1 .3-.3.7-.3 1 0 .2.2.5.2.7 0 .3-.3.3-.7 0-1-.2-.2-.5-.2-.7 0-.3.3-.7.3-1 0-.3-.3-.3-.7 0-1 .3-.3.7-.3 1 0 .5.5.8 1.2.8 1.9 0 .7-.3 1.4-.8 1.9z"/>
              </svg>
            </div>
            <span className="share-option-label">Reddit</span>
          </button>
        </div>

        <div className="share-link-section">
          <label className="share-link-label">Or copy link</label>
          <div className="share-link-input-wrapper">
            <input 
              type="text" 
              value={shareUrl} 
              readOnly 
              className="share-link-input"
              onClick={(e) => e.target.select()}
            />
            <button 
              onClick={copyToClipboard} 
              className={`btn-copy-link ${copied ? 'copied' : ''}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
