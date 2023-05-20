// frontend\src\components\tasks\TaskItem.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';
import './TaskItem.css';

const TaskItem = ({ taskId }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(taskId);
        if (response.status === 200) {
          setTask(response.data);
        }
      } catch (error) {
        console.error('Error fetching task: ', error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-item">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Stage: {task.stage}</p>
      <p>Assignee: {task.assignee}</p>
    </div>
  );
};

export default TaskItem;
