import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Or 'react-router' depending on your version
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/profile/profileSlice';
import Axios from '../Axios';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const useAxiosInterceptors = () => {
  // Hook to get the history object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log('handleLogOut vhandleLogOut');
    dispatch(logOut());

    navigate('/auth/loginformik');
  };

  useEffect(() => {
    // Request interceptor to attach the token to every request
    const requestInterceptor = Axios.interceptors.request.use(
      (config) => {
        const token = getAuthToken(); // Get the latest token
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
        }
        return config;
      },
      (error) => {
        // Handle the error
        return Promise.reject(error);
      },
    );

    // Create an interceptor to handle responses
    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        // Return the response directly if it's successful
        return response;
      },
      (error) => {
        // Check if the error response indicates an invalid token

        if (error.response && error.response.status === 402) {
          const errorMessage = error.response.data.message;
          //   console.log(errorMessage, 'error.response++');

          if (errorMessage && errorMessage.toLowerCase().includes('invalid token')) {
            console.log(errorMessage, 'error.response++');

            // Log out the user if the token is invalid
            // alert('ups3');

            handleLogOut();
          }
        }

        // Otherwise, reject the error to be handled by individual requests
        return Promise.reject(error);
      },
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptors;
