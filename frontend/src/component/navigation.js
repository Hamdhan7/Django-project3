import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navigation.css';
import ProductList from './Products/ProductList';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode', !isDarkMode);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Navbar

        variant={isDarkMode ? 'dark' : 'light'}
        expand="lg"
        className={`fixed-top ${isDarkMode ? 'bg-blur-dark' : 'bg-blur-light'}`}
      >
        <div className="container-fluid">
          <Navbar.Brand href="#" className="mt-2 mt-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </Navbar.Brand>

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className={`me-auto mb-2 mb-lg-0 ${isMobile ? 'd-lg-none' : ''}`}>
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Products</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="d-flex align-items-center">
            <Nav.Link onClick={toggleDarkMode} className="dark-mode-button">
              <i className={isDarkMode ? 'fas fa-sun text-white' : 'fas fa-moon'}></i>
            </Nav.Link>
            {isAuth ? (
              <Nav.Link href="/logout">
                <i className={`fas fa-sign-out-alt ${isDarkMode ? 'text-white' : ''}`}></i>
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">
                <i className={`fas fa-sign-in-alt ${isDarkMode ? 'text-white' : ''}`}></i>
              </Nav.Link>
            )}
            <div className={`dropdown ${isMobile ? 'd-lg-none' : ''}`}>
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow me-2"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              {/* Dropdown menu content */}
            </div>
          </div>


        </div>
      </Navbar>
      <div style={{ marginTop: '70px' }}>
        {/* Add a top margin of 70px to create space */}
        <ProductList isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}
