// frontend/src/components/kanban/DraggableCard.js
import React from 'react';
import api from '../../services/api';

const DraggableCard = ({ task, moveCard }) => {
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

  const handleDelete = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (taskId, updatedTask) => {
    try {
      await api.updateTask(taskId, updatedTask);
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleShowDetails = (taskId) => {
    // Görev detaylarını göstermek için gerekli işlemleri buraya ekleyebilirsiniz
  };

  return (
    <div
      className="draggable-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, task.stage)}
    >
      <span>{task.title}</span>
      <button onClick={() => handleDelete(task.id)}>X</button>
      <button onClick={() => handleUpdate(task.id, { title: 'Updated Title' })}>✏️</button>
      {task.title.length > 20 && <button onClick={() => handleShowDetails(task.id)}>👁️</button>}
    </div>
  );
};

export default DraggableCard;