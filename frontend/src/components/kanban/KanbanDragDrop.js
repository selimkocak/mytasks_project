// frontend/src/components/kanban/KanbanDragDrop.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
};

const Card = ({ id, text, moveCard }) => {
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
      {text}
    </div>
  );
};


const KanbanDragDrop = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    // Add as many cards as you want
  ]);

  const moveCard = (draggedId, hoverId) => {
    const draggedIndex = cards.findIndex((card) => card.id === draggedId);
    const hoverIndex = cards.findIndex((card) => card.id === hoverId);

    const newCards = [...cards];
    newCards[draggedIndex] = cards[hoverIndex];
    newCards[hoverIndex] = cards[draggedIndex];

    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {cards.map((card) => (
          <Card key={card.id} {...card} moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanDragDrop;

