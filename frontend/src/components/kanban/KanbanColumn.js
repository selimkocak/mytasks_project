// frontend\src\components\kanban\KanbanColumn.js
import React, { useState } from 'react';
import DraggableCard from './DraggableCard';
import './KanbanColumn.css';

const KanbanColumn = ({ stage, tasks, moveCard, createTask, deleteTask, updateTask, canMoveTo }) => {
  const [taskName, setTaskName] = useState(''); // Yeni eklendi
  const [taskDescription, setTaskDescription] = useState(''); // Yeni eklendi
  const [taskStage, setTaskStage] = useState(''); // Yeni eklendi
  const [taskAssignee, setTaskAssignee] = useState(''); // Yeni eklendi

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    moveCard(cardId, stage.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateTask = () => {
    createTask({
      title: taskName,
      description: taskDescription,
      stage: taskStage,
      assignee: taskAssignee,
    });
    setTaskName(''); // Görev oluşturulduktan sonra alanları sıfırla
    setTaskDescription('');
    setTaskStage('');
    setTaskAssignee('');
  };

  return (
    <div className="kanban-column">
      <h2 className="kanban-column-title">{stage.name}</h2>
      <div className="card-container" onDrop={handleDrop} onDragOver={handleDragOver}>
        {tasks.map((task) => (
          <DraggableCard
            key={task.id}
            task={task}
            moveCard={moveCard}
            deleteTask={deleteTask}
            updateTask={updateTask}
            canMoveTo={canMoveTo}
          />
        ))}
      </div>
      <button className="add-task-button" onClick={handleCreateTask}>
        +
      </button>
    </div>
  );
};

export default KanbanColumn;
