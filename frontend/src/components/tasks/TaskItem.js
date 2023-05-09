// frontend\src\components\tasks\TaskItem.js
import React from 'react';
import StarRating from '../shared/StarRating';

const TaskItem = ({ task }) => (
  <div className="task-item">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Assigned to: {task.assignedUser}</p>
    <StarRating />
  </div>
);

export default TaskItem;
