import React from 'react';
import NavbarProfile from '../components/NavbarProfile';

const SearchPage = () => {
  return (
    <div>
      <NavbarProfile />
      <div style={{ padding: '30px' }}>
        <h2>Search</h2>
        <p>Search form for Local or Affiliate by Name, Photo, Fingerprint, or ID Number here.</p>
      </div>
    </div>
  );
};

export default SearchPage;
