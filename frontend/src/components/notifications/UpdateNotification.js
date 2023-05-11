// frontend/src/components/notifications/UpdateNotification.js
import React, { useState, useEffect } from 'react';
import { updateNotification, getNotifications } from '../../services/api';

function UpdateNotification({ notificationId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await getNotifications();
      const notification = response.data.find(notification => notification.id === notificationId);
      setTitle(notification.title);
      setDescription(notification.description);
    } catch (error) {
      console.error("Error fetching notification: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateNotification(notificationId, { title, description });
      alert('Notification updated successfully');
    } catch (error) {
      console.error("Error updating notification: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
  </label>
  <button type="submit">Update Notification</button>
</form>

);
}

export default UpdateNotification;

