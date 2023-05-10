// frontend/src/components/kanban/DeleteKanban.js
import React from 'react';
import api from '../../services/api';

function DeleteKanban({ id }) {
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await api.deleteKanban(id);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete Kanban</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteKanban;
