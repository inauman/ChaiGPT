import React from 'react';
import './UserMessage.css';

const UserMessage = ({ message }) => {
  return (
    <div className="user-message">
      <div className="user-icon"></div>
      <div className="user-text">{message}</div>
    </div>
  );
};

export default UserMessage;
