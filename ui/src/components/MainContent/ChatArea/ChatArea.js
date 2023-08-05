import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow/ChatWindow';
import InputArea from './InputArea/InputArea';
import './InputArea/InputArea.css';
import './ChatWindow/ChatWindow.css';
import './ChatArea.css';

const sendToBot2 = async (userMessage) => {
  const response = await fetch('http://127.0.0.1:5000/api/chat1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_input: userMessage }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message to bot: ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += new TextDecoder().decode(value);
  }

  return JSON.parse(result);
};

const sendToBot = async (userInput) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/chat1', { user_input: userInput });
    return response.data; // Assuming the response contains the bot's message
  } catch (error) {
    console.error("An error occurred while sending the message:", error);
    return null;
  }
};

const ChatArea = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/stream');
    
    eventSource.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      setMessages(prev => [...prev, newMessage]);
    }
    
    return () => {
      eventSource.close();
    }
    
  }, []);

  const handleSendMessage2 = async (userMessage) => {
    setMessages([...messages, { type: 'user', content: userMessage }]);
    setIsTyping(true);
    const botResponse = await sendToBot(userMessage);
    setIsTyping(false);
  
    if (botResponse) {
      setMessages([...messages, { type: 'user', content: userMessage }, { type: 'assistant', content: botResponse.message, streamedResponse: botResponse.streamedResponse }]);
      
    } else {
      // Handle error in the response here
    }
  };

  const handleSendMessage = async (userMessage) => {
    setMessages([...messages, { type: 'user', content: userMessage }]);
    setIsTyping(true);
    const botResponse = await sendToBot(userMessage);
    setIsTyping(false);

    if (botResponse) {
      setMessages([...messages, { type: 'user', content: userMessage }, { type: 'assistant', content: botResponse.message }]);
      
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
