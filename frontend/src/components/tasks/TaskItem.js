// frontend/src/components/tasks/TaskItem.js
import React, { useState } from 'react';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import { isAuthenticated } from '../../utils/auth';
import { useSelector } from 'react-redux';

const TaskItem = ({ task, taskId, loadTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const updatedTask = tasks.find((t) => t.id === taskId);

  const handleShowModal = async () => {
    if (isAuthenticated()) {
      setShowModal(true);
      await loadTasks(taskId);
    } else {
      console.log('Please login');
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
      {isAuthenticated() && (
        <>
          {task.description.length > 20 && (
            <button onClick={handleShowModal}>👁️</button>
          )}
          {showModal && (
            <UpdateTask
              task={updatedTask}
              taskId={taskId}
              handleCloseModal={handleCloseModal}
              loadTasks={loadTasks}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
