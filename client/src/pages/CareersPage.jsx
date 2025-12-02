import StaticPage from './StaticPage';

const CareersPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="Careers at Reddit" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        Join us in building the future of community. At Reddit, you'll work on products 
        that impact millions of people every day.
      </p>
      
      <h2>Why Reddit?</h2>
      <ul>
        <li>Work on products used by millions worldwide</li>
        <li>Collaborative and inclusive culture</li>
        <li>Competitive compensation and benefits</li>
        <li>Remote-friendly work environment</li>
        <li>Continuous learning and growth opportunities</li>
      </ul>
      
      <h2>Open Positions</h2>
      
      <div className="highlight-box">
        <h3>Engineering</h3>
        <ul>
          <li>Senior Software Engineer - Backend</li>
          <li>Senior Software Engineer - Frontend</li>
          <li>Machine Learning Engineer</li>
          <li>Site Reliability Engineer</li>
        </ul>
      </div>
      
      <div className="highlight-box">
        <h3>Product & Design</h3>
        <ul>
          <li>Product Manager</li>
          <li>Senior Product Designer</li>
          <li>UX Researcher</li>
        </ul>
      </div>
      
      <div className="highlight-box">
        <h3>Operations</h3>
        <ul>
          <li>Community Manager</li>
          <li>Trust & Safety Specialist</li>
          <li>Data Analyst</li>
        </ul>
      </div>
      
      <h2>Our Benefits</h2>
      <ul>
        <li>Comprehensive health coverage</li>
        <li>401(k) matching</li>
        <li>Flexible PTO</li>
        <li>Parental leave</li>
        <li>Learning & development budget</li>
      </ul>
    </StaticPage>
  );
};

export default CareersPage;
