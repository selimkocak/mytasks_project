// frontend/src/components/ratings/UpdateRating.js
import React, { useState, useEffect } from 'react';
import { updateRating } from '../../services/api';

const UpdateRating = ({ ratingId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch the current rating and set it in state here
    // For now, we'll just use a placeholder number
    setRating(3);
  }, [ratingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRating(ratingId, { rating });
    setRating(0);
  };

  return (
    <div>
      <h2>Update Rating</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Update Rating</button>
      </form>
    </div>
  );
};

export default UpdateRating;
