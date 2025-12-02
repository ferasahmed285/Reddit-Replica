import { X, Users } from 'lucide-react';
import '../../styles/JoinPromptModal.css';

const JoinPromptModal = ({ isOpen, onClose, communityName, onJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="join-prompt-overlay" onClick={onClose}>
      <div className="join-prompt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="join-prompt-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="join-prompt-icon">
          <Users size={48} />
        </div>
        
        <h2>Join r/{communityName} to post</h2>
        <p>You need to be a member of this community before you can create posts.</p>
        
        <div className="join-prompt-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-join" onClick={onJoin}>
            Join & Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPromptModal;
