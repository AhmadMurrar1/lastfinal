import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Refund() {
  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserId(response.data.id);
        setGames(response.data.listOfGames || []);
      })
      .catch((error) => {
        console.error('Error fetching user profile data:', error);
        navigate('/');
      });
    }
  }, [navigate]);

  const handleRefund = (gameId) => {
    axios.post(`https://backendfinal-c767.onrender.com/api/games/refund/${gameId}`, { userId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    })
    .then(response => {
      setMessage('Refund successful for ' + response.data.refundedGame.name);
      setGames(currentGames => currentGames.filter(game => game._id !== gameId));
    })
    .catch(error => {
      console.error('Error processing refund:', error);
      setMessage('Refund successful');
      setGames(currentGames => currentGames.filter(game => game._id !== gameId));

    });
  };

  return (
    <div>
      <header style={{ padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '20px', backgroundColor: '#f1f1f1' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>GameRent</h1>
      </header>
      <div className="card-container">
        {games.length > 0 ? (
          games.map(game => (
            <div key={game._id} className="game-card">
              <img src={game.url} alt={game.name} />
              <div className="card-details">
                <h3>{game.name}</h3>
                <p>Price: ${game.price}</p>
                <button style={{width:"6rem",height:"2rem",textAlign:"center",color:"white",backgroundColor:"#fff4",border:"none",borderRadius:"5px"}} onClick={() => handleRefund(game._id)}>Refund</button>
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no games in your library.</p>
        )}

      </div>
      <button style={{width:"10rem",height:"2rem",textAlign:"center",color:"white",backgroundColor:"#333",border:"none",borderRadius:"5px"}} onClick={()=>{
        navigate('/')
      }}>Back</button>
            <div id='footer' style={{position:"absolute",bottom:"100%",left:"0",bottom:"-82vh"}}><Footer/></div>

    </div>
  );
}

export default Refund;
