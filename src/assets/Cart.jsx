import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [ownedGames, setOwnedGames] = useState([]);
  const [ownMessage, setOwnMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserId(response.data.id);
        setOwnedGames(response.data.listOfGames);
      })
      .catch((error) => {
        console.error('Error fetching user profile data:', error);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      axios.get(`https://backendfinal-c767.onrender.com/api/users/${userId}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart:', error));
    }
  }, [userId]);

  const purchaseGame = (gameId) => {

    if (ownedGames.some(game => game._id === gameId)) {
      setOwnMessage('you already own this game');
      removeFromCart(gameId);
      setCartItems(currentItems => currentItems.filter(item => item._id !== gameId));
      setTimeout(() => setMessage(''), 3000);
      return;
    }
  
    axios.post(`https://backendfinal-c767.onrender.com/api/games/${gameId}/purchase`, { userId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(() => {
      removeFromCart(gameId);
      setMessage('Purchase successful');
      setCartItems(currentItems => currentItems.filter(item => item._id !== gameId));
      setTimeout(() => setMessage(''), 3000);
    })
    .catch(error => {
      console.error('Error purchasing game:', error);
      setMessage('Purchase failed. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    });
  };
  
  

const removeFromCart = (gameId) => {
  axios.post(`https://backendfinal-c767.onrender.com/api/users/remove-from-cart`, { userId, gameId }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  })
  .then(response => {
    // Update the cart items in the state
    setCartItems(currentItems => currentItems.filter(item => item._id !== gameId));
  })
  .catch(error => {
    console.error('Error removing game from cart:', error);
    setMessage('Failed to remove game from cart. Please try again.');
  });
};
const registerStyles = {
  gameRentHeader: {
    borderBottom: '1px solid #fff1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    color: 'black',
    textAlign: 'left',
    width: '100%',
  },
  gameRentText: {
    fontSize: '36px',
    fontWeight: 'bold'
  }
};

const cardImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover'
};

const buttonStyle = {
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

  return (
    <div>
      <div style={registerStyles.gameRentHeader}>
        <div style={registerStyles.gameRentText}>GameRent</div>
      </div>

      <h2 style={{ textAlign: 'center', marginTop: '60px' }}>Your Cart</h2>
      {message && <p style={{ color: "green", textAlign: 'center' }}>{message}</p>}
      {ownMessage && <p style={{ color: "blue", textAlign: 'center' }}>{ownMessage}</p>}

      <div className="card-container">
        {cartItems.length > 0 ? (
          cartItems.map(game => (
            <div key={game._id} className="game-card">
              <img src={game.url} alt={game.name} style={cardImageStyle} />
              <div className="card-details">
                <h3>{game.name}</h3>
                <p>Price: ${game.price}</p>
                <button onClick={() => purchaseGame(game._id)} style={buttonStyle}>Purchase</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        )}
      </div>
      <div style={{position:"absolute",left:"0",bottom:"-33px"}}><Footer/></div>
    </div>
  );
}

export default Cart;
