import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages = [], isTyping }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.content} 
        </div>
      ))}
      {isTyping && <div className="typing-indicator">Typing...</div>}
    </div>
  );
};

export default ChatWindow;

