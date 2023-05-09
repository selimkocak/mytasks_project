// frontend\src\components\tasks\TaskItem.js
import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const TaskItem = ({ task, onCommentSubmit }) => (
  <div className="task-item">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Assigned to: {task.assignedUser}</p>
    <CommentList comments={task.comments} />
    <CommentForm taskId={task.id} onCommentSubmit={onCommentSubmit} />
  </div>
);

export default TaskItem;
