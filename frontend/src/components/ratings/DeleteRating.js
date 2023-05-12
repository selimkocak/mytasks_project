// frontend/src/components/ratings/DeleteRating.js
import React from 'react';
import { deleteRating } from '../../services/api';
import './DeleteRating.css'; // DeleteRating.css dosyasını içe aktardık

const DeleteRating = ({ ratingId }) => {
  const handleDelete = async () => {
    await deleteRating(ratingId);
  };

  return (
    <div className="delete-rating-container"> {/* className ile stil sınıfını ekledik */}
      <h2>Delete Rating</h2>
      <button onClick={handleDelete}>Delete Rating</button>
    </div>
  );
};

export default DeleteRating;
