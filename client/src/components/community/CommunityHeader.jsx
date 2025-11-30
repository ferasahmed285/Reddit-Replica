import React from 'react';
import '../../styles/CommunityHeader.css';

const CommunityHeader = ({ 
  bannerUrl, 
  iconUrl, 
  name, 
  title, 
  members, 
  online 
}) => {
  return (
    <div className="community-header-container">
      {/* 1. Top Banner */}
      <div 
        className="community-banner" 
        style={{ backgroundImage: `url(${bannerUrl})`, backgroundColor: '#33a8ff' }}
      >
      </div>

      {/* 2. White Bar with Info */}
      <div className="community-header-content">
        <div className="content-wrapper">
          
          {/* Icon (Overlaps Banner) */}
          <div className="community-icon-container">
            {iconUrl ? (
              <img src={iconUrl} alt={name} className="community-main-icon" />
            ) : (
              <div className="community-default-icon">r/</div>
            )}
          </div>

          {/* Text Info & Buttons */}
          <div className="community-text-info">
            <h1 className="community-title">
              {title}
              <span className="community-name-small">{name}</span>
            </h1>
            
            <div className="community-actions">
              <button className="btn-join">Join</button>
              <button className="btn-bell" aria-label="Notifications">🔔</button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="community-tabs-bar">
        <div className="content-wrapper">
            <div className="tab-list">
                <a href="#" className="tab-link active">Posts</a>
                <a href="#" className="tab-link">Wiki</a>
                <a href="#" className="tab-link">Rules</a>
                <a href="#" className="tab-link">FAQ</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;