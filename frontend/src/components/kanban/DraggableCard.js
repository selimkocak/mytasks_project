// frontend/src/components/kanban/DraggableCard.js
import React, { useState, useEffect } from 'react';
import apiFunctions from '../../services/api';
import UpdateTask from '../tasks/UpdateTask';

const DraggableCard = ({ task, moveCard, deleteTask }) => {
  const [showModal, setShowModal] = useState(false);


  const loadTasks = async () => {
    try {
      await apiFunctions.getTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

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
      await deleteTask(taskId);
      console.log('Task deleted successfully');
      loadTasks(); // Görevi sildikten sonra loadTasks() işlevini çağırın
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleShowDetails = (taskId) => {
    setShowModal(true);
    loadTasks(); // Görevleri yeniden yüklemek için loadTasks() işlevini çağırın
  };

  const handleCloseModal = () => {
    setShowModal(false);
    loadTasks(); // Modal kapatıldığında görevleri yeniden yüklemek için loadTasks() işlevini çağırın
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
      <button onClick={() => handleShowDetails(task.id)}>✏️</button>
      {task.title.length > 20 && <button onClick={() => handleShowDetails(task.id)}>👁️</button>}
      {showModal && (
        <UpdateTask task={task} loadTasks={loadTasks} handleCloseModal={handleCloseModal} />
        
      )}
    </div>
  );
};

export default DraggableCard;
