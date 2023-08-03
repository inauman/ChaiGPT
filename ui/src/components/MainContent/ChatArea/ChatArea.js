import React, { useState } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow/ChatWindow';
import InputArea from './InputArea/InputArea';
import './InputArea/InputArea.css';
import './ChatWindow/ChatWindow.css';
import './ChatArea.css';

const sendToBot = async (userInput) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/chat', { user_input: userInput });
    return response.data; // Assuming the response contains the bot's message
  } catch (error) {
    console.error("An error occurred while sending the message:", error);
    return null;
  }
};

const ChatArea = ({onUpdateTitle, messages, setMessages}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (userMessage) => {
    setMessages([...messages, { type: 'user', content: userMessage }]);
    setIsTyping(true);
    const botResponse = await sendToBot(userMessage);
    setIsTyping(false);

    if (botResponse) {
      setMessages([...messages, { type: 'user', content: userMessage }, { type: 'assistant', content: botResponse.message }]);
      if (botResponse.title) {
        onUpdateTitle(botResponse.title);
      }
    } else {
      // Handle error in the response here
    }
  };

  return (
    <div className="chat-area">
      <ChatWindow messages={messages} isTyping={isTyping} />
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;
