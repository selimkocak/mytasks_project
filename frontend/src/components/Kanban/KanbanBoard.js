// frontend/src/components/kanban/KanbanBoard.js
import React, { useState, useEffect, useContext } from 'react';
import { getTasks, getKanbanStages } from '../../services/api';
import { UserContext } from '../../context/UserContext';
import { isAuthenticated } from '../../utils/auth';
import './KanbanBoard.css';
import KanbanDragDrop from './KanbanDragDrop';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [stages, setStages] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    const fetchData = async () => {
      try {
        const tasksResponse = await getTasks();
        const stagesResponse = await getKanbanStages();

        console.log('Tasks Response:', tasksResponse);
        console.log('Stages Response:', stagesResponse);

        const tasks = tasksResponse.data;
        const stages = stagesResponse;

        console.log('Tasks:', tasks);
        console.log('Stages:', stages);

        setTasks(tasks);
        setStages(stages);
      } catch (error) {
        console.error('Error fetching tasks and stages:', error);
      }
    };

    fetchData();
  }, [user]);

  if (tasks.length === 0 || stages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <KanbanDragDrop tasks={tasks} stages={stages} />
    </div>
  );
};

export default KanbanBoard;


