import React from 'react';
import './AssistantMessage.css';

const AssistantMessage = ({ message }) => {
  return (
    <div className="assistant-message">
      <div className="assistant-icon"></div>
      <div className="assistant-text">{message}</div>
    </div>
  );
};

export default AssistantMessage;
