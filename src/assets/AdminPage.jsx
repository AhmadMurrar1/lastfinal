import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus, FaUserEdit, FaUserPlus, FaGamepad } from 'react-icons/fa';
import { IoGitNetworkSharp } from "react-icons/io5";

function AdminPage() {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [newGame, setNewGame] = useState({ name: '', price: '', listOfGames: [], url: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [editGame, setEditGame] = useState({ id: '', name: '', price: '', listOfGames: [], url: '' });
  const [editUser, setEditUser] = useState({ id: '', username: '', email: '' });

  useEffect(() => {
    fetchGames();
    fetchUsers();
  }, []);

  const fetchGames = () => {
    axios.get('https://backendfinal-c767.onrender.com/api/games/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  };

  const fetchUsers = () => {
    axios.get('https://backendfinal-c767.onrender.com/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleAddGame = () => {
    axios.post('https://backendfinal-c767.onrender.com/api/games/create', newGame)
      .then(() => {
        fetchGames();
        setNewGame({ name: '', price: '', listOfGames: [], url: '' });
      })
      .catch(error => console.error('Error adding game:', error));
  };

  const handleAddUser = () => {
    axios.post('https://backendfinal-c767.onrender.com/api/users/register', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({ username: '', email: '', password: '' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteGame = (gameId) => {
    axios.delete(`https://backendfinal-c767.onrender.com/api/games/${gameId}`)
      .then(() => fetchGames())
      .catch(error => console.error('Error deleting game:', error));
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`https://backendfinal-c767.onrender.com/api/users/${userId}`)
      .then(() => fetchUsers())
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleUpdateGame = () => {
    axios.put(`https://backendfinal-c767.onrender.com/api/games/${editGame.id}`, editGame)
      .then(() => {
        fetchGames();
        setEditGame({ id: '', name: '', price: '', listOfGames: [], url: '' });
      })
      .catch(error => console.error('Error updating game:', error));
  };

  const handleUpdateUser = () => {
    axios.put(`https://backendfinal-c767.onrender.com/api/users/${editUser.id}`, editUser)
      .then(() => {
        fetchUsers();
        setEditUser({ id: '', username: '', email: '' });
      })
      .catch(error => console.error('Error updating user:', error));
  };

  // UI Styles
  const containerStyle = {
    padding: '20px',
    margin: 'auto',
    maxWidth: '800px',
    textAlign: 'center'
  };

  const inputStyle = {
    marginRight: '10px',
    padding: '8px',
    width: '200px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    margin: '5px'
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
    padding: '10px',
    borderBottom: '1px solid #ddd'
  };

  return (
    <div style={containerStyle}>
      <h1>Admin Dashboard</h1>
      
      {/* Games List */}
      <section>
        <h2>Games List <FaGamepad /></h2>
        {games.map(game => (
          <div key={game._id} style={listItemStyle}>
            {game.name} - ${game.price}
            <div>
              <button onClick={() => handleDeleteGame(game._id)} style={buttonStyle}><FaTrash /> Delete</button>
              <button onClick={() => setEditGame({ id: game._id, name: game.name, price: game.price, listOfGames: game.listOfGames, url: game.url })} style={buttonStyle}><FaEdit /> Edit</button>
            </div>
          </div>
        ))}
        <div>
          <h2>Add a game</h2>
          <input type="text" value={newGame.name} onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} placeholder="Game Name" style={inputStyle} />
          <input type="number" value={newGame.price} onChange={(e) => setNewGame({ ...newGame, price: e.target.value })} placeholder="Game Price" style={inputStyle} />
          <input type="text" value={newGame.url} onChange={(e) => setNewGame({ ...newGame, url: e.target.value })} placeholder="Game URL" style={inputStyle} />
          {/* Add input for list of games (array) */}
          <button onClick={handleAddGame} style={buttonStyle}><FaPlus /> Add Game</button>
        </div>
        <div>
          <h2>Update a game</h2>
          <input type="text" value={editGame.id} onChange={(e) => setEditGame({ ...editGame, id: e.target.value })} placeholder="Game ID" style={inputStyle} />
          <input type="text" value={editGame.name} onChange={(e) => setEditGame({ ...editGame, name: e.target.value })} placeholder="New Game Name" style={inputStyle} />
          <input type="number" value={editGame.price} onChange={(e) => setEditGame({ ...editGame, price: e.target.value })} placeholder="New Game Price" style={inputStyle} />
          <input type="text" value={editGame.url} onChange={(e) => setEditGame({ ...editGame, url: e.target.value })} placeholder="Game URL" style={inputStyle} />
          {/* Add input for updating list of games (array) */}
          <button onClick={handleUpdateGame} style={buttonStyle}><FaEdit /> Update Game</button>
        </div>
      </section>

      {/* Users List */}
      <section>
        <h2>Users List <FaUserPlus /></h2>
        {users.map(user => (
          <div key={user._id} style={listItemStyle}>
            {user.username}
            <div>
              <button onClick={() => handleDeleteUser(user._id)} style={buttonStyle}><FaTrash /> Delete</button>
              <button onClick={() => setEditUser({ id: user._id, username: user.username, email: user.email })} style={buttonStyle}><FaEdit /> Edit</button>
            </div>
          </div>
        ))}
        <div>
          <h2>Add a user</h2>
          <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Username" style={inputStyle} />
          <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" style={inputStyle} />
          <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Password" style={inputStyle} />
          <button onClick={handleAddUser} style={buttonStyle}><FaUserPlus /> Add User</button>
        </div>
        <div>
          <h2>Update a user</h2>
          <input type="text" value={editUser.id} onChange={(e) => setEditUser({ ...editUser, id: e.target.value })} placeholder="User ID" style={inputStyle} />
          <input type="text" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} placeholder="New Username" style={inputStyle} />
          <input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} placeholder="New Email" style={inputStyle} />
          <button onClick={handleUpdateUser} style={buttonStyle}><FaUserEdit /> Update User</button>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
