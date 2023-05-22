// frontend/src/components/tasks/TaskItem.js
import React, { useState } from 'react';
import { deleteTask } from '../../services/api';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import LoadTasks from './LoadTasks';

const TaskItem = ({ task, onDeleteTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      console.log('Görev başarıyla silindi');
      onDeleteTask();
    } catch (error) {
      console.error('Görev silinirken hata oluştu:', error);
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
      <p>Aşama: {task.stage}</p>
      <p>Atanan Kişi: {task.assignee}</p>
      <DeleteTask id={task.id} onDelete={handleDelete} />
      <button onClick={handleShowModal}>✏️</button>
      {task.description.length > 20 && (
        <button onClick={handleShowModal}>👁️</button>
      )}
      {showModal && (
        <UpdateTask task={task} handleCloseModal={handleCloseModal} />
      )}
      <LoadTasks fetchTasks={onDeleteTask} />
    </div>
  );
};

export default TaskItem;
