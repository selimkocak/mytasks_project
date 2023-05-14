// frontend\src\components\tasks\ListTasks.js
import React from 'react';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

const ListTasks = ({ tasks, loadTasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <UpdateTask task={task} loadTasks={loadTasks} />
          <DeleteTask id={task.id} loadTasks={loadTasks} />
        </li>
      ))}
    </ul>
  );
};

export default ListTasks;
