import StaticPage from './StaticPage';

const BlogPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="Reddit Blog" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        Stay up to date with the latest news, updates, and stories from Reddit.
      </p>
      
      <h2>Latest Posts</h2>
      
      <div className="highlight-box">
        <h3>Introducing New Community Features</h3>
        <p><em>December 1, 2025</em></p>
        <p>
          We're excited to announce new features that make it easier than ever to 
          connect with your favorite communities and discover new ones.
        </p>
      </div>
      
      <div className="highlight-box">
        <h3>Year in Review: 2025</h3>
        <p><em>November 15, 2025</em></p>
        <p>
          Take a look back at the most memorable moments, trending topics, and 
          community highlights from the past year on Reddit.
        </p>
      </div>
      
      <div className="highlight-box">
        <h3>Safety Updates and Improvements</h3>
        <p><em>October 28, 2025</em></p>
        <p>
          Learn about our ongoing efforts to make Reddit a safer place for everyone, 
          including new moderation tools and policy updates.
        </p>
      </div>
      
      <h2>Categories</h2>
      <ul>
        <li>Product Updates</li>
        <li>Community Spotlights</li>
        <li>Safety & Security</li>
        <li>Company News</li>
        <li>Engineering</li>
      </ul>
    </StaticPage>
  );
};

export default BlogPage;
