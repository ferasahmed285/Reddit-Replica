import StaticPage from './StaticPage';

const PrivacyPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="Privacy Policy" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        <em>Last Updated: December 1, 2025</em>
      </p>
      <p>
        At Reddit, we believe that privacy is a right. This Privacy Policy explains how we collect, 
        use, and share information about you when you use our services.
      </p>
      
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as:</p>
      <ul>
        <li>Account information (username, email, password)</li>
        <li>Profile information (avatar, bio)</li>
        <li>Content you post (posts, comments, messages)</li>
        <li>Actions you take (votes, saves, follows)</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Personalize your experience</li>
        <li>Send you notifications and updates</li>
        <li>Protect against fraud and abuse</li>
        <li>Comply with legal obligations</li>
      </ul>
      
      <h2>Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share information in the following circumstances:
      </p>
      <ul>
        <li>With your consent</li>
        <li>With service providers who assist us</li>
        <li>To comply with legal requirements</li>
        <li>To protect rights and safety</li>
      </ul>
      
      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Delete your account and data</li>
        <li>Opt out of certain data collection</li>
      </ul>
      
      <h2>Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your 
        personal information against unauthorized access, alteration, disclosure, or destruction.
      </p>
      
      <div className="highlight-box">
        <p><strong>Contact Us</strong></p>
        <p>
          If you have questions about this Privacy Policy, please contact us at privacy@reddit.com
        </p>
      </div>
    </StaticPage>
  );
};

export default PrivacyPage;
