// frontend/src/components/tasks/TaskItem.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';
import './TaskItem.css';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import CommentCounter from '../comments/CommentCounter';
import CommentsList from '../comments/CommentsList';
import CreateComment from '../../components/comments/CreateComment';

const TaskItem = ({ taskId }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const updatedTask = tasks.find((t) => t.id === taskId);
  const [currentTask, setCurrentTask] = useState(updatedTask);
  const [showCreateComment, setShowCreateComment] = useState(false);
  

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

  const getDescriptionPreview = (description) => {
    if (description && description.length > 55) {
      return description.substring(0, 52) + '...';
    } else if (!description) {
      return ' ';
    }
    return description;
  };

  const handleToggleCreateComment = () => {
    setShowCreateComment(!showCreateComment);
  };

  const handleCommentCreated = (comment) => {
    // Handle the new comment created event
    // You can update the comment list or perform any necessary action
  };

  return (
    <Card className="task-item">
      <Card.Body>
        <Card.Title>{currentTask?.title}</Card.Title>
        <Card.Text>{getDescriptionPreview(currentTask?.description)}</Card.Text>
        <div className="task-item-icons">
          <div className="comment-counter">
            <CommentCounter taskId={taskId} />
          </div>
          <div className="create-comment-button">
            <button onClick={handleToggleCreateComment}>💬</button>
          </div>
        </div>
      </Card.Body>
      {showCreateComment && (
        <CreateComment
          taskId={taskId}
          taskTitle={currentTask?.title}
          onCommentCreated={handleCommentCreated}
        />
      )}
      <CommentsList taskId={taskId} />
    </Card>
  );
};

export default TaskItem;
