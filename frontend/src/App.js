// frontend\src\App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import KanbanBoard from './components/kanban/KanbanBoard';
import NotificationPanel from './components/notifications/NotificationPanel';
import CreateProject from './components/project/CreateProject';
import UserProfile from './components/user/UserProfile';
import UserSettings from './components/user/UserSettings';
import ProjectDetails from './components/project/ProjectDetails';
import TasksPage from './components/tasks/TasksPage';
import UserContext from './context/UserContext';

const PrivateRoute = ({children, ...props}) => {
  const {user} = React.useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null); // user durumunu yönetmek için

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><KanbanBoard /></PrivateRoute>} /> 
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/notifications" element={<PrivateRoute><NotificationPanel /></PrivateRoute>} />
          <Route path="/projects/create" element={<PrivateRoute><CreateProject /></PrivateRoute>} />
          <Route path="/user/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/user/settings" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
          <Route path="/projects/:projectId" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;