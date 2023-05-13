// frontend/src/components/notifications/DeleteNotification.js
import React from 'react';
import { deleteNotification } from '../../services/api';
import './DeleteNotification.css'; // DeleteNotification.css dosyasını içe aktardık

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
    <div className="delete-notification-button"> {/* className ile stil sınıfını ekledik */}
      <button onClick={handleDelete}>Delete Notification</button>
    </div>
  );
}

export default DeleteNotification;
