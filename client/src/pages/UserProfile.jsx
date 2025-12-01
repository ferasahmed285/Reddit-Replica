import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import PostList from '../components/post/PostList';
import { getUserByName } from '../data/users';

const UserProfile = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  const { username } = useParams();
  const user = getUserByName(username);

  if (!user) return <div style={{padding: 20}}>User not found</div>;

  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
        
        <div style={{ display: 'flex', flex: 1, padding: '20px', gap: '24px' }}>
          {/* Main Feed */}
          <main style={{ flex: 1, maxWidth: '740px' }}>
             <h2 style={{margin: '0 0 20px 0'}}>u/{user.username} posts</h2>
             {/* Filter posts by author */}
             <PostList filterByAuthor={user.username} onAuthRequired={onAuthAction} />
          </main>

          {/* Profile Sidebar Card */}
          <aside style={{ width: '312px' }}>
             <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #ccc' }}>
                <div style={{ height: '80px', background: '#33a8ff', borderRadius: '8px 8px 0 0', marginBottom: '-40px'}}></div>
                <img src={user.avatar} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', marginLeft: '12px'}} alt=""/>
                
                <h2 style={{ marginTop: '8px' }}>{user.username}</h2>
                <p style={{ fontSize: '12px', color: '#666' }}>u/{user.username}</p>
                
                <p style={{ marginTop: '12px', fontSize: '14px' }}>{user.description}</p>
                
                <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                   <div>
                      <div>{user.karma}</div>
                      <div style={{fontSize: '12px', color: '#888', fontWeight: 'normal'}}>Karma</div>
                   </div>
                   <div>
                      <div>{user.cakeDay}</div>
                      <div style={{fontSize: '12px', color: '#888', fontWeight: 'normal'}}>Cake Day</div>
                   </div>
                </div>
                
                <button style={{ width: '100%', background: '#0079d3', color: 'white', border: 'none', borderRadius: '99px', padding: '10px', fontWeight: '700', marginTop: '20px'}}>Follow</button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;