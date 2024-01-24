import React from 'react';
import { FaReact } from 'react-icons/fa'; // Example icon

function Footer() {
  const footerStyles = {
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    bottom: '-10px',
    width: '100vw',
    borderTop: '1px solid #444',
    height:"5rem"
  };

  const sectionStyle = {
    margin: '0 10px',
  };

  const iconStyles = {
    marginLeft: '5px',
    verticalAlign: 'middle',
  };

  return (
    <footer style={footerStyles}>
      <div style={sectionStyle}>
        <p>Explore Endless Gaming</p>
      </div>
      <div style={sectionStyle}>
        <p>
          © 2024 GameRent. All rights reserved.
        </p>
      </div>
      <div style={sectionStyle}>
        <p>
          Powered by
          <FaReact style={iconStyles} />
          GameRent Tech
        </p>
      </div>
    </footer>
  );
}

export default Footer;
