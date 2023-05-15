// frontend\src\components\kanban\KanbanBoard.js
import React, { useState, useEffect, useContext } from 'react';
import { getTasks, getKanbanStages } from '../../services/api';
import { UserContext } from '../../context/UserContext';
import { isAuthenticated } from '../../utils/auth';
import './KanbanBoard.css';
import KanbanDragDrop from './KanbanDragDrop';

const KanbanBoard = () => {
  const [data, setData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    const fetchData = async () => {
      try {
        const [tasksResponse, stagesResponse] = await Promise.all([
          getTasks(),
          getKanbanStages(),
        ]);

        console.log('Tasks Response:', tasksResponse);
        console.log('Stages Response:', stagesResponse);

        const tasks = tasksResponse.data;
        const stages = stagesResponse;

        console.log('Tasks:', tasks);
        console.log('Stages:', stages);

        // Verilerin işlenmesi devam ediyor
        // ...

        setData({ tasks, stages });
      } catch (error) {
        console.error('Error fetching tasks and stages:', error);
      }
    };

    fetchData();
  }, [user]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <KanbanDragDrop data={data} setData={setData} />
    </div>
  );
};

export default KanbanBoard;

