import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to /searchresults with the search term as a query parameter
    navigate(`/searchresults?query=${searchTerm}`);
  };

  return (
    <div className='Searchs'>
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#F0F0F0', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '8px' }}
      >
        <IoSearch size={24} style={{ marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: '70%', padding: '8px', border: 'none', outline: 'none', flexGrow: 1, backgroundColor: '#F0F0F0' }}
        />
        <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
