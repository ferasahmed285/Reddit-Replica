import { useState, useRef, useEffect } from 'react';
import { Bell, Check, MessageSquare, ArrowBigUp, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/NotificationsDropdown.css';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'upvote',
      message: 'Your post "React 19 is coming" received 100 upvotes',
      time: '2 hours ago',
      read: false,
      link: '/post/4'
    },
    {
      id: 2,
      type: 'comment',
      message: 'SeniorDev replied to your comment',
      time: '4 hours ago',
      read: false,
      link: '/post/5'
    },
    {
      id: 3,
      type: 'follow',
      message: 'CodeNinja started following you',
      time: '1 day ago',
      read: true,
      link: '/user/CodeNinja'
    },
    {
      id: 4,
      type: 'upvote',
      message: 'Your comment received 50 upvotes',
      time: '2 days ago',
      read: true,
      link: '/post/1'
    },
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'upvote':
        return <ArrowBigUp size={20} className="notif-icon upvote" />;
      case 'comment':
        return <MessageSquare size={20} className="notif-icon comment" />;
      case 'follow':
        return <UserPlus size={20} className="notif-icon follow" />;
      default:
        return <Bell size={20} className="notif-icon" />;
    }
  };

  return (
    <div className="notifications-container" ref={dropdownRef}>
      <button 
        className="notifications-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notif-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read">
                <Check size={16} />
                Mark all as read
              </button>
            )}
          </div>

          <div className="notif-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={48} />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <Link
                  key={notif.id}
                  to={notif.link}
                  className={`notif-item ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => {
                    markAsRead(notif.id);
                    setIsOpen(false);
                  }}
                >
                  {getIcon(notif.type)}
                  <div className="notif-content">
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  {!notif.read && <div className="unread-dot" />}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
