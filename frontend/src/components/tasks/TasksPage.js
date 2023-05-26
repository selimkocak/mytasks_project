// frontend\src\components\tasks\TasksPage.js
import React from 'react';
import ListTasks from './ListTasks';
import './TasksPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TasksPage = ({ loadTasks }) => {
  return (
    <div>
      <h1>Tasks Page</h1>
      <ListTasks loadTasks={loadTasks} />
    </div>
  );
};

export default TasksPage;
