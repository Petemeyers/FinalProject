// useChatAPI.jsx
import axios from 'axios';

export const useChatAPI = () => {
  const sendMessage = async (token, message) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/chat',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  return { sendMessage };
};