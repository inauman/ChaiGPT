import React from 'react';
import Chat from './Streaming';

import './MainContent.css';

const MainContent = () => {

  return (
    <div className="main-content">

      <div className="chat-section">
        <Chat />
      </div>
    </div>
  );
}

export default MainContent;