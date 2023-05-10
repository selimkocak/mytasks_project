// frontend\src\components\comments\CommentsList.js
import React, { useEffect, useState } from 'react';
import { getComments } from '../../services/api';

const CommentsList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getComments(taskId);
      setComments(response.data);
    };

    fetchData();
  }, [taskId]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
