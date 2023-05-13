// frontend/src/components/user/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import './UserProfile.css';

function UserProfile() {
  const [userProfile, setUserProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!isAuthenticated()) {
      return;
    }

    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile: ', error);
    }
  };

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      return;
    }
    try {
      await updateUserProfile(userProfile);
      alert('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile: ', error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={userProfile.first_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={userProfile.last_name}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
