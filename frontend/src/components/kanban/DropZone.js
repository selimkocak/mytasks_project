// frontend/src/components/kanban/DropZone.js
import React from 'react';
import { useDrop } from 'react-dnd';
import './DropZone.css';

const DropZone = ({ id, moveCard, children, canMoveTo }) => {
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
    </div>
  );
};

export default DropZone;
