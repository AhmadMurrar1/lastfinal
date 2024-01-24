import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const registerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  gameRentHeader: {
    display: 'flex',
    padding:"10px",
    alignItems: 'center',
    borderBottom: '1px solid #fff1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
    position: 'absolute', 
    top: 0,
    left: 0, 
    width: '100%', 
  },
  gameRentText: {
    fontSize: '36px', 
    fontWeight: 'bold',
    marginRight: '20px',
  },
  registerCard: {
    maxWidth: '40rem',
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    margin: '10px 0',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    width: '48%', 
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #333',
    borderRadius: '5px',
    outline: 'none',
    color: '#333',
  },
  passwordInput: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #333',
    borderRadius: '5px',
    outline: 'none',
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#333',
    color: 'white',
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 0',
  },
};

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://backendfinal-c767.onrender.com/api/users/register',
        registerInfo
      );
      navigate('/login');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={registerStyles.container}>
      <div style={registerStyles.gameRentHeader}>
        <div style={registerStyles.gameRentText}>GameRent</div>
        <div style={{ borderBottom: '1px solid #333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}></div>
      </div>
      <div style={registerStyles.registerCard}>
        <h2>Register</h2>
        {errorMessage && <p style={registerStyles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div style={registerStyles.inputContainer}>
            <input
              style={registerStyles.input}
              type="text"
              name="username"
              placeholder="Username"
              value={registerInfo.username}
              onChange={handleChange}
            />
            <input
              style={registerStyles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={registerInfo.email}
              onChange={handleChange}
            />
          </div>
          <input
            style={registerStyles.passwordInput}
            type="password"
            name="password"
            placeholder="Password"
            value={registerInfo.password}
            onChange={handleChange}
          />
          <br />
          <button style={registerStyles.registerButton} type="submit">Register</button>
        </form>
        <button onClick={handleLogin} style={registerStyles.registerButton}>Login</button>
      </div>
    </div>
  );
}

export default Register;
