import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to show loading state during login

  const login = async (username, password) => {
    setLoading(true); // Set loading to true when login request starts
    setError(null); // Clear any previous error
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setToken(response.data.token); // Save the JWT token
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading when the request finishes
    }
  };

  return { token, error, loading, login };
};

export default useLogin;
