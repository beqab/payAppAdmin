import React from 'react';
import { redirect } from 'react-router-dom';

const logout = () => {
  redirect('/');
  return <div>logout</div>;
};

export const logoutLoader = () => {
  localStorage.removeItem('token');

  return redirect('/');
};

export default logout;
