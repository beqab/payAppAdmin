import { createSlice } from '@reduxjs/toolkit';
// import Axios from '../../services/Axios';
import Endpoints from '../../services/endpints';
import Axios from '../../services/Axios';

const initialState = {
  profile: null,
  isAuth: false,
  loading: true,
};

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000/api';
} else {
  url = 'https://payappback.onrender.com/api';
}

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, { payload }) => {
      // localStorage.setItem('token', payload.token);
      // Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      // axios.defaults.headers.common['Content-Type'] = `"application/json`;
      // axios.defaults.baseURL = url;
      state.profile = payload;
      state.loading = false;
      state.isAuth = true;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    logOut: (state, { payload }) => {
      localStorage.removeItem('token');
      // alert('dtoken');
      // axios.defaults.headers.common['Authorization'] = null;
      delete Axios.defaults.headers.common['Authorization'];
      // Axios.removeItem("")
      state.isAuth = false;
      state.profile = null;
    },
  },
});

export const { getProfile, setLoading, logOut } = ProfileSlice.actions;

export const getCurrentUser =
  (navigate = null) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await Axios.get(Endpoints.getAdminProfile);
      // console.log(res.data, 'es.dataes.dataes.dataes.data');
      dispatch(getProfile(res.data));
    } catch (err) {
      // console.log(err, 'rrrrrrrr');
      if (navigate) {
        dispatch(setLoading(false));
        dispatch(logOut());
        navigate('/auth/loginFormik');
      }
      dispatch(logOut());
    }
  };

export default ProfileSlice.reducer;
