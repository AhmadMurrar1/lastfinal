
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login({ setUserId, setUserData }) {
//   const [loginInfo, setLoginInfo] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo({
//       ...loginInfo,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://backendfinal-c767.onrender.com/api/users/login',
//         loginInfo,
//         {
//           withCredentials: true,
//         }
//       );
//       const { userId, token } = response.data;
//       setUserId(userId);
//       localStorage.setItem('authToken', token);

//       const userDataResponse = await axios.get(`https://backendfinal-c767.onrender.com/api/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserData(userDataResponse.data);
//       navigate('/profile-library');
//     } catch (error) {
//       setErrorMessage('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleLogin}>
//         <label>
//           Username/Email:
//           <input
//             type="text"
//             name="username"
//             value={loginInfo.username}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={loginInfo.password}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const loginStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  gameRentHeader: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #fff1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
    padding:'10px',
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
  loginCard: {
    maxWidth: '40rem', 
    width: '100%',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #333',
    borderRadius: '5px',
    outline: 'none',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#333',
    color: 'white',
    width: '100%',
    padding: '10px 0', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 0', 
    textDecoration: 'none', 
    display: 'inline-block', 
    textAlign: 'center',
  },
};

function Login({ setUserId, setUserData }) {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://backendfinal-c767.onrender.com/api/users/login',
        loginInfo,
        {
          withCredentials: true,
        }
      );
      const { userId, token } = response.data;
      setUserId(userId);
      localStorage.setItem('authToken', token);

      const userDataResponse = await axios.get(`https://backendfinal-c767.onrender.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(userDataResponse.data);
      navigate('/profile-library');
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.gameRentHeader}>
        <div style={loginStyles.gameRentText}>GameRent</div>
        <div style={{ borderBottom: '1px solid #333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}></div>
      </div>
      <div style={loginStyles.loginCard}>
        <h2>Login</h2>
        {errorMessage && <p style={loginStyles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            style={loginStyles.input}
            type="text"
            name="username"
            placeholder="Username/Email"
            value={loginInfo.username}
            onChange={handleChange}
          />
          <br />
          <input
            style={loginStyles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <br />
          <button style={loginStyles.loginButton} type="submit">Login</button>
          <Link to="/register" style={loginStyles.loginButton}>Register</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

