// frontend\src\utils\PrivateRoutes.js
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import KanbanBoard from '../components/kanban/KanbanBoard';
import NotificationPanel from '../components/notifications/NotificationPanel';
import CreateProject from '../components/project/CreateProject';
import UserProfile from '../components/user/UserProfile';
import UserSettings from '../components/user/UserSettings';
import ProjectDetails from '../components/project/ProjectDetails';
import TasksPage from '../components/tasks/TasksPage';
import * as Auth from './auth';

const PrivateRoutes = () => {
  const isAuthenticated = Auth.isAuthenticated();

  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks/*" element={<TasksPage />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/notifications" element={<NotificationPanel />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/settings" element={<UserSettings />} />
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
