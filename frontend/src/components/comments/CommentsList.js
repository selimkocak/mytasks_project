// frontend/src/components/comments/CommentsList.js
import React, { useEffect, useState } from 'react';
import { getCommentsByTask } from '../../services/api';
import './CommentsList.css'; // CommentsList.css dosyasını içe aktardık

const CommentsList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCommentsByTask(taskId);
      setComments(response.data);
    };

    fetchData();
  }, [taskId]);

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
