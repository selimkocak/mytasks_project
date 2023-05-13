// frontend/src/components/kanban/UpdateKanban.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './UpdateKanban.css';

function UpdateKanban({ id }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchKanban = async () => {
      try {
        const response = await api.getKanbans(id);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKanban();
  }, [id]);

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
        <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}

export default UpdateKanban;
