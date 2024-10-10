import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Importing CSS for styling

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">MyApp</div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          
          <li>
            <Link to="/chat">Begin Adventure</Link>
          </li>
          <li>
            <Link to="/character-creation">Character Creation</Link>
          </li>
          <li>
            <Link to="/party-builder">Party Builder</Link>
          </li>
          <li>
            <Link to="/character-list">Character List</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <h1>Welcome to My App</h1>
      <p>This is the home page of the application.</p>
      <p>
      Click on <Link to="/character-creation">"Create Character"</Link> to access the full features of the app.
      </p>
    </div>
  );
};

export default HomePage;
