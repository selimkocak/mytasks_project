// frontend/src/components/kanban/KanbanBoard.js
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks } from '../../services/api';
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

    const adaptData = (apiData) => {
      // Adaptation logic...
    };

    getTasks()
      .then((taskResponse) => {
        const adaptedData = adaptData(taskResponse.data);
        setData(adaptedData);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, [user]);

  const onDragEnd = result => {
    // Drag and drop logic...
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