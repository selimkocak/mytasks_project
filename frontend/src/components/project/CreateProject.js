// frontend\src\components\project\CreateProject.js
import React, { useState } from 'react';

const CreateProject = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onCreate(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Project title"
        required
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProject;
