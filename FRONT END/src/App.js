import { React, useState } from 'react';
import './App.css';
import LoginPage from './screen/loginPage';
import MainPage from './screen/mainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import useToken from './hook/useToken';
const App = () => {
  const { token, setToken } = useToken();
  if (!token) {
    return <LoginPage setToken={setToken} />;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
