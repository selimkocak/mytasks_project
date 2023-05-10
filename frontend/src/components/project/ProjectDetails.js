// frontend/src/components/project/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ProjectDetails({ id }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.getProjects(id);
      setProject(response.data);
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      {/* Add components to display tasks and comments here */}
    </div>
  );
}

export default ProjectDetails;
