// src/components/layout/RightSidebar.jsx
import React from 'react';
import '../../styles/RightSidebar.css';
import { popularCommunities } from '../../data/communities'; // <--- Import added

const RightSidebar = ({ communityData }) => {
  
  // CASE 1: Community Page (About Widget)
  if (communityData) {
    return (
      <aside className="right-sidebar">
        <div className="widget-container">
          <div className="widget-header" style={{ backgroundColor: '#0079d3', color: 'white' }}>
            <h3 style={{ color: 'white' }}>About Community</h3>
          </div>
          <div style={{ padding: '12px', fontSize: '14px', lineHeight: '1.5' }}>
            
            <div style={{ marginBottom: '12px' }}>
               {communityData.description}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', color: '#7c7c7c', marginBottom: '12px' }}>
               <span style={{ marginRight: '8px' }}>🎂</span>
               Created {communityData.created}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />
            
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                 <div style={{ fontWeight: '700', fontSize: '16px' }}>{communityData.members}</div>
                 <div style={{ fontSize: '12px', color: '#7c7c7c' }}>Members</div>
              </div>
              <div>
                 <div style={{ fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#46d160', borderRadius: '50%', marginRight: '4px' }}></span>
                    {communityData.online}
                 </div>
                 <div style={{ fontSize: '12px', color: '#7c7c7c' }}>Online</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create Post</button>
          </div>
        </div>
        
        <div className="right-sidebar-footer">
           <p>r/{communityData.title} Rules</p>
        </div>
      </aside>
    );
  }

  // CASE 2: Home Page (Popular Communities Widget)
  return (
    <aside className="right-sidebar">
      <div className="widget-container">
        <div className="widget-header">
          <h3>POPULAR COMMUNITIES</h3>
        </div>
        <ul className="community-list">
          {/* Now using the imported data array */}
          {popularCommunities.map((community, index) => (
            <li key={index} className="community-item">
              <img src={community.icon} alt="" className="community-icon" />
              <div className="community-info">
                {/* Updated to link to dynamic routes */}
                <a href={`/${community.name}`} className="community-name">{community.name}</a>
                <span className="community-members">{community.members}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn-see-more">See more</button>
      </div>
      
      <div className="right-sidebar-footer">
        <div className="footer-links">
          <p>Reddit Rules</p>
          <p>Privacy Policy</p>
          <p>User Agreement</p>
        </div>
        <p className="copyright">Reddit, Inc. © 2025. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;