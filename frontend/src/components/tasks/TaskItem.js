// frontend\src\components\tasks\TaskItem.js
import React, { useState } from 'react';
import { deleteTask } from '../../services/api';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

const TaskItem = ({ task, onDeleteTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      console.log('Task deleted successfully');
      onDeleteTask();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getDescriptionPreview = (description) => {
    if (description.length > 115) {
      return description.substring(0, 112) + '...';
    }
    return description;
  };

  return (
    <div className="task-item">
      <h2>{task.title}</h2>
      <p>{getDescriptionPreview(task.description)}</p>
      <p>Stage: {task.stage}</p>
      <p>Assignee: {task.assignee}</p>
      <DeleteTask id={task.id} onDelete={handleDelete} />
      <button onClick={handleShowModal}>✏️</button>
      {task.description.length > 20 && (
        <button onClick={handleShowModal}>👁️</button>
      )}
      {showModal && (
        <UpdateTask task={task} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default TaskItem;
