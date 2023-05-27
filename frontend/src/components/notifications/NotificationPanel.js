// frontend/src/components/notifications/NotificationPanel.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>USER</th>
            <th>TITLE</th>
            <th>CREATED AT</th>
            <th>READ</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.id}>
              <td>{notification.user}</td>
              <td>{notification.title}</td>
              <td>{notification.created_at}</td>
              <td>{notification.read ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default NotificationPanel;


