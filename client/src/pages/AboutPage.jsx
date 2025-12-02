import StaticPage from './StaticPage';

const AboutPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="About Reddit" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        Reddit is a network of communities where people can dive into their interests, 
        hobbies and passions. There's a community for whatever you're interested in on Reddit.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Reddit's mission is to bring community, belonging, and empowerment to everyone in the world. 
        We believe that communities can change your life, and we're building the platform to make that happen.
      </p>
      
      <h2>How Reddit Works</h2>
      <p>
        Reddit is home to thousands of communities, endless conversation, and authentic human connection. 
        Whether you're into breaking news, sports, TV fan theories, or a never-ending stream of the 
        internet's cutest animals, there's a community on Reddit for you.
      </p>
      
      <div className="highlight-box">
        <p><strong>Founded:</strong> 2005</p>
        <p><strong>Headquarters:</strong> San Francisco, California</p>
        <p><strong>Users:</strong> Millions of daily active users worldwide</p>
      </div>
      
      <h2>Our Values</h2>
      <ul>
        <li>Remember the human</li>
        <li>Behave like you would in real life</li>
        <li>Look for the original source of content</li>
        <li>Search for duplicates before posting</li>
        <li>Read the community's rules</li>
      </ul>
    </StaticPage>
  );
};

export default AboutPage;
