import axios from 'axios';

// URL API diambil dari .env
const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error('API URL is not defined');
}

// Fungsi untuk register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/register/`, userData); // Menggunakan apiUrl
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      throw error.response;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error during registration:', error.message);
      throw new Error('Registration failed');
    }
  }
};

// Fungsi untuk login user
export const loginUser = async (credentials) => {
  try {
    return await axios.post(`${apiUrl}/api/login/`, credentials); // Menggunakan apiUrl
  } catch (error) {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
      throw error.response;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }
};

// Fungsi untuk fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/`); // Menggunakan apiUrl
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
