// frontend/src/components/ratings/DeleteRating.js
import React from 'react';
import { deleteRating } from '../../services/api';

const DeleteRating = ({ ratingId }) => {
  const handleDelete = async () => {
    await deleteRating(ratingId);
  };

  return (
    <div>
      <h2>Delete Rating</h2>
      <button onClick={handleDelete}>Delete Rating</button>
    </div>
  );
};

export default DeleteRating;
