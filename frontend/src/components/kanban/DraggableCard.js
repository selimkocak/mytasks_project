// frontend/src/components/kanban/DraggableCard.js
import React, { useState, useEffect } from 'react';
import { getTask, getUserProfile,getAssigneeOfTask } from '../../services/api';
import TaskItem from '../tasks/TaskItem';
import DeleteTask from '../tasks/DeleteTask';
import UpdateTask from '../tasks/UpdateTask';
import { sortTasksByCreateDate } from '../../actions/sortActions';
import './DraggableCard.css';

const DraggableCard = ({ task, moveCard, loadTasks }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(task.id);
        if (response.status === 200) {
          setCurrentTask(response.data);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [task.id]);

  useEffect(() => {
    const fetchAssignee = async () => {
      if (currentTask && currentTask.assignee) {
        try {
          const response = await getUserProfile(currentTask.assignee);
          if (response.status === 200) {
            setAssignee(response.data);
          }
        } catch (error) {
          console.error('Error fetching assignee:', error);
        }
      }
    };

    fetchAssignee();
  }, [currentTask]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text');
    moveCard(cardId, stageId);
  };




  const handleUpdateTask = async () => {
    setIsEditing(true);
    try {
      const response = await getAssigneeOfTask(task.id);
      if (response.status === 200) {
        setAssignee(response.data);
      }
    } catch (error) {
      console.error('Error fetching assignee:', error);
    }
  };
  

  
  if (!currentTask || !assignee) {
    return <div>Loading...</div>;
  }
  
  

  const handleCloseUpdateTask = () => {
    setIsEditing(false);
    
  };

  if (!currentTask || !assignee) {
    return <div>Loading...</div>;
  }

  // sortedTasks fonksiyonunu kullanarak görevleri sırala
  const sortedTasks = sortTasksByCreateDate([currentTask]);

  return (
    <div
      className="card draggable-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, currentTask.stage)}
    >
      <TaskItem task={sortedTasks[0]} taskId={task.id}  />
      <div className="card-footer">
        <div className="card-footer-info">
          <div className="assignee-name">{assignee.first_name}</div>
        </div>
        <div className="card-footer-buttons">
          <DeleteTask id={task.id} loadTasks={loadTasks} />
          <button className="btn btn-primary" onClick={handleUpdateTask}>
            Edit
          </button>
        </div>
      </div>
      {isEditing && (
        <UpdateTask
          task={sortedTasks[0]}
          taskId={currentTask.id}
          handleCloseModal={handleCloseUpdateTask}
        
        />
      )}
    </div>
  );
};

export default DraggableCard;