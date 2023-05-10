// frontend/src/components/assignment/DeleteAssignment.js
import React from 'react';
import api from '../../services/api';

function DeleteAssignment({ id }) {
  const handleDelete = async () => {
    try {
      await api.deleteAssignment(id);
      alert('Assignment deleted successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteAssignment;
