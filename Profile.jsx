import React from 'react';
import NavbarProfile from '../components/NavbarProfile';

const ProfilePage = () => {
  return (
    <div>
      <NavbarProfile />
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2>Welcome to your Profile Page!</h2>
        <p>Select an option from the navbar to proceed.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
