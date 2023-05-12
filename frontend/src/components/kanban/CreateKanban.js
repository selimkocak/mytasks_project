// frontend/src/components/kanban/CreateKanban.js
import React, { useState } from 'react';
import api from '../../services/api';
import './CreateKanban.css';

function CreateKanban() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = { name, description };

    try {
      const response = await api.createKanban(data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-kanban">
      <h2>Kanban Oluştur</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Oluştur</button>
      </form>
    </div>
  );
}

export default CreateKanban;
