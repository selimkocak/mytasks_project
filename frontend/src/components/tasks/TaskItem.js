// frontend/src/components/tasks/TaskItem.js
import React, { useState } from 'react';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import { isAuthenticated } from '../../utils/auth'; // isAuthenticated fonksiyonunu import ediyoruz

const TaskItem = ({ task, taskId, loadTasks }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = async () => {
    if (isAuthenticated()) { // Oturumun açık olduğunu kontrol ediyoruz
      setShowModal(true);
      await loadTasks(taskId);
    } else {
      console.log('Lütfen giriş yapın');
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    await loadTasks(taskId); 
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
      {isAuthenticated() && ( // Oturumun açık olduğunu kontrol ediyoruz
        <>

        </>
      )}
      {task.description.length > 20 && (
        <button onClick={handleShowModal}>👁️</button>
      )}
      {showModal && (
  <UpdateTask
    task={task}
    handleCloseModal={handleCloseModal}
    loadTasks={loadTasks}
  />
)}

    </div>
  );
};

export default TaskItem;
