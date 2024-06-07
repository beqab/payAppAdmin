/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Suspense } from 'react';
import { useRoutes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000/api';
} else {
  url = 'https://api.tablebook.ge/api';
}

axios.defaults.baseURL = url;

const App = () => {
  // const routing = useRoutes(Themeroutes);
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
        dir={direction ? 'rtl' : 'ltr'}
      >
        <ThemeSelector />

        <RouterProvider router={createBrowserRouter(Themeroutes)} />
        {/* {routing} */}
      </div>
    </Suspense>
  );
};

export default App;
