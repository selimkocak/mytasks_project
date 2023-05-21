// frontend/src/components/kanban/DropZone.js
import React from 'react';
import { useDrop } from 'react-dnd';
import './DropZone.css';
import TaskItem from '../tasks/TaskItem';

const DropZone = ({ id, moveCard, children, canMoveTo, tasks }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => moveCard(item.id, id),
    canDrop: (item) => canMoveTo(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <div ref={drop} className={`drop-zone ${isActive ? 'active' : ''}`}>
      {children}
      {isActive && <div className="drop-indicator">Drop here</div>}
      {tasks.map((task) => (
        <TaskItem key={task.id} taskId={task.id} />
      ))}
    </div>
  );
};

export default DropZone;
