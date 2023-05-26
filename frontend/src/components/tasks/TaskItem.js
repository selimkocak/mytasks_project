// frontend/src/components/tasks/TaskItem.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';
import './TaskItem.css';
import UpdateTask from './UpdateTask';
import { isAuthenticated } from '../../utils/auth';
import { useSelector } from 'react-redux';
import CreateComment from '../comments/CreateComment'; // CreateComment bileşenini içe aktar
import CommentsList from '../comments/CommentsList'; // CommentsList bileşenini içe aktar
import { Button, Card } from 'react-bootstrap'; // Button ve Card bileşenlerini içe aktar
import CommentCounter from '../comments/CommentCounter';

const TaskItem = ({ taskId, loadTasks }) => {
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
    } else {
      console.log('Please log in');
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
  };

  const getDescriptionPreview = (description) => {
    if (description && description.length > 55) {
      return description.substring(0, 52) + '...';
    } else if (!description) {
      return ' ';
    }
    return description;
  };

  return (
    <Card className="task-item">
      <Card.Body>
        <Card.Title>{currentTask?.title}</Card.Title>
        <Card.Text>{getDescriptionPreview(currentTask?.description)}</Card.Text>
        <div className="task-item-icons">
          <Button variant="light" onClick={handleShowModal} loadTasks={loadTasks}>
            💬
          </Button>
          <div className="comment-counter">
            <CommentCounter taskId={taskId} />
          </div>
        </div>
      </Card.Body>
      {showModal && (
        <div>
          <UpdateTask task={currentTask} taskId={taskId} handleCloseModal={handleCloseModal} loadTasks={loadTasks} />
          <CreateComment taskId={taskId} onCommentCreated={loadTasks} />
          <CommentsList taskId={taskId} />
        </div>
      )}
    </Card>
  );
};

export default TaskItem;
