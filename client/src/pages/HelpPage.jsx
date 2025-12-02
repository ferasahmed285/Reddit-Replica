import StaticPage from './StaticPage';

const HelpPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="Help Center" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        Welcome to the Reddit Help Center. Here you'll find answers to common questions 
        and resources to help you get the most out of Reddit.
      </p>
      
      <h2>Getting Started</h2>
      <ul>
        <li>Creating an account</li>
        <li>Customizing your profile</li>
        <li>Finding communities to join</li>
        <li>Understanding karma and awards</li>
      </ul>
      
      <h2>Posting & Commenting</h2>
      <ul>
        <li>How to create a post</li>
        <li>Formatting your posts and comments</li>
        <li>Adding images and links</li>
        <li>Editing and deleting content</li>
      </ul>
      
      <h2>Community Guidelines</h2>
      <p>
        Each community on Reddit has its own rules and guidelines. Make sure to read 
        the rules of a community before posting. Moderators enforce these rules to 
        keep communities safe and on-topic.
      </p>
      
      <h2>Account & Security</h2>
      <ul>
        <li>Changing your password</li>
        <li>Two-factor authentication</li>
        <li>Managing email preferences</li>
        <li>Deactivating your account</li>
      </ul>
      
      <div className="highlight-box">
        <p><strong>Need more help?</strong></p>
        <p>Contact our support team at support@reddit.com</p>
      </div>
    </StaticPage>
  );
};

export default HelpPage;
