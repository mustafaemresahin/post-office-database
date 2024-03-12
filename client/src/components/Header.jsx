import React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css'; // Importing the CSS file

const Header = () => {
  return (
    <header className="fixed-header">
      <nav>
        <Link to="/home">Home</Link>
      </nav>
      <div className="websiteName">{/* Your website name content here */}</div>
      <div className="logo">{/* Your logo content here */}</div>
      <nav>
        <Link to="/Send Package">Send Package</Link>
      </nav>
      <nav>
        <Link to="/login">Login/Signup</Link>
      </nav>
    </header>
  );
};

export default Header;
