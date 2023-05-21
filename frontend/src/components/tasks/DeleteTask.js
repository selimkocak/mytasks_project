// frontend/src/components/tasks/DeleteTask.js
import React from 'react';
import { deleteTask } from '../../services/api';

const DeleteTask = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(id);
      onDelete(id); // Görev kartını yeniden yüklemek için bir fonksiyonu tetikleyin
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteTask;
