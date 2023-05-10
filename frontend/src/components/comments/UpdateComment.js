// frontend/src/components/comments/UpdateComment.js
import React, { useState, useEffect } from 'react';
import { updateComment } from '../../services/api';

const UpdateComment = ({ commentId }) => {
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Fetch the current comment and set it in state here
    // For now, we'll just use a placeholder string
    setCommentText('Current comment text');
  }, [commentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateComment(commentId, { text: commentText });
    setCommentText('');
  };

  return (
    <div>
      <h2>Update Comment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Update Comment</button>
      </form>
    </div>
  );
};

export default UpdateComment;
