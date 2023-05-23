// frontend/src/components/tasks/ListTasks.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ListTasks = ({ loadTasks }) => {
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    
    loadTasks();
  }, [loadTasks])

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListTasks;
