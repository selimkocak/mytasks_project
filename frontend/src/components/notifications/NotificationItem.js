// frontend\src\components\notifications\NotificationItem.js
import React from 'react';

const NotificationItem = ({ notification }) => (
  <div className="notification-item">
    <div className="notification-message">{notification.message}</div>
    <div className="notification-time">{notification.time}</div>
  </div>
);

export default NotificationItem;
