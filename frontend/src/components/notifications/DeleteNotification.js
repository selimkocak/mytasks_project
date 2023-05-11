// frontend/src/components/notifications/DeleteNotification.js
import React from 'react';
import { deleteNotification } from '../../services/api';

function DeleteNotification({ notificationId, onDelete }) {
  const handleDelete = async () => {
    try {
      await deleteNotification(notificationId);
      alert('Notification deleted successfully');
      onDelete();
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Notification</button>
    </div>
  );
}

export default DeleteNotification;