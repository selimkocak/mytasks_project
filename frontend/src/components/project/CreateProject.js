// frontend/src/components/project/CreateProject.js
import React, { useState } from 'react';
import api from '../../services/api';

function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      const response = await api.createProject({ name, description });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProject;
