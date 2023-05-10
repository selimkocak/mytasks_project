// frontend/src/components/project/ProjectList.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.getProjects();
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
