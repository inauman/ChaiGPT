import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleButtonClick = async() => {
    // Add the user's input message to the chat
    const userMessage = { id: Date.now(), text: userInput, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send a POST request to the chat API with the user's input
      const response = await fetch('http://127.0.0.1:5000/api/chaty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: "user", content: userInput }] }),
        //body: JSON.stringify({ message: userInput })
      });
      // Get a ReadableStreamDefaultReader object from the response body
      const reader = response.body.getReader();

      // Read the response as text
      let data = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        data += new TextDecoder().decode(value);
        // Add the server's response to the chat
        const serverMessage = { id: Date.now(), text: data, sender: 'server' };
        setMessages((prevMessages) => [prevMessages, serverMessage]);
        
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    // Clear the user input
    setUserInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
          padding: '10px',
          width: '60%',
          backgroundColor: '#f0f0f0',
        }}
      >
        {messages.map((message) => (
          <div key={message.id} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            {message.text}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#e0e0e0',
          padding: '10px',
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          style={{ width: '60%', marginRight: '10px' }}
        />
        <button onClick={handleButtonClick}>Submit</button>
      </div>
    </div>
  );
}

export default App;
