// frontend/src/components/ratings/RatingList.js
import React, { useState, useEffect } from 'react';
import { getRatings } from '../../services/api';

const RatingList = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const response = await getRatings();
      setRatings(response.data);
    };

    fetchRatings();
  }, []);

  return (
    <div>
      <h2>Ratings</h2>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>{rating.rating} stars</li>
        ))}
      </ul>
    </div>
  );
};

export default RatingList;
