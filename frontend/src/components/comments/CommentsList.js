import React, { useEffect, useState } from 'react';
import { getCommentsByTask } from '../../services/api';

const CommentsList = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

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

  const commentsToShow = showAllComments ? comments : []; // Don't show any comments by default

  return (
    <div>

      {comments.length > 0 && (
        <button onClick={() => setShowAllComments(!showAllComments)}>
          {showAllComments ? 'Hide all comments' : 'Show all comments'}
        </button>
      )}
            {commentsToShow.map((comment) => (
        <div key={comment.id}>
          <p><strong>{comment.user}</strong>: {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
