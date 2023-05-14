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
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error loading tasks: ', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <h1>Tasks</h1>
      <CreateTask loadTasks={loadTasks} />
      <ListTasks tasks={tasks} loadTasks={loadTasks} />
    </div>
  );
};

export default TasksPage;
