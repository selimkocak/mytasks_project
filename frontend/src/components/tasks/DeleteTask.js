// frontend\src\components\tasks\DeleteTask.js
import React from 'react';
import { deleteTask } from '../../services/api';

const DeleteTask = ({ id, loadTasks }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteTask(id);
      if (response.status === 200) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteTask;

