// frontend/src/components/comments/CommentsList.js
import React, { useEffect, useState } from 'react';
import { getCommentsByTask } from '../../services/api';

const CommentsList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByTask(taskId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [taskId]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p><strong>{comment.user}</strong>: {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
