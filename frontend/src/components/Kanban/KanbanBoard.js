// frontend/src/components/kanban/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { getTasks, getKanbanStages, moveCard, createTask, deleteTask, updateTask } from '../../services/api';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';
import ListKanbans from './ListKanbans';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [stages, setStages] = useState([]);
  const [movingCard, setMovingCard] = useState(false);
  const [columnHeight, setColumnHeight] = useState('100vh');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await getTasks();
        const stagesResponse = await getKanbanStages();
        const sortedStages = stagesResponse.sort((a, b) => a.order - b.order);

        setTasks(tasksResponse.data);
        setStages(sortedStages);
      } catch (error) {
        console.error('Error fetching tasks and stages:', error);
      }
    };

    fetchData();
  }, []);

  const loadTasks = async () => {
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
      await loadTasks();
    } catch (error) {
      console.error('Error moving card:', error);
    } finally {
      setMovingCard(false);
    }
  };

  const handleCreateTask = async (stageId, title) => {
    try {
      const response = await createTask({
        stage: stageId,
        title: title,
        description: '',
        assignee: '', // Atanan kişiyi belirtin
      });
      console.log('Görev başarıyla oluşturuldu:', response.data);
      await loadTasks();
    } catch (error) {
      console.error('Görev oluşturulurken hata oluştu:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      console.log('Görev başarıyla silindi');
      await loadTasks();
    } catch (error) {
      console.error('Görev silinirken hata oluştu:', error);
    }
  };

  const handleUpdateTask = async (taskId, data) => {
    try {
      await updateTask(taskId, data);
      console.log('Görev başarıyla güncellendi');
      await loadTasks();
    } catch (error) {
      console.error('Görev güncellenirken hata oluştu:', error);
    }
  };

  const canMoveTo = () => {
    return !movingCard;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <ListKanbans />
        </div>
        <div className="col-lg-20">
          <div className="d-flex flex-wrap justify-content-start">
            {stages.map((stage) => (
              <KanbanColumn 
                columnHeight={columnHeight}
                setColumnHeight={setColumnHeight}
                key={stage.id}
                stage={stage}
                tasks={tasks.filter((task) => task.stage === stage.id)}
                moveCard={handleMoveCard}
                createTask={handleCreateTask}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
                canMoveTo={canMoveTo}
                loadTasks={loadTasks}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
