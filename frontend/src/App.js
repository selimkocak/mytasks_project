// frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import KanbanBoard from './components/kanban/KanbanBoard';
import NotificationPanel from './components/notifications/NotificationPanel';
import CreateProject from './components/project/CreateProject';
import UserProfile from './components/user/UserProfile';
import UserSettings from './components/user/UserSettings';
import ProjectDetails from './components/project/ProjectDetails';
import TasksList from './components/tasks/TasksList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/notifications" element={<NotificationPanel />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TasksList />} />
      </Routes>
    </Router>
  );
};

export default App;
