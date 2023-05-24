// frontend/src/utils/PrivateRoutes.js
import React, { useEffect, useCallback } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import KanbanBoard from '../components/kanban/KanbanBoard';
import NotificationPanel from '../components/notifications/NotificationPanel';
import CreateProject from '../components/project/CreateProject';
import UserProfile from '../components/user/UserProfile';
import UserSettings from '../components/user/UserSettings';
import ProjectDetails from '../components/project/ProjectDetails';
import TasksPage from '../components/tasks/TasksPage';
import * as Auth from './auth';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const PrivateRoutes = () => {
  const isAuthenticated = Auth.isAuthenticated();

  const fetchData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        // Burada gerekirse verileri yükleyebilirsiniz
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Navigate to="/kanban" />} />
      <Route path="/kanban/*" element={<TasksPage loadTasks={fetchData} />} />
      <Route
        path="/kanban"
        element={
          <DndProvider backend={HTML5Backend}>
            <KanbanBoard loadTasks={fetchData} />
          </DndProvider>
        }
      />
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
