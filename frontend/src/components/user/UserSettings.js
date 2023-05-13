// frontend/src/components/user/UserSettings.js
import React, { useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { changePassword } from '../../services/api';
import './UserSettings.css';

function UserSettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      return;
    }
    try {
      await changePassword(passwords);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password: ', error);
    }
  };

  return (
    <div className="user-settings-container">
      <div className="user-settings-card">
        <h2>User Settings</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
