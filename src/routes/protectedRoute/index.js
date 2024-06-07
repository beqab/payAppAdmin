import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Endpoints from '../../services/endpints';
import { getCurrentUser } from '../../store/profile/profileSlice';

// let url;

// if (process.env.NODE_ENV === 'development') {
//   url = 'http://localhost:5000/api';
// } else {
//   url = 'https://table-book-back.onrender.com/api';
// }
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// axios.defaults.headers.common['Content-Type'] = `"application/json`;
// axios.defaults.baseURL = url;

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { loading, profile } = useSelector((state) => {
    return state.profileReducer;
  });
  useEffect(() => {
    dispatch(getCurrentUser(navigate));
  }, [pathname]);

  useEffect(() => {
    if (!loading && !profile) {
      navigate('/auth/loginformik');
    }
  }, [loading, profile]);
  return children;
};

export default ProtectedRoute;
