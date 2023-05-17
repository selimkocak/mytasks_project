// frontend/src/components/kanban/UpdateKanban.js
import React, { useState } from 'react';
import api from '../../services/api';
import './UpdateKanban.css';

function UpdateKanban({ id, currentName, currentDescription }) {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = { name, description };

    try {
      const response = await api.updateKanban(id, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-kanban">
      <h2>Kanban Güncelle</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}

export default UpdateKanban;
