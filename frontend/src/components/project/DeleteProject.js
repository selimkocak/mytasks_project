// frontend/src/components/project/DeleteProject.js
import React from 'react';
import api from '../../services/api';
import './DeleteProject.css'; // DeleteProject.css dosyasını içe aktardık

function DeleteProject({ id }) {
  const handleDelete = async () => {
    try {
      const response = await api.deleteProject(id);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-project-container"> {/* className ile stil sınıfını ekledik */}
      <h2>Delete Project</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteProject;
