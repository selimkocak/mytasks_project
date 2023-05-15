// frontend/src/components/kanban/KanbanBoard.js
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, getKanbanStages } from '../../services/api';
import { UserContext } from '../../context/UserContext';
import { isAuthenticated } from '../../utils/auth';
import './KanbanBoard.css';

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];
    const taskId = draggableId;

    if (sourceColumn === destinationColumn) {
      // Reorder tasks in the same column
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, taskId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      // Move task to a different column
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      const destinationTaskIds = Array.from(destinationColumn.taskIds);

      sourceTaskIds.splice(source.index, 1);
      destinationTaskIds.splice(destination.index, 0, taskId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      };

      setData(newData);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
      {data.stages.map((stage) => (
          <div className="column" key={stage.id}>
            <h3>{stage.name}</h3>
            <Droppable droppableId={stage.id.toString()}>
              {(provided, snapshot) => (
                <div
                  className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.tasks.map((task, index) => {
                    if (task.stage === stage.id) {
                      return (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h4>{task.title}</h4>
                              <p>{task.description}</p>
                              <p>Assignee: {task.assignee}</p>
                            </div>
                          )}
                        </Draggable>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;