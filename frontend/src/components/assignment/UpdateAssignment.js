// frontend/src/components/assignment/UpdateAssignment.js
import React, { useState } from 'react';
import api from '../../services/api';
import { isRequired, hasMinimumLength } from '../../utils/validation'; // validation.js dosyasını içe aktardık
import './UpdateAssignment.css';

function UpdateAssignment({ id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Form değerlerini validasyonla kontrol et
    if (!isRequired(title)) {
      console.log('Assignment title is required');
      return;
    }

    if (!hasMinimumLength(description, 10)) {
      console.log('Assignment description must be at least 10 characters long');
      return;
    }

    const data = { title, description };

    try {
      const response = await api.updateAssignment(id, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-assignment-container">
      <h2>Update Assignment</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAssignment;
