import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './component/Home';
import { Navigation } from './component/navigation';
import { Logout } from './component/logout';
import './App.css';
import {Login} from "./component/login";
import ProductList from "./component/Products/ProductList";
import React, { useState, useEffect } from 'react';

function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
