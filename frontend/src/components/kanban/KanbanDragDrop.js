// frontend/src/components/kanban/KanbanDragDrop.js
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
};

const Card = ({ id, title, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (item.id !== id) {
        moveCard(item.id, id);
      }
    },
  }), [id]);
  
  const dragDropRef = (element) => {
    drag(element);
    drop(element);
  };

  return (
    <div ref={dragDropRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h2>{title}</h2>
    </div>
  );
};

const KanbanDragDrop = ({ tasks, stages }) => {
  const [kanbanTasks, setKanbanTasks] = useState([]);

  useEffect(() => {
    setKanbanTasks(tasks);
  }, [tasks]);

  const moveCard = (draggedId, hoverId) => {
    const draggedIndex = kanbanTasks.findIndex((task) => task.id === draggedId);
    const hoverIndex = kanbanTasks.findIndex((task) => task.id === hoverId);

    const newTasks = [...kanbanTasks];
    newTasks[draggedIndex] = kanbanTasks[hoverIndex];
    newTasks[hoverIndex] = kanbanTasks[draggedIndex];

    setKanbanTasks(newTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {stages.map((stage) => (
          <div key={stage.id}>
            <h2>{stage.name}</h2>
            {tasks
              .filter((task) => task.stage === stage.id)
              .map((task) => (
                <Card key={task.id} {...task} moveCard={moveCard} />
              ))}
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanDragDrop;


