import React, { useState } from 'react';
import axios from 'axios';
import useChatAPI from '../hooks/useChatAPI'; // Import custom ChatGPT hook

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  const { sendMessage } = useChatAPI(); // Use ChatGPT API hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token); // Save the JWT token after successful login
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  const handleSendMessage = async () => {
    if (token && message) {
      try {
        const response = await sendMessage(token, message); // Call the ChatGPT API
        setChatResponse(response.message); // Display response from ChatGPT
      } catch (error) {
        console.error('Chat error:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {token && (
        <div>
          <h2>Chat with GPT</h2>
          <input
            type="text"
            placeholder="Ask ChatGPT something"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
          {chatResponse && <p>Response: {chatResponse}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
