/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reportWebVitals from './reportWebVitals';
import { store } from './store/Store';
import App from './App';
import './data';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* </BrowserRouter> */}
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
