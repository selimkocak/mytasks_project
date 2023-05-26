// frontend\src\components\tasks\TasksPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { getTasks } from '../../services/api';
import CreateTask from './CreateTask';
import ListTasks from './ListTasks';
import './TasksPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error getting tasks:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      loadTasks();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="tasks-page">
      <CreateTask loadTasks={loadTasks} />
      <ListTasks tasks={tasks} loadTasks={loadTasks} />
    </div>
  );
};

export default TasksPage;
