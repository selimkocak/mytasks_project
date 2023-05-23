// frontend/src/components/kanban/DraggableCard.js
import React, { useState, useEffect } from 'react';
import { getTask } from '../../services/api';
import TaskItem from '../tasks/TaskItem';
import './DraggableCard.css';
import DeleteTask from '../tasks/DeleteTask';

const DraggableCard = ({ task, moveCard, loadTasks }) => {
  const [currentTask, setCurrentTask] = useState(null);

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

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    moveCard(cardId, stageId);
  };

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="draggable-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, currentTask.stage)}
    >
     <TaskItem task={currentTask} />
    <DeleteTask id={currentTask.id} loadTasks={loadTasks} />
     

    </div>
  );
};

export default DraggableCard;
