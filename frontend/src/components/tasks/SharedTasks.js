// frontend\src\components\tasks\SharedTasks.js
import React from 'react';
import TaskItem from './TaskItem';

const SharedTasks = ({ tasks }) => (
  <div className="shared-tasks">
    <h2>Shared Tasks</h2>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} />
    ))}
  </div>
);

export default SharedTasks;
