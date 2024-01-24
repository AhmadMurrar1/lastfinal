
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUndoAlt } from 'react-icons/fa';
import { GiSharpCrown } from 'react-icons/gi';
import { LuUserPlus } from 'react-icons/lu';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Search from './Search';
import { FaUserCheck } from "react-icons/fa6";
import Footer from './Footer';

function Home() {
  const [games, setGames] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      axios.get('https://backendfinal-c767.onrender.com/api/users/user-profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error('Error fetching user profile data:', error));
    }

    axios.get('https://backendfinal-c767.onrender.com/api/games/games')
      .then((response) => setGames(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const isAdmin = userData && userData.role === 'admin';

  return (
    <main className="Home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <section className="HomeNav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
        <h1 className="GameRenth1" style={{ fontSize: '30px', paddingRight: '3px' }}>
          GameRent
        </h1>
        <div style={{ width: '60%' }}>
          <Search />
        </div>
        <div className="ReFundIcon" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FaUndoAlt style={{ marginRight: '8px' }} />
          <Link to="/refund">Refund</Link>
        </div>
        <div className="RentProHome" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <GiSharpCrown style={{ marginRight: '8px' }} />
          <Link to="/rentpro">RentPro</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <FaUserCheck />
              {isAdmin ? (
              <Link to="/admin-dashboard">Admin</Link>
            ) : (
              <Link to="/profile-library">Profile</Link> 
            )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <LuUserPlus style={{ marginRight: '8px' }} />
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
        <div className="CartHome" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <IoMdCart style={{ marginRight: '8px' }} />
          <Link to="/cart">Cart</Link>
        </div>
      </section>
      <section>
        <ImageSlider userData={userData} />
      </section>
      <section>
        <h2>Featured Games</h2>
        <div className="card-container">
  {games.map((game) => (
    <Link to={`/games/${game._id}`} key={game._id} className="game-card">
      <img src={game.url} alt={game.name} />
      <div className="card-details">
        <h3>{game.name}</h3>
        <p>Price: ${game.price}</p>
      </div>
    </Link>
  ))}
</div>

      </section>
      <Footer/>
    </main>
  );
}

export default Home;



