import axios from 'axios';

// // const baseUrl = 'http://localhost:5000/api';
// const baseUrl = 'https://table-book-back.onrender.com/api';

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5000/api';
} else {
  baseUrl = 'https://api.tablebook.ge/api';
}

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken;
};

const token = getAuthToken();

const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    // Add any other custom headers you need
  },
});

export default Axios;
