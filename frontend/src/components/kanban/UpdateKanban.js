// frontend/src/components/kanban/UpdateKanban.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function UpdateKanban({ id }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchKanban = async () => {
      const response = await api.getKanbans(id);
      setName(response.data.name);
      setDescription(response.data.description);
    };

    fetchKanban();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data =     { name, description };

    try {
      const response = await api.updateKanban(id, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Kanban</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateKanban;

