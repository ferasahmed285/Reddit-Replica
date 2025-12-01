import Sidebar from '../components/layout/Sidebar';
import PostList from '../components/post/PostList';
import RightSidebar from '../components/layout/RightSidebar';

const PopularPage = ({ onAuthAction, isSidebarCollapsed, onToggleSidebar }) => {
  return (
    <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
         <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
         <div style={{ display: 'flex', flex: 1, padding: '20px 24px', gap: '24px' }}>
            <main style={{ flex: 1, maxWidth: '740px' }}>
               <h2 style={{ marginBottom: '16px' }}>Popular Posts</h2>
               <PostList sortBy="top" onAuthRequired={onAuthAction} />
            </main>
            <div className="desktop-only" style={{ width: '312px' }}>
                <RightSidebar />
            </div>
         </div>
      </div>
    </div>
  );
};
export default PopularPage;