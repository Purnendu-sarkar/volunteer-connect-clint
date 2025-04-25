import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';


const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      {user.photoURL && <img src={user?.photoURL} alt="Profile Picture" />}
      <p>Name: {user?.displayName || "No name set"}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;