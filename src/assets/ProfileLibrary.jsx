import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const profileStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '100px',
    fontFamily: 'Lato, sans-serif',
    fontWeight:"100",
    },
  profileCard: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',

  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
    fontFamily: 'Montserrat, sans-serif'
  },
  paragraph: {
    marginBottom: '15px',
  },
  logoutButton: {
    backgroundColor: '#333', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontFamily: 'Lato, sans-serif',
    marginLeft: '10px',

  },
  links: {
    textDecoration: 'none',
    color: 'white', 
    marginTop: '10px',
    marginLeft: '10px',
    backgroundColor:"#333",
    padding:"10px",
    borderRadius:"5px",
    fontSize:"15px",
  },
  table: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableHeader: {
    backgroundColor: '#333',
    fontWeight: '500',
    padding: '10px',
    color:'white'
  },
  tableCell: {
    padding: '10px',
  },
};

function ProfileLibrary() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile data:', error);
          navigate('/login');
        });
    } else {

      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  const registerStyles = {
    gameRentHeader: {
      display: 'flex',
      padding: '10px',
      alignItems: 'center',
      borderBottom: '1px solid #fff1',
      position:"absolute",
      top: '0',
      left:'0',
      width: '100%',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      marginBottom: '20px',
    },
    gameRentText: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginRight: '20px',
    },
  };
  return (
    <div style={profileStyles.container}>
            <div style={registerStyles.gameRentHeader}>
        <div style={registerStyles.gameRentText}>GameRent</div>
        <div style={{ borderBottom: '1px solid #333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}></div>
      </div>
      {userData ? (
        <div className='cardProfile' style={profileStyles.profileCard}>
          <table style={profileStyles.table}>
            <tbody>
              <tr style={profileStyles.tableRow}>
                <td style={profileStyles.tableHeader}>Username</td>
                <td style={profileStyles.tableCell}>{userData.username}</td>
              </tr>
              <tr style={profileStyles.tableRow}>
                <td style={profileStyles.tableHeader}>Email</td>
                <td style={profileStyles.tableCell}>{userData.email}</td>
              </tr>
              <tr style={profileStyles.tableRow}>
                <td style={profileStyles.tableHeader}>Your Role</td>
                <td style={profileStyles.tableCell}>{userData.role}</td>
              </tr>
                <tr style={profileStyles.tableRow}>
                <td style={profileStyles.tableHeader}>Cash</td>
                <td style={profileStyles.tableCell}>${userData.cash}</td>
              </tr> 
                <tr style={profileStyles.tableRow}>
                <td style={profileStyles.tableHeader}>Credits</td>
                <td style={profileStyles.tableCell}>{userData.credits}</td>
              </tr> 
            </tbody>
          </table>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <h3>Library</h3>
      <div className='card-container card-container-left'>
        {userData && userData.listOfGames && userData.listOfGames.length > 0 ? (
          userData.listOfGames.map(game => (
            <div id='fixlibrary' key={game._id} className="game-card">
              <div className='game-card-inner'>
                <img style={{width:"100%",height:"100%"}} src={game.url} alt={game.name} />
                <div className="card-details">
                  <h3>{game.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You don't have any games listed.</p>
        )}
      </div>
          <Link to="/" style={profileStyles.links}>
            Back to Home
          </Link>
      <button style={profileStyles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
          <div id='footer' className='footer' style={{position:"absolute",left:"0",bottom:"-80rem"}}><Footer/></div>
    </div>
  );
}

export default ProfileLibrary;
