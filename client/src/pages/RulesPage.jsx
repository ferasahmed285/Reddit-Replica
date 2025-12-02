import StaticPage from './StaticPage';

const RulesPage = ({ isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <StaticPage 
      title="Reddit Rules" 
      isSidebarCollapsed={isSidebarCollapsed} 
      onToggleSidebar={onToggleSidebar}
    >
      <p>
        Reddit is a platform for communities to discuss, connect, and share in an open environment. 
        These rules help keep Reddit safe and welcoming for everyone.
      </p>
      
      <h2>Rule 1: Remember the Human</h2>
      <p>
        Reddit is a place for creating community and belonging, not for attacking marginalized 
        or vulnerable groups of people. Everyone has a right to use Reddit free of harassment, 
        bullying, and threats of violence.
      </p>
      
      <h2>Rule 2: Abide by Community Rules</h2>
      <p>
        Post authentic content into communities where you have a personal interest, and do not 
        cheat or engage in content manipulation or otherwise interfere with or disrupt Reddit communities.
      </p>
      
      <h2>Rule 3: Respect the Privacy of Others</h2>
      <p>
        Instigating harassment, for example by revealing someone's personal or confidential 
        information, is not allowed.
      </p>
      
      <h2>Rule 4: Do Not Post Illegal Content</h2>
      <p>
        Do not post content that is illegal or solicits or facilitates illegal or prohibited transactions.
      </p>
      
      <h2>Rule 5: No Impersonation</h2>
      <p>
        Do not impersonate an individual or entity in a misleading or deceptive manner.
      </p>
      
      <h2>Rule 6: Label NSFW Content</h2>
      <p>
        Content that contains nudity, pornography, or profanity must be labeled as NSFW.
      </p>
      
      <h2>Rule 7: No Spam</h2>
      <p>
        Keep it legal, and avoid posting illegal content or soliciting or facilitating 
        illegal or prohibited transactions.
      </p>
      
      <div className="highlight-box">
        <p><strong>Enforcement</strong></p>
        <p>
          Violations of these rules may result in content removal, account suspension, 
          or permanent bans depending on the severity of the violation.
        </p>
      </div>
    </StaticPage>
  );
};

export default RulesPage;
