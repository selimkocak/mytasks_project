// frontend\src\components\project\ProjectDetails.js
import React from 'react';
import ProjectProgress from './ProjectProgress';
import ProjectReports from './ProjectReports';

const ProjectDetails = ({ project }) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <ProjectProgress project={project} />
      <ProjectReports project={project} />
    </div>
  );
};

export default ProjectDetails;
