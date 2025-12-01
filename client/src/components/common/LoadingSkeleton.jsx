import '../../styles/LoadingSkeleton.css';

export const PostSkeleton = () => (
  <div className="post-skeleton">
    <div className="post-skeleton-header">
      <div className="skeleton skeleton-circle" style={{ width: '24px', height: '24px' }} />
      <div className="skeleton skeleton-text" style={{ width: '100px' }} />
      <div className="skeleton skeleton-text" style={{ width: '60px' }} />
    </div>
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-content" />
    <div className="skeleton-footer">
      <div className="skeleton skeleton-button" />
      <div className="skeleton skeleton-button" />
      <div className="skeleton skeleton-button" />
    </div>
  </div>
);

export const CommentSkeleton = () => (
  <div className="comment-skeleton">
    <div className="comment-skeleton-header">
      <div className="skeleton skeleton-text" style={{ width: '80px' }} />
      <div className="skeleton skeleton-text" style={{ width: '60px' }} />
    </div>
    <div className="skeleton comment-skeleton-body" />
    <div className="comment-skeleton-actions">
      <div className="skeleton skeleton-text" style={{ width: '40px', height: '10px' }} />
      <div className="skeleton skeleton-text" style={{ width: '40px', height: '10px' }} />
    </div>
  </div>
);

export const UserProfileSkeleton = () => (
  <div className="profile-skeleton">
    <div className="skeleton profile-skeleton-banner" />
    <div className="profile-skeleton-content">
      <div className="skeleton profile-skeleton-avatar" />
      <div className="skeleton profile-skeleton-name" />
      <div className="skeleton profile-skeleton-bio" />
      <div className="skeleton profile-skeleton-bio" style={{ width: '60%' }} />
    </div>
  </div>
);

export const CommunityCardSkeleton = () => (
  <div className="community-card-skeleton">
    <div className="skeleton community-skeleton-banner" />
    <div className="community-skeleton-content">
      <div className="skeleton community-skeleton-icon" />
      <div className="skeleton community-skeleton-name" />
      <div className="skeleton community-skeleton-desc" />
      <div className="skeleton community-skeleton-desc" style={{ width: '80%' }} />
      <div className="skeleton community-skeleton-stats" />
    </div>
  </div>
);

export const PostListSkeleton = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <PostSkeleton key={i} />
    ))}
  </>
);

export const CommentListSkeleton = ({ count = 5 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <CommentSkeleton key={i} />
    ))}
  </>
);
