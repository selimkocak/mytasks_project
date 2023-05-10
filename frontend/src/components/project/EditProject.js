// frontend/src/components/project/EditProject.js
import React, { useState } from 'react';
import api from '../../services/api';

function EditProject({ id }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await api.updateProject(id, { name, description });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProject;
