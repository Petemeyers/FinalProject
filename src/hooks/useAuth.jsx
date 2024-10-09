import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return { token, isAuthenticated: Boolean(token), login, logout, error, loading };
};

export default useAuth;
