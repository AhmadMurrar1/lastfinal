import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [userId, setUserId] = useState(null);
  const [successfulGame, setSuccessfulGame] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios.get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => console.error('Error fetching user ID:', error));
    }

    axios.get(`https://backendfinal-c767.onrender.com/api/games/${id}`)
      .then((response) => setGame(response.data))
      .catch((error) => console.error('Error fetching game details:', error));
  }, [id]);

  const addToCart = () => {
    if (userId) {
      axios.post('https://backendfinal-c767.onrender.com/api/users/add-to-cart', {
        userId,
        gameId: id
      })
      .then(response => {
        setSuccessfulGame('Game added successfully');
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('Failed to add game to cart');
      });
    } else {
      alert('User ID not found. Please log in.');
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const headerStyles = {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    color: 'black',
    padding: '10px',
    fontSize: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #fff1',
    marginBottom:"40px",
    fontWeight: 'bold'
  };

  return (
    <div  >
      <div style={headerStyles}>GameRent</div>
      <div className='gamedetails' style={{ display: 'flex', backgroundColor: '#fff', maxWidth: '100%' }}>
        <img className='gameimgdetails' src={game.url} alt={game.name} style={{ minWidth: '65rem', maxWidth: '65rem', minHeight: '35.25rem', maxHeight: '35.25rem', width: 'auto', height: 'auto', objectFit: 'cover', backgroundColor: '#f5f5f5', padding: '1.25rem', borderRadius: '0.3125rem' }} />
        <div style={{ flex: '1', textAlign: 'left', padding: '1.25rem' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem', color: '#333' }}>{game.name}</h2>
          <p style={{ fontSize: '1.5rem', color: 'green', display: 'flex', alignItems: 'center' }}>$ {game.price}</p>
          <p style={{ fontSize: '1.25rem', color: '#444', marginTop: '1.25rem' }}>List of Games: {game.listOfGames}</p>
          <button onClick={addToCart} style={{ backgroundColor: '#333', color: '#fff', padding: '20px', borderRadius: '0.3125rem', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1.25rem' }}>Add to Cart</button>
          <p style={{ color: 'green' }}>{successfulGame}</p>
        </div>
      </div>
      <button onClick={()=>{navigate('/')}} style={{ backgroundColor: '#333', color: '#fff', marginLeft:"23px",margin:"10px",padding: '0.5rem', borderRadius: '0.3125rem', fontSize: '1.1rem', border: 'none',width:"10rem", cursor: 'pointer', marginTop: '1.25rem' }}>Back</button>
      <div style={{position:"absolute",bottom:"100%",left:"0",bottom:"-50px"}}><Footer/></div>

    </div>
  );
}

export default GameDetails;
