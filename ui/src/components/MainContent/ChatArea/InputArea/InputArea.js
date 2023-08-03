import React from 'react';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize'
import './InputArea.css';

  const InputArea = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents the addition of a new line in the text area when the Enter key is pressed
      handleSendMessage();
    }
  };
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="input-area">
      <TextareaAutosize minRows="1" maxRows="7"
        className="input-textarea"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows="1"
      />
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default InputArea;
