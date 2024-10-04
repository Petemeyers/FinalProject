import axios from 'axios';

const useChatAPI = () => {
  const sendMessage = async (token, message) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/chat', // ChatGPT endpoint or your proxy
        { message },                  // Pass the message to ChatGPT
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Attach JWT token in the headers
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

export default useChatAPI;
