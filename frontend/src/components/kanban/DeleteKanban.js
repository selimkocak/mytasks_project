// frontend/src/components/kanban/DeleteKanban.js
import React from 'react';
import api from '../../services/api';
import './DeleteKanban.css';

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
    <div className="delete-kanban">
      <h2>Kanban Sil</h2>
      <button onClick={handleDelete}>Sil</button>
    </div>
  );
}

export default DeleteKanban;
