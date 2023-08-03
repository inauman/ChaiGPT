// src/components/Header/Header.js
import React from 'react';
import './Header.css'; // We'll create this file for styling later

const Header = () => {
  return (
    <header className="header">
      <img src="/logo192.png" alt="Logo" className="logo" />
      {/* You can replace the path with the actual path to your logo */}
    </header>
  );
};

export default Header;
