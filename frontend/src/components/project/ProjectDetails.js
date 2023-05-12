// frontend/src/components/project/ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../utils/auth';
import api from '../../services/api';
import './ProjectDetails.css';

function ProjectDetails({ id }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!isAuthenticated()) {
        return;
      }
      try {
        const response = await api.getProject(id);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details: ', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      {/* Add components to display tasks and comments here */}
    </div>
  );
}

export default ProjectDetails;
