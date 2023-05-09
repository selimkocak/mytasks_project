// frontend\src\components\notifications\NotificationPanel.js
import React, { useState } from 'react';
import NotificationList from './NotificationList';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned to you', time: '2 mins ago' },
    { id: 2, message: 'Your task has been completed', time: '5 mins ago' },
    // ...
  ]);

  const onClear = () => {
    setNotifications([]);
  };

  return (
    <div className="notification-panel">
      <h2>Notifications</h2>
      <NotificationList notifications={notifications} />
      <button onClick={onClear}>Clear all</button>
    </div>
  );
};

export default NotificationPanel;
