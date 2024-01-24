// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backendfinal-c767.onrender.com/api/games/games?query=${searchQuery}`);
        const data = await response.json();
        console.log('All Games:', data);
        filterGames(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  const filterGames = (data) => {
    const filtered = data.filter((game) =>
      game.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    console.log('Filtered Games:', filtered);
    setFilteredGames(filtered);
  };

  const registerStyles = {
    gameRentHeader: {
      display: 'flex',
      padding: '10px',
      alignItems: 'center',
      borderBottom: '1px solid #fff1',
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
    <div>
      <div style={registerStyles.gameRentHeader}>
        <div style={registerStyles.gameRentText}>GameRent</div>
        <div style={{ borderBottom: '1px solid #333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}></div>
      </div>
      <div className='card-container card-container-left'>
        {filteredGames.map((game) => (
          <Link to={`/games/${game._id}`} key={game._id} className="game-card">
            <div className='game-card-inner' key={game.id}>
              <img src={game.url} alt={game.name} />
              <div className="card-details">
                <h3>{game.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
