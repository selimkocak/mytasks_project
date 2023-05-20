// frontend\src\components\tasks\CreateTask.js
import React from 'react';
import TaskForm from './TaskForm';
import { createTask } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import './CreateTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTask = ({ loadTasks }) => {
  const handleSubmit = async (taskData) => {
    try {
      const response = await createTask(taskData);
      if (response.status === 201) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;

