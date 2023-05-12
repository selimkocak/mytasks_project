// frontend/src/components/notifications/CreateNotification.js
import React, { useState } from 'react';
import { createNotification } from '../../services/api';
import './CreateNotification.css'; // CreateNotification.css dosyasını içe aktardık

function CreateNotification() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createNotification({ title, description });
      alert('Notification created successfully');
    } catch (error) {
      console.error("Error creating notification: ", error);
    }
  };

  return (
    <form className="create-notification-form" onSubmit={handleSubmit}> {/* className ile stil sınıfını ekledik */}
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <button type="submit">Create Notification</button>
    </form>
  );
}

export default CreateNotification;
