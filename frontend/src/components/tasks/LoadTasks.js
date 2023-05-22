// frontend/src/components/tasks/LoadTasks.js
import React, { useState, useEffect } from 'react';
import { getTasks } from '../../services/api';
import { isAuthenticated } from '../../utils/auth'; 

const LoadTasks = () => {
  // ...
  const loadTasks = async () => {
    if (isAuthenticated()) {
      try {
        const response = await getTasks();
        if (response.status === 200) {
          setTasks(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    } else {
      console.log('User is not authenticated, redirecting to login...');
      // Redirect to login page logic...
    }
  };

  useEffect(() => {
    loadTasks(); // fetchTasks yerine loadTasks çağırılıyor
  }, []);
  

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <div key={task.id}>
          {task.id} 
        </div>
      ))}
    </div>
  );
};

export default LoadTasks;
