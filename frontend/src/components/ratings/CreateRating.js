// frontend/src/components/ratings/CreateRating.js
import React, { useState } from 'react';
import { createRating } from '../../services/api';

const CreateRating = ({ projectId, taskId }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRating({ rating, projectId, taskId });
    setRating(0);
  };

  return (
    <div>
      <h2>Create Rating</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default CreateRating;
