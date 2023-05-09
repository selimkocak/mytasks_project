// frontend\src\components\project\EditProject.js
import React, { useState } from 'react';

const EditProject = ({ project, onEdit }) => {
  const [title, setTitle] = useState(project.title);

  const handleSubmit = event => {
    event.preventDefault();
    onEdit(project.id, title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type="submit">Edit Project</button>
    </form>
  );
};

export default EditProject;
