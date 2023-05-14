// frontend/src/components/assignment/DeleteAssignment.js
import React from 'react';
import api from '../../services/api';
import { isRequired } from '../../utils/validation'; // validation.js dosyasını içe aktardık
import './DeleteAssignment.css';

function DeleteAssignment({ id }) {
  const handleDelete = async () => {
    // Gerekli validasyonları kontrol et
    if (!isRequired(id)) {
      console.log('Assignment ID is required');
      return;
    }

    try {
      await api.deleteAssignment(id);
      alert('Assignment deleted successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-assignment-container">
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteAssignment;