// frontend\src\components\tasks\ViewTask.js
import React, { useState, useEffect } from 'react';
import { getTask, deleteTask } from '../../services/api';
import './ViewTask.css';

const ViewTask = ({ task, handleCloseModal }) => {
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(task.id);
        setCurrentTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [task.id]);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      console.log('Task deleted successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-task">
      <h2>{currentTask.title}</h2>
      <p>{currentTask.description}</p>
      <p>Stage: {currentTask.stage}</p>
      <p>Assignee: {currentTask.assignee}</p>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default ViewTask;
