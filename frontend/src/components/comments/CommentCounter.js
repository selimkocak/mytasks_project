// frontend\src\components\comments\CommentCounter.js
import React, { useEffect, useState } from 'react';
import { getCommentsByTask } from '../../services/api';

const CommentCounter = ({ taskId }) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByTask(taskId);
        if (response.status === 200) {
          const comments = response.data;
          const filteredComments = comments.filter(comment => comment.task === taskId);
          setCommentCount(filteredComments.length);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [taskId]);

  return <span>{commentCount}</span>;
};

export default CommentCounter;
