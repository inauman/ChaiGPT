import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ title, onStartNewChat }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <i className={`fa ${isExpanded ? 'fa-arrow-left' : 'fa-arrow-right'}`} />
      </button>
      {isExpanded && (
        <>
          <button className="new-chat-button" onClick={onStartNewChat}>+ New chat</button>
          <div className="chat-list">
            <div className="chat-item">{title}</div>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

