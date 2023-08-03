import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatArea from './ChatArea/ChatArea';

import './MainContent.css';

const MainContent = () => {
  const [chatTitle, setChatTitle] = useState('');
  const [messages, setMessages] = useState([]);

  // Call this function when you receive a response from the bot.
  const updateTitle = (title) => {
    console.log("Updating chat title to:", title);
    setChatTitle(title);
  };

  // This is the function that starts a new chat
  const startNewChat = () => {
    setMessages([]); // Reset the messages
  };

  return (
    <div className="main-content">
      <Sidebar title={chatTitle} onStartNewChat={startNewChat} />
      <div className="chat-section">
        <ChatHeader />
        <ChatArea onUpdateTitle={updateTitle} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default MainContent;