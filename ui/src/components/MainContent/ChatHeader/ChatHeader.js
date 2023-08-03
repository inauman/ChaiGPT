import React, { useState } from 'react';
import './ChatHeader.css';

const ChatHeader = () => {
  const [selectedModel, setSelectedModel] = useState('4.0');

  return (
    <div className="chat-header">
      <div className="model-selection">
        <button
          className={`model-button ${selectedModel === '3.5' ? 'active' : ''}`}
          onClick={() => setSelectedModel('3.5')}
        >
          3.5
          {/* <img src="icon-3.5.png" alt="3.5 Model" /> 3.5 */}
        </button>
        <button
          className={`model-button ${selectedModel === '4.0' ? 'active' : ''}`}
          onClick={() => setSelectedModel('4.0')}
        >
          4.0
          {/* <img src="icon-4.0.png" alt="4.0 Model" /> 4.0 */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
