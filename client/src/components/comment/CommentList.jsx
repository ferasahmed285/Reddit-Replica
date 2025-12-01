import Comment from './Comment';
import '../../styles/CommentList.css';

const CommentList = ({ comments, onAuthRequired, onReplyAdded }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet</p>
        <p className="no-comments-sub">Be the first to share what you think!</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          onAuthRequired={onAuthRequired}
          onReplyAdded={onReplyAdded}
        />
      ))}
    </div>
  );
};

export default CommentList;
