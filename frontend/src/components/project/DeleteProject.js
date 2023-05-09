// frontend\src\components\project\DeleteProject.js
import React from 'react';

const DeleteProject = ({ project, onDelete }) => (
  <button onClick={() => onDelete(project.id)}>Delete Project</button>
);

export default DeleteProject;
