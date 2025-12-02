import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import '../styles/StaticPage.css';

const StaticPage = ({ title, children, isSidebarCollapsed, onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="static-page-layout">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={onToggleSidebar} />
      <main className="static-page-main">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="static-page-content">
          <h1>{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
};

export default StaticPage;
