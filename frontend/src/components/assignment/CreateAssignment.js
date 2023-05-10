// frontend/src/components/assignment/CreateAssignment.js
import React, { useState } from 'react';
import api from '../../services/api';

function CreateAssignment() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = { title, description };

    try {
      const response = await api.createAssignment(data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateAssignment;
