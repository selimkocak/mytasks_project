// frontend/src/components/kanban/KanbanDragDrop.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanDragDrop = ({ data, setData }) => {
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

    const tasks = [...data.tasks];
    const sourceTask = tasks.find((task) => task.id === draggableId);
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    if (source.droppableId === destination.droppableId) {
      // Reorder tasks in the same column
      newTasks.splice(destination.index, 0, sourceTask);
    } else {
      // Move task to a different column
      const destinationTasks = [...data.tasks];
      const destinationTask = destinationTasks.find((task) => task.id === draggableId);
      destinationTasks.splice(destination.index, 0, { ...destinationTask });
      newTasks.splice(source.index, 1);
      setData({ ...data, tasks: newTasks });
    }

    setData({ ...data, tasks: newTasks });
  };

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

export default KanbanDragDrop;