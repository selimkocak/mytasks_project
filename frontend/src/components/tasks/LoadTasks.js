// frontend/src/components/tasks/LoadTasks.js
import { useEffect } from 'react';
import { getTasks } from '../../services/api';

const LoadTasks = ({ fetchTasks }) => {
  useEffect(() => {
    const loadTasks = async () => {
      try {
        await getTasks();
        fetchTasks();
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, [fetchTasks]);

  return null;
};

export default LoadTasks;