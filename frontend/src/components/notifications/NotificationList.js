// frontend/src/components/notifications/NotificationList.js
import React, { useState, useEffect } from 'react';
import { getNotifications, deleteNotification } from '../../services/api';
import './NotificationList.css'; // NotificationList.css dosyasını içe aktardık

function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      alert('Notification deleted successfully');
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  return (
    <div className="notification-list-container"> {/* className ile stil sınıfını ekledik */}
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.description}</p>
          <button onClick={() => handleDelete(notification.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;
