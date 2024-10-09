// Chat.jsx
import React, { useState, useEffect } from 'react';
import { useChatAPI } from '../hooks/useChatAPI'; // Ensure the path is correct

const Chat = () => {
  const { sendMessage } = useChatAPI();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('jwtToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!token) {
      setError('No token found, please log in.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await sendMessage(token, message); // Pass the token when sending the message
      setResponse(res.message);
      setMessage('');
    } catch (error) {
      setError('Error sending message: ' + error.message);
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Send a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} disabled={loading}>Send</button>
      {loading && <p>Loading...</p>}
      {response && <p>Response: {response}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Chat;
