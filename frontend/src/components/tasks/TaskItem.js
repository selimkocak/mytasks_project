// frontend\src\components\tasks\TaskItem.js
// frontend\src\components\tasks\TaskItem.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import { isAuthenticated } from '../../utils/auth';
import { useSelector } from 'react-redux';
import CommentCounter from '../comments/CommentCounter';

const TaskItem = ({  taskId, loadTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const updatedTask = tasks.find((t) => t.id === taskId);
  const [currentTask, setCurrentTask] = useState(updatedTask);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(taskId);
        if (response.status === 200) {
          setCurrentTask(response.data);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleShowModal = async () => {
    if (isAuthenticated()) {
      setShowModal(true);
      await loadTasks(taskId);
    } else {
      console.log('Please log in');
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    await loadTasks(taskId);
  };

  const getDescriptionPreview = (description) => {
    if (description && description.length > 115) {
      return description.substring(0, 112) + '...';
    }
    return description;
  };

  return (
    <div className="task-item">
      <h2>{currentTask?.title}</h2>
      <p>{getDescriptionPreview(currentTask?.description)}</p>
      <p>Aşama: {currentTask?.stage}</p>
      <p>Atanan Kişi: {currentTask?.assignee}</p>
      <div className="task-item-icons">
        <div className="comment-bubble">
          <button onClick={handleShowModal}>💬</button>
          <div className="comment-counter">
            <CommentCounter taskId={taskId} />
          </div>
        </div>
      </div>
      {isAuthenticated() && (
        <>
          {currentTask?.description.length > 20 && (
            <button onClick={handleShowModal}>👁️</button>
          )}
          {showModal && (
            <UpdateTask
              task={currentTask}
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
