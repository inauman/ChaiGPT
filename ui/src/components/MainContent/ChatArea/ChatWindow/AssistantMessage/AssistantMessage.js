import React from 'react';
import './AssistantMessage.css';

const AssistantMessage = ({ message, streamedResponse }) => {
  return (
    <div className="assistant-message">
      <div className="assistant-icon"></div>
      <div className="assistant-text">
        {message}
        {streamedResponse && <p>{streamedResponse}</p>}
      </div>
    </div>
  );
};

export default AssistantMessage;
