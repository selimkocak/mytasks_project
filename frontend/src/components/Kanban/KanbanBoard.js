// frontend\src\components\kanban\KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css';
import { getTasks, updateTask, getKanbanStages } from '../../services/api'; // API servislerini içeri aktar

const KanbanBoard = () => {
  const [data, setData] = useState(null);
  const [stages, setStages] = useState([]);
  
  const adaptData = (apiData) => {
    const tasks = {};
    const columns = stages.reduce((acc, stage) => {
      acc[stage.name] = { id: stage.name, title: stage.name, taskIds: [] };
      return acc;
    }, {});
  
    apiData.forEach(task => {
      const newTask = { id: task.id, content: task.title };
      tasks[task.id] = newTask;
      columns[task.status].taskIds.push(task.id);
    });
  
    const adaptedData = {
      tasks,
      columns,
      columnOrder: stages.map(stage => stage.name)
    };
  
    return adaptedData;
  }

  useEffect(() => {
    getKanbanStages()
      .then(response => {
        setStages(response.data);
      })
      .catch(error => {
        console.error("Error fetching kanban stages:", error);
      });
  }, []);

  useEffect(() => {
    getTasks()
      .then(response => {
        const adaptedData = adaptData(response.data);
        setData(adaptedData);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, [stages]);


  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (!data) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      // Aynı sütunda taşıma durumunu işle
      // ...
    } else {
      // Farklı sütunlarda taşıma durumunu işle
      // ...
    }

    const updatedTask = {
      ...data.tasks[draggableId],
      status: finish.title, // Yeni durum, hedef sütunun başlığıdır
    };

    updateTask(draggableId, updatedTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data && data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

          return (
            <div className="column" key={column.id}>
              <h3>{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;