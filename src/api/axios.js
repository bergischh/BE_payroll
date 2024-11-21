import axios from 'axios';
import Cookies from "js-cookie"

// URL API diambil dari .env
const apiUrl = "http://127.0.0.1:8000/";
if (!apiUrl) {
  throw new Error('API URL is not defined');
}

// Fungsi untuk register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}api/register/`, userData); // Menggunakan apiUrl
    // console.log('Registration successful:', response.data);
    return response;
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
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}api/login/`, userData);
    return response;

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
// export const fetchUsers = async () => {
//   try {
//       const token = Cookies.get("token"); // Gunakan Cookies.get untuk mengambil token
//       const response = await axios.get(`${apiUrl}api/users/`, {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching users:", error);
//       throw error;
//   }
// };
