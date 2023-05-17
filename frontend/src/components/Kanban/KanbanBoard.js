// frontend/src/components/kanban/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { getTasks, getKanbanStages, moveCard, createTask, deleteTask, updateTask } from '../../services/api';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [stages, setStages] = useState([]);
  const [movingCard, setMovingCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await getTasks();
        const stagesResponse = await getKanbanStages();

        setTasks(tasksResponse.data);
        setStages(stagesResponse);
      } catch (error) {
        console.error('Error fetching tasks and stages:', error);
      }
    };

    fetchData();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksResponse = await getTasks();
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleMoveCard = async (cardId, stageId) => {
    setMovingCard(true);
    try {
      await moveCard(cardId, stageId);
      console.log('Card moved successfully');
      await fetchTasks();
    } catch (error) {
      console.error('Error moving card:', error);
    } finally {
      setMovingCard(false);
    }
  };

  const handleCreateTask = async (stageId, title) => {
    try {
      const response = await createTask(stageId, title);
      console.log('Task created successfully:', response.data);
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      console.log('Task deleted successfully');
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (taskId, data) => {
    try {
      const response = await updateTask(taskId, data);
      console.log('Task updated successfully:', response.data);
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const canMoveTo = () => {
    return !movingCard;
  };

  return (
    <div className="kanban-board">
      {stages.map((stage) => (
        <KanbanColumn
          key={stage.id}
          stage={stage}
          tasks={tasks.filter((task) => task.stage === stage.id)}
          moveCard={handleMoveCard}
          createTask={handleCreateTask}
          deleteTask={handleDeleteTask}
          updateTask={handleUpdateTask}
          canMoveTo={canMoveTo}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
