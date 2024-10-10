// Chat.jsx
import React, { useState } from 'react';
import { useChatAPI } from '../hooks/useChatAPI';
import { useNavigate } from 'react-router-dom';
import '../app.css';

const Chat = () => {
  const [input, setInput] = useState(''); // State for user input
  const { sendMessage, messages, isLoading } = useChatAPI(); // Custom hook for chat API
  const navigate = useNavigate(); // Hook for navigation

  // Function to send the user message
  const handleSendMessage = async () => {
    if (input.trim()) {
      try {
        await sendMessage(input); // Call the sendMessage function from the hook
        setInput(''); // Clear the input after sending
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  // Function to navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="chat-container">
      {/* Textarea to display chat messages */}
      <textarea
        className="chat-display"
        value={messages.map((msg) => `${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text}`).join('\n')}
        readOnly
      />

      {/* Input field for sending prompts/messages */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt or message..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
          Send
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Back button to navigate to the previous page */}
      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default Chat;
