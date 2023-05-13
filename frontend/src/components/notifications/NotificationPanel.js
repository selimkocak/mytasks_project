// frontend/src/components/notifications/NotificationPanel.js
import React, { useState, useEffect } from 'react';
import { getNotifications } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  return (
    <div>
      <h2>Notification Panel</h2>
      {notifications.map(notification => (
        <div key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NotificationPanel;
