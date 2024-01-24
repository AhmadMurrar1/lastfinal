
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './assets/Home';
import Register from './assets/Register';
import RentPro from './assets/RentPro';
import ProfileLibrary from './assets/ProfileLibrary';
import Cart from './assets/Cart';
import Refund from './assets/Refund';
import Login from './assets/Login';
import Search from './assets/Search';
import SearchResults from './assets/SearchResults';
import GameDetails from './assets/GameDetails';
import AdminPage from './assets/AdminPage';

function App() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <section className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home userId={userId} userData={userData} />} />
          <Route path='/refund' element={<Refund />} />
          <Route path='/login' element={<Login setUserId={setUserId} setUserData={setUserData} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rentpro' element={<RentPro />} />
          <Route path='/profile-library' element={<ProfileLibrary userId={userId} setUserData={setUserData} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<Search userId={userId} />} />
          <Route path='/searchresults' element={<SearchResults />} />
          <Route path='/games/:id' element={<GameDetails />} />
          <Route path='/admin-dashboard' element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;


