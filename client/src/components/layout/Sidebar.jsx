import React from 'react';
import '../../styles/Sidebar.css';
import { feeds, communityItems } from '../../data/sidebar';

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        
        {/* Top Section (Keep icons here) */}
        <div className="sidebar-section">
          {feeds.map((item) => (
            <a href={item.link} key={item.name} className="sidebar-link">
              {/* <span className="sidebar-icon">{item.icon}</span> */}
              <span className="sidebar-text">{item.name}</span>
            </a>
          ))}
        </div>

        <hr className="sidebar-divider" />

        {/* Recent Section (ICONS REMOVED) */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">RECENT</h3>
          {communityItems.slice(0, 3).map((item) => (
            <a href={item.link} key={item.name} className="sidebar-link community-link">
              {/* REMOVED: <span className="sidebar-icon-circle">{item.icon}</span> */}
              <span className="sidebar-text">{item.name}</span>
            </a>
          ))}
        </div>

        <hr className="sidebar-divider" />

        {/* Communities Section (ICONS REMOVED) */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">COMMUNITIES</h3>
          <button className="sidebar-create-btn">
            <span>+</span> Create Community
          </button>
          {communityItems.map((item) => (
            <a href={item.link} key={item.name} className="sidebar-link community-link">
               {/* REMOVED: <span className="sidebar-icon-circle">{item.icon}</span> */}
              <span className="sidebar-text">{item.name}</span>
            </a>
          ))}
        </div>

        {/* ... Resources and Footer sections remain the same ... */}
         <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-title">RESOURCES</h3>
          {/* (Keep resources icons if desired, or remove them similarly) */}
           <a href="#" className="sidebar-link"><span className="sidebar-text">About Reddit</span></a>
           {/* ... etc ... */}
        </div>
        
         <div className="sidebar-footer">
          <p>Reddit Rules · Privacy PolicyUser Agreement</p>
          <p>© 2025 Reddit, Inc. All rights reserved.</p>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;