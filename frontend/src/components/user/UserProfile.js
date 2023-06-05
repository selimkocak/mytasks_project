// frontend/src/components/user/UserProfile.js
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
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
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const response = await getUserProfile(userId);
        setUserProfile(response.data);
      }
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
      const response = await updateUserProfile(userProfile);
      if (response && response.data) {
        alert('User profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating user profile: ', error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="first_name"
              value={userProfile.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="last_name"
              value={userProfile.last_name}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
