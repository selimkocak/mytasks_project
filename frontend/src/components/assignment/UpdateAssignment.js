// frontend/src/components/assignment/UpdateAssignment.js
import React, { useState } from 'react';
import api from '../../services/api';

function UpdateAssignment({ id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { title, description };

    try {
      const response = await api.updateAssignment(id, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Assignment</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description"  value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAssignment;

