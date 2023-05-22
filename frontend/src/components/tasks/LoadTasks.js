// frontend/src/components/tasks/LoadTasks.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';

const LoadTasks = () => {
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getTask();
      if (response.status === 200) {
        setTask(response.data);
        setLoading(false); // görevler yüklendi, yükleniyor durumunu false yap
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false); // hata oluştu, yükleniyor durumunu false yap
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleniyor olduğunu belirt
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
